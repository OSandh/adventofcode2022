// assigned sections with unique ID number
// assignmenets overlap
// pair up, list of section assignments for each pair
// 2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/day4/4-input.txt', 'utf-8').split`\n`;

const partOne = (data) => {
	let overlaps = 0;
	for (const pair of data) {
		const rawPair = pair.split`,`.reduce((raw, assignment) => {
			raw.push(assignment.split`-`.map((n) => +n));
			return raw;
		}, []);

		const firstInSecond = rawPair[0][0] >= rawPair[1][0] && rawPair[0][1] <= rawPair[1][1];
		const secondInFirst = rawPair[1][0] >= rawPair[0][0] && rawPair[1][1] <= rawPair[0][1];
		if (firstInSecond || secondInFirst) overlaps++;
	}
	console.log('overlaps', overlaps);
};
partOne(data);
