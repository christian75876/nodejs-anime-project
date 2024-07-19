import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";



const router = Router();

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const directorsFilePath = path.join(_dirname, '../../data/directors.json');

const readDirectorsFs = async () => {
    try {
        const directors = await fs.readFile(directorsFilePath, 'utf8');
        return JSON.parse(directors);
    } catch (error) {
        throw new Error(`Error en la lectura del archivo json mensaje: ${error}`);
    }
};

const writeDirectorsFs = async (directors) => {
    try {
        await fs.writeFile(directorsFilePath, JSON.stringify(directors, null, 2), 'utf-8');
        console.log('Registro ingresado correctamente');
    } catch (error) {
        throw new Error('Error en la escritura del archivo');
    }
};

router.get('/', async (req, res) => {
    try {
        const directors = readDirectorsFs();
        res.json(directors);
    } catch (error) {
        throw new Error(`Error en solicitud de Get ${error}`);
    }
});


router.post('/', async (req, res) => {
    try {
        const directors = await readDirectorsFs();
        const newDirector = {
            id: directors.length + 1,
            name: req.body.name,
        }
        
        directors.push(newDirector);
        console.log(directors);
        await writeDirectorsFs(directors);
        res.status(201).json(newDirector);
    } catch (error) {
        throw new Error(`Error en la peticion de creacion ${error}`);   
    }
});

router.put('/:id', async (req, res) => {
    const directors = await readDirectorsFs();
    const directorIndex = directors.findIndex(director => director.id === parseInt(req.params.id));
    console.log(directorIndex)
    if (directorIndex === -1) return res.status(404).send('Director not found');

    directors[directorIndex].name = req.body.name;
    await writeDirectorsFs(directors);
    res.json(directors[directorIndex]);
});

router.delete('/:id', async (req, res) => {
    const directors = await readDirectorsFs();
    const directorIndex = directors.findIndex(director => director.id === parseInt(req.params.id));
    if (directorIndex === -1) return res.status(404).send('Director not found')
    directors.splice(directorIndex, 1);
    await writeDirectorsFs(directors);
    res.status(202).send('Director has been deleted sucessfully')
});

export default router;

