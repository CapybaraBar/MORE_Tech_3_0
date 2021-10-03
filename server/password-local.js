import Local from 'passport-local'

import { findUser, validatePassword } from './user'

export const localStrategy = new Local.Strategy(function (
  username,
  password,
  done,
) {
  findUser(username)
    .then((user) => {
      if (user == null) {
        done(new Error('Юзер не существует'))
      } else if (validatePassword(user, password)) {
        done(null, user)
      } else {
        done(new Error('Неправильный пароль'))
      }
    })
    .catch((error) => {
      done(error)
    })
})
