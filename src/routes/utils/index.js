import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const getFileAbsolutePath = (relativePath) => {
    return path.join(_dirname, relativePath);
};

const readFromFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error al leer el archivo ${filePath}: ${error.message}`);
    }
};

const writeToFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Datos escritos en el archivo ${filePath}`);
    } catch (error) {
        throw new Error(`Error al escribir en el archivo ${filePath}: ${error.message}`);
    }
};

export { getFileAbsolutePath, readFromFile, writeToFile };
