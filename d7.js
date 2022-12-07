const data = require('fs').readFileSync('./inputs/i7.txt', 'utf-8').split`\n`;

let inDir = '';
const filesystem = data.reduce(
	(fs, line) => {
		const ls = line.includes('$ ls');
		if (line[0] === '$' && !ls) {
			fs.cmd.push(line.slice(2, line.length));
			if (line.slice(2, 4).includes('cd') && line.slice(5, line.length) !== '..') {
				inDir += (inDir !== '' ? '>' : '') + line.slice(5, line.length);
				fs.dir[inDir] = { files: [], size: 0, totalSize: 0 };
			} else {
				inDir = inDir.includes('>') ? inDir.slice(0, inDir.lastIndexOf('>')) : '';
			}
		} else if (inDir && !ls) {
			if (!line.slice(0, 3).includes('dir')) {
				let [size, name] = line.split` `;
				fs.dir[inDir].files.push({ size: +size, name: name });
				fs.dir[inDir].size += +size;
				let predir = '';
				let dirs = inDir.split`>`;
				for (let d of dirs) {
					fs.dir[predir + d].totalSize += +size;
					predir += d + '>';
				}
			}
		}
		return fs;
	},
	{ cmd: [], dir: {} }
);
console.log(filesystem);
const partOne = () => {
	let totalUnderLimit = Object.values(filesystem.dir)
		.filter((dir) => dir.totalSize <= 100000)
		.reduce((total, dir) => {
			total += dir.totalSize;
			return total;
		}, 0);
	console.log('sum of small sizes (part1):', totalUnderLimit);
};

partOne();
