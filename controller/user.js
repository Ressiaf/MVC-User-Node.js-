const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = (req, res, next) => {
    let body = req.body
    User.findOne({ email: body.email }, (erro, usuarioDB)=>{
        if (erro) {
          return res.status(500).json({
             ok: false,
             err: erro
          })
       }
   // Verifica que exista un usuario con el mail escrita por el usuario.
      if (!usuarioDB) {
         return res.status(400).json({
           ok: false,
           err: {
               message: "Usuario o contraseña incorrectos"
           }
        })
      }
   // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (! bcrypt.compareSync(body.password, usuarioDB.password)){
         return res.status(400).json({
            ok: false,
            err: {
              message: "Usuario o contraseña incorrectos"
            }
         });
      }
   // Genera el token de autenticación
       let token = jwt.sign({
              usuario: usuarioDB,
           }, process.env.SEED_AUTENTICACION, {
           expiresIn: process.env.CADUCIDAD_TOKEN
       })
       res.json({
           ok: true,
           usuario: usuarioDB,
           token,
       })
   })
}

const register = (req, res, next) => {
    let body = req.body;
    let { nombre, email, password, role } = body;

  let usuario = new User({
      nombre,
      email,
      password: bcrypt.hashSync(password, 10),
      role
    });
  usuario.save((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
           ok: false,
           err,
        }).end();
      }
      res.json({
            ok: true,
            usuario: usuarioDB
         }).end();
      })
  };

const createUser = (req, res, next) => {
    User.create(req.body, (err, user) => {
        if (err) next(err);
        else {
            res.status(201).send(user)
        }        
    })
}

const findAllUsers = (req, res, next) => {
    User.find({}, (err, user) => {
        if(err) next(err);
        else {
            res.status(200).send(user)
        }
    })    
}

const findUser = (req, res, next) => {
    User.findOne(req.body, (err, user) => {
        if(err) next(err);
        else {
            res.status(200).send(user)
        }
    })
}

const editUser = (req, res, next) => {
    const { filter, changes } = req.body;
    User.findOneAndUpdate(filter, changes, (err, user) => {
        if(err) next(err);
        else {
            res.status(200).send(user)
        }
    })
}

const deleteUser = (req, res, next) => {
    User.findOneAndRemove(req.body, (err, user) => {
        if(err) next(err);
        else {
            res.status(200).send(user)
        }
    })
}

const editLoggedUser = (req, res, next) => {
    const changes = req.body;
    User.findOneAndUpdate({ _id: req.user._id }, changes, (err, user) => {
        if(err) next(err);
        else {
            res.status(200).send(user)
        }
    })
}
module.exports = {
    createUser,
    findUser,
    findAllUsers,
    deleteUser,
    editUser,
    login,
    register,
    editLoggedUser
}