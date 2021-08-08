import { UserRepository } from '@src/database/repositories/UserRepository';
import { FindUserUserCase } from '@src/UseCases/users/FindUserUserCase';
import { ListUsersUseCase } from '@src/UseCases/users/ListUsersUsecase';
import { Request, Response } from 'express';
import RestControllerContract from '../contracts/RestControllerContract';

export class UserController implements RestControllerContract {
  async listAll(req: Request, res: Response) {
    const listUsersUseCase = new ListUsersUseCase(new UserRepository());
    const users = await listUsersUseCase.execute(req.body);
    res.status(200).json(users);
  }
  async getById(req: Request, res: Response) {
    try {
      const useCase = new FindUserUserCase(new UserRepository());
      const users = await useCase.execute(req.params.id);
      res.status(200).json(users);
    } catch (err) {
      console.log(err.name);
      if (err.name === 'RegisterNotFoundError') {
        res.status(404).json({ message: 'User not found: ' + err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }
  async create(req: Request, res: Response) {
    // const useCase = new CreateUserUseCase(new UserRepository());
    // const users = await useCase.execute(req.params.id);
    // res.status(200).json(users);
  }
  update(req: Request, res: Response) {}
  remove(req: Request, res: Response) {}
}
