let transactions = [];

class TransactionRepository {
    getAll() {
        return transactions;
    }

    insert(transaction) {
        transactions.push(transaction);
    }
}

module.exports = TransactionRepository;