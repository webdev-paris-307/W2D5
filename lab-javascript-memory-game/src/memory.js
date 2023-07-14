export default class MemoryGame {
	constructor(cards) {
		this.cards = cards;
		this.pickedCards = [];
		this.pairsClicked = 0;
		this.pairsGuessed = 0;
		// add the rest of the class properties here
	}

	shuffleCards() {
		// ... write your code here
		if (!this.cards) {
			return undefined;
		}
		this.cards.sort(() => Math.random() - 0.5);
		return this.cards;
	}

	checkIfPair(card1, card2) {
		// ... write your code here
		// console.log(card1 // 'Batman', card2 // 'Thor')
		this.pairsClicked++;
		if (card1 === card2) {
			this.pairsGuessed++;
			return true;
		}
		return false;
	}

	checkIfFinished() {
		return this.pairsGuessed === this.cards.length / 2;
		// if (this.pairsGuessed === this.cards.length / 2) {
		// 	return true
		// }
		// return false
		// ... write your code here
	}
}
