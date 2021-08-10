import { Connection, createConnection } from 'typeorm';
import dbConfig from '../config/database';

export default class ConnectionFactory {
  public static createConnection(): Promise<Connection> {
    return createConnection(dbConfig);
  }
}
