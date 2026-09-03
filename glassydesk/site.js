(() => {
  "use strict";

  // Only enhance a complete gallery. The page and downloads work without JS.
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const tabs = [...gallery.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

    if (!tabs.length || panels.some((panel) => !panel)) return;

    const selectTab = (index, moveFocus = false) => {
      tabs.forEach((tab, tabIndex) => {
        const selected = index === tabIndex;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[tabIndex].hidden = !selected;
      });
      if (moveFocus) tabs[index].focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectTab(index));
      tab.addEventListener("keydown", (event) => {
        let nextIndex;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === undefined) return;
        event.preventDefault();
        selectTab(nextIndex, true);
      });
    });

    selectTab(0);
    gallery.classList.add("is-enhanced");
  });

  document.documentElement.classList.replace("no-js", "js");
})();
