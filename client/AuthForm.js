import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Card, CardContent } from '@mui/material'



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
