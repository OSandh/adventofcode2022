const fs = require('fs');
fs.readFile('input.txt', 'utf-8', (err, data) => {
	findCalories(data);
});

const findCalories = (elfCalorieList) => {
	const elfTotals = elfCalorieList.split('\r\n\r\n').reduce((calorieTotals, elf) => {
		calorieTotals.push(
			elf.split('\r\n').reduce((total, calories) => {
				total += +calories;
				return total;
			}, 0)
		);
		return calorieTotals;
	}, []);
	console.log('Biggest calorie count:', Math.max(...elfTotals));
	findTop3Total(elfTotals);
};

const findTop3Total = (elfTotals) => {
	const totalTop3 = [0, 1, 2].reduce((total) => {
		const highest = Math.max(...elfTotals);
		total += highest;
		elfTotals.splice(elfTotals.indexOf(highest), 1);
		return total;
	}, 0);
	console.log('Total top 3 calorie count:', totalTop3);
};
