export class ListUsersUseCase {
  private repository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.repository = userRepository;
  }
  execute(filter: any) {
    // valida se o fitlro está correto
    // cria um objeto de resposta serializavel com linhas e contagem
    // retorna o resultado
  }
}
