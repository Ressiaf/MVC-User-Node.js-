const mongoose = require('mongoose');
const db = require('./index')
let rolesValidos = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} no es un role válido'
}
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
      type: String,
      required: [true, 'El nombre es necesario'],
  },
  email: {
      type: String,
      unique: true,
      required: [true, "El correo es necesario"],
  },
  password: {
      type: String,
      required: [true, "Le contraseña es obligatoria"],
  },
  role: {
      type: String,
      default: 'USER',
      required: [true],
      enum: rolesValidos,
  }
  });
// elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

const User = db.model('users', usuarioSchema);

module.exports = User;