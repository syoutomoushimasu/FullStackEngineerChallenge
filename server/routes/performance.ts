import Router from 'koa-router';
import Koa from 'koa';
import {
  addPerformance,
  getPerformanceList,
  updatePerformance
} from '../services/performance';

const router = new Router();

router.get('/list', async (ctx: Koa.Context) => {
  const result = await getPerformanceList();
  ctx.body = result;
});

router.post('/create', async (ctx: Koa.Context) => {
  const { employeeId, reviewedByArr, title } = ctx.request.body;
  const result = await addPerformance(employeeId, reviewedByArr, title);
  if (result) {
    ctx.body = { status: 'success' };
  } else {
    ctx.body = { status: 'failed' };
  }
});

router.post('/update', async (ctx: Koa.Context) => {
  const { title, performanceId } = ctx.request.body;
  const result = await updatePerformance(performanceId, title);
  if (result) {
    ctx.body = { status: 'success' };
  } else {
    ctx.body = { status: 'failed' };
  }
});

export default router;
