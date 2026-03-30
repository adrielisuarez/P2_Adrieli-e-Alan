const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  productId: String,
  quantity: Number
});

module.exports = mongoose.model('Inventory', InventorySchema);