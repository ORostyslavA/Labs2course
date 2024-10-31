const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'api')));
app.get('/favicon.ico', (req, res) => res.status(204));

const dataFilePath = path.join(__dirname, 'api', 'vouchers.json');

const readVouchersFromFile = () => {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    }
    return [];
};

const writeVouchersToFile = (vouchers) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(vouchers, null, 2));
};

app.get('/api/vouchers', (req, res) => {
    const vouchers = readVouchersFromFile();
    res.json(vouchers);
});

app.post('/api/vouchers', (req, res) => {
    const newVoucher = req.body;
    const vouchers = readVouchersFromFile();

    const existingVoucher = vouchers.find(voucher => voucher.title === newVoucher.title);
    if (existingVoucher) {
        return res.status(400).json({ message: 'Voucher with this title already exists.' });
    }

    newVoucher.id = Date.now().toString();
    vouchers.push(newVoucher);
    writeVouchersToFile(vouchers);
    res.status(201).json(newVoucher);
});

app.put('/api/vouchers/:id', (req, res) => {
    const { id } = req.params;
    const updatedVoucher = req.body;
    const vouchers = readVouchersFromFile();

    const voucherIndex = vouchers.findIndex(voucher => voucher.id === id);

    const existingVoucher = vouchers.find(voucher => voucher.title === updatedVoucher.title && voucher.id !== id);
    if (existingVoucher) {
        return res.status(400).json({ message: 'Voucher with this title already exists.' });
    }

    if (voucherIndex !== -1) {
        vouchers[voucherIndex] = { ...vouchers[voucherIndex], ...updatedVoucher };
        writeVouchersToFile(vouchers);
        res.json(updatedVoucher);
    } else {
        res.status(404).send('Voucher not found');
    }
});

app.delete('/api/vouchers/:id', (req, res) => {
    const { id } = req.params;
    let vouchers = readVouchersFromFile();
    const voucherIndex = vouchers.findIndex(voucher => voucher.id === id);

    if (voucherIndex !== -1) {
        vouchers.splice(voucherIndex, 1);
        writeVouchersToFile(vouchers);
        res.status(204).send();
    } else {
        res.status(404).send('Voucher not found');
    }
});

app.get('/api/vouchers/filter', (req, res) => {
    const searchTerm = req.query.q ? req.query.q.toLowerCase() : null;
    const isDescending = req.query.desc === 'true';
    const vouchers = readVouchersFromFile();

    let filteredVouchers = vouchers;
    if (searchTerm) {
        filteredVouchers = filteredVouchers.filter(voucher => voucher.title.toLowerCase().includes(searchTerm));
    }

    if (req.query.sort) {
        filteredVouchers = filteredVouchers.sort((a, b) => 
            isDescending ? b.expense - a.expense : a.expense - b.expense
        );
    }

    const totalSum = filteredVouchers.reduce((sum, voucher) => sum + parseFloat(voucher.expense), 0);

    res.json({ filteredVouchers, totalSum });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
