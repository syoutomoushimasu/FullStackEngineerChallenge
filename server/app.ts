import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import { sequelize } from './database';
import { Employee } from './database/models';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // create table if not exist
    await Employee.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.listen(3100);
console.log('server at 3100');
