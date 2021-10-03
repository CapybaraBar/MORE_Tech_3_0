import passport from 'passport'
import nextConnect from 'next-connect'

import { localStrategy } from '../../server/password-local'
import { setAuthCookie } from '../../server/auth'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(localStrategy)

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate('local', req, res)

      setAuthCookie(res, user)

      res
        .writeHead(302, {
          Location: encodeURI(`/`),
        })
        .end()
    } catch (error) {
      console.error(error)
      res
        .writeHead(302, {
          Location: encodeURI(`/login?error=${error.message}`),
        })
        .end()
    }
  })
