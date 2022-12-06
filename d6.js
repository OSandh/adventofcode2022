const data = require('fs').readFileSync('./inputs/i6.txt', 'utf-8').split`\n`.map((r) => r.split``);
for (const msg of data) {
	let i = 0;
	while (i < msg.length) {
		let found = true;
		let grp = msg.slice(i, i + 4);
		for (let c of grp) {
			let other = grp.filter((o) => o === c);
			if (other.length > 1 && grp.length === 4) {
				found = false;
				break;
			}
		}

		if (found) {
			console.log('MARKER FOUND', grp.join``, i + 4);
			break;
		}
		i++;
	}
}
