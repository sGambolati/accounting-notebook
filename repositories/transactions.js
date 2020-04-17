const transactionModel = require('../models/transaction');
let transactions = [];

class TransactionRepository {
    getAll() {
        return transactions;
    }

    insert(transaction) {
        transactions.push(transaction);

        return transaction;
    }
}

module.exports = TransactionRepository;