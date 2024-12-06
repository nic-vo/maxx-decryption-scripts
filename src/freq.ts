import * as fs from 'fs/promises';
import { nlEcho } from './utils';
import path from 'path';

const inputPath = path.join(process.cwd(), 'samples', 'freq');
const outPath = path.join(
	process.cwd(),
	'output',
	'freq',
	Date.now().toString(),
);

(async () => {
	const files = await fs.readdir(inputPath);
	if (files.length === 0) {
		nlEcho(`no files to parse in ${inputPath}`);
		return;
	}
	// For each text file
	for (const file of files) {
		// Ingest as string
		nlEcho(`~~~ File:${file}`);
		const inputI = await fs.readFile(path.join(inputPath, file), {
			encoding: 'utf-8',
		});
		const input = inputI.toLowerCase();
		console.log(input);

		const charMap: Map<string, number> = new Map();
		for (const char of input) {
			if (/[a-z]/.test(char) === false) continue;
			const inMap = charMap.get(char);
			if (!inMap) {
				charMap.set(char, 1);
			} else {
				charMap.set(char, inMap + 1);
			}
		}
		let tuples = Array.from(charMap.entries());
		tuples.sort((a, b) => a[1] - b[1]);
		const keyMap: Map<string, string> = new Map();
		const arr = input.split('');
		for (let i = 0; i < arr.length; i++) {
			switch (arr[i]) {
				case 'l':
					keyMap.set(arr[i], 't');
					arr[i] = 't';
					break;
				case 'z':
					keyMap.set(arr[i], 'h');
					arr[i] = 'h';
					break;
				case 'i':
					keyMap.set(arr[i], 'e');
					arr[i] = 'e';
					break;
				case 'o':
					keyMap.set(arr[i], 'i');
					arr[i] = 'i';
					break;
				case 'j':
					keyMap.set(arr[i], 'n');
					arr[i] = 'n';
					break;
				case 'c':
					keyMap.set(arr[i], 'o');
					arr[i] = 'o';
					break;
				case 'x':
					keyMap.set(arr[i], 's');
					arr[i] = 's';
					break;
				case 'y':
					keyMap.set(arr[i], 'm');
					arr[i] = 'm';
					break;
				case 'm':
					keyMap.set(arr[i], 'a');
					arr[i] = 'a';
					break;
				case 't':
					keyMap.set(arr[i], 'c');
					arr[i] = 'c';
					break;
				case 'n':
					keyMap.set(arr[i], 'w');
					arr[i] = 'w';
					break;
				case 'v':
					keyMap.set(arr[i], 'y');
					arr[i] = 'y';
					break;
				case 'p':
					keyMap.set(arr[i], 'l');
					arr[i] = 'l';
					break;
				case 'e':
					keyMap.set(arr[i], 'v');
					arr[i] = 'v';
					break;
				case 'w':
					keyMap.set(arr[i], 'u');
					arr[i] = 'u';
					break;
				case 'a':
					keyMap.set(arr[i], 'b');
					arr[i] = 'b';
					break;
				case 'r':
					keyMap.set(arr[i], 'f');
					arr[i] = 'f';
					break;
				case 's':
					keyMap.set(arr[i], 'r');
					arr[i] = 'r';
					break;
				case 'g':
					keyMap.set(arr[i], 'q');
					arr[i] = 'q';
					break;
				case 'k':
					keyMap.set(arr[i], 'd');
					arr[i] = 'd';
					break;
				case 'h':
					keyMap.set(arr[i], 'g');
					arr[i] = 'g';
					break;
				case 'u':
					keyMap.set(arr[i], 'p');
					arr[i] = 'p';
					break;
				case 'b':
					keyMap.set(arr[i], 'j');
					arr[i] = 'j';
					break;
				case 'q':
					keyMap.set(arr[i], 'k');
					arr[i] = 'k';
					break;
			}
		}
		console.log(arr.join(''));
		await fs.mkdir(outPath, { recursive: true });
		await fs.writeFile(
			path.join(outPath, file),
			`${input}\n\n${tuples.map(([char, count]) => `${char} ==> ${keyMap.get(char) ?? 'unknown'}  |  ${count} time${count !== 1 ? 's' : ''}`).join('\n')}\n\n${arr.join('')}`,
		);
	}
})();
