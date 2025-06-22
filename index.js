const express = require('express');
const app = express();
const items = require('./Items');
// console.log(items);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/api/items', (req, res) => {
    res.json(items)
})


app.post('/api/items', (req, res) => {
    const newItem = {
        name: req.body.name,
        id: req.body.id,
        price: req.body.price
    }
    items.push(newItem)
    res.json(items)
})


app.delete('/api/items/:id', (req, res) => {
    let { id } = req.params;
    let itemToBeDeleted = items.find(item => item.id === id);

    if (itemToBeDeleted) {
        res.json({
            message: "Item deleted",
            items: items.filter(item => item.id !== id)
        })
    } else {
        res.status(404)
        .json({ message: `Item you are looking for doesn't exist`})
    }
})


app.listen(4000, () => {
    console.log(`It's working`)
})