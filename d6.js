const data = require('fs').readFileSync('./inputs/i6.txt', 'utf-8').split`\n`.map((r) => r.split``);

const findMarker = (markerLength = 4) => {
	for (const msg of data) {
		for (let i = 0; i < msg.length; i++) {
			let grp = msg.slice(i, i + markerLength);
			if (markerLength === new Set(grp).size) return i + markerLength;
		}
	}
};
console.log('start-of-packet:', findMarker());
console.log('start-of-message:', findMarker(14));
