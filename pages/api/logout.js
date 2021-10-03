import { removeTokenCookie } from '../../server/cookies-helpers'

export default async function logout(req, res) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}
