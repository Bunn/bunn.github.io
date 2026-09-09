# Farwave website

The canonical product site is `https://bunn.dev/farwave/`. This repository publishes
its root from `master` through GitHub Pages, with Cloudflare in front of the custom
domain. It is a static HTML/CSS site with no package installation or build step.

Serve the repository root locally, for example with `python3 -m http.server 4173`,
then open `/farwave/`. The landing page uses normal anchor links and native HTML
disclosures and works without JavaScript. The three `/roamplitude/` pages redirect
to their matching Farwave pages, with a no-JavaScript refresh and a visible link
as fallbacks. The redirect script preserves query strings and section fragments
and maps the previous landing page's `#explore` fragment to `#worlds`.

## Feature review — September 9, 2026

Copy was checked against the current local `worldradio` app source, canonical
App Store metadata, and existing native app screenshots. This was a source and
asset review, not a new device playback or purchase test.

| Website claim | App evidence | Scope |
| --- | --- | --- |
| Live radio on Earth | `RadioWorld.swift`, `RadioDirectory.swift`, `DiscoverScreen.swift` | Globe, station/country/genre search, curated picks, random discovery, recent history |
| Podcasts on Auralis | `PodcastDirectory.swift`, `PodcastLibrary.swift`, `PodcastPlayerViews.swift`, `Documentation/AuralisPodcasts.md` | Public directory/RSS, follows, new episode signals, progress, queue, manual downloads, 0.5×–3× speed, sleep timers |
| Private music planet | `LocalMusicLibrary.swift`, `MusicUploadServer.swift`, `PrivatePlanetPanel.swift` | Files and same-network Wi-Fi imports, artist/collection shuffle, custom name/color, offline audio |
| Pro features | `ProFeature.swift`, `SubscriptionStore.swift` | Favorites, podcasts, private planet, CarPlay, themes, icons, widgets; no invented prices |
| iCloud favorites | `CloudKitFavoritesRepository.swift`, `README.md` | Radio favorites sync; podcasts and music remain per device |
| Listener orbits | `CloudKitPresenceRepository.swift`, `ListenerPresence.swift` | Optional CloudKit presence, no station or device location in presence records; expired counts do not imply record deletion |
| Purchases | `SubscriptionStore.swift`, `Documentation/RevenueCat.md` | Apple payments and RevenueCat purchase validation/reporting; removes the previous no-subscriptions claim |
| Appearance | App theme catalog, `AppIcon.swift`, native screenshot assets | Seven themes/icons; default Neon is available without Pro |

Live radio and streaming podcasts require a connection. Offline listening covers
downloaded podcast audio and user-imported music. Pro does not remove advertising
from publisher audio. CarPlay copy promises live radio, not podcasts or local music.
The site retains “Coming soon”: the available App Store upload record identifies
version 1.0 as in preparation, and no public download URL has been established.

The privacy and terms pages describe podcasts, local transfers, iCloud, listener
presence, and Pro purchases. References include RevenueCat's
[Apple App Privacy disclosures](https://www.revenuecat.com/docs/platform-resources/apple-platform-resources/apple-app-privacy)
and Apple's [subscription cancellation instructions](https://support.apple.com/en-us/118428).

App release follow-up: the reviewed `project.yml` still has an empty
`FARWAVE_PRIVACY_POLICY_URL`. The published policy URL is now
`https://bunn.dev/farwave/privacy/`; configuring it belongs in the app repository.
No app source or existing uncommitted app work was modified for this website change.

## Updating the page

- Keep the homepage app card, page metadata, feature copy, and legal disclosures aligned.
- Confirm publication before replacing “Coming soon” with an App Store link.
- Check links and fragments from both the new and legacy routes before pushing.
- Keep all fonts and images self-hosted. Asset provenance is in `assets/README.md`.
