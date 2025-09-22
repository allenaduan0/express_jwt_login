const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const { success, error, invalid } = require('../helpers/response')

dotenv.config()

const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) return invalid(res, 'Not Authorized')

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if(!user) error(res, 'User not found')

        req.user = user

        next()

    }catch(err){
        error(res, 'Token Invalid or expired')
    }
}

module.exports = protect