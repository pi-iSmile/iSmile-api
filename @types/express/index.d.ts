import { Request } from 'express';

export interface AuthRequest extends Request {
    professional?: string
}
