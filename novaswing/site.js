const previewLink = document.querySelector('[data-preview]');
const previewDialog = document.querySelector('#preview-dialog');
const previewVideo = previewDialog?.querySelector('video');

if (previewLink && previewDialog && previewVideo && typeof previewDialog.showModal === 'function') {
  previewLink.addEventListener('click', (event) => {
    event.preventDefault();
    previewDialog.showModal();
    previewVideo.play().catch(() => {});
  });
  previewDialog.querySelector('.close-preview').addEventListener('click', () => previewDialog.close());
  previewDialog.addEventListener('close', () => {
    previewVideo.pause();
    previewLink.focus();
  });
  previewDialog.addEventListener('click', (event) => {
    if (event.target !== previewDialog) return;
    const rect = previewDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) previewDialog.close();
  });
}
