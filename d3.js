const fs = require('fs');
fs.readFile(__dirname + '/day3/input.txt', 'utf-8', (err, data) => {
	// fix for windows scrubs
	const lb = data.includes('\r') ? '\r\n' : '\n';

	fixRucksacks(data.split(lb));
});

const fixRucksacks = (rucksacks) => {
	const prioSum = getRucksackPrioSum(rucksacks);
	console.log('Sum of type priorites:', prioSum);
};

const getRucksackPrioSum = (rucksacks) => {
	const prioDict = { ...getPrioDict('a', 'z'), ...getPrioDict('A', 'Z', 26) };
	let prioSum = 0;
	for (const rucksack of rucksacks) {
		const { c1, c2 } = getCompartments(rucksack);
		const typeInBoth = c1.split('').find((char) => c2.includes(char));
		if (typeInBoth) prioSum += prioDict[typeInBoth];
	}
	return prioSum;
};

const getCompartments = (rucksack) => {
	return {
		c1: rucksack.substring(0, rucksack.length / 2),
		c2: rucksack.substring(rucksack.length / 2),
	};
};

const getPrioDict = (start, end, offset = 0) => {
	let prioDict = {};
	let prio = 1;
	for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
		prioDict[String.fromCharCode(i)] = offset + prio++;
	}
	return prioDict;
};
