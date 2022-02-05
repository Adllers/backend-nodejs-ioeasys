//sobrescrever tiṕagem de dentro do Express
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}