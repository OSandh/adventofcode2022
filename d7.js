const data = require('fs').readFileSync('./inputs/i7.txt', 'utf-8').split`\n`;

let dir = '';
const filesystem = data.reduce((fs, line) => {
	const ls = line.includes('$ ls');
	if (line[0] === '$' && !ls) {
		if (line.slice(2, 4).includes('cd') && line.slice(5, line.length) !== '..') {
			dir += (dir !== '' ? '>' : '') + line.slice(5, line.length);
			fs[dir] = { name: dir, subdirs: [], files: [], local_size: 0, total_size: 0 };
		} else dir = dir.includes('>') ? dir.slice(0, dir.lastIndexOf('>')) : '';
	} else if (dir && !ls) {
		if (line.slice(0, 3).includes('dir')) {
			fs[dir].subdirs.push(dir + '>' + line.slice(4, line.length));
		} else {
			let [filesize, name] = line.split` `;
			fs[dir].files.push({ size: +filesize, name: name });
			fs[dir].local_size += +filesize;
			let predir = '';
			let dirs = dir.split`>`;
			for (let d of dirs) {
				fs[predir + d].total_size += +filesize;
				predir += d + '>';
			}
		}
	}
	return fs;
}, {});

const partOne = () => {
	let totalUnderLimit = Object.values(filesystem)
		.filter((dir) => dir.total_size <= 100000)
		.reduce((total, dir) => {
			total += dir.total_size;
			return total;
		}, 0);
	console.log('sum of small sizes (part1):', totalUnderLimit);
};

const partTwo = () => {
	const spaceNeeded = 30000000 - (70000000 - filesystem['/'].total_size);
	const dirToDelete = Object.values(filesystem)
		.filter((d) => d.total_size > spaceNeeded)
		.sort((a, b) => a.total_size - b.total_size)[0];
	console.log('\ndir to delete (part2):');
	console.log(dirToDelete);
};

partOne();
partTwo();
