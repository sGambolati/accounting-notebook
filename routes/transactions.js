const express = require('express');
const TransactionRepository = require('../repositories/transactions');
const router = express.Router();

const API_ROUTE = "/api/transactions"

const repository = new TransactionRepository();

router.get(API_ROUTE, async (req, res) => {
    try {
        const result = repository.getAll();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});



module.exports = router;