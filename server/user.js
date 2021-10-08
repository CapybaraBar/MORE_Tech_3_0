import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import * as db from './database'

export async function createUser({ username, password }) {
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

  await db.createUser(user)

  return { username, createdAt }
}

export async function findUser(username) {
  return await db.findUser(username)
}

export function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}
