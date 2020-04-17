const express = require('express');
const port = process.env.PORT || 8080;
const transactionRoutes = require('./routes/transactions');

const app = express();

app.use(express.json());

app.use(transactionRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});