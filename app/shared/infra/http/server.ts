import 'reflect-metadata';
import swaggerUi from "swagger-ui-express";
import 'dotenv/config';

import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import Errors from '@shared/errors/Errors';
import swaggerFile from './../../../swagger.json';

// Para conexão com BD
import '../typeorm';

// Instanciando por meio do tsyringe os repositórios
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);


//tratativas de erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    
    // erro em alguma parte conhecida da minha aplicação
    if (err instanceof Errors) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    };

    console.error(err);

    // erro em algo desconhecido
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });

});


app.listen(3333, () => {
    console.log('server running on port 3333');
});