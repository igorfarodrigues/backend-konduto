import { dbQuery, dbQueryFirst } from "../services/db"

export type cardTransaction = {
    id: string;
    cpf: string;
    status: number;
}

const insertCardTransactions = async (card: cardTransaction) => {
    await dbQuery(`INSERT INTO credit_card_transactions (id, cpf) VALUES(?, ?)`, [card.id, card.cpf])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'credit_card_transactions'`);
    return getCardTransactions(retorno[0].Id);
}

const insertTransactionStatus = async (card: cardTransaction) => {
    await dbQuery(`INSERT INTO credit_card_transactions (id, status) VALUES(?, ?)`, [card.id, card.status])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'transaction_status'`);
    return getCardTransactions(retorno[0].Id);
}


const updateCardTransactions = async (card: cardTransaction) => {
    await dbQuery(`UPDATE credit_card_transactions SET cpf = ? WHERE id ='transaction_id' ?`, [card.id, card.cpf])
    return getCardTransactions(card.id);
}

const listCardTransactions = async () => {
    const retorno = await dbQuery(`SELECT * FROM credit_card_transactions`);
    return retorno as cardTransaction[];
}

const getCardTransactions = async (id: string) => {
    const retorno = await dbQueryFirst(`SELECT * FROM credit_card_transactions WHERE id = ?`, [id]);
    return retorno as cardTransaction | undefined;
}

const deleteCardTransactions = async (id: string) => {
    await dbQueryFirst(`DELETE FROM credit_card_transactions WHERE id = ?`, [id]);
}

export const cardTransactionM = {
    insertCardTransactions,
    insertTransactionStatus,
    listCardTransactions,
    getCardTransactions,
    deleteCardTransactions,
    updateCardTransactions
}