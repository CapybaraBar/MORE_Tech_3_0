import { getAuthCookie } from '../../server/auth'
import { findUser } from '../../server/user'

export default async function user(req, res) {
  try {
    const session = await getAuthCookie(req)
    const user = (session && (await findUser(session))) ?? null

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).end('Authentication token is invalid, please log in')
  }
}
