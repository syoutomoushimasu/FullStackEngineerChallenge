import Koa from 'koa';
import Router from "koa-router";
import employeeRouter from './employee';
import performanceRouter from './performance';

const router = new Router();
router.use('/api/employee', employeeRouter.routes());
router.use('/api/performance', performanceRouter.routes());

export default router;
