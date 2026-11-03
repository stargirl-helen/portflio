/**
 * Ambient Audio Controller (COS 106 Multimedia Requirement)
 * - Uses subtle background audio (assets/audio.ogg with assets/audio.mp3 fallback)
 * - Never autoplays (defaults off)
 * - Single accessible toggle button in the header navbar with emojis
 * - Remembers user's preference in localStorage
 */

(function initAmbientAudio() {
  const audio = document.getElementById('ambientAudio');
  const toggleBtn = document.getElementById('audioToggleBtn');
  if (!audio || !toggleBtn) return;

  const STORAGE_KEY = 'cos106_ambient_sound_state';
  const savedState = localStorage.getItem(STORAGE_KEY);

  // Set default audio attributes
  audio.loop = true;
  audio.volume = 0.25; // Gentle background volume

  function updateButton(isPlaying) {
    if (isPlaying) {
      toggleBtn.classList.add('is-active');
      toggleBtn.innerHTML = '🔊 Sound: On';
      toggleBtn.setAttribute('aria-label', 'Pause ambient background sound');
    } else {
      toggleBtn.classList.remove('is-active');
      toggleBtn.innerHTML = '🔇 Sound: Off';
      toggleBtn.setAttribute('aria-label', 'Play ambient background sound');
    }
  }

  // Restore state if previously enabled by user
  if (savedState === 'playing') {
    // Only attempt on explicit user interaction
    updateButton(false);
  } else {
    updateButton(false);
  }

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
