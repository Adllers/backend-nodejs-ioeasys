import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';

import routes from './routes';

// Para conexão com BD
import '../typeorm';

// Instanciando por meio do tsyringe os repositórios
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);




app.listen(3333, () => {
    console.log('server running on port 3333');
});