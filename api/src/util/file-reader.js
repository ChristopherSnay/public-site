const fs = require('fs').promises;
const path = require('path');

async function readJsonFilesFromDir(dir, exclude = []) {
	const files = await fs.readdir(dir);
	const jsonFiles = files.filter(f => f.endsWith('.json') && !exclude.includes(f));
	return Promise.all(
		jsonFiles.map(async file => {
			const filePath = path.join(dir, file);
			const content = await fs.readFile(filePath, 'utf-8');
			const data = JSON.parse(content);
			const id = Number(path.basename(file, '.json'));
			return { id, ...data };
		})
	);
}

async function readJsonFile(filePath) {
	const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    const id = Number(path.basename(filePath, '.json'));
    return { id, ...data };
}

module.exports = {
	readJsonFilesFromDir,
	readJsonFile
};
