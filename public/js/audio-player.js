/**
 * Ambient Audio Controller (COS 106 Multimedia Requirement)
 * - Uses subtle background audio (assets/audio.ogg with assets/audio.mp3 fallback)
 * - Never autoplays (defaults off)
 * - Single accessible toggle button in the header navbar
 * - Remembers user's preference in localStorage
 */

(function initAmbientAudio() {
  const audio = document.getElementById('ambientAudio');
  const toggleBtn = document.getElementById('audioToggleBtn');
  if (!audio || !toggleBtn) return;

  const STORAGE_KEY = 'cos106_ambient_sound_state';
  const savedState = localStorage.getItem(STORAGE_KEY);

  audio.loop = true;
  audio.volume = 0.25;

  function updateButton(isPlaying) {
    if (isPlaying) {
      toggleBtn.classList.add('is-active');
      toggleBtn.textContent = 'Sound: On';
      toggleBtn.setAttribute('aria-label', 'Pause ambient background sound');
    } else {
      toggleBtn.classList.remove('is-active');
      toggleBtn.textContent = 'Sound: Off';
      toggleBtn.setAttribute('aria-label', 'Play ambient background sound');
    }
  }

  updateButton(false);

  toggleBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        updateButton(true);
        localStorage.setItem(STORAGE_KEY, 'playing');
      }).catch(err => {
        console.warn('Audio play request blocked or waiting for interaction:', err);
      });
    } else {
      audio.pause();
      updateButton(false);
      localStorage.setItem(STORAGE_KEY, 'paused');
    }
  });
})();
