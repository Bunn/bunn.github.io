(() => {
  const controls = document.querySelector('.preset-controls');
  if (!controls) return;

  const buttons = [...controls.querySelectorAll('button[data-preset]')];
  const images = [...document.querySelectorAll('[data-image]')];
  const caption = document.getElementById('preset-caption');
  const captions = {
    aurora: 'Aurora. A softer kind of glow.',
    prism: 'Prism. A little kaleidoscopic joy.',
    afterglow: 'Afterglow. Stay for one more song.'
  };

  function selectPreset(preset) {
    if (!Object.hasOwn(captions, preset)) return;
    document.documentElement.dataset.preset = preset;
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.preset === preset));
    }
    for (const image of images) {
      const active = image.dataset.image === preset;
      image.dataset.active = String(active);
      image.setAttribute('aria-hidden', String(!active));
    }
    caption.textContent = captions[preset];
  }

  for (const [index, button] of buttons.entries()) {
    button.addEventListener('click', () => selectPreset(button.dataset.preset));
    button.addEventListener('keydown', (event) => {
      const positions = {
        ArrowRight: (index + 1) % buttons.length,
        ArrowLeft: (index - 1 + buttons.length) % buttons.length,
        Home: 0,
        End: buttons.length - 1
      };
      if (!Object.hasOwn(positions, event.key)) return;
      event.preventDefault();
      const next = buttons[positions[event.key]];
      next.focus();
      selectPreset(next.dataset.preset);
    });
  }

  controls.hidden = false;
})();
