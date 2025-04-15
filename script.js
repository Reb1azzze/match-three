import { MatchThree } from "./match-three.js";
var WebApp = window.Telegram.WebApp;

WebApp.sendData("wioerhioehrgoiherg");
WebApp.expand();

let duration = 12;
let gameInstance;
const timerElement = document.getElementById('timer')

logToScreen("initData: " + JSON.stringify(Telegram.WebApp.initDataUnsafe));

function startGame() {
	gameInstance = new MatchThree(8, 8, 7);
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

function logToScreen(message) {
	const logDiv = document.querySelector('#log');
	if (logDiv) {
		logDiv.innerText += `\n${message}`;
	}
}


updateTimer();
const timerInterval = setInterval(updateTimer, 1000);
startGame();
