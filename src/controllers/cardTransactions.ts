import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { cardTransaction, cardTransactionM } from '../models/cardTransactionModel';

const insertCard = (req: Request, res: Response) => {

    {
        const card = req.body;
        if (!card)
            return badRequest(res, "Usuário inválido");

        if (!validateNumber(card.id))
            return badRequest(res, 'Informe o id de transação');

        if (!isValid(card.cpf))
            return badRequest(res, 'Informe o cpf');
    }

    const card = req.body as cardTransaction;
    return cardTransactionM.insertCardTransactions(card)
        .then(card => {
            res.json(card);
        })
        .catch(err => internalServerError(res, err));
}

const listCard = ({ }: Request, res: Response) => {
    cardTransactionM.listCardTransactions()
        .then(cards => {
            res.json(cards)
        })
        .catch(err => internalServerError(res, err));
}

const getlistCard = ({ req }: Request, res: Response) => {
    const id = req.params.id;

    return cardTransactionM.getCardTransactions(id)
        .then((card) => {
            if (card)
                return res.json(card);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}


//função que verifica se um cpf é valido.
const isValid = (cpf: string): boolean => {
    let sum = 0;
    let rest;
    if (cpf == "00000000000") return false;

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) {
        rest = 0;
    }
    if (rest != parseInt(cpf.substring(9, 10))) {
        return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) {
        rest = 0;
    }
    if (rest != parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
}


export const cardTransactionsController = {
    insertCard,
    listCard,
    getlistCard
}

