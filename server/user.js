const crypto = require('crypto')

const { v4: uuidv4 } = require('uuid')

async function createUser({ username, password }) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  const createdAt = Date.now()
  const user = {
    id: uuidv4(),
    createdAt,
    username,
    hash,
    salt,
  }

  return user
}

async function findUser(username) {
  return await db.findUser(username)
}

function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}

module.exports = {
  createUserInMemory: createUser,
  findUser,
  validatePassword
}
