import Local from 'passport-local'

import { validatePassword } from './user'
import { findUser } from './database'

export const localStrategy = new Local.Strategy(function (username, password, done) {
  findUser(username)
    .then((user) => {
      if (user==null) {
        throw  new Error('Пользователь не существует')
      } else if (validatePassword(user, password)) {
        done(null, user)
      } else {
       throw new Error('Неправильный пароль')
      }
    })
    .catch((error) => {
      done(error)
    })
})
