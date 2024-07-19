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
    const animes = await readAnimesFs();
    const newAnime = {
        id: animes.length + 1,
        title: req.body.title,
        genre: req.body.genre
    };

    animes.push(newAnime);
    await writeAnimesFs(animes);
    res.status(201).json(newAnime);
});

router.get("/:id", async (req,res) => {
    const animes = await readAnimesFs();
    const anime = animes.find(a => a.id === parseInt(req.params.id));
    if(!anime) return res.status(404).send("anime not found");
    res.json(anime);
});

router.put("/:id", async (req, res) => {
    const animes = await readAnimesFs();
    const index = animes.findIndex(a => a.id === parseInt(req.params.id));
    if(index === -1) return res.status(404).send("anime not found");

    const updatedAnime = {
        ...animes[index],
        title: req.body.title || animes[index].title,
        genre: req.body.genre || animes[index].genre
    };

    animes[index] = updatedAnime;
    await writeAnimesFs(animes);
    res.json(updatedAnime);
});


router.delete("/:id", async (req, res) => {
    let anime = await readAnimesFs();
    const index = anime.findIndex(a => a.id === parseInt(req.params.id));
    if(!anime) return res.status(404).send('Anime not found');
    anime = anime.filter(a => a.id !== anime.id);

    await writeAnimesFs(anime);
    res.send('anime deleted successfully')
});

export default router;