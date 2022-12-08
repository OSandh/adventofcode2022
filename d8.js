const grid = require('fs').readFileSync('inputs/i8.txt', 'utf-8').split`\n`.reduce((treegrid, row) => {
	treegrid.push(
		row.split``.reduce((gridrow, c) => {
			gridrow.push(+c);
			return gridrow;
		}, [])
	);
	return treegrid;
}, []);

const north = (tree, ri, ci, scenic = false) => {
	let score = 0;
	let i = ri - 1;
	while (i >= 0) {
		let friend = grid[i--][ci];
		score++;
		if (tree <= friend) return scenic ? score : false;
	}
	return scenic ? score : true;
};
const south = (tree, ri, ci, scenic = false) => {
	let score = 0;
	let i = ri + 1;
	while (i < grid.length) {
		let friend = grid[i++][ci];
		score++;
		if (tree <= friend) return scenic ? score : false;
	}
	return scenic ? score : true;
};
const west = (tree, ri, ci, scenic = false) => {
	let score = 0;
	let i = ci - 1;
	while (i >= 0) {
		let friend = grid[ri][i--];
		score++;
		if (tree <= friend) return scenic ? score : false;
	}
	return scenic ? score : true;
};
const east = (tree, ri, ci, scenic = false) => {
	let score = 0;
	let i = ci + 1;
	while (i < grid.length) {
		let friend = grid[ri][i++];
		score++;
		if (tree <= friend) return scenic ? score : false;
	}
	return scenic ? score : true;
};

let visible = grid.length * 4 - 4;
const countVisible = (tree, ri, ci) => {
	if (north(tree, ri, ci) || south(tree, ri, ci) || west(tree, ri, ci) || east(tree, ri, ci)) visible++;
};
const getScenicScore = (tree, ri, ci) => {
	return north(tree, ri, ci, true) * south(tree, ri, ci, true) * west(tree, ri, ci, true) * east(tree, ri, ci, true);
};
let scenicScores = [];
for (const [ri, row] of Object.entries(grid)) {
	if (ri > 0 && ri < row.length - 1) {
		for (const [ci, tree] of Object.entries(row)) {
			if (ci > 0 && ci < row.length - 1) {
				countVisible(tree, +ri, +ci);
				scenicScores.push({ tree: `${ri},${ci}`, score: getScenicScore(tree, +ri, +ci) });
			}
		}
	}
}
console.log(visible, 'visible trees');
const { tree, score } = scenicScores.sort((a, b) => b.score - a.score)[0];
console.log(tree, 'is the most scenic tree with a score of', score);
