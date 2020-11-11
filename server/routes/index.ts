import Koa from 'koa';
import Router from "koa-router";
import employeeRouter from './employee';

const router = new Router();
router.use('/api/employee', employeeRouter.routes());

export default router;
