export default interface UserRepositoryInterface {
  listAll(filter: any);
  findById(id: any);
  findByEmail(email: string);
  save(filter: any);
}
