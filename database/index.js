const dbConnect = require('../config/db')

const dbInit = () => {
    dbConnect()
}

module.exports = dbInit