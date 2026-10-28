# Free Business Website

[![Check](https://github.com/aarizsayed7/free-business-website/actions/workflows/check.yml/badge.svg)](https://github.com/aarizsayed7/free-business-website/actions/workflows/check.yml)

A free, open-source website template for small and local businesses: shops, bakeries, salons, clinics, workshops, tutors.

**You edit one file (`site.config.js`) and get a complete, mobile-friendly website.** You don't need coding skills, a build step, a server or a monthly fee.

## What you get

- Mobile-first design, with automatic light and dark mode
- **WhatsApp button** plus an enquiry form that opens WhatsApp with the customer's message already typed (no server needed)
- Click-to-call phone number
- Google Map, opening hours, services, gallery and customer reviews
- Google-friendly: page title, description and `LocalBusiness` structured data are filled in automatically from your details
- Sections hide themselves when you leave them empty
- Pick your own brand colour and Google Font
- Plain HTML, CSS and JavaScript, about 15 KB, with no frameworks or dependencies

## Quick start (5 minutes)

1. Click **Use this template** (or **Fork**) on GitHub, or download the ZIP.
2. Open `site.config.js` and replace the example details with your business's details.
3. Put your photos in an `images/` folder and reference them in the config, e.g. `"images/shop.jpg"`.
4. Open `index.html` in a browser to preview it.

## Put it online for free

**GitHub Pages:** in your repo go to **Settings → Pages → Deploy from branch → `main` / root**. Your site goes live at `https://<username>.github.io/<repo>/`.

**Netlify / Vercel / Cloudflare Pages:** import the repo. There's no build command and the output folder is the root.

**Custom domain:** buy one (around ₹500–1,000/year for `.in`) and connect it in your host's settings.

## Examples

The `examples/` folder has ready configs for other kinds of business. To use one, copy it over `site.config.js`.

| File | Business type |
|---|---|
| `examples/salon.config.js` | Hair & beauty salon |
| `examples/workshop.config.js` | Repair / service workshop |

The example businesses, phone numbers and addresses are made up. Replace them all.

## Other languages

Set `language` and paste a file from [`translations/`](translations/) into `labels` in your config to show the headings and buttons in another language.

## File layout

```
index.html        page structure + styles
app.js            fills the page from the config (no need to edit)
site.config.js    YOUR business details (edit this)
examples/         sample configs
translations/     headings and buttons in other languages
tests/            automatic checks (run on every pull request)
```

## Contributing

Contributions are welcome, especially:

- New example configs for other business types
- Translations of the section headings (Hindi, Marathi, Gujarati, Tamil…)
- Accessibility and performance improvements
- New optional sections (menu/price list, FAQ, team)

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Every pull request is checked automatically, and I aim to review within 48 hours.

## Contributors

Everyone with a merged pull request is listed here. Want to be next? See [CONTRIBUTING.md](CONTRIBUTING.md) and the [good first issues](https://github.com/aarizsayed7/free-business-website/labels/good%20first%20issue).

- [@aarizsayed7](https://github.com/aarizsayed7), maintainer

## License

[MIT](LICENSE): free to use for personal and commercial websites, including client work.
