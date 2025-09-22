const express = require('express')
require('./config/passport')
const dotenv = require('dotenv')

const initDB = require('./database')
const authRoutes = require('./routes/authRoutes')

dotenv.config()

const PORT = process.env.PORT

const app = express()

initDB()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))