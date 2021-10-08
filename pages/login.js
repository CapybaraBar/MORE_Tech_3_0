import React from 'react'
import { TextField } from '@mui/material'
import Divider from '@mui/material/Divider'
import GoogleIcon from '@mui/icons-material/Google'
import Button from '@mui/material/Button'

import Link from '../client/Link'
import AuthContainer from '../client/AuthContainer'
// import AuthForm from '../client/AuthForm'
import AuthFormControl from '../client/AuthFormControl'
import AuthButton from '../client/AuthButton'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onChangeUsername = (e) => setUsername(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)

  return (
    <AuthContainer>
      <form autoComplete="off" noValidate action="/api/login/local" method="post">
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
        <AuthButton type="submit" variant="outlined" color="primary" size="large">
          ВОЙТИ
        </AuthButton>
      </form>
      <Divider> или </Divider>
      <form autoComplete="off" noValidate action="/api/login/google" method="post">
        <AuthButton type="submit" variant="outlined" color="primary" size="large" startIcon={<GoogleIcon />}>
          Continue with Google
        </AuthButton>
      </form>
    </AuthContainer>
  )
}

export default Login
