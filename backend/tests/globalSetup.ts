require('ts-node/register');
const { createConnection } = require('typeorm');
// const config = require('../ormconfig.json');
const setup = async (): Promise<void> => {
  const connection = await createConnection('testing');
  console.log('TEST DATABASE CONNECTED ');
  await connection.manager.query(`DELETE FROM users`);
  console.log('ALL USERS REMOVED!');
};

export default setup;
