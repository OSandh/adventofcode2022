const fs = require('fs');
const charPrio = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
		groupSacks.push(rucksack);
		const index = i + 1;
		if ((index % 3) + (index % 1) === 0) {
			prioSum += getRucksackPrioSum(groupSacks);
			groupSacks = [];
		}
	}
	console.log('Sum of type priorites (part2):', prioSum);
};
// dynamic get prio sum for n compartments/rucksacks
const getRucksackPrioSum = (cmps) => {
	let prioSum = 0;
	const typeInBoth = cmps[0].split('').find((char) => {
		let i = 0;
		const valid = [];
		while (i < cmps.length - 1) valid.push(cmps[++i].includes(char));
		return !valid.includes(false);
	});
	if (typeInBoth) prioSum += charPrio.indexOf(typeInBoth) + 1;
	return prioSum;
};
const data = fs.readFileSync(__dirname + '/inputs/i3.txt', 'utf-8').split`\n`;
partOne(data);
partTwo(data);