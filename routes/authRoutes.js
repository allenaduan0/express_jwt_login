const express = require('express')
const router = express.Router()
const { register, login, getProfile } = require('../controller/authController')
const asyncHandler = require('../utils/asyncHandler')
const protect = require('../middleware/authMiddleware')

router.post('/register', asyncHandler(register))
router.post('/login', asyncHandler(login))
router.get('/profile', protect, asyncHandler(getProfile))

module.exports = router