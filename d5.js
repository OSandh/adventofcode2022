try {
	if (process.argv[2] === 'show') {
		var { printMatrix } = require('./rnd');
		var showMe = true;
	}
} catch {}
const data = require('fs').readFileSync('inputs/i5.txt', 'utf-8').split`\n`.map((row) => row.replace(/[\[\]']+/g, ' '));

const keyRowIndex = data.findIndex((row) => row.includes(' 1   2'));
const matrix = data.splice(0, keyRowIndex).reduce((matrix, row) => {
	row
		.substring(1, row.length - 1)
		.replaceAll('    ', '   !')
		.replaceAll('   ', '').split``.map((c, index) => {
		if (!matrix[index + 1]) matrix[index + 1] = [];
		if (c !== '!') matrix[index + 1].unshift(c);
	});
	return matrix;
}, {});
let stacksCount = matrix[1].length;

const fixStacksPartOne = (moves, ogMatrix) => {
	let matrix = JSON.parse(JSON.stringify(ogMatrix));
	for (const move of moves) {
		const [amount, from, to] = move.split` `.reduce((inputs, inp) => {
			if (!isNaN(inp)) inputs.push(inp);
			return inputs;
		}, []);

		let i = 0;
		while (i++ < amount) {
			let index = matrix[from].length - 1;
			matrix[to].push(matrix[from][index]);
			matrix[from] = matrix[from].slice(0, index);
		}
		if (showMe) printMatrix(matrix, stacksCount);
	}
	return matrix;
};

const fixStacksPartTwo = (moves, matrix) => {
	printMatrix(matrix, stacksCount, false);
	for (const move of moves) {
		console.log(move, '\n');
		let subStack = {};
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
			const indexes = [];
			for (const row of matrix) {
				indexes.push(row[to]);
			}
			for (const [index, c] of Object.entries(indexes.reverse())) {
				const revIndex = indexes.length - index - 1;
				console.log(c, revIndex, subStack?.[revIndex]);
				if (c === ' ' && !subStack?.[revIndex]) {
					placeAt = revIndex;
					break;
				}
				// if (revIndex === 0 && subStack?.[revIndex]) {
				// 	subStack = Object.entries(subStack).reduce((stack, [index, c]) => {
				// 		stack[index + 1] = c;
				// 		return stack;
				// 	}, {});
				// }
			}
			// for (const [index, row] of Object.entries(matrix)) {
			// 	console.log(row[to], index, subStack?.[index]);
			// 	if (row[to] === ' ' && !subStack?.[index]) {
			// 		placeAt = index;
			// 		break;
			// 	}
			// }
			if (placeAt === null) {
				let newRow = [];
				let count = 0;
				while (count++ < stacksCount) newRow.push(' ');

				matrix.unshift(newRow);
				placeAt = i - 1;
			}
			console.log('adding', placeAt, crate, '\n');
			subStack[placeAt] = crate;
		}
		console.log(Object.entries(subStack).reverse());
		for (const [placeAt, crate] of Object.entries(subStack).reverse()) {
			matrix[placeAt][to] = crate;
		}

		if (showMe) printMatrix(matrix, stacksCount, false);
	}
	return matrix;
};

const getTopCrates = (matrix) => {
	let output = '';
	let i = 0;
	for (const stack of Object.values(matrix)) {
		output += stack[stack.length - 1];
	}
	return output;
};

const partOne = (matrix) => {
	const stacksFixed = fixStacksPartOne(data.splice(2, data.length), matrix);
	console.log('top crates (part1):', getTopCrates(stacksFixed));
};

const partTwo = (matrix) => {
	const stacksFixed = fixStacksPartTwo(data.splice(2, data.length), matrix);
	console.log('top crates (part2):', getTopCrates(stacksFixed));
};

partOne(matrix);
//partTwo(matrix);
