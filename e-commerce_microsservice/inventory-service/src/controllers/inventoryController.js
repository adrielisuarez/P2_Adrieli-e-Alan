const Inventory = require('../models/Inventory');

exports.updateInventory = async (req, res) => {
  try {
    const { quantity } = req.body;

    let item = await Inventory.findOne({
      productId: req.params.productId
    });

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

  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar estoque' });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const item = await Inventory.findOne({
      productId: req.params.productId
    });

    res.json(item);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estoque' });
  }
};