const fs = require('fs');
fs.readFile(__dirname + '/day3/input.txt', 'utf-8', (err, data) => {
	// fix for windows scrubs
	const lb = data.includes('\r') ? '\r\n' : '\n';
	partOne(data.split(lb));
	partTwo(data.split(lb));
});

const partOne = (rucksacks) => {
	let prioSum = 0;
	for (const rucksack of rucksacks) {
		const compartments = [rucksack.substring(0, rucksack.length / 2), rucksack.substring(rucksack.length / 2)];
		prioSum += getRucksackPrioSum(compartments);
	}
	console.log('Sum of type priorites (part1):', prioSum);
};
const partTwo = (rucksacks) => {
	let prioSum = 0;
	let groupSacks = []; // o_o
	for (const [i, rucksack] of Object.entries(rucksacks)) {
		const gmod = i + 1;
		groupSacks.push(rucksack);
		if (gmod % 3 === 0 && gmod % 1 === 0) {
			// got group
			prioSum += getRucksackPrioSum(groupSacks);
			groupSacks = [];
		}
	}
	console.log('Sum of type priorites (part2):', prioSum);
};

const getRucksackPrioSum = (cmps) => {
	const prioDict = { ...getPrioDict('a', 'z'), ...getPrioDict('A', 'Z', 26) };
	let prioSum = 0;
	const typeInBoth = cmps[0].split('').find((char) => {
		let i = 0;
		const valid = [];
		while (i < cmps.length - 1) {
			valid.push(cmps[++i].includes(char));
		}
		return !valid.includes(false);
	});
	if (typeInBoth) prioSum += prioDict[typeInBoth];
	return prioSum;
};

const getPrioDict = (start, end, offset = 0) => {
	let prioDict = {};
	let prio = 1;
	for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
		prioDict[String.fromCharCode(i)] = offset + prio++;
	}
	return prioDict;
};
