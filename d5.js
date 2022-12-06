const data = require('fs').readFileSync('inputs/i5.txt', 'utf-8').split`\n`.map((row) => row.replace(/[\[\]']+/g, ' '));

/** PARSE */
const keyRowIndex = data.findIndex((row) => row.includes(' 1   2'));
const stacks = data.splice(0, keyRowIndex).reduce((stacks, row) => {
	row
		.substring(1, row.length - 1)
		.replaceAll('    ', '   !')
		.replaceAll('   ', '').split``.map((c, index) => {
		if (!stacks[index + 1]) stacks[index + 1] = [];
		if (c !== '!') stacks[index + 1].unshift(c);
	});
	return stacks;
}, {});
const moves = data.splice(2, data.length).reduce((moves, move) => {
	moves.push(
		move.split` `.reduce((inputs, inp) => {
			if (!isNaN(inp)) inputs.push(inp);
			return inputs;
		}, [])
	);
	return moves;
}, []);

/** stack fixer */
const fixStacks = (stacks, part2 = false) => {
	for (const [amount, from, to] of moves) {
		let i = 0;
		let toMove = [];
		while (i++ < amount) {
			let index = stacks[from].length - 1;
			toMove.push(stacks[from][index]);
			stacks[from] = stacks[from].slice(0, index);
		}
		if (part2) toMove.reverse();
		stacks[to].push(...toMove);
	}
	return stacks;
};

/** for clean result output */
const getTopCrates = (stacks) => {
	return Object.values(stacks).reduce((output, stack) => {
		output += stack[stack.length - 1];
		return output;
	}, '');
};

const part1Stacks = fixStacks(JSON.parse(JSON.stringify(stacks)));
console.log('top crates (part1):', getTopCrates(part1Stacks));

const part2Stacks = fixStacks(stacks, true);
console.log('top crates (part2):', getTopCrates(part2Stacks));
