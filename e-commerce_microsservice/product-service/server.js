const express = require('express');
const cors = require('cors');

require('./src/config/db');

const productRoutes = require('./src/routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(productRoutes);

app.listen(3001, () => {
  console.log('Product Service rodando na porta 3001');
});