// The phone in the hero: the buttons under it switch between the app's views. Until someone picks one,
// the views play on their own while the phone is on screen (not with Reduce Motion).
const viewer = document.querySelector('[data-viewer]');

if (viewer) {
  const buttons = [...viewer.querySelectorAll('.views button')];
  const shots = [...viewer.querySelectorAll('.screen img')];
  const caption = viewer.querySelector('.view-caption');
  const interval = 5000;
  let current = 0;
  let timer = null;
  let stopped = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const show = (index) => {
    current = index;
    buttons.forEach((button, n) => button.setAttribute('aria-pressed', String(n === index)));
    shots.forEach((shot, n) => {
      shot.classList.toggle('is-active', n === index);
      shot.setAttribute('aria-hidden', String(n !== index));
    });
    caption.textContent = buttons[index].dataset.caption;
  };

  const pause = () => {
    clearTimeout(timer);
    viewer.classList.remove('is-playing');
  };

  const play = () => {
    pause();
    if (stopped) return;
    void viewer.offsetWidth; // restart the lit button's progress bar
    viewer.classList.add('is-playing');
    timer = setTimeout(() => {
      show((current + 1) % buttons.length);
      play();
    }, interval);
  };

  viewer.style.setProperty('--interval', `${interval}ms`);
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    stopped = true;
    pause();
    show(index);
  }));
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()), { threshold: 0.5 }).observe(viewer);
}
