const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");
const startBtn = document.getElementById("startbtn");
const resumeBtn = document.getElementById("resumebtn");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 1;
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}
function stop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00:00";
    lapsContainer.innerHTML = "";
    lapCount = 1;
}

function lap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapElement = document.createElement("div");
        lapElement.classList.add("lap-time");
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsContainer.insertBefore(lapElement, lapsContainer.firstChild);
        lapCount++;
    }
}
function resume() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}
function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    milliseconds = milliseconds.toString().padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}