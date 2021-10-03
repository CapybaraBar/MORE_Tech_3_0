import * as jwt from 'jsonwebtoken'
import { setTokenCookie, getTokenCookie } from './cookies-helpers'

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'TOKEN_SECRET'

export async function setAuthCookie(res, { id, createdAt, username }) {
  const token = jwt.sign(
    {
      id,
      createdAt,
      username,
    },
    TOKEN_SECRET,
    {
      noTimestamp: true,
    },
  )

  setTokenCookie(res, token)
}

export async function getAuthCookie(req) {
  const token = getTokenCookie(req)

  if (token == null) {
    return
  }

  return jwt.verify(token, TOKEN_SECRET)
}
