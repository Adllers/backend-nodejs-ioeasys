import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import Errors from '@shared/errors/Errors';


interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function userAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
): void {

    //verificando token
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Errors('JWT token is missing', 401);
    }

    // Bearer token
    const [, token] = authHeader.split(' ');

    try {

        const decoded = verify(token, authConfig.jwt.secret);
        
        // forçando para que decoded seja do tipo TokenPayload 
        const { sub } = decoded as TokenPayload;
        
        // foi criado arquivo express.d.ts para que request da lib do express pudesse ser rescrito
        request.user = { 
            id: sub,
        }
        // então teremos o id do usuário para as demais rotas quando ele estiver autenticado
        
        return next();

    } catch {
        throw new Errors('Invalid JWT token', 401);
    }

}