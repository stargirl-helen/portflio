/**
 * COS 106 Audio Intro Player Controller
 * Handles audio playback, controls, scrubbing, visualizer, transcript drawer,
 * and user preferences in localStorage.
 * Strictly avoids autoplay (defaults to stopped & unmuted/muted per user pref).
 */

(function initAudioPlayer() {
  const audio = document.getElementById('voiceIntroAudio');
  if (!audio) return;

  const playBtn = document.getElementById('audioPlayBtn');
  const muteBtn = document.getElementById('audioMuteBtn');
  const timeline = document.getElementById('audioTimeline');
  const timeCurrent = document.getElementById('audioTimeCurrent');
  const timeDuration = document.getElementById('audioTimeDuration');
  const consoleCard = document.getElementById('audioConsoleCard');
  const transcriptToggle = document.getElementById('audioTranscriptToggle');
  const transcriptBox = document.getElementById('audioTranscriptBox');

  // Format seconds to mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Load saved preferences
  const savedMuted = localStorage.getItem('cos106_audio_muted');
  if (savedMuted === 'true') {
    audio.muted = true;
    updateMuteUI(true);
  } else {
    audio.muted = false;
    updateMuteUI(false);
  }

  // Play / Pause toggle
  function togglePlay() {
    if (audio.paused || audio.ended) {
      audio.play().then(() => {
        updatePlayUI(true);
      }).catch(err => {
        console.warn('Playback error / browser interaction required:', err);
      });
    } else {
      audio.pause();
      updatePlayUI(false);
    }
  }

  function updatePlayUI(isPlaying) {
    if (!playBtn) return;
    if (isPlaying) {
      playBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      `;
      playBtn.setAttribute('aria-label', 'Pause voice introduction');
      playBtn.title = 'Pause Voice Intro';
      if (consoleCard) consoleCard.classList.add('is-playing');
    } else {
      playBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
      playBtn.setAttribute('aria-label', 'Play voice introduction');
      playBtn.title = 'Play Voice Intro';
      if (consoleCard) consoleCard.classList.remove('is-playing');
    }
  }

  // Mute / Unmute toggle
  function toggleMute() {
    audio.muted = !audio.muted;
    localStorage.setItem('cos106_audio_muted', audio.muted.toString());
    updateMuteUI(audio.muted);
  }

  function updateMuteUI(isMuted) {
    if (!muteBtn) return;
    if (isMuted) {
      muteBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
        </svg>
      `;
      muteBtn.setAttribute('aria-label', 'Unmute audio');
      muteBtn.title = 'Unmute';
    } else {
      muteBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      `;
      muteBtn.setAttribute('aria-label', 'Mute audio');
      muteBtn.title = 'Mute';
    }
  }

  // Update time and timeline progress
  audio.addEventListener('timeupdate', () => {
    if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
    if (timeline && audio.duration) {
      timeline.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    if (timeDuration) timeDuration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    updatePlayUI(false);
    if (timeline) timeline.value = 0;
    if (timeCurrent) timeCurrent.textContent = '0:00';
  });

  // Timeline scrubber
  if (timeline) {
    timeline.addEventListener('input', (e) => {
      if (audio.duration) {
        audio.currentTime = (e.target.value / 100) * audio.duration;
      }
    });
  }

  // Event Listeners
  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (muteBtn) muteBtn.addEventListener('click', toggleMute);

  // Keyboard navigation
  if (playBtn) {
    playBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        togglePlay();
      }
    });
  }

  // Transcript drawer toggle
  if (transcriptToggle && transcriptBox) {
    transcriptToggle.addEventListener('click', () => {
      const isOpen = transcriptBox.classList.toggle('is-open');
      transcriptToggle.textContent = isOpen ? '▲ Hide Transcript' : '▼ Read Transcript';
      transcriptToggle.setAttribute('aria-expanded', isOpen.toString());
    });
  }
})();
