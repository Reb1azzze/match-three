import { Game } from "./game.js";
import { Grid } from "./grid.js";

const PRIZES = {
  1: "🎁 Сертификат на 500₽",
  2: "🎁 Сертификат на 1000₽",
  3: "🎁 Сертификат на 1500₽",
  4: "🎁 Сертификат на 2000₽",
  5: "🎁 Сертификат на 2500₽",
  6: "🎁 Сертификат на 3000₽",
  7: "🎁 Сертификат на 3500₽",
  8: "🎁 Сертификат на 4000₽",
  9: "🎁 Сертификат на 4500₽",
  10: "🏆 Сертификат на 5000₽ — ты чемпион!"
};

export class MatchThree {
  wrap = document.querySelector(".wrap");

  constructor(rowsCount, columnsCount, tilesCount) {
    this.game = new Game(rowsCount, columnsCount, tilesCount);
    this.grid = new Grid(this.wrap, this.game.matrix);
    this.wrap.addEventListener("swap", (event) => {
      const firstElementPosition = event.detail.firstElementPosition;
      const secondElementPosition = event.detail.secondElementPosition;
      this.swap(firstElementPosition, secondElementPosition);
    });
  }

  async swap(firstElementPosition, secondElementPosition) {
    const swapStates = this.game.swap(firstElementPosition, secondElementPosition);
    await this.grid.swap(firstElementPosition, secondElementPosition, swapStates);
    this.updateScore();
  }

  updateScore() {
    document.querySelector(".score").innerHTML = this.game.score;
  }

  stopGame() {
    this.isGameOver = true;
    const board = document.querySelector('.wrap');
    if (board) {
      board.style.pointerEvents = 'none';
      board.style.opacity = '0.5';
    }
    const score = this.game.score;
    const level = Math.floor(score / 10);
    const prize = PRIZES[level] || "Попробуй ещё раз, и ты обязательно выиграешь!";

    document.getElementById('finalScore').textContent = `Вы набрали ${score} очков`;
    document.getElementById('finalPrize').textContent = `Ваш приз: ${prize}`;

    const endOverlay = document.getElementById('endOverlay');
    endOverlay.style.display = 'flex';

    // Убираем отправку данных в Telegram
    // Telegram.WebApp.sendData(JSON.stringify({ score: this.game.score }));
  }
}
