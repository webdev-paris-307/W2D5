import MemoryGame from "./memory.js";

const pairsClickedElement = document.getElementById("pairs-clicked");
const pairsGuessedElement = document.getElementById("pairs-guessed");
const dialog = document.querySelector("dialog");

const resetButton = dialog.querySelector("button");

const cards = [
	{ name: "aquaman", img: "aquaman.jpg" },
	{ name: "batman", img: "batman.jpg" },
	{ name: "captain america", img: "captain-america.jpg" },
	{ name: "fantastic four", img: "fantastic-four.jpg" },
	{ name: "flash", img: "flash.jpg" },
	{ name: "green arrow", img: "green-arrow.jpg" },
	{ name: "green lantern", img: "green-lantern.jpg" },
	{ name: "ironman", img: "ironman.jpg" },
	{ name: "spiderman", img: "spiderman.jpg" },
	{ name: "superman", img: "superman.jpg" },
	{ name: "the avengers", img: "the-avengers.jpg" },
	{ name: "thor", img: "thor.jpg" },
	{ name: "aquaman", img: "aquaman.jpg" },
	{ name: "batman", img: "batman.jpg" },
	{ name: "captain america", img: "captain-america.jpg" },
	{ name: "fantastic four", img: "fantastic-four.jpg" },
	{ name: "flash", img: "flash.jpg" },
	{ name: "green arrow", img: "green-arrow.jpg" },
	{ name: "green lantern", img: "green-lantern.jpg" },
	{ name: "ironman", img: "ironman.jpg" },
	{ name: "spiderman", img: "spiderman.jpg" },
	{ name: "superman", img: "superman.jpg" },
	{ name: "the avengers", img: "the-avengers.jpg" },
	{ name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);

memoryGame.shuffleCards();

function generateCards() {
	let html = "";
	memoryGame.cards.forEach((pic) => {
		html += `
        <div class="card" data-card-name="${pic.name}">
          <div class="back" name="${pic.img}"></div>
          <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
        </div>
      `;
	});

	// Add all the divs to the HTML
	document.querySelector("#memory-board").innerHTML = html;
}
generateCards();
// Bind the click event of each element to a function
document.querySelectorAll(".card").forEach((card) => {
	card.addEventListener("click", () => {
		// TODO: write some code here
		// console.log(card);
		// console.log(memoryGame.pickedCards);
		memoryGame.pickedCards.push(card);
		card.classList.add("turned");
		if (memoryGame.pickedCards.length === 2) {
			const firstCard = memoryGame.pickedCards[0];
			const secondCard = memoryGame.pickedCards[1];
			const firstCardName = firstCard.dataset.cardName;
			const secondCardName = secondCard.dataset.cardName;
			// console.log(firstCardName, secondCardName);
			const cardsArePair = memoryGame.checkIfPair(
				firstCardName,
				secondCardName
			);

			if (!cardsArePair) {
				setTimeout(() => {
					// console.log("inside of timeout: ", memoryGame.pickedCards);
					firstCard.classList.remove("turned");
					secondCard.classList.remove("turned");
				}, 1000);
			}
			memoryGame.pickedCards = [];

			//console.log(memoryGame.pairsClicked, memoryGame.pairsGuessed);
			pairsClickedElement.textContent = memoryGame.pairsClicked;
			pairsGuessedElement.textContent = memoryGame.pairsGuessed;
			if (memoryGame.checkIfFinished()) {
				setTimeout(() => {
					dialog.showModal();
				}, 500);
			}
		}
	});
});

resetButton.addEventListener("click", () => {
	dialog.close();
	memoryGame.pairsClicked = 0;
	memoryGame.pairsGuessed = 0;
	memoryGame.pickedCards = [];
	document
		.querySelectorAll(".card")
		.forEach((card) => card.classList.remove("turned"));
	pairsClickedElement.textContent = memoryGame.pairsClicked;
	pairsGuessedElement.textContent = memoryGame.pairsGuessed;
	memoryGame.shuffleCards();
	generateCards();
});
