const express = require('express');
const cors = require('cors');

const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(paymentRoutes);

app.listen(3004, () => {
  console.log('Payment Service rodando na porta 3004');
});