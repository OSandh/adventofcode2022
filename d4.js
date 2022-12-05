const fs = require('fs');
const data = fs.readFileSync(__dirname + '/day4/4-input.txt', 'utf-8').split`\n`.map((pair) =>
	pair.split`,`.reduce((raw, assignment) => {
		raw.push(assignment.split`-`.map((n) => +n));
		return raw;
	}, [])
);

const partOne = (data) => {
	let overlaps = 0;
	for (const pair of data) {
		const elfOne = pair[0];
		const elfTwo = pair[1];

		const firstInSecond = elfOne[0] >= elfTwo[0] && elfOne[1] <= elfTwo[1];
		const secondInFirst = elfTwo[0] >= elfOne[0] && elfTwo[1] <= elfOne[1];

		if (firstInSecond || secondInFirst) overlaps++;
	}
	console.log('overlaps part1:', overlaps);
};

const partTwo = (data) => {
	let overlaps = 0;
	for (const pair of data) {
		const elfOne = pair[0];
		const elfTwo = pair[1];

		const firstElfS = elfOne[0] >= elfTwo[0] && elfOne[0] <= elfTwo[1];
		const firstElfE = elfOne[1] >= elfTwo[0] && elfOne[1] <= elfTwo[1];

		const secElfS = elfTwo[0] >= elfOne[0] && elfTwo[0] <= elfOne[1];
		const secElfE = elfTwo[1] >= elfOne[0] && elfTwo[1] <= elfOne[1];

		if (firstElfS || firstElfE || secElfS || secElfE) overlaps++;
	}
	console.log('overlaps part2:', overlaps);
};

partOne(data);
partTwo(data);
