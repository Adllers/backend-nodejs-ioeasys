import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction} from 'express';

const app = express();


app.use(express.json());


app.listen(3333, () => {
    console.log('server running on port 3333');
});