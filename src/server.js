import express from "express";;
import router from './routes';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});