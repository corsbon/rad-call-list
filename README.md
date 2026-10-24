# Rad Call List

A one-tap dialer for regional hospital radiology numbers, built for overnight call.

When you're reading a study and see which hospital it came from, you need the right number fast: the CT tech, the ED, the reading room. This app puts every site on one screen, shows only the numbers you care about for each site, and dials with a single tap.

## Features

- Landing page with every site, searchable by name or code, plus your most recent sites on top
- Per-site screen split into **Talk to the tech** and **Talk to a provider**
- Edit mode: switch numbers on or off per site, add your own, reset to defaults
- "Your number is hidden" switch (on by default): dials `*67` first so your caller ID is blocked on US carriers. Turn it off from the same switch if a line refuses blocked calls.
- Your choices are saved on your device (no account, no server, no data leaves the phone)
- Installable to the home screen on iPhone and Android, and works offline after first load
- Plain HTML, CSS and JavaScript. No framework and no build step.

## Install it on your phone

Open the app's web address in your phone's browser, then add it to your home screen so it opens like a regular app, full screen, with its own icon. You only need to do this once per phone.

### iPhone (use Safari)

1. Open the app's address in **Safari**. Other iPhone browsers may not show the home screen option.
2. Tap the **Share** button, the square with an arrow pointing up. It is usually in the bottom toolbar. If you don't see it, tap the **three dots (...)** button at the bottom right to find it.
3. Scroll down the list and tap **Add to Home Screen**. If you don't see it, scroll to the bottom and tap **Edit Actions** to add it.
4. Leave the name as "Call List" (or rename it), keep **Open as Web App** switched on if it is shown, and tap **Add**.
5. The icon now appears on your home screen. Open the app from there.

### Android (use Chrome)

1. Open the app's address in **Chrome**.
2. Tap the **three dots** menu in the top right corner.
3. Tap **Add to Home screen**, or **Install app** if you see that instead.
4. Tap **Install** (or **Add**) and confirm. The icon appears on your home screen or in your app drawer.

### After installing

- The first time you open it, load it once with a signal. After that it works offline.
- If you open the web address in a regular browser tab instead of the home screen icon, you will see the same app but with the browser bars around it.
- Your on/off choices and added numbers are saved on that phone only. Installing on a second phone starts from the default list.

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
