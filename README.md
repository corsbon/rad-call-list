# Rad Call List

A one-tap dialer for regional hospital radiology numbers, built for overnight call.

When you're reading a study and see which hospital it came from, you need the right number fast: the CT tech, the ED, the reading room. This app puts every site on one screen, shows only the numbers you care about for each site, and dials with a single tap.

## Features

- Landing page with every site, searchable by name or code, plus your most recent sites on top
- Per-site screen split into **Talk to the tech** and **Talk to a provider**
- Edit mode: switch numbers on or off per site, add your own, reset to defaults
- Your choices are saved on your device (no account, no server, no data leaves the phone)
- Installable to the home screen on iPhone and Android, and works offline after first load
- Plain HTML, CSS and JavaScript. No framework and no build step.

## Run it

Open `index.html` through any static file server, for example:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Change the call list

Every site and number lives in [`data.js`](data.js). Each row is `[label, number, type, shownByDefault]`. After editing, bump `version` in `data.js` and `CACHE` in `sw.js` so installed copies pick up the change.

## Deploy

It is a static site. On GitHub: Settings, Pages, deploy from the `main` branch, root folder.

## Disclaimer

Numbers were copied from the Dartmouth regional radiology groups web page and may be out of date. Verify before relying on them. This is an unofficial personal project, not affiliated with or endorsed by Dartmouth Health. Do not add patient information to this repository.

## License

MIT
