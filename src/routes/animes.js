import {Router} from "express";
import { promises as fs } from 'fs'; 
import path from 'path';

const router = Router();

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const animeFilePath = path.join(_dirname, "../../data/animes.json");

const readAnimesFs = async () => {
    try {
        const animes = await fs.readFile(animeFilePath, 'utf8');
        return JSON.parse(animes);
    } catch (error) {
        throw new Error(`Error en la promesa ${error}`);
    }
};

const writeAnimesFs = async (animes) => {
    try {
        await fs.writeFile(animeFilePath, JSON.stringify(animes, null, 2), 'utf8');
        console.log('Animes actualizados en el archivo');
    } catch (error) {
        throw new Error(`Error en la promesa ${error}`);
    }
};

router.get('/', async (req, res) => {
    try {
        const animes = await readAnimesFs();
        res.json(animes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const animes = await writeAnimesFs();
        const newAnime = req.body;
        animes.push(newAnime);
        await writeAnimesFs(animes);
        res.status(201).json(newAnime);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});