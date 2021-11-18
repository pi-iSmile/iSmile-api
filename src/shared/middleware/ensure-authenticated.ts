import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../AppError';
import auth from '../config/auth';

interface IToken {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const { secret } = auth.jwt;

  const authenticatonHeader = request.headers.authorization;

  if (!authenticatonHeader) {
    throw new AppError('Token JWT não encontrado.', 401);
  }

  const [, token] = authenticatonHeader.split(' ');

  try {
    verify(token, secret);
    return next();
  } catch {
    throw new AppError('Token JWT inválido.', 401);
  }
}
