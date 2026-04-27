const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/generate-invoice', async (req, res) => {
    const { items, currency } = req.body;

    // Calculate total in INR
    const totalINR = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Request conversion rate from Backend B
    try {
        const response = await axios.post('http://localhost:4000/convert', {
            from: 'INR',
            to: currency
        });

        const rate = response.data.rate;
        const totalConverted = totalINR * rate;

        res.json({
            items,
            totalINR,
            [`total${currency}`]: totalConverted.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ error: 'Currency service unavailable' });
    }
});

app.listen(3000, () => console.log('Backend A running on port 3000'));
