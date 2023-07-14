/**
 * SELECTORS AND GLOBAL VARIABLES
 */
const gameArea = document.querySelector("main");
const gameAreaBounding = gameArea.getBoundingClientRect();
const modal = document.getElementById("end-game");
const startGameButton = document.getElementById("start-game");
const speed = 7;
const pressedKeys = {
	left: false,
	right: false,
};
let game = null;

startGameButton.addEventListener("click", startGame);

class Pallet {
	/**
	 * The Pallet class should have:
	 * a move method (which will receive a direction)
	 * a method to set the position of the pallet
	 * a way to verify if we can move left and if we can move right.
	 * The pallet might receive speed in the constructor
	 */
	constructor() {
		this.element = this.createPallet();
		this.x = gameArea.clientWidth / 2 - this.element.clientWidth / 2;

		this.setPosition();
	}

	createPallet() {
		const div = document.createElement("div");
		div.id = "pallet";
		gameArea.append(div);
		return div;
	}

	move(direction) {
		switch (direction) {
			case "right":
				if (this.canMoveRight()) {
					this.x += speed;
				}
				break;
			case "left":
				if (this.canMoveLeft()) {
					this.x += speed * -1;
				}
				break;
		}
		this.setPosition();
	}

	canMoveRight() {
		const palletBounding = this.element.getBoundingClientRect();
		if (palletBounding.right < gameAreaBounding.right) {
			return true;
		}
		return false;
	}
	canMoveLeft() {
		const palletBounding = this.element.getBoundingClientRect();
		if (palletBounding.left > gameAreaBounding.left) {
			return true;
		}
		return false;
	}

	setPosition() {
		this.element.style.left = `${this.x}px`;
	}
}

class Ball {
	/**
	 * The Ball should have a method to move
	 * By doing some research we would be able to give it a random angle.
	 * It should have a speed, a position, a direction and a way to set it's position in css
	 */
	constructor() {
		this.element = this.createBall();
		this.x = gameArea.clientWidth / 2 - this.element.clientWidth / 2;
		this.y = gameArea.clientHeight / 2 - this.element.clientHeight / 2;
		this.direction = { x: 1, y: 1 };
		this.setPosition();
	}

	createBall() {
		const div = document.createElement("div");
		div.classList.add("ball");
		gameArea.append(div);
		return div;
	}

	setPosition() {
		this.element.style.left = `${this.x}px`;
		this.element.style.top = `${this.y}px`;
	}

	move() {
		this.x += 4 * this.direction.x;
		this.y += 4 * this.direction.y;
		const ballBounding = this.element.getBoundingClientRect();
		if (ballBounding.right >= gameAreaBounding.right) {
			// Now we" should move to the left
			this.direction.x = -1;
		}
		if (ballBounding.left <= gameAreaBounding.left) {
			this.direction.x = 1;
		}
		// // This should be removed at some point
		// if (ballBounding.bottom >= gameAreaBounding.bottom) {
		// 	this.direction.y = -1
		// }
		if (ballBounding.top <= gameAreaBounding.top) {
			this.direction.y = 1;
		}

		// console.table({
		// 	rightWall: gameAreaBounding.right,
		// 	rightOfTheBall: ballBounding.right,
		// })
		this.setPosition();
	}

	// pleaseBounce() {
	// 	// Do the bounce on the wall.

	// }
}

class Game {
	/**
	 * The game class will create the Pallet and the Ball
	 * It should check the collisions between the pallet and the ball
	 * animate the ball and the pallet
	 */
	constructor() {
		this.pallet = new Pallet();
		this.ball = new Ball();
		this.intervalId = null;
		this.animate();
	}

	animate() {
		this.intervalId = setInterval(() => {
			if (this.collisionDetection()) {
				this.ball.direction.y = -1;
			}

			if (pressedKeys.right) {
				this.pallet.move("right");
			}
			if (pressedKeys.left) {
				this.pallet.move("left");
			}

			this.ball.move();
			if (this.theBallTouchedTheGround()) {
				this.gameOver();
			}
		}, 1000 / 60);
	}

	gameOver() {
		clearInterval(this.intervalId);
		modal.showModal();
	}
	theBallTouchedTheGround() {
		const ballBounding = this.ball.element.getBoundingClientRect();
		return ballBounding.bottom >= gameAreaBounding.bottom;
	}

	collisionDetection() {
		const ballBounding = this.ball.element.getBoundingClientRect();
		const palletBounding = this.pallet.element.getBoundingClientRect();
		const isInX =
			ballBounding.left < palletBounding.right &&
			ballBounding.right > palletBounding.left;
		const isInY =
			ballBounding.bottom > palletBounding.top &&
			ballBounding.top < palletBounding.bottom;
		console.log(isInX && isInY);
		return isInX && isInY;
	}
}

window.addEventListener("keydown", handlePressedKeys);
window.addEventListener("keyup", handleReleasedKeys);

function startGame() {
	new Game();
}

function handlePressedKeys(event) {
	switch (event.code) {
		case "ArrowLeft":
			pressedKeys.left = true;
			break;
		case "ArrowRight":
			pressedKeys.right = true;
			break;
	}
}
function handleReleasedKeys(event) {
	switch (event.code) {
		case "ArrowLeft":
			pressedKeys.left = false;
			break;
		case "ArrowRight":
			pressedKeys.right = false;
			break;
	}
}
