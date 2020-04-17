const TransactionRepository = require('../repositories/transactions');
const AccountRepository = require('../repositories/accounts');

class TransactionService {
	constructor() {
		this.repository = new TransactionRepository();
		this.accountRepository = new AccountRepository();	
	}

	getAll() {
		return this.repository.getAll();
	}

    async insert(transaction) {
		const account = this.accountRepository.get();

		if (transaction.isValid()) {
			// Lock.

			if (account && account.canProcess(transaction.type, transaction.amount)) {
				this.repository.insert(transaction);
				account.updateBalanceAmount(transaction.type, transaction.amount);
			} else {
				throw new Error("Can't process transaction.");
			}

			// Release Lock.
		}
    }
}

module.exports = TransactionService;