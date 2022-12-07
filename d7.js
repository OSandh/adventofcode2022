const data = require('fs').readFileSync('./inputs/i7.txt', 'utf-8').split`\n`;

let inDir = '';
const filesystem = data.reduce(
	(fs, line) => {
		const ls = line.includes('$ ls');
		if (line[0] === '$' && !ls) {
			fs.cmd.push(line.slice(2, line.length));
			if (line.slice(2, 4).includes('cd') && line.slice(5, line.length) !== '..') {
				inDir += (inDir !== '' ? '>' : '') + line.slice(5, line.length);
				fs.dir[inDir] = { name: inDir, subdirs: [], files: [], local_size: 0, total_size: 0 };
			} else {
				inDir = inDir.includes('>') ? inDir.slice(0, inDir.lastIndexOf('>')) : '';
			}
		} else if (inDir && !ls) {
			if (line.slice(0, 3).includes('dir')) {
				fs.dir[inDir].subdirs.push(inDir + '>' + line.slice(4, line.length));
			} else {
				let [filesize, name] = line.split` `;
				fs.dir[inDir].files.push({ size: +filesize, name: name });
				fs.dir[inDir].local_size += +filesize;
				let predir = '';
				let dirs = inDir.split`>`;
				for (let d of dirs) {
					fs.dir[predir + d].total_size += +filesize;
					predir += d + '>';
				}
			}
		}
		return fs;
	},
	{ cmd: [], dir: {} }
);
//console.log(filesystem.dir['/']);
const partOne = () => {
	let totalUnderLimit = Object.values(filesystem.dir)
		.filter((dir) => dir.total_size <= 100000)
		.reduce((total, dir) => {
			total += dir.total_size;
			return total;
		}, 0);
	console.log('sum of small sizes (part1):', totalUnderLimit);
};

const partTwo = () => {
	let deleteCandidate = filesystem.dir['/'].total_size;
	const spaceNeeded = 30000000 - (70000000 - deleteCandidate);
	const dirToDelete = Object.values(filesystem.dir)
		.filter((d) => d.total_size > spaceNeeded)
		.sort((a, b) => a.total_size - b.total_size)[0];
	console.log('\ndir to delete (part2):');
	console.log(dirToDelete);
};

partOne();
partTwo();
