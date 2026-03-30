exports.processPayment = (req, res) => {
  try {
    const { amount } = req.body;

    const status = Math.random() > 0.3
      ? 'APROVADO'
      : 'RECUSADO';

    res.json({
      status,
      amount
    });

  } catch (error) {
    res.status(500).json({
      error: 'Erro ao processar pagamento'
    });
  }
};