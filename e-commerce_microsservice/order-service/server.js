const express = require('express');
const cors = require('cors');

require('./src/config/db');

const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(orderRoutes);

app.listen(3005, () => {
  console.log('Order Service rodando na porta 3005');
});