import { Connection, createConnection } from 'typeorm';
export default class ConnectionFactory {
  public static createConnection(dbConfig): Promise<Connection> {
    return createConnection(dbConfig);
  }
}
