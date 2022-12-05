const fs = require('fs');
const data = fs.readFileSync(__dirname + '/day4/4-input.txt', 'utf-8').split`\n`.map((pair) =>
	pair.split`,`.reduce((raw, assignment) => {
		raw.push(assignment.split`-`.map((n) => +n));
		return raw;
	}, [])
);

const partOne = (data) => {
	let overlaps = 0;
	for (const rP of data) {
		const firstInSecond = rP[0][0] >= rP[1][0] && rP[0][1] <= rP[1][1];
		const secondInFirst = rP[1][0] >= rP[0][0] && rP[1][1] <= rP[0][1];
		if (firstInSecond || secondInFirst) overlaps++;
	}
	console.log('overlaps part1:', overlaps);
};

const partTwo = (data) => {
	let overlaps = 0;
	for (const rP of data) {
		const firstElfS = rP[0][0] >= rP[1][0] && rP[0][0] <= rP[1][1];
		const firstElfE = rP[0][1] >= rP[1][0] && rP[0][1] <= rP[1][1];

		const secElfS = rP[1][0] >= rP[0][0] && rP[1][0] <= rP[0][1];
		const secElfE = rP[1][1] >= rP[0][0] && rP[1][1] <= rP[0][1];

		if (firstElfS || firstElfE || secElfS || secElfE) overlaps++;
	}
	console.log('overlaps part2:', overlaps);
};

partOne(data);
partTwo(data);
