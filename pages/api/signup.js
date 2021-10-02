import { createUser } from '../../lib/user'

export default async function signup(req, res) {
  try {
    await createUser(req.body)
    res.writeHead(302, { Location: encodeURI(`/`) }).end()
  } catch (error) {
    console.error(error)
    res
      .writeHead(302, {
        Location: encodeURI(`/auth/register?error=${error.message}`),
      })
      .end()
  }
}
