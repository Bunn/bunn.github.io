(() => {
  "use strict";

  // The HTML includes a verified direct download, so JS, GitHub API limits, or
  // an offline API cannot leave the button unusable. Enhance it to the newest
  // public release without changing the stable setup URL used by the apps.
  const buttons = document.querySelectorAll("[data-mac-download]");
  if (!buttons.length) return;

  fetch("https://api.github.com/repos/Bunn/GlassyDesk-Host/releases/latest", {
    headers: { Accept: "application/vnd.github+json" },
    credentials: "omit",
    signal: AbortSignal.timeout(5000),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Release unavailable");
      return response.json();
    })
    .then((release) => {
      if (release.draft || release.prerelease || !Array.isArray(release.assets)) return;
      const asset = release.assets.find((item) =>
        /^Glassy(?:Host|Desk)-[\d.]+\.zip$/.test(item.name) &&
        typeof item.browser_download_url === "string" &&
        item.browser_download_url.startsWith("https://github.com/Bunn/GlassyDesk-Host/releases/download/")
      );
      if (!asset) return;
      buttons.forEach((button) => { button.href = asset.browser_download_url; });
      if (typeof release.tag_name === "string" && /^v?[\d.]+$/.test(release.tag_name)) {
        document.querySelectorAll("[data-mac-version]").forEach((label) => {
          label.textContent = `Version ${release.tag_name.replace(/^v/, "")}`;
        });
      }
    })
    .catch(() => { /* Keep the working download embedded in the HTML. */ });
})();
