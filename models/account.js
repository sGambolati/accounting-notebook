const { TransactionTypes } = require('./transaction');

class Account {
    constructor() {
        this.name = 'John Doe';
		this.balanceAmount = 0.0;
		this.isUpdating = false;
    }

    canProcess(type, amount) {
        if (!type) {
            throw new Error('Please, specify a transaction type.');
		}
        if (!amount) {
            throw new Error('Please, specify a transaction amount.');
        }		

        const signedAmount = this.getTransactionAmount(type, amount);

        return ((this.balanceAmount + signedAmount) >= 0);
    }

    getTransactionAmount(type, amount) {
        if (type === TransactionTypes.CREDIT) {
            return amount;
        }
        if (type === TransactionTypes.DEBIT) {
            return amount * -1;
        }

        throw new Error(`Transaction type (${this.type}) is not valid. `);
	}

	updateBalanceAmount(type, amount) {
		if (this.canProcess(type, amount)) {
			const signedAmount = this.getTransactionAmount(type, amount);
			this.balanceAmount += signedAmount;
		}
    }
    
    lock() {
        this.isUpdating = true;
    }

    unlock() {
        this.isUpdating = false;
    }

    isLocked() {
        return this.isUpdating;
    }
}

module.exports = Account;