const express = require('express');
const cors = require('cors');

require('./src/config/db');

const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRoutes);

app.listen(3002, () => {
  console.log('User Service rodando na porta 3002');
});