import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';


interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
  authorization: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT sem token", 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const verifyToken = verify(token, authConfig.jwt.publicKey);

    const dataToken = verifyToken as TokenPayload;

    request.user = {
      id: dataToken.id,
    }

    return next();
  } catch {
    throw new AppError("Token inválido", 401);
  }

}
