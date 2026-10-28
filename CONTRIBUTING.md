# Contributing

Thanks for helping. This project gives small shops a free website, so every improvement reaches real businesses. **First-time contributors are very welcome.** Many tasks need no coding at all.

## Where to start

Browse issues labelled [**good first issue**](https://github.com/aarizsayed7/free-business-website/labels/good%20first%20issue). Each one says exactly which file to change and how to check your work. Comment "I'd like to take this" so nobody else duplicates it.

| You know… | Good tasks |
|---|---|
| An Indian language | Add a file in `translations/` |
| A type of local business | Add an example config in `examples/` |
| HTML / CSS / JavaScript | New optional sections, accessibility, performance |
| How to explain things simply | Guides for shop owners in the README |

## How to make a change

1. **Fork** the repo and create a branch: `git checkout -b add-hindi`.
2. Make your change. Preview it by opening `index.html` in a browser. Some browsers block the map on `file://`, so run `python3 -m http.server` and open `http://localhost:8000` if anything looks off.
3. Run the checks:
   ```
   node tests/check.mjs     # configs + translations
   bash tests/render.sh     # renders every config in Chrome (optional locally; CI runs it)
   ```
4. Open a **pull request**. Say what you changed, and add a screenshot if it changes how the page looks.

The same checks run automatically on every pull request. I aim to review every pull request within 48 hours.

## Project rules

- **No frameworks, no build step, no dependencies.** A shop owner must be able to download the folder and open it.
- **Everything a business changes lives in `site.config.js`.** New features are switched on from the config and hidden when left empty.
- **Never insert config text as raw HTML.** Use `el()` / `textContent` in `app.js` (see existing code).
- **Example data is clearly fictional.** No real business names, phone numbers or addresses in `examples/`.
- Keep the page fast on a cheap phone with slow mobile data.

## Adding a translation

Copy `translations/en.json` to `translations/<language-code>.json` (e.g. `hi.json`) and translate the values only. Write what a shopkeeper would naturally say. Run `node tests/check.mjs`.

## Adding an example business

Copy `site.config.js` to `examples/<type>.config.js` and change the details. Use a made-up name and a dummy number like `919876543210`. Pick a [schema.org business type](https://schema.org/LocalBusiness#subtypes) for `category`. Run both checks.

## Credit

Everyone with a merged pull request is listed in the README under Contributors.

By contributing you agree your work is released under the [MIT licence](LICENSE) and that you'll follow the [Code of Conduct](CODE_OF_CONDUCT.md).
