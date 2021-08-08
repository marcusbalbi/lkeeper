import { UserRepository } from '@src/database/repositories/UserRepository';
import { ListUsersUseCase } from '@src/UseCases/users/ListUsersUsecase';
import { Request, Response } from 'express';
import RestControllerContract from '../contracts/RestControllerContract';

export class UserController implements RestControllerContract {
  async listAll(req: Request, res: Response) {
    const listUsersUseCase = new ListUsersUseCase(new UserRepository());
    const users = await listUsersUseCase.execute(req.body);
    res.status(200).json(users);
  }
  getById(req: Request, res: Response) {}
  create(req: Request, res: Response) {}
  update(req: Request, res: Response) {}
  remove(req: Request, res: Response) {}
}
