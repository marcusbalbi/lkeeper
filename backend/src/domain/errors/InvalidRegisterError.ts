export class InvalidRegisterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRegisterError';
  }
}
