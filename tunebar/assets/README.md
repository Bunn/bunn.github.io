# Tunebar landing page assets

- `aurora.webp`, `prism.webp`, and `afterglow.webp` are optimized versions of the real Tunebar screenshots supplied in `Desktop/waveforms`. They preserve the original screenshot content and transparency. The page switches between still screenshots; it does not capture audio or claim to be a live browser visualizer.
- `app-icon.png` comes from the Tunebar Xcode project's AppIcon asset catalog.
- `social.jpg` is a smaller copy of the corrected App Store composition uploaded for Tunebar 5.0. It was created with built-in image generation from the same real screenshots.
- `space-grotesk.woff2` and `OFL.txt` are copied from the site's existing Farwave font assets. Space Grotesk is distributed under the included SIL Open Font License.

The visualizer is labeled **Coming in 5.0** because the public Mac App Store listing is version 4.1 when this page is prepared. Update that label and the meta description when 5.0 is released.

The page is static HTML, CSS, and JavaScript. Serve the repository root to preview `/tunebar/`; no build step or third-party requests are required to render the page.
