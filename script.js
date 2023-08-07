// Your script here.
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Function to populate the voice dropdown with available voices
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Function to set the voice based on the selected option in the dropdown
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }

  // Function to start speaking
  function startSpeaking() {
    speechSynthesis.cancel(); // Stop any ongoing speech
    toggle();
    speechSynthesis.speak(msg);
  }

  // Function to stop speaking
  function stopSpeaking() {
    speechSynthesis.cancel();
    toggle();
  }

  // Function to toggle the disabled state of buttons and dropdown
  function toggle() {
    options.forEach(option => (option.disabled = !option.disabled));
    speakButton.disabled = !speakButton.disabled;
    stopButton.disabled = !stopButton.disabled;
  }

  // Event listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  speakButton.addEventListener('click', startSpeaking);
  stopButton.addEventListener('click', stopSpeaking);
