const express = require('express');
const TransactionRepository = require('../repositories/transactions');
const Transaction = require('../models/transaction');
const router = express.Router();

const API_ROUTE = "/api/transactions"

const repository = new TransactionRepository();

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
		const amount = req.body.amount;

		const transaction = new Transaction(type, amount);
		if (transaction.isValid()) {
			// Need to check if User amount is less than 0.
			repository.insert(transaction);
		}

		res.status(200).send(transaction);
    } catch (err) {
        res.status(400).send({error: err.message});
    }
});

module.exports = router;