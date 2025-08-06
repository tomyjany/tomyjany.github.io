// saunaTimer.js
// We use the public Piped instance at yewtu.eu (no API key required)
const INVIDIOUS = 'https://yewtu.eu';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('sauna-app');
  app.innerHTML = `
    <form id="timer-form">
      <input type="text" id="person-name" placeholder="Name" required />
      <input type="number" id="timer-minutes" placeholder="Min" required min="1" />
      <input type="text" id="video-search" placeholder="YouTube keywords" />
      <button type="button" id="search-video-btn">Search Videos</button>
      <select id="video-select">
        <option value="">-- No video selected --</option>
      </select>
      <button type="submit">Start</button>
    </form>
    <div id="timers-container"></div>
  `;

  const form      = document.getElementById('timer-form');
  const searchBtn = document.getElementById('search-video-btn');
  const select    = document.getElementById('video-select');
  const container = document.getElementById('timers-container');

  // Search YouTube via Invidious
  searchBtn.addEventListener('click', () => {
    const q = document.getElementById('video-search').value.trim();
    if (!q) return alert('Please enter keywords to search.');
    fetch(`${INVIDIOUS}/api/v1/search?query=${encodeURIComponent(q)}&type=video&limit=5`)
      .then(res => res.json())
      .then(list => {
        select.innerHTML = '<option value="">-- No video selected --</option>';
        list.forEach(item => {
          const opt = document.createElement('option');
          opt.value = item.videoId;
          opt.textContent = item.title;
          select.appendChild(opt);
        });
      })
      .catch(err => {
        console.error(err);
        alert('Video search failed—try again.');
      });
  });

  // Form submits a new timer
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('person-name').value.trim();
    const mins    = parseInt(document.getElementById('timer-minutes').value, 10);
    const videoId = select.value;
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

    // clear inputs
    form.reset();
    select.innerHTML = '<option value="">-- No video selected --</option>';

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
          // embed & autoplay if chosen
          if (videoId) {
            videoCont.innerHTML = `
              <iframe
                src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                allow="autoplay; encrypted-media"
              ></iframe>
            `;
            videoCont.style.display = 'block';
          }
          // (no popup)
        } else {
          remaining--;
          // color warnings
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

  function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  }
});
