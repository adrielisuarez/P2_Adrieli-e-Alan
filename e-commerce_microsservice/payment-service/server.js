const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Simular pagamento
app.post('/payments', (req, res) => {
  const { amount } = req.body;

  // 🔥 lógica simples (aleatório)
  const status = Math.random() > 0.3 ? 'APROVADO' : 'RECUSADO';

  res.json({
    status,
    amount
  });
});

app.listen(3004, () => {
  console.log('Payment Service rodando na porta 3004');
});