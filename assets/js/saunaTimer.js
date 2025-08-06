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
      <button class="stop-btn">⏸️</button>
      <button class="reset-btn">↻</button>
    `;
    container.appendChild(card);

    // timer logic
    let remaining = minutes * 60;
    let interval  = startCountdown();

    // stop
    card.querySelector('.stop-btn')
      .addEventListener('click', () => clearInterval(interval));

    // reset
    card.querySelector('.reset-btn')
      .addEventListener('click', () => {
        clearInterval(interval);
        remaining = minutes * 60;
        card.querySelector('.time-display').textContent = formatTime(remaining);
        interval = startCountdown();
      });

    // clear form
    nameInput.value = '';
    minsInput.value = '';

    function startCountdown() {
      return setInterval(() => {
        if (remaining <= 0) {
          clearInterval(interval);
          alert(`${name}'s timer finished!`);
        } else {
          remaining--;
          card.querySelector('.time-display').textContent = formatTime(remaining);
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
