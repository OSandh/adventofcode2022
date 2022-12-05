const { execSync } = require('child_process');

exports.printMatrix = (matrix, stacksCount) => {
	execSync('sleep 0.005');
	console.clear();
	for (const row of matrix) {
		if (row.find((c) => c !== ' ')) {
			let crates = row.map((c) => c + ' ').join``;
			console.log(crates);
		}
	}
	console.log('');
	let n = 1;
	let numRow = '';
	while (n <= stacksCount) numRow += n++ + ' ';
	console.log(numRow, '\n');
};
