const express = require('express');
const cors = require('cors');

require('./src/config/db');

const inventoryRoutes = require('./src/routes/inventoryRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(inventoryRoutes);

app.listen(3003, () => {
  console.log('Inventory Service rodando na porta 3003');
});