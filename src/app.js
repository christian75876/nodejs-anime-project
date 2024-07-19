import router from './routes/animes.js'
import express from 'express';
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.js';
import  R from './routes/studios.js';
import routerDirectors from './routes/directors.js'


const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/animes", router);
app.use("/studios", R);
app.use("/directors", routerDirectors);
app.use(errorHandler);


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})

