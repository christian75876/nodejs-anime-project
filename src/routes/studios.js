import { log } from "console";
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


router.post('/', async (req, res) => {
    try {
        const studios = await readStudiosFs();
        const newStudio = {
            id: studios.length + 1,
            name: req.body.name,
        };

        studios.push(newStudio);
        await writeStudiosFs(studios);
        res.status(201).json(newStudio);

    } catch (error) {
        throw new Error(`Error en la creaciòn del nuevo studio ${error}, ${message}`)
    }
});

router.get('/:id', async (req, res) => {
    const studios = await readStudiosFs();
    const studio = studios.findIndex(studio => studio.id === parseInt(req.params.id));
    console-log(studio)
    if (studio === -1) return console.log('El estudio no fue encontrado!');
    res.json(studios[studio]);
});

router.put('/:id', async (req, res) => {
    const studios = await readStudiosFs();
    const studioIndex = studios.findIndex(studio => studio.id === parseInt(req.params.id));
    if (studioIndex === -1) return console.log('El estudio no fue encontrado!');
    
    const updatedStudio = {
        ...studios[studioIndex],
        name: req.body.name
    };

    studios[studioIndex] = updatedStudio
    await writeStudiosFs(studios);
    res.json(updatedStudio);
});

router.delete('/:id', async (req, res) => {
    const studios = await readStudiosFs();
    const studioIndex = studios.findIndex(studio => studio.id === parseInt(req.params.id));
    if (studioIndex === -1) return console.log('El estudio no fue encontrado!');
    studios.splice(studioIndex, 1);
    await writeStudiosFs(studios);
    res.json(studios);
});

export default router;