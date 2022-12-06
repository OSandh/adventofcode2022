const data = require('fs').readFileSync('./inputs/i6.txt', 'utf-8').split`\n`.map((r) => r.split``);

const findMarker = (markerLength = 4) => {
	for (const msg of data) {
		for (let i = 0; i < msg.length; i++) {
			let found = true;
			let grp = msg.slice(i, i + markerLength);
			for (let c of grp) {
				if (grp.filter((o) => o === c).length > 1) {
					found = false;
					break;
				}
			}
			if (found) return i + markerLength;
		}
	}
};
console.log('start-of-packet:', findMarker());
console.log('start-of-message:', findMarker(14));
