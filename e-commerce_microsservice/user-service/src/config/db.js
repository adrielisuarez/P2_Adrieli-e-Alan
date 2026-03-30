const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adrieli_db_user:wuF3qNlO8pD83XM1@cluster0.7fqvwqo.mongodb.net/user-db?retryWrites=true&w=majority')
.then(() => console.log('Mongo conectado - User'))
.catch(err => console.log(err));

module.exports = mongoose;