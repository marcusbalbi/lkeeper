import { RegisterNotFoundError } from '@src/domain/errors/RegisterNotFoundError';
import UserRepositoryInterface from '@src/domain/UserRepositoryInterface';

export class FindUserUserCase {
  private repository: UserRepositoryInterface;
  constructor(userRepository: UserRepositoryInterface) {
    this.repository = userRepository;
  }
  async execute(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new RegisterNotFoundError(`User with id ${id} not found`);
    }

    return user;

    // valida se o fitlro está correto
    // cria um objeto de resposta serializavel com os dados
    // retorna o resultado
  }
}
