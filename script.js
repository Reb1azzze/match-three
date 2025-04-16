import { MatchThree } from "./match-three.js";

let duration = 12;
let gameInstance;
const timerElement = document.getElementById('timer');
let tg = window.Telegram.WebApp;
tg.expand();

function startGame() {
	gameInstance = new MatchThree(8, 8, 7);
	updateTimer();
	timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
	const minutes = Math.floor(duration / 60);
	const seconds = duration % 60;

	timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

	if (duration > 0) {
		duration--;
	} else {
		clearInterval(timerInterval);
		timerElement.textContent = "Время вышло!";
		gameInstance.stopGame();
	}
}

let timerInterval;

document.getElementById("startBtn").addEventListener("click", () => {
	document.getElementById("startOverlay").style.display = "none";
	startGame();
});