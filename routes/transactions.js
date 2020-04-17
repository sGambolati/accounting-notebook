const express = require('express');
const TransactionRepository = require('../repositories/transactions');
const AccountRepository = require('../repositories/accounts');
const { Transaction } = require('../models/transaction');
const router = express.Router();

const API_ROUTE = "/api/transactions"

const repository = new TransactionRepository();
const accountRepository = new AccountRepository();

router.get(API_ROUTE, (req, res) => {
    try {
        const result = repository.getAll();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({error: err.message});
    }
});

router.post(API_ROUTE, (req, res) => {
    try {
		const type = req.body.type;
		const amount = parseFloat(req.body.amount);

		const transaction = new Transaction(type, amount);
		const account = accountRepository.get();

		if (transaction.isValid()) {
			// Lock.

			if (account && account.canProcess(transaction.type, transaction.amount)) {
				repository.insert(transaction);
				account.updateBalanceAmount(transaction.type, transaction.amount);
			} else {
				throw new Error("Can't process transaction.");
			}

			// Release Lock.
		}

		res.status(200).send(transaction);
    } catch (err) {
        res.status(400).send({error: err.message});
    }
});

module.exports = router;