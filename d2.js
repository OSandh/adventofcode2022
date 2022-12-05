const fs = require('fs');
fs.readFile(__dirname + '/day2/2-input.txt', 'utf-8', (err, data) => {
	cheatTheElfs(data);
	cheatTheElfs(data, true);
});

const cheatTheElfs = (cheatSheet, part2 = false) => {
	let myTotalScore = 0;
	for (const round of cheatSheet.split('\n')) {
		moves = round.split(' ');
		const elfMove = moves[0];
		const myMove = part2 ? getMyMove(elfMove, moves[1].replace('\r', '')) : moves[1].replace('\r', '');
		// 0 if you lost, 3 if the round was a draw, and 6 if you won
		myTotalScore += playRound(elfMove, myMove) * 3 + { X: 1, Y: 2, Z: 3 }[myMove];
	}
	console.log('My total score:', myTotalScore,part2 ? '(part2)' : '' , 'forsenCD');
};

// X == lose, Y == draw, Z == win
const getMyMove = (elfMove, roundOutcome) => {
	const elfMoveCode = elfMove.charCodeAt(0);
	let returnCode = elfMoveCode;
	if (roundOutcome === 'X') returnCode = elfMoveCode + (['B', 'C'].includes(elfMove) ? -1 : 2);
	else if (roundOutcome === 'Z') returnCode = elfMoveCode + (['A', 'B'].includes(elfMove) ? 1 : -2);

	return String.fromCharCode(returnCode + 23);
};

// oponent:	A for Rock, B for Paper, and C for Scissors
// me: 		X for Rock, Y for Paper, and Z for Scissors
const playRound = (elfMove, myMove) => {
	elfMoveCode = elfMove.charCodeAt(0) + 23;
	myMoveCode = myMove.charCodeAt(0);

	const lossState = (elfMoveCode > myMoveCode && elfMoveCode != myMoveCode + 2) || elfMoveCode + 2 === myMoveCode;
	if (lossState) return 0;
	if (elfMoveCode === myMoveCode) return 1;
	return 2;
};
