const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')
const mongoose = require('mongoose')

const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Por favor llena todos los espacios ')
    }

    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error ('Usuario ya registrado')
    }

    const salt = await bycrypt.genSalt(10)
    const hashedPasword = await bycrypt.hash(password, salt)

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

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    const generateToken = (id) => {
        return jwt.sign({id},process.env.JWT_SECRET, {
            expiresIn: '30m'
        })
    }

    const user = await User.findOne({email})
    if(user && (await bycrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error ('Credenciales incorrectas')
    }
})

const getUserData = asyncHandler( async (req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    getUserData
}