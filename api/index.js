require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const TransactionModel = require('./models/Transaction');

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Add root route
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'test ok' });
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { name, description, datetime } = req.body;
    
    // Extract price from name (e.g., "+200 test" -> "+200")
    const price = name.split(' ')[0];
    const transactionName = name.substring(price.length + 1);
    
    const transaction = await TransactionModel.create({
        name: transactionName,
        description,
        datetime,
        price
    });
    
    res.json({
        transaction
    });
});

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await TransactionModel.find({});
    res.json(transactions);
});

const PORT = 4040;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// CY8hIA6borAnujKU