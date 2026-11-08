#!/usr/bin/env bash
set -Eeuo pipefail

BASE_DIR="/srv/portfolio"
SITE_HOST="portfolio.ihorhub.eu"
SITE_URL="${1:-}"
CURRENT_LINK="$BASE_DIR/current"
PREVIOUS_LINK="$BASE_DIR/previous"

fail() {
  printf 'Portfolio rollback error: %s\n' "$1" >&2
  exit 1
}

[[ "$SITE_URL" == "https://$SITE_HOST" ]] || fail "unexpected site URL"
[[ -d "$BASE_DIR" && ! -L "$BASE_DIR" && "$(realpath -e "$BASE_DIR")" == "$BASE_DIR" ]] || fail "isolated deployment directory is unavailable"
[[ -L "$CURRENT_LINK" ]] || fail "current release symlink is missing"
current_target="$(readlink "$CURRENT_LINK")"
[[ "$current_target" =~ ^releases/[0-9a-f]{40}$ ]] || fail "current link points outside portfolio releases"
[[ -d "$BASE_DIR/$current_target" && ! -L "$BASE_DIR/$current_target" ]] || fail "current release directory is missing"

if [[ ! -L "$PREVIOUS_LINK" ]]; then
  rm -f -- "$CURRENT_LINK"
  printf 'Deactivated initial portfolio release %s; no earlier release exists.\n' "${current_target#releases/}"
  exit 0
fi

previous_target="$(readlink "$PREVIOUS_LINK")"
[[ "$previous_target" =~ ^releases/[0-9a-f]{40}$ ]] || fail "previous link points outside portfolio releases"
[[ -d "$BASE_DIR/$previous_target" && ! -L "$BASE_DIR/$previous_target" ]] || fail "previous release directory is missing"

run_id="$$"
current_tmp="$BASE_DIR/.current-rollback-$run_id"
previous_tmp="$BASE_DIR/.previous-rollback-$run_id"
ln -s "$previous_target" "$current_tmp"
mv -Tf -- "$current_tmp" "$CURRENT_LINK"
ln -s "$current_target" "$previous_tmp"
mv -Tf -- "$previous_tmp" "$PREVIOUS_LINK"

check_site() {
  curl --fail --silent --show-error --connect-timeout 5 --max-time 12 \
    --resolve "$SITE_HOST:443:127.0.0.1" "$SITE_URL/health" -o /dev/null &&
    curl --fail --silent --show-error --connect-timeout 5 --max-time 12 \
      --resolve "$SITE_HOST:443:127.0.0.1" "$SITE_URL/" | grep -Fq 'Bc. Ihor Havryliv' &&
    curl --fail --silent --show-error --connect-timeout 5 --max-time 12 \
      --resolve "$SITE_HOST:443:127.0.0.1" "$SITE_URL/projects/bodycast" -o /dev/null
}

if ! check_site; then
  current_restore="$BASE_DIR/.current-restore-$run_id"
  previous_restore="$BASE_DIR/.previous-restore-$run_id"
  ln -s "$current_target" "$current_restore"
  mv -Tf -- "$current_restore" "$CURRENT_LINK"
  ln -s "$previous_target" "$previous_restore"
  mv -Tf -- "$previous_restore" "$PREVIOUS_LINK"
  fail "rollback health check failed; the original release links were restored"
fi

printf 'Rolled back portfolio from %s to %s\n' "${current_target#releases/}" "${previous_target#releases/}"
