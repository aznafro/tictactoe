function Player(name, scoreEl) {
	let score = 0;

	let _getScore = () => {
		return score;
	}

	let addScore = () => {
		score++;
	}

	let getName = () => {
		return name;
	}

	let setScore = () => {
		scoreEl.textContent = _getScore();
	}

	return {
		addScore,
		getName,
		setScore
	}
}

function Piece(piece) {
	let setMarker = marker => {
		if(!getMarker()) {
			piece.textContent = marker;
			return true;
		}
		return false;
	}

	let getMarker = () => {
		return piece.textContent;
	}

	let reset = () => {
		piece.textContent = "";
	}

	return {
		setMarker, getMarker, reset
	}
}

// init game
(function() {
	let gameboard = [];
	let player1Turn = true;
	let pieces = document.querySelectorAll(".piece");
	let msgContainer = document.querySelector(".message-container");
	let msgHeader = document.querySelector(".message__header");
	let msgText = document.querySelector(".message__text");
	let playAgain = document.querySelector(".play-again");
	let container = document.querySelector(".container");

	let player1 = Player("Player 1", document.querySelector(".player-1 .score"));
	let player2 = Player("Player 2", document.querySelector(".player-2 .score"));

	playAgain.addEventListener("click", function() {
		reset();
	});

	function reset() {
		container.classList.remove("blur");
		msgContainer.classList.add("hidden");
		gameboard.forEach(function(piece) {
			piece.reset();
		});
		init();
	}

	function boardIsFull() {
		for(let i=0; i < gameboard.length; i++) {
			if(!gameboard[i].getMarker()) {
				return false;
			}
		}
		return true;
	}

	function gameOver() {
		let one = gameboard[0].getMarker();
		let two = gameboard[1].getMarker();
		let three = gameboard[2].getMarker();
		let four = gameboard[3].getMarker();
		let five = gameboard[4].getMarker();
		let six = gameboard[5].getMarker();
		let seven = gameboard[6].getMarker();
		let eight = gameboard[7].getMarker();
		let nine = gameboard[8].getMarker();

		// horizontal
		if((one && (one == two && two == three)) ||
			(four && (four == five && five == six)) ||
			(seven && (seven == eight && eight == nine))) {
			
			return true;
		}

		// vertical
		else if((one && (one == four && four == seven)) ||
				(two && (two == five && five == eight)) ||
				(three && (three == six && six == nine))) {
			return true;
		}

		// diagonal
		else if((one && (one == five && five == nine)) ||
				(three && (three == five && five == seven))) {
			return true;
		}

		return false;
	}

	function showMessage(header, text) {
		msgHeader.textContent = header;
		msgText.textContent = text;
		msgContainer.classList.remove("hidden");
		container.classList.add("blur");
	}

	function init() {
		for(let i=0; i < pieces.length; i++) {
			let piece = pieces[i];

			piece.addEventListener("click", function() {

				let success = false;
				if(!gameOver()) {
					success = gameboard[i].setMarker(player1Turn ? "X" : "O");
				}

				if(success) {
					// someone won
					if(gameOver()) {
						let winner = "";
						if(player1Turn) {
							winner = player1.getName();
							player1.addScore();
							player1.setScore();
						} else {
							winner = player2.getName();
							player2.addScore();
							player2.setScore();
						}

						showMessage(winner, "Won the Game!");

					// tie
					} else if(boardIsFull()) {
						showMessage("Cat's Game", "It's a tie!");

					// games not over yet
					} else {
						player1Turn = player1Turn ? false : true;
					}
				}
			});

			gameboard.push(Piece(piece));
		}
	}

	init();
})();