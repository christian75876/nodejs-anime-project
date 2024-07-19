import router from './routes/animes.js'
import express from 'express';
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.js';
import  R from './routes/studios.js';


const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/anime", router);
app.use("/studios", R);
app.use(errorHandler);


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})

