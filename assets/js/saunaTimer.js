// saunaTimer.js
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('sauna-app');
  app.innerHTML = `
    <form id="timer-form">
      <input type="text" id="person-name" placeholder="Name" required />
      <input type="number" id="timer-minutes" placeholder="Min" required min="1" />
      <button type="submit">Start</button>
    </form>
    <div id="timers-container"></div>
  `;

  const form      = app.querySelector('#timer-form');
  const container = app.querySelector('#timers-container');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nameInput  = form.querySelector('#person-name');
    const minsInput  = form.querySelector('#timer-minutes');
    const name       = nameInput.value.trim();
    const minutes    = parseInt(minsInput.value, 10);
    if (!name || isNaN(minutes) || minutes < 1) return;

    // create card
    const card = document.createElement('div');
    card.className = 'timer-card';
    card.innerHTML = `
      <h3>${name}</h3>
      <div class="time-display">${formatTime(minutes * 60)}</div>
      <button class="toggle-btn">⏸️</button>
      <button class="reset-btn">↻</button>
    `;
    container.appendChild(card);

    // timer state
    let remaining = minutes * 60;
    let interval  = null;
    let running   = false;

    const display   = card.querySelector('.time-display');
    const toggleBtn = card.querySelector('.toggle-btn');
    const resetBtn  = card.querySelector('.reset-btn');

    // start initially
    startTimer();

    // Play/Pause toggle
    toggleBtn.addEventListener('click', () => {
      if (running) {
        // pause
        clearInterval(interval);
        running = false;
        toggleBtn.textContent = '▶️';
      } else {
        // play
        startTimer();
      }
    });

    // Reset
    resetBtn.addEventListener('click', () => {
      clearInterval(interval);
      remaining = minutes * 60;
      display.textContent = formatTime(remaining);
      toggleBtn.textContent = '⏸️';
      startTimer();
    });

    // clear form inputs
    nameInput.value = '';
    minsInput.value = '';

    function startTimer() {
      if (running) return;
      running   = true;
      toggleBtn.textContent = '⏸️';
      interval = setInterval(() => {
        if (remaining <= 0) {
          clearInterval(interval);
          running = false;
          toggleBtn.disabled = true;
          alert(`${name}'s timer finished!`);
        } else {
          remaining--;
          display.textContent = formatTime(remaining);
        }
      }, 1000);
    }
  });

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
});
