import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import React from 'react'

const Root = styled(Button)(({ theme }) => ({
  '&': {
    margin: `${theme.spacing(4)} 0`,
  },
}))

const AuthButton = (props) => {
  return <Root {...props} />
}

export default AuthButton
