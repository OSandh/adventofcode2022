const grid = require('fs').readFileSync('inputs/i8.txt', 'utf-8').split`\n`.reduce((tg, row) => {
	tg.push(
		row.split``.reduce((gr, c) => {
			gr.push(+c);
			return gr;
		}, [])
	);
	return tg;
}, []);

const nswe = (tree, row, col, y = true, pos = true, scenic = false) => {
	let score = 0;
	let incr = pos ? 1 : -1;
	let ci = col + (y ? 0 : incr);
	let ri = row + (y ? incr : 0);
	while (eval((y ? ri : ci) + (pos ? '<' : '>=') + (pos ? grid.length : 0))) {
		score++;
		if (tree <= grid[ri][ci]) return scenic ? score : false;
		ci += y ? 0 : incr;
		ri += y ? incr : 0;
	}
	return scenic ? score : true;
};

let visible = grid.length * 4 - 4;
const countVisible = (t, ri, ci) => {
	if (nswe(t, ri, ci, true, false) || nswe(t, ri, ci) || nswe(t, ri, ci, false, false) || nswe(t, ri, ci, false))
		visible++;
};
const getScenicScore = (t, ri, ci) => {
	return (
		nswe(t, ri, ci, true, false, true) *
		nswe(t, ri, ci, true, true, true) *
		nswe(t, ri, ci, false, false, true) *
		nswe(t, ri, ci, false, true, true)
	);
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
