import { Request, Response } from 'express';
export class UserController {
  listAll(req: Request, res: Response) {
    res.status(200).json([]);
  }
  getById(req: Request, res: Response) {}
  create(req: Request, res: Response) {}
  update(req: Request, res: Response) {}
  remove(req: Request, res: Response) {}
}
