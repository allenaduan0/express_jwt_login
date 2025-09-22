const dotenv = require('dotenv')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const { success, error, invalid } = require('../helpers/response')

dotenv.config()

const generateToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })

const register = async (req, res) => {
    const user = await User.create(req.body)
    const token = generateToken(user._id)
    success(res, user, 'Created Successfully', token)
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(!user || !(await user.comparePassword(password))){
        invalid(res, 'Invalid Credentials')
    }

    const token = generateToken(user._id)

    success(res, user, 'Successfully Logged In', token)
}

const getProfile = async (req, res) => {
    success(res, req.user, 'Successfully fetched')
}

const googleOAuthCallback = async (req, res) => {
    if(!req.user) return invalid(res, 'OAuth login failed')

    const token = generateToken(req.user._id)
    success(res, req.user, 'Successfully logged in with Google', token)
}

module.exports = { register, login, getProfile, googleOAuthCallback }