const express = require('express');
const TransactionService = require('../services/transactions');
const { Transaction } = require('../models/transaction');
const router = express.Router();

const API_ROUTE = "/api/transactions"

const service = new TransactionService();

router.get(API_ROUTE, (req, res) => {
    try {
        const result = service.getAll();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({error: err.message});
    }
});

router.post(API_ROUTE, async (req, res) => {
    try {
		const type = req.body.type;
		const amount = parseFloat(req.body.amount);

		const transaction = new Transaction(type, amount);
		await service.insert(transaction);

		res.status(200).send(transaction);
    } catch (err) {
        res.status(400).send({error: err.message});
    }
});

module.exports = router;