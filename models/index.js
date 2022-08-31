const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/skillfactory';
process.env.CADUCIDAD_TOKEN = '48h';
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;


module.exports = db;