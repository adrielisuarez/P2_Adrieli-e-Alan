const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const Order = require('./models/Order');

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 conexão com Mongo
mongoose.connect('mongodb+srv://adrieli_db_user:wuF3qNlO8pD83XM1@cluster0.7fqvwqo.mongodb.net/order-db?retryWrites=true&w=majority')
.then(() => console.log('Mongo conectado - Order'))
.catch(err => console.log(err));

// 🚀 ROTA DE TESTE (opcional, mas ajuda muito)
app.get('/teste', (req, res) => {
  res.send('Order Service OK');
});

// 🔥 CRIAR PEDIDO (FLUXO COMPLETO)
app.post('/orders', async (req, res) => {
  try {
    console.log('🔵 Iniciou pedido');

    const { userId, products } = req.body;

    let total = 0;

    for (let item of products) {
      console.log('🔍 Buscando produto');

      const productResponse = await axios.get(
        `http://localhost:3001/products/${item.productId}`
      );

      console.log('✅ Produto encontrado');

      const product = productResponse.data;

      console.log('📦 Verificando estoque');

      const inventoryResponse = await axios.get(
        `http://localhost:3003/inventory/${item.productId}`
      );

      console.log('✅ Estoque encontrado');

      const inventory = inventoryResponse.data;

      if (!inventory || inventory.quantity < item.quantity) {
        console.log('❌ Estoque insuficiente');
        return res.status(400).json({ message: 'Estoque insuficiente' });
      }

      total += product.price * item.quantity;
    }

    console.log('💾 Criando pedido');

    const order = new Order({
      userId,
      products,
      total,
      status: 'CRIADO'
    });

    await order.save();

    console.log('💳 Chamando pagamento');

    const paymentResponse = await axios.post(
      'http://localhost:3004/payments',
      { amount: total }
    );

    console.log('💰 Pagamento retornou');

    if (paymentResponse.data.status === 'APROVADO') {
      order.status = 'PAGO';
    } else {
      order.status = 'CANCELADO';
    }

    await order.save();

    console.log('✅ Pedido finalizado');

    res.json(order);

  } catch (error) {
    console.log('🔥 ERRO:', error.message);
    res.status(500).json({ error: 'Erro no pedido' });
  }
});

// 🔥 CONSULTAR PEDIDO
app.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

// 🚀 START SERVIDOR
app.listen(3005, () => {
  console.log('Order Service rodando na porta 3005');
});