let pomodoroDuration = 25 * 60; 
let startTime = null;
let timerInterval = null;
let isRunning = false;
let elapsed = 0;
let sessionCount = 0;

const timerDisplay = document.getElementById('timer');
const sessionsDisplay = document.getElementById('sessions');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const audio = document.getElementById('audio'); // 

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateTimer() {
  const now = Date.now();
  const timePassed = Math.floor((now - startTime) / 1000) + elapsed;
  const timeLeft = Math.max(pomodoroDuration - timePassed, 0);
  timerDisplay.textContent = formatTime(timeLeft);

  if (timeLeft == 0) {
    clearInterval(timerInterval);
    isRunning = false;
    elapsed = 0;
    sessionCount++;
    sessionsDisplay.textContent = sessionCount; 
    if (audio) {
      audio.play(); 
    }
    alert("Pomodoro session complete!");
  }
}

startBtn.onclick = () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    isRunning = true;
  }
};

stopBtn.onclick = () => {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsed += Math.floor((Date.now() - startTime) / 1000);
    isRunning = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsed = 0;
  timerDisplay.textContent = formatTime(pomodoroDuration);
};

timerDisplay.textContent = formatTime(pomodoroDuration);
