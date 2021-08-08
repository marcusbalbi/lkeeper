import { Request, Response } from 'express';
export default interface RestControllerContract {
  listAll(req: Request, res: Response);
  getById(req: Request, res: Response);
  create(req: Request, res: Response);
  update(req: Request, res: Response);
  remove(req: Request, res: Response);
}
