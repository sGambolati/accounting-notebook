const { v4: uuidv4 } = require('uuid');

class Transaction {
    constructor(_type, _amount) {
        this.id = uuidv4();
        this.type = _type;
        this.amount = _amount;
        this.effectiveDate = new Date();
	}
	
	isValid() {
		if (![TransactionTypes.CREDIT, TransactionTypes.DEBIT].includes(this.type)) {
			throw new Error(`Transaction type (${this.type}) is not valid. `);
		}
		if (isNaN(this.amount)) {
			throw new Error(`Transaction Amount (${this.amount}) is not a valid number.`);
		}

		return true;
	}
}

const TransactionTypes = {
    CREDIT: 'credit', 
    DEBIT: 'debit'
}

module.exports = Transaction;