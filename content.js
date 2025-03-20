// Listen for clicks on the "Send" button
document.addEventListener('click', function(event) {
  if (event.target.matches('div[role="button"]') && event.target.innerHTML.trim() === 'Send') {
    triggerCelebration();
  }
});

function triggerCelebration() {
  // Create the overlay to dim the screen
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.7)'; // Semi-transparent black
  overlay.style.zIndex = '9999';
  overlay.style.pointerEvents = 'none'; // Allows clicks to pass through

  // Create canvas for confetti
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  // Initialize confetti with the canvas
  const myConfetti = confetti.create(canvas, { resize: true });

  // Define disco light animations with smooth color transitions
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes discoLight {
      0% { background-color: rgba(255, 0, 0, 0.5); box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.5); }
      20% { background-color: rgba(0, 0, 255, 0.5); box-shadow: 0 0 20px 10px rgba(0, 0, 255, 0.5); }
      40% { background-color: rgba(0, 255, 0, 0.5); box-shadow: 0 0 20px 10px rgba(0, 255, 0, 0.5); }
      60% { background-color: rgba(255, 255, 0, 0.5); box-shadow: 0 0 20px 10px rgba(255, 255, 0, 0.5); }
      80% { background-color: rgba(255, 0, 255, 0.5); box-shadow: 0 0 20px 10px rgba(255, 0, 255, 0.5); }
      100% { background-color: rgba(255, 0, 0, 0.5); box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.5); }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // Create disco lights
  for (let i = 0; i < 5; i++) {
    const light = document.createElement('div');
    light.style.position = 'absolute';
    light.style.width = '100px';
    light.style.height = '100px';
    light.style.borderRadius = '50%';
    light.style.top = `${Math.random() * 100}%`;
    light.style.left = `${Math.random() * 100}%`;
    const colorDuration = 1 + Math.random() * 2; // 1 to 3 seconds
    const pulseDuration = 0.5 + Math.random() * 1.5; // 0.5 to 2 seconds
    light.style.animation = `discoLight ${colorDuration}s linear infinite, pulse ${pulseDuration}s ease-in-out infinite`;
    overlay.appendChild(light);
  }

  // Append canvas to overlay (on top of lights)
  overlay.appendChild(canvas);

  // Append overlay to the page
  document.body.appendChild(overlay);

  // Trigger massive confetti bursts
  const duration = 5000; // 5 seconds
  const interval = setInterval(() => {
    myConfetti({
      particleCount: 100, // Lots of confetti per burst
      spread: 70,
      origin: { x: Math.random(), y: Math.random() }, // Random burst positions
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] // Vibrant disco colors
    });
  }, 500); // Burst every 500ms

  // Clean up after 5 seconds
  setTimeout(() => {
    clearInterval(interval);
    overlay.remove();
  }, duration);
}