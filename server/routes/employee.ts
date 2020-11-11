import Router from 'koa-router';
import Koa from 'koa';
import { Employee } from '../database/models';

const router = new Router();

router.get('/list', (ctx: Koa.Context) => {
  ctx.body = 'employee list';
});

router.post('/create', async (ctx: Koa.Context) => {
  const { name, email } = ctx.request.body;
  // todo: services floder
  await Employee.create({
    name,
    email
  });
  ctx.body = { status: 'success' };
});

export default router;
