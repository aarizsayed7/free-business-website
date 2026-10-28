# Translations

Each file here translates the fixed words on the page (section headings, button text, form placeholders).

**To use one:** copy the file's contents into `labels` in `site.config.js`, and set `language` to the file's code, e.g. `language: "hi"`.

**To add a language:** copy `en.json` to `<code>.json` (e.g. `hi.json`, `mr.json`, `gu.json`, `ta.json`) and translate the values. Keep the keys (the left side) exactly as they are. Use the words a shop owner would actually use, not a word-for-word translation. Run `node tests/check.mjs` before opening a pull request.
