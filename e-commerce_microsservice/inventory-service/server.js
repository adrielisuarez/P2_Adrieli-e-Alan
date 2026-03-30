const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//banco separado
mongoose.connect('mongodb+srv://adrieli_db_user:wuF3qNlO8pD83XM1@cluster0.7fqvwqo.mongodb.net/inventory-db?retryWrites=true&w=majority')
.then(() => console.log('Mongo conectado - Inventory'))
.catch(err => console.log(err));

// Modelo
const Inventory = mongoose.model('Inventory', {
  productId: String,
  quantity: Number
});

// Criar/atualizar estoque
app.put('/inventory/:productId', async (req, res) => {
  const { quantity } = req.body;

  let item = await Inventory.findOne({ productId: req.params.productId });

  if (!item) {
    item = new Inventory({
      productId: req.params.productId,
      quantity
    });
  } else {
    item.quantity = quantity;
  }

  await item.save();
  res.json(item);
});

// Consultar estoque
app.get('/inventory/:productId', async (req, res) => {
  const item = await Inventory.findOne({ productId: req.params.productId });
  res.json(item);
});

app.listen(3003, () => {
  console.log('Inventory Service rodando na porta 3003');
});