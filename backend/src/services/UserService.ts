import { InvalidRegisterError } from '@src/domain/errors/InvalidRegisterError';
import { RegisterNotFoundError } from '@src/domain/errors/RegisterNotFoundError';
import UserRepositoryInterface from '@src/domain/UserRepositoryInterface';
import * as yup from 'yup';

export class UserService {
  private repository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.repository = userRepository;
  }

  async listAll(filter: any) {
    return this.repository.listAll(filter);
    // valida se o fitlro está correto
    // cria um objeto de resposta serializavel com linhas e contagem
    // retorna o resultado
  }

  async findUser(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new RegisterNotFoundError(`User with id ${id} not found`);
    }

    return user;
  }

  async createUser(userData: any) {
    try {
      await this.validate(userData);
      return await this.repository.save(userData);
    } catch (err) {
      if (err.name === 'ValidationError') {
        console.log(err);
        throw new InvalidRegisterError('Falha ao criar usuário, dados inválidos');
      }
    }
  }

  async validate(data: any) {
    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}
