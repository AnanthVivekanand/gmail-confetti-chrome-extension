document.addEventListener('click', (event) => {
  const button = event.target.closest('div[role="button"]');
  if (button && button.textContent.trim() === 'Send') {
    confetti();
  }
});
