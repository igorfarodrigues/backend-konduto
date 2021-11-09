import { Router } from 'express';
import { cardTransactionsController } from '../controllers/cardTransactions';

const transactionsRouter = Router();
transactionsRouter.get('/', cardTransactionsController.listCard);
transactionsRouter.get('/:id', cardTransactionsController.getlistCard);
transactionsRouter.post('/', cardTransactionsController.insertCard);

export {
    transactionsRouter,
}

