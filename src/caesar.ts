import * as fs from 'fs/promises';
import { nlEcho } from './utils';
import path from 'path';

(async () => {
	const dirPath = path.join(process.cwd(), 'samples', 'caesar');
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

		nlEcho(`~~~ File:${file}\n---\n${input.slice(0, 40)}...\n`);

		const iteratedStringOutput: string[] = [];
		for (let i = 1; i < 26; i++) {
			// Per character swap based on if [A-Za-z] charcode, 25 times
			const bumpOneCharOutput: string[] = [];
			for (let j = 0; j < input.length; j++) {
				if (/[A-Z]/.test(input[j])) {
					const newCharCode = input[j].charCodeAt(0) + i;
					bumpOneCharOutput.push(
						String.fromCharCode(
							newCharCode > 90 ? 64 + newCharCode - 90 : newCharCode,
						),
					);
				} else if (/[a-z]/.test(input[j])) {
					const newCharCode = input[j].charCodeAt(0) + i;
					bumpOneCharOutput.push(
						String.fromCharCode(
							newCharCode > 122 ? 96 + newCharCode - 122 : newCharCode,
						),
					);
				} else {
					// console.log(input[j]);
					bumpOneCharOutput.push(input[j]);
				}
			}
			console.log(bumpOneCharOutput.join(''));
			iteratedStringOutput.push(bumpOneCharOutput.join(''));
		}
		// nlEcho(
		// 	`Output:\n---\n${iteratedStringOutput.map((str) => `${str.slice(0, 40)}...`).join('\n')}\n~~~`,
		// );
		// .join() all into string
		// Check if output dir exists
		// Create timestamped dir for per-file output
		// Print 2d array to output file with same name
	}
})();
