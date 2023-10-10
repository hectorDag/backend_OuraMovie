const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtenemos el token
            token = req.headers.authorization.split(' ')[1];
            // Verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Obtenemos el ID del usuario del token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Sin Autorización, token inválido o expirado');
        }
    } else {
        res.status(401);
        throw new Error('Sin Autorización, no se proporcionó un token');
    }
});

const adminProtect = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.status(403);
        throw new Error('No estás autorizado para acceder a este recurso');
    }
});

module.exports = {
    protect,
    adminProtect
};