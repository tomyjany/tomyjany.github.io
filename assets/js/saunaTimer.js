// saunaTimer.js
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('sauna-app');
  app.innerHTML = `
    <form id="timer-form">
      <input type="text" id="person-name" placeholder="Name" required />
      <input type="number" id="timer-minutes" placeholder="Min" required min="1" />
      <input type="url" id="timer-video" placeholder="YouTube URL (optional)" pattern="https?://.*" />
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
    const urlInput   = form.querySelector('#timer-video');
    const name       = nameInput.value.trim();
    const minutes    = parseInt(minsInput.value, 10);
    const videoUrl   = urlInput.value.trim();
    if (!name || isNaN(minutes) || minutes < 1) return;

    // create card
    const card = document.createElement('div');
    card.className = 'timer-card';
    card.innerHTML = `
      <h3>${name}</h3>
      <div class="time-display">${formatTime(minutes * 60)}</div>
      <button class="toggle-btn">⏸️</button>
      <button class="reset-btn">↻</button>
      <div class="video-container" style="display:none;"></div>
    `;
    container.appendChild(card);

    let remaining = minutes * 60;
    let interval  = null;
    let running   = false;

    const display      = card.querySelector('.time-display');
    const toggleBtn    = card.querySelector('.toggle-btn');
    const resetBtn     = card.querySelector('.reset-btn');
    const videoCont    = card.querySelector('.video-container');

    // start immediately
    startTimer();

    // play/pause toggle
    toggleBtn.addEventListener('click', () => {
      if (running) {
        clearInterval(interval);
        running = false;
        toggleBtn.textContent = '▶️';
      } else {
        startTimer();
      }
    });

    // reset
    resetBtn.addEventListener('click', () => {
      clearInterval(interval);
      remaining = minutes * 60;
      display.textContent = formatTime(remaining);
      toggleBtn.textContent = '⏸️';
      // hide any old iframe
      videoCont.innerHTML = '';
      videoCont.style.display = 'none';
      startTimer();
    });

    // clear form
    nameInput.value = '';
    minsInput.value = '';
    urlInput.value  = '';

    function startTimer() {
      if (running) return;
      running = true;
      toggleBtn.textContent = '⏸️';
      interval = setInterval(() => {
        if (remaining <= 0) {
          clearInterval(interval);
          running = false;
          toggleBtn.disabled = true;
          // show and autoplay YouTube if provided
          if (videoUrl) {
            const vidId = extractYouTubeID(videoUrl);
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

  function extractYouTubeID(url) {
    // handles youtu.be/ID or youtube.com/watch?v=ID
    const m = url.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_-]{11})/
    );
    return m ? m[1] : null;
  }
});
