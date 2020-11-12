import Router from 'koa-router';
import Koa from 'koa';
import { 
  addEmployee, 
  getEmployeeList, 
  updateEmployee ,
  deleteEmployee
} from '../services/employee';

const router = new Router();

router.get('/list', async (ctx: Koa.Context) => {
  const result = await getEmployeeList();
  ctx.body = result;
});

router.post('/create', async (ctx: Koa.Context) => {
  const { name, email } = ctx.request.body;
  const result = await addEmployee(name, email);
  if (result) {
    ctx.body = { status: 'success' };
  } else {
    ctx.body = { status: 'failed' };
  }
});

router.post('/edit', async (ctx: Koa.Context) => {
  const { name, email } = ctx.request.body;
  const result = await updateEmployee(name, email);
  if (result) {
    ctx.body = { status: 'success' };
  } else {
    ctx.body = { status: 'failed' };
  }
});

router.post('/delete', async (ctx: Koa.Context) => {
  const { name } = ctx.request.body;
  const result = await deleteEmployee(name);
  if (result) {
    ctx.body = { status: 'success' };
  } else {
    ctx.body = { status: 'failed' };
  }
});

export default router;
