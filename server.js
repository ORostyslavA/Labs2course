const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const data = require('./Vouchers.json')

app.use(express.json());

app.get('/api/data', (req, res) => {
    const { searchTerm = '', sortName = '', sortCity = '', sortPrice = 'none' } = req.query;
    
    const normalizedSearchTerm = (searchTerm || '').toLowerCase().trim();
    
    let filteredData = data.filter((item) => {
        const normalizedTitle = (item.title || '').toLowerCase().trim();
        const normalizedCity = (item.city || '').toLowerCase().trim();
        
        const searchCondition = normalizedSearchTerm === '' ||
            normalizedTitle.includes(normalizedSearchTerm) ||
            normalizedCity.includes(normalizedSearchTerm);
        
        const nameCondition = sortName === '' || item.title === sortName;
        const cityCondition = sortCity === '' || item.city === sortCity;
        
        return searchCondition && nameCondition && cityCondition;
    });
    
    if (sortPrice === 'Ascending') {
        filteredData.sort((a, b) => a.price - b.price);
    } else if (sortPrice === 'Descending') {
        filteredData.sort((a, b) => b.price - a.price);
    }
    
    res.json(filteredData);
});

app.get('/api/data/:id', (req, res) => {
    const {id} = req.params;
    const card = data.find((el) => el.id === parseInt(id));
    if(card) {
        res.json(card);
    } else {
        res.status(404).json({ message: "Card not found" });
    }
});

app.listen(5000,() => {console.log(`Server is running on http://localhost:5000`)})