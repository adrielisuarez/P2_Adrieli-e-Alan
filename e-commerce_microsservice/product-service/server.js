const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 COLE SUA STRING AQUI
mongoose.connect('mongodb+srv://adrieli_db_user:wuF3qNlO8pD83XM1@cluster0.7fqvwqo.mongodb.net/product-db?retryWrites=true&w=majority')
.then(() => console.log('Mongo conectado'))
.catch(err => console.log(err));

// Modelo (Product)
const Product = mongoose.model('Product', {
  name: String,
  price: Number
});

// POST - criar produto
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// GET - listar produtos
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(3001, () => {
  console.log('Product Service rodando na porta 3001');
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});