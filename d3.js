const fs = require('fs');

const generatePrioDict = (start, end, offset = 0) => {
	let dict = {};
	let prio = 1;
	for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
		dict[String.fromCharCode(i)] = offset + prio++;
	}
	return dict;
};
const prioDict = { ...generatePrioDict('a', 'z'), ...generatePrioDict('A', 'Z', 26) };

fs.readFile(__dirname + '/day3/input.txt', 'utf-8', (err, data) => {
	// fix for windows scrubs
	const lb = data.includes('\r') ? '\r\n' : '\n';
	partOne(data.split(lb));
	partTwo(data.split(lb));
});

const partOne = (rucksacks) => {
	let prioSum = 0;
	for (const rucksack of rucksacks) {
		const mid = rucksack.length / 2;
		const compartments = [rucksack.substring(0, mid), rucksack.substring(mid)];
		prioSum += getRucksackPrioSum(compartments);
	}
	console.log('Sum of type priorites (part1):', prioSum);
};

const partTwo = (rucksacks) => {
	let prioSum = 0;
	let groupSacks = []; // o_o
	for (const [i, rucksack] of Object.entries(rucksacks)) {
		groupSacks.push(rucksack);
		const index = i + 1;
		if ((index % 3) + (index % 1) === 0) {
			prioSum += getRucksackPrioSum(groupSacks);
			groupSacks = [];
		}
	}
	console.log('Sum of type priorites (part2):', prioSum);
};

// get prio sum for n compartments/rucksacks
const getRucksackPrioSum = (cmps) => {
	let prioSum = 0;
	const typeInBoth = cmps[0].split('').find((char) => {
		let i = 0;
		const valid = [];
		while (i < cmps.length - 1) valid.push(cmps[++i].includes(char));
		return !valid.includes(false);
	});
	if (typeInBoth) prioSum += prioDict[typeInBoth];
	return prioSum;
};
