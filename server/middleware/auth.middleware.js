const tokenService = require('../services/token.sevice')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({message: 'Unauthorized'})
    }

    const data = tokenService.validateAccess(token)
    console.log('Decoded:', data)

    req.user = data

    next()
  } catch (e) {
    res.status(401).json({message: 'Unauthorized'})
  }
}