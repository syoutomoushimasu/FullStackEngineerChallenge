import { Sequelize, Op } from 'sequelize';

const sequelize = new Sequelize({
  username: 'root',
  password: 'mysql',
  database: 'fullstack-challenge',
  port: 3306,
  host: '127.0.0.1',
  dialect: 'mysql',
  timezone: '+09:00',
  logging: msg => console.log(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export { sequelize, Sequelize, Op };
