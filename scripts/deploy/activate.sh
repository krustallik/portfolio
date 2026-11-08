#!/usr/bin/env bash
set -Eeuo pipefail

BASE_DIR="/srv/portfolio"
SITE_HOST="portfolio.ihorhub.eu"
RELEASE_SHA="${1:-}"
RUN_ID="${2:-}"
RUN_ATTEMPT="${3:-}"
SITE_URL="${4:-}"

fail() {
  printf 'Portfolio deployment error: %s\n' "$1" >&2
  exit 1
}

[[ "$RELEASE_SHA" =~ ^[0-9a-f]{40}$ ]] || fail "invalid commit SHA"
[[ "$RUN_ID" =~ ^[1-9][0-9]{0,19}$ && "$RUN_ATTEMPT" =~ ^[1-9][0-9]{0,19}$ ]] || fail "invalid CI run identity"
[[ "$SITE_URL" == "https://$SITE_HOST" ]] || fail "unexpected site URL"
[[ -d "$BASE_DIR" && ! -L "$BASE_DIR" ]] || fail "isolated deployment directory is unavailable"
[[ "$(realpath -e "$BASE_DIR")" == "$BASE_DIR" ]] || fail "deployment directory resolved outside its fixed path"

RELEASE_ID="$RELEASE_SHA-$RUN_ID-$RUN_ATTEMPT"
STAGING_DIR="$BASE_DIR/incoming/$RELEASE_ID"
RELEASE_DIR="$BASE_DIR/releases/$RELEASE_SHA"
CURRENT_LINK="$BASE_DIR/current"
PREVIOUS_LINK="$BASE_DIR/previous"

[[ -d "$STAGING_DIR" && ! -L "$STAGING_DIR" ]] || fail "staged artifact directory is missing"
[[ -f "$STAGING_DIR/index.html" ]] || fail "staged artifact has no index.html"
[[ -n "$(find "$STAGING_DIR" -type f -print -quit)" ]] || fail "staged artifact is empty"
if find "$STAGING_DIR" -type l -print -quit | grep -q .; then
  fail "staged artifact contains a symlink"
fi

find "$STAGING_DIR" -type d -exec chmod 0755 {} +
find "$STAGING_DIR" -type f -exec chmod 0644 {} +

if [[ -e "$RELEASE_DIR" || -L "$RELEASE_DIR" ]]; then
  [[ -d "$RELEASE_DIR" && ! -L "$RELEASE_DIR" ]] || fail "release path exists with an unexpected type"
  diff -qr "$STAGING_DIR" "$RELEASE_DIR" >/dev/null || fail "same SHA already has different static output"
  rm -rf -- "$STAGING_DIR"
else
  mv -- "$STAGING_DIR" "$RELEASE_DIR"
fi

old_target=""
if [[ -L "$CURRENT_LINK" ]]; then
  old_target="$(readlink "$CURRENT_LINK")"
  [[ "$old_target" =~ ^releases/[0-9a-f]{40}$ ]] || fail "current link points outside portfolio releases"
  [[ -d "$BASE_DIR/$old_target" && ! -L "$BASE_DIR/$old_target" ]] || fail "current release is missing"
elif [[ -e "$CURRENT_LINK" ]]; then
  fail "current path is not a symlink"
fi

old_previous_target=""
if [[ -L "$PREVIOUS_LINK" ]]; then
  old_previous_target="$(readlink "$PREVIOUS_LINK")"
  [[ "$old_previous_target" =~ ^releases/[0-9a-f]{40}$ ]] || fail "previous link points outside portfolio releases"
  [[ -d "$BASE_DIR/$old_previous_target" && ! -L "$BASE_DIR/$old_previous_target" ]] || fail "previous release is missing"
elif [[ -e "$PREVIOUS_LINK" ]]; then
  fail "previous path is not a symlink"
fi

switched=0
new_target="releases/$RELEASE_SHA"
if [[ "$old_target" != "$new_target" ]]; then
  if [[ -n "$old_target" ]]; then
    previous_tmp="$BASE_DIR/.previous-$RUN_ID-$RUN_ATTEMPT"
    [[ ! -e "$previous_tmp" && ! -L "$previous_tmp" ]] || fail "previous-link temporary path already exists"
    ln -s "$old_target" "$previous_tmp"
    mv -Tf -- "$previous_tmp" "$PREVIOUS_LINK"
  fi

  current_tmp="$BASE_DIR/.current-$RUN_ID-$RUN_ATTEMPT"
  [[ ! -e "$current_tmp" && ! -L "$current_tmp" ]] || fail "current-link temporary path already exists"
  ln -s "$new_target" "$current_tmp"
  mv -Tf -- "$current_tmp" "$CURRENT_LINK"
  switched=1
fi

check_site() {
  curl --fail --silent --show-error --connect-timeout 5 --max-time 12 \
    --resolve "$SITE_HOST:443:127.0.0.1" "$SITE_URL/health" -o /dev/null &&
    curl --fail --silent --show-error --connect-timeout 5 --max-time 12 \
      --resolve "$SITE_HOST:443:127.0.0.1" "$SITE_URL/" | grep -Fq 'Bc. Ihor Havryliv' &&
    curl --fail --silent --show-error --connect-timeout 5 --max-time 12 \
      --resolve "$SITE_HOST:443:127.0.0.1" "$SITE_URL/projects/bodycast" -o /dev/null
}

if ! check_site; then
  if [[ "$switched" == 1 ]]; then
    if [[ -n "$old_target" ]]; then
      rollback_tmp="$BASE_DIR/.current-rollback-$RUN_ID-$RUN_ATTEMPT"
      ln -s "$old_target" "$rollback_tmp"
      mv -Tf -- "$rollback_tmp" "$CURRENT_LINK"
    elif [[ -L "$CURRENT_LINK" && "$(readlink "$CURRENT_LINK")" == "$new_target" ]]; then
      rm -f -- "$CURRENT_LINK"
    fi

    if [[ -n "$old_previous_target" ]]; then
      previous_restore="$BASE_DIR/.previous-restore-$RUN_ID-$RUN_ATTEMPT"
      ln -s "$old_previous_target" "$previous_restore"
      mv -Tf -- "$previous_restore" "$PREVIOUS_LINK"
    elif [[ -L "$PREVIOUS_LINK" ]]; then
      rm -f -- "$PREVIOUS_LINK"
    fi
  fi
  fail "local HTTPS health checks failed; the previous release was restored when available"
fi

touch "$RELEASE_DIR"
printf 'Activated portfolio release %s\n' "$RELEASE_SHA"

current_sha="$RELEASE_SHA"
previous_sha=""
if [[ -L "$PREVIOUS_LINK" ]]; then
  previous_target="$(readlink "$PREVIOUS_LINK")"
  if [[ "$previous_target" =~ ^releases/([0-9a-f]{40})$ && -d "$BASE_DIR/$previous_target" ]]; then
    previous_sha="${BASH_REMATCH[1]}"
  fi
fi

mapfile -t release_rows < <(find "$BASE_DIR/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %f\n' | sort -nr)
for ((index = 5; index < ${#release_rows[@]}; index += 1)); do
  release_name="${release_rows[$index]#* }"
  [[ "$release_name" =~ ^[0-9a-f]{40}$ ]] || continue
  [[ "$release_name" != "$current_sha" && "$release_name" != "$previous_sha" ]] || continue
  candidate="$BASE_DIR/releases/$release_name"
  [[ -d "$candidate" && ! -L "$candidate" && "$(realpath -e "$candidate")" == "$candidate" ]] || continue
  rm -rf -- "$candidate"
done
