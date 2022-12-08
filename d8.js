const grid = require('fs').readFileSync('inputs/i8.txt', 'utf-8').split`\n`.reduce((treegrid, row) => {
	treegrid.push(
		row.split``.reduce((gridrow, c) => {
			gridrow.push(+c);
			return gridrow;
		}, [])
	);
	return treegrid;
}, []);

const north = (tree, ri, ci) => {
	let i = ri - 1;
	while (i >= 0) {
		if (tree <= grid[i--][ci]) return false;
	}
	return true;
};
const south = (tree, ri, ci) => {
	let i = ri + 1;
	while (i < grid.length) if (tree <= grid[i++][ci]) return false;
	return true;
};
const west = (tree, ri, ci) => {
	let i = ci - 1;
	while (i >= 0) if (tree <= grid[ri][i--]) return false;
	return true;
};
const east = (tree, ri, ci) => {
	let i = ci + 1;
	while (i < grid.length) {
		if (tree <= grid[ri][i++]) return false;
	}
	return true;
};

let visible = grid.length * 4 - 4;
const countVisible = (row, ri) => {
	for (const [ci, tree] of Object.entries(row)) {
		if (ci > 0 && ci < row.length - 1) {
			if (north(tree, +ri, +ci) || south(tree, +ri, +ci) || west(tree, +ri, +ci) || east(tree, +ri, +ci)) {
				visible++;
			}
		}
	}
};

for (const [ri, row] of Object.entries(grid)) {
	if (ri > 0 && ri < row.length - 1) {
		countVisible(row, ri);
	}
}
console.log(visible, 'visible trees');
