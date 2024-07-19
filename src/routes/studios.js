import { Router } from "express";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const studiosFilePath = path.join(_dirname, '../../data/studios.json');

const readStudiosFs = async () => {
    try {
        const studios = await fs.readFile(studiosFilePath, 'utf8');
        return JSON.parse(studios);
    } catch (error) {
        throw new Error(`Error en la promesa ${error}`);
    }
};

const writeStudiosFs = async (studios) => {
    try {
        await fs.writeFile(studiosFilePath, JSON.stringify(studios, null, 2), 'utf8');
        console.log('Studios actualizados en el archivo');
    } catch (error) {
        throw new Error(`Error en la promesa ${error}`);
    }
};

router.get('/', async (req, res) => {
    try {
        const studiios = await readStudiosFs();
        res.json(studiios);
    } catch (error) {
        throw new Error(`Error en el envio de los datos de studio ${error}`);
    }
});


export default router;