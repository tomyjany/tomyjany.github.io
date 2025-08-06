// saunaTimer.js
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('sauna-app');
  app.innerHTML = `
    <form id="timer-form">
      <input type="text" id="person-name" placeholder="Name" required />
      <input type="number" id="timer-minutes" placeholder="Minutes" required min="1" />
      <input type="url" id="timer-url" placeholder="YouTube URL (optional)" />
      <button type="submit">Start</button>
    </form>
    <div id="timers-container"></div>
  `;

  const form      = document.getElementById('timer-form');
  const container = document.getElementById('timers-container');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name   = document.getElementById('person-name').value.trim();
    const mins   = parseInt(document.getElementById('timer-minutes').value, 10);
    const url    = document.getElementById('timer-url').value.trim();
    if (!name || isNaN(mins) || mins < 1) return;

    const card = document.createElement('div');
    card.className = 'timer-card';
    card.innerHTML = `
      <h3>${name}</h3>
      <div class="time-display">${formatTime(mins * 60)}</div>
      <button class="toggle-btn">⏸️</button>
      <button class="reset-btn">↻</button>
      <div class="video-container" style="display:none;"></div>
    `;
    container.appendChild(card);

    let remaining = mins * 60;
    let interval;
    let running = false;

    const display   = card.querySelector('.time-display');
    const toggleBtn = card.querySelector('.toggle-btn');
    const resetBtn  = card.querySelector('.reset-btn');
    const videoCont = card.querySelector('.video-container');

    startTimer();

    toggleBtn.addEventListener('click', () => {
      if (running) {
        clearInterval(interval);
        running = false;
        toggleBtn.textContent = '▶️';
      } else {
        startTimer();
      }
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(interval);
      remaining = mins * 60;
      display.textContent = formatTime(remaining);
      toggleBtn.textContent = '⏸️';
      videoCont.innerHTML = '';
      videoCont.style.display = 'none';
      card.classList.remove('warning', 'danger');
      startTimer();
    });

    form.reset();

    function startTimer() {
      if (running) return;
      running = true;
      toggleBtn.textContent = '⏸️';
      interval = setInterval(() => {
        if (remaining <= 0) {
          clearInterval(interval);
          running = false;
          toggleBtn.disabled = true;
          card.classList.remove('warning', 'danger');
          if (url) {
            const vidId = extractYouTubeID(url);
            if (vidId) {
              videoCont.innerHTML = `
                <iframe
                  src="https://www.youtube.com/embed/${vidId}?autoplay=1"
                  allow="autoplay; encrypted-media"
                ></iframe>
              `;
              videoCont.style.display = 'block';
            }
          }
        } else {
          remaining--;
          if (remaining < 10) {
            card.classList.add('danger');
            card.classList.remove('warning');
          } else if (remaining < 60) {
            card.classList.add('warning');
            card.classList.remove('danger');
          } else {
            card.classList.remove('warning', 'danger');
          }
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

  function extractYouTubeID(url) {
    const m = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
});
