#!/usr/bin/env bash
set -Eeuo pipefail

SITE_URL="${1:-}"
[[ "$SITE_URL" =~ ^https://[A-Za-z0-9.-]+$ ]] || {
  echo "Expected one public HTTPS origin, for example https://portfolio.ihorhub.eu." >&2
  exit 2
}

tmp_dir="$(mktemp -d)"
trap 'rm -rf -- "$tmp_dir"' EXIT

http_url="${SITE_URL/https:/http:}"
redirect_target="$(curl --silent --show-error --max-time 20 -o /dev/null -w '%{redirect_url}' "$http_url/")"
[[ "$redirect_target" == "$SITE_URL/"* ]] || {
  echo "HTTP did not redirect to the configured HTTPS site." >&2
  exit 1
}

curl --fail --silent --show-error --max-time 20 "$SITE_URL/" -o "$tmp_dir/index.html"
grep -Fq 'Bc. Ihor Havryliv' "$tmp_dir/index.html"
grep -Fq "$SITE_URL" "$tmp_dir/index.html"

for route in /projects/bodycast /projects/building-management-app; do
  curl --fail --silent --show-error --max-time 20 "$SITE_URL$route" -o "$tmp_dir/route.html"
done
curl --fail --silent --show-error --max-time 20 "$SITE_URL/robots.txt" -o "$tmp_dir/robots.txt"
curl --fail --silent --show-error --max-time 20 "$SITE_URL/sitemap.xml" -o "$tmp_dir/sitemap.xml"
grep -Fq "$SITE_URL/sitemap.xml" "$tmp_dir/robots.txt"
grep -Fq "$SITE_URL/projects/building-management-app" "$tmp_dir/sitemap.xml"

js_path="$(grep -oE 'src="[^"]+\.js"' "$tmp_dir/index.html" | head -n 1 | cut -d '"' -f 2)"
css_path="$(grep -oE 'href="[^"]+\.css"' "$tmp_dir/index.html" | head -n 1 | cut -d '"' -f 2)"
[[ "$js_path" == /assets/* && "$css_path" == /assets/* ]] || {
  echo "Built JavaScript or stylesheet asset path is missing from the homepage." >&2
  exit 1
}

js_type="$(curl --fail --silent --show-error --max-time 20 -o /dev/null -w '%{content_type}' "$SITE_URL$js_path")"
css_type="$(curl --fail --silent --show-error --max-time 20 -o /dev/null -w '%{content_type}' "$SITE_URL$css_path")"
[[ "$js_type" == application/javascript* || "$js_type" == text/javascript* ]] || {
  echo "The JavaScript asset did not return a JavaScript content type." >&2
  exit 1
}
[[ "$css_type" == text/css* ]] || {
  echo "The stylesheet did not return a CSS content type." >&2
  exit 1
}

printf 'Public HTTPS smoke passed for %s, SPA routes, sitemap, JavaScript, and CSS.\n' "$SITE_URL"
