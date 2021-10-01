import React from 'react'
import { styled } from '@mui/material/styles'
import { Card, CardContent } from '@mui/material'

const Root = styled('form')(({ theme }) => ({
  '&': {
    width: 480,
    margin: `${theme.spacing(4)} auto`,
  },
}))

const Container = styled(Card)(({ theme }) => ({
  '&': {
    padding: theme.spacing(4),
  },
}))

const AuthForm = ({ children, ...props }) => {
  return (
    <Root {...props}>
      <Container>
        <CardContent>{children}</CardContent>
      </Container>
    </Root>
  )
}

export default AuthForm
