const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Por favor llena todos los espacios ')
    }

    //Verificacion de existencia del usuario 
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error ('Usuario ya registrado')
    }

    //se crea a usuario en la base de datos 

    const user = await User.create({
        name, 
        email, 
        password: hashedPasword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else {
        res.status(400)
        throw new Error ('No se pudo crear el ususario')
    }
})

const getUserData = asyncHandler( async (req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    getUserData
}