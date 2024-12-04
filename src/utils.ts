export const nlEcho = async (line: string | Promise<string>) =>
	console.log(`\n${await line}`);
