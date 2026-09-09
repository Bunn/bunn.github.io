# Farwave website assets

All images and fonts are served from this repository. The landing and legal pages
load no third-party scripts, fonts, analytics, or audio streams.

- `app-icon.png`: the current Farwave Neon icon from the app repository's
  `Roamplitude/Assets.xcassets/IconPreview-neon-light.imageset/Preview.png`.
- `icon-*.png`: all seven app icon previews from the corresponding light
  `IconPreview-<name>-light.imageset/Preview.png`, resized to 160 × 160 pixels.
- `01-earth.jpg` through `06-private.jpg`: real native iPhone screenshots from
  `worldradio/appstore/sources/iphone/`, captured September 7, 2026. Converted to
  JPEG at quality 84 and resized proportionally to 1560 pixels tall using `sips`.
  Screen contents were not repainted, cropped, or generated. Original capture
  details are in the app repo's `appstore/sources/capture-notes.md`.
- `fonts/space-grotesk.woff2`: self-hosted Latin variable font from Google Fonts,
  weights 400–700. See `fonts/OFL.txt` for the SIL Open Font License.

The podcast screenshot shows actual publisher content, including Twenty Thousand
Hertz. Podcast artwork and titles remain their publishers' property. The private
planet screenshot shows a sample user-imported music library, not bundled songs
or a Farwave streaming catalog. Neither radio nor podcast screenshots imply a
partnership or endorsement.

The custom domain uses Cloudflare in front of GitHub Pages. `email_off` comments
around contact links preserve readable addresses and working `mailto:` links
without Cloudflare's email-decoding JavaScript.
