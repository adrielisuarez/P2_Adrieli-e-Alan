const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 conecta no MESMO cluster, mas outro banco
mongoose.connect('mongodb+srv://adrieli_db_user:wuF3qNlO8pD83XM1@cluster0.7fqvwqo.mongodb.net/user-db?retryWrites=true&w=majority')
.then(() => console.log('Mongo conectado - User'))
.catch(err => console.log(err));

// Modelo User
const User = mongoose.model('User', {
  name: String,
  email: String
});

// Criar usuário
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Buscar usuário
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.listen(3002, () => {
  console.log('User Service rodando na porta 3002');
});