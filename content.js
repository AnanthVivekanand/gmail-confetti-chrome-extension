document.addEventListener('click', (event) => {
  const button = event.target.closest('div[role="button"]');
  if (button && button.textContent.trim() === 'Send') {
    startStrobeLights();
    setTimeout(launchConfetti, 100); // Delay confetti to ensure layering
  }
});

function launchConfetti() {
  const confettiSettings = {
      particleCount: 500,
      spread: 250,
      startVelocity: 60,
      gravity: 0.4,
      ticks: 300,
      origin: { y: 0.7 },
      colors: ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'],
      zIndex: 99999 // Ensures confetti appears above strobe lights
  };

  for (let i = 0; i < 5; i++) {
      setTimeout(() => confetti(confettiSettings), i * 400);
  }
}

function startStrobeLights() {
  let strobe = document.createElement("div");
  strobe.id = "strobe-lights";
  document.body.appendChild(strobe);

  let style = document.createElement("style");
  style.innerHTML = `
      @keyframes smoothDisco {
          0% { background: rgb(255, 0, 0); }
          20% { background: rgb(255, 128, 0); }
          40% { background: rgb(255, 255, 0); }
          60% { background: rgb(0, 255, 0); }
          80% { background: rgb(0, 255, 255); }
          100% { background: rgb(255, 0, 255); }
      }

      #strobe-lights {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9998; /* Lower than confetti */
          pointer-events: none;
          opacity: 0.7;
          animation: smoothDisco 1s infinite linear alternate;
          transition: color 0.3s ease-in-out;          
      }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
      strobe.remove();
      style.remove();
  }, 6000); // Matches the animation cycle
}
