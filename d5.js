try {
	if (process.argv[2] === 'show') {
		var { printMatrix } = require('./rnd');
		var showMe = true;
	}
} catch {}
const data = require('fs').readFileSync('inputs/i5.txt', 'utf-8').split`\n`.map((row) => row.replace(/[\[\]']+/g, ' '));

const keyRowIndex = data.findIndex((row) => row.includes(' 1   2'));
const matrix = data.splice(0, keyRowIndex).reduce((matrix, row) => {
	let temp = [];
	row.substring(1, row.length - 1).split``.map((c, index) => {
		if (index % 4 === 0) temp.push(c);
	});
	matrix.push(temp);
	return matrix;
}, []);
let stacksCount = matrix[0].length;

const fixStacks = (moves, matrix) => {
	for (const move of moves) {
		const [amount, from, to] = move.split` `
			.reduce((inputs, inp) => {
				if (!isNaN(inp)) inputs.push(inp);
				return inputs;
			}, [])
			.map((a, index) => (index > 0 ? a - 1 : a));

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
		if (showMe) printMatrix(matrix, stacksCount);
	}
	return matrix;
};

const getTopCrates = (matrix) => {
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
	return output;
};

const partOne = (matrix) => {
	const stacksFixed = fixStacks(data.splice(2, data.length), matrix);
	console.log('top crates:', getTopCrates(stacksFixed));
};

partOne(matrix);
