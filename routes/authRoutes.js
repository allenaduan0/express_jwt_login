const express = require('express')
const passport = require('passport')
const router = express.Router()
const { register, login, getProfile, googleOAuthCallback } = require('../controller/authController')
const asyncHandler = require('../utils/asyncHandler')
const protect = require('../middleware/authMiddleware')

router.post('/register', asyncHandler(register))
router.post('/login', asyncHandler(login))
router.get('/profile', protect, asyncHandler(getProfile))

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', {session: false, failureRedirect: '/login'}), googleOAuthCallback)

module.exports = router