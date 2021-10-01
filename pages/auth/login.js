import React from 'react'
import { TextField } from '@mui/material'

import Link from '../../src/Link'
import AuthContainer from '../../src/AuthContainer'
import AuthForm from '../../src/AuthForm'
import AuthFormControl from '../../src/AuthFormControl'
import AuthButton from '../../src/AuthButton'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onChangeUsername = (e) => setUsername(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()

    window.alert('qqq')
    // const http = new Http();
    //
    // const data = {
    //   email: e.currentTarget.email.value,
    //   password: e.currentTarget.password.value,
    // }
    //
    // const response = await http.post('api/auth/login', data);
    // if (response.ok) {
    //   location.href = '/';
    // } else {
    //   alert('Failed to login!');
    // }
  }

  return (
    <AuthContainer>
      <AuthForm onSubmit={onSubmit} autoComplete="off" noValidate>
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
          ВОЙТИ
        </AuthButton>
        <br />
        <Link href="/auth/register" color="secondary">
          Создать аккаунт
        </Link>
      </AuthForm>
    </AuthContainer>
  )
}

export default Login
