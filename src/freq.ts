import * as fs from 'fs/promises';
import { nlEcho } from './utils';
import path from 'path';

(async () => {
	const dirPath = path.join(process.cwd(), 'samples', 'freq');
	const files = await fs.readdir(dirPath);
	if (files.length === 0) {
		nlEcho(`no files to parse in ${dirPath}`);
		return;
	}
	// For each text file
	for (const file of files) {
		// Ingest as string
		const inputI = await fs.readFile(path.join(dirPath, file), {
			encoding: 'utf-8',
		});
		const input = inputI.toLowerCase();

		nlEcho(`~~~ File:${file}`);
		const charMap: Map<string, number> = new Map();
		for (const char of input) {
			if (char === ' ' || char === '.' || char === ',') continue;
			const inMap = charMap.get(char);
			if (!inMap) {
				charMap.set(char, 1);
			} else {
				charMap.set(char, inMap + 1);
			}
		}
		let tuples = Array.from(charMap.entries());
		tuples.sort((a, b) => a[1] - b[1]);
		for (const [char, count] of tuples) {
			console.log(`${char}: ${count}`);
		}
		const arr = input.split('');
		for (let i = 0; i < arr.length; i++) {
			switch (arr[i]) {
				case 'l':
					arr[i] = 't';
					break;
				case 'z':
					arr[i] = 'h';
					break;
				case 'i':
					arr[i] = 'e';
					break;
				case 'o':
					arr[i] = 'i';
					break;
				case 'j':
					arr[i] = 'n';
					break;
				case 'c':
					arr[i] = 'o';
					break;
				case 'x':
					arr[i] = 's';
					break;
				case 'y':
					arr[i] = 'm';
					break;
				case 'm':
					arr[i] = 'a';
					break;
				case 't':
					arr[i] = 'c';
					break;
				case 'n':
					arr[i] = 'w';
					break;
				case 'v':
					arr[i] = 'y';
					break;
				case 'p':
					arr[i] = 'l';
					break;
				case 'e':
					arr[i] = 'v';
					break;
				case 'w':
					arr[i] = 'u';
					break;
				case 'a':
					arr[i] = 'b';
					break;
				case 'r':
					arr[i] = 'f';
					break;
				case 's':
					arr[i] = 'r';
					break;
				case 'g':
					arr[i] = 'q';
					break;
				case 'k':
					arr[i] = 'd';
					break;
				case 'h':
					arr[i] = 'g';
					break;
				case 'u':
					arr[i] = 'p';
					break;
				case 'b':
					arr[i] = 'j';
					break;
				case 'q':
					arr[i] = 'k';
					break;
			}
		}
		console.log(input);
		console.log(arr.join(''));
	}
})();
