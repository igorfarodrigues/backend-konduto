import { Application } from "express";
import Router from 'express';
import { transactionsRouter } from "./transactions";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/transactions', transactionsRouter);

    app.use('/api/v1', apiRouter);
}


