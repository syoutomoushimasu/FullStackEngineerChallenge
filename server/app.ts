import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get('/employees', (ctx: Koa.Context) => {
  console.log('employees')
  ctx.body = 'employees';
});

router.post('/employees/create', (ctx: Koa.Context) => {
  console.log('employees create')
  ctx.body = 'employee create';
});

router.get('/', (ctx: Koa.Context) => {
  ctx.body = 'Hello World111231231';
});

app.use(router.routes());

app.listen(3000);

console.log('server at 3000');