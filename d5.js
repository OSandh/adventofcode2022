const data = require('fs').readFileSync('inputs/i5.txt', 'utf-8').split`\n`.map((row) => row.replace(/[\[\]']+/g, ' '));

const keyRowIndex = data.findIndex((row) => {
	if (row.includes(' 1   2')) return row;
});
let stacksCount = data[keyRowIndex].replaceAll(' ', '').split``.length;
const print = (matrix) => {
	for (const row of matrix) console.log(row.map((c) => c + ' ').join``);
	console.log('');
	let n = 1;
	let numRow = '';
	while (n <= stacksCount) numRow += n++ + ' ';
	console.log(numRow, '\n');
};
const getStackMatrix = (rows) => {
	return rows.reduce((matrix, row) => {
		let temp = [];
		row.substring(1, row.length - 1).split``.map((c, index) => {
			if (index % 4 === 0) temp.push(c);
		});
		matrix.push(temp);
		return matrix;
	}, []);
};
const matrix = getStackMatrix(data.splice(0, keyRowIndex));

const fixStacks = (moves, matrix) => {
	console.log(moves, '\n');
	print(matrix);
	for (const move of moves) {
		const action = move.split` `.reduce((inputs, inp) => {
			if (!isNaN(inp)) inputs.push(inp);
			return inputs;
		}, []);
		console.log(move, '\n');
		const amount = action[0];
		const from = action[1] - 1;
		const to = action[2] - 1;
		let i = 0;
		while (i++ < amount) {
			let crate = '';
			for (const row of matrix) {
				if (row[from] !== ' ') {
					crate = row[from];
					row[from] = ' ';
					break;
				}
			}
			let placeAt = null;
			for (const [index, row] of Object.entries(matrix)) {
				if (row[to] === ' ') placeAt = index;
			}
			if (placeAt === null) {
				let newRow = [];
				let count = 0;
				while (count++ < stacksCount) newRow.push(' ');

				matrix.unshift(newRow);
				placeAt = 0;
			}
			matrix[placeAt][to] = crate;
		}
		print(matrix);
	}
	return matrix;
};
const stacksFixed = fixStacks(data.splice(2, data.length), matrix);
console.log('FINAL\n', stacksFixed);
print(stacksFixed);

const printTopCrates = (matrix) => {
	let output = '';
	let i = 0;
	while (i < stacksCount) {
		for (const row of matrix) {
			if (row[i] !== ' ') {
				output += row[i++] + '';
				break;
			}
		}
	}
	console.log('top crates:', output);
};
printTopCrates(stacksFixed);
