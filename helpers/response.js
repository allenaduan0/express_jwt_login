const success = (res, data, message, token = null) => {
    const response = { data, message }
    if (token) response.token = token
    res.status(201).json(response)
}

const error = (res, message) => {
    res.status(500).json({ message })
}

const invalid = (res, message) => {
    res.status(401).json({ message })
}

module.exports = { success, error, invalid }