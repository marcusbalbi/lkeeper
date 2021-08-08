export class RegisterNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RegisterNotFoundError';
  }
}
