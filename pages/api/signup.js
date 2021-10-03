import { createUser, findUser } from '../../server/user'
import { setAuthCookie } from '../../server/auth'

export default async function signup(req, res) {
  try {
    const { username, password } = req.body
    await createUser({ username, password })

    const user = await findUser(username)

    setAuthCookie(res, user)

    res.writeHead(302, { Location: encodeURI(`/`) }).end()
  } catch (error) {
    console.error(error)
    res
      .writeHead(302, {
        Location: encodeURI(`/register?error=${error.message}`),
      })
      .end()
  }
}
