const crypto = require('crypto')

const { v4: uuid } = require('uuid')

function createUserInMemory({ username, password }) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  const createdAt = Date.now()
  const user = {
    id: uuid(),
    createdAt,
    username,
    hash,
    salt,
  }

  return user
}

function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}

module.exports = {
  createUserInMemory,
  validatePassword
}
