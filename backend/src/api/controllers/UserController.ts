import { Request, Response } from 'express';
import RestControllerContract from '../contracts/RestControllerContract';

export class UserController implements RestControllerContract {
  listAll(req: Request, res: Response) {
    res.status(200).json([]);
  }
  getById(req: Request, res: Response) {}
  create(req: Request, res: Response) {}
  update(req: Request, res: Response) {}
  remove(req: Request, res: Response) {}
}
