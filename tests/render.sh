#!/usr/bin/env bash
# Renders the site (and each example config) in headless Chrome and checks the
# business name and WhatsApp link appear. Run: bash tests/render.sh
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-}"
for c in google-chrome google-chrome-stable chromium chromium-browser "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  [ -z "$CHROME" ] && command -v "$c" >/dev/null 2>&1 && CHROME="$c"
  [ -z "$CHROME" ] && [ -x "$c" ] && CHROME="$c"
done
[ -n "$CHROME" ] || { echo "Chrome not found (set CHROME=/path/to/chrome)"; exit 1; }

TMP="$(mktemp -d)"
PORT=8799
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$TMP" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true; wait $SERVER 2>/dev/null || true; rm -rf "$TMP"' EXIT
sleep 1

status=0
for cfg in site.config.js examples/*.js; do
  cp index.html app.js "$TMP"/
  cp "$cfg" "$TMP/site.config.js"
  name="$(node -e 'const vm=require("vm"),s={window:{}};vm.runInNewContext(require("fs").readFileSync(process.argv[1],"utf8"),s);process.stdout.write(s.window.SITE.business.name)' "$cfg")"
  dom="$("$CHROME" --headless=new --no-sandbox --disable-gpu --virtual-time-budget=3000 --dump-dom "http://127.0.0.1:$PORT/?cfg=$RANDOM" 2>/dev/null)"
  name="$(printf '%s' "$name" | sed 's/&/\&amp;/g')"   # the page HTML-escapes "&"
  if grep -qF "<h1 id=\"hero-title\">$name</h1>" <<<"$dom" && grep -q 'wa.me/' <<<"$dom"; then
    echo "✓ $cfg renders ($name)"
  else
    echo "✗ $cfg did not render correctly"; status=1
  fi
done
exit $status
