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
			if (account && account.canProcess(transaction.type, transaction.amount)) {

				// Wait for lock to be released.
				this.waitForAccountRelease(account, 1000);

				if (!account.isLocked()) {
					account.lock();
					try {
						this.repository.insert(transaction);
						account.updateBalanceAmount(transaction.type, transaction.amount);
					} catch (err) {
						console.error(err);
					} finally {
						account.unlock();
					}
				}
			} else {
				throw new Error("Can't process transaction.");
			}
		}
	}
	
	waitForAccountRelease(account, timeToWait) {
		if (account.isLocked()) {
			let newTimeToWait = timeToWait * 2;
			if (newTimeToWait > 5000) {
				newTimeToWait = 5000;
			}

			setTimeout(() => this.waitForAccountRelease(account, newTimeToWait), timeToWait);
		}
	}
}

module.exports = TransactionService;