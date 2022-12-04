const fs = require('fs');
fs.readFile('input.txt', 'utf-8', (err, data) => {
	cheatTheElfs(data);
});

const cheatTheElfs = (cheatSheet) => {
	let myTotalScore = 0;
	for (const round of cheatSheet.split('\n')) {
		moves = round.split(' ');
		const elfMove = moves[0];
		const myMove = getMyMove(elfMove, moves[1].replace('\r', ''));
		// 0 if you lost, 3 if the round was a draw, and 6 if you won
		myTotalScore += playRound(elfMove, myMove) * 3 + getMoveScore(myMove);
	}
	console.log('My total score:', myTotalScore, 'forsenCD');
};

// X == lose, Y == draw, Z == win
const getMyMove = (elfMove, rountOutcome) => {
	const elfMoveCode = elfMove.charCodeAt(0);
	let returnCode = elfMoveCode;
	if (rountOutcome == 'X') returnCode = elfMoveCode + (['B', 'C'].includes(elfMove) ? -1 : 2);
	else if (rountOutcome == 'Z') returnCode = elfMoveCode + (['A', 'B'].includes(elfMove) ? 1 : -2);

	return String.fromCharCode(returnCode + 23);
};
// oponent:	A for Rock, B for Paper, and C for Scissors
// me: 		X for Rock, Y for Paper, and Z for Scissors
const playRound = (elfMove, myMove) => {
	elfMove = elfMove.charCodeAt(0) + 23;
	myMove = myMove.charCodeAt(0);
	const lossState = (elfMove > myMove && elfMove != myMove + 2) || elfMove + 2 == myMove;
	if (lossState) return 0;
	if (elfMove == myMove) return 1;
	return 2;
};

// scoring: 1 for Rock, 2 for Paper, and 3 for Scissors
const getMoveScore = (move) => {
	if (['A', 'X'].includes(move)) return 1;
	if (['B', 'Y'].includes(move)) return 2;
	if (['C', 'Z'].includes(move)) return 3;
};
