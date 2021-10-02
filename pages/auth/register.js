import React from 'react'
import { TextField } from '@mui/material'

import Link from '../../src/Link'
import AuthContainer from '../../src/AuthContainer'
import AuthForm from '../../src/AuthForm'
import AuthFormControl from '../../src/AuthFormControl'
import AuthButton from '../../src/AuthButton'

const Register = () => {
  const [username, setUsername] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onChangeUsername = (e) => setUsername(e.target.value)
  const onChangePhone = (e) => setPhone(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()

    window.alert('qqq')
    // const http = new Http()
    //
    // const data = {
    //   name: e.currentTarget.username.value,
    //   email: e.currentTarget.email.value,
    //   password: e.currentTarget.password.value,
    // }
    //
    // const response = await http.post('api/auth/register', data)
    // if (response.ok) {
    //   location.href = '/'
    // } else {
    //   alert('Failed to register!')
    // }
  }

  return (
    <AuthContainer>
      <AuthForm
        autoComplete="off"
        noValidate
        action="/api/signup"
        method="post"
      >
        <AuthFormControl variant="outlined">
          <TextField
            id="username"
            name="username"
            type="text"
            label="ЛОГИН"
            value={username}
            onChange={onChangeUsername}
            variant="outlined"
            margin="normal"
          />
        </AuthFormControl>
        <AuthFormControl variant="outlined">
          <TextField
            id="phone"
            name="phone"
            type="tel"
            label="ТЕЛЕФОН"
            value={phone}
            onChange={onChangePhone}
            variant="outlined"
            margin="normal"
          />
        </AuthFormControl>
        <br />
        <AuthFormControl variant="outlined">
          <TextField
            id="password"
            name="password"
            type="password"
            label="ПАРОЛЬ"
            value={password}
            onChange={onChangePassword}
            variant="outlined"
            margin="normal"
          />
        </AuthFormControl>
        <AuthButton
          type="submit"
          variant="outlined"
          color="primary"
          size="large"
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </AuthButton>
        <br />
        <Link href="/auth/login" color="secondary">
          У Вас уже есть аккаунт?
        </Link>
      </AuthForm>
    </AuthContainer>
  )
}

export default Register
