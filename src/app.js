import router from './routes/animes.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/anime", router);
app.use(errorHandler);


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})