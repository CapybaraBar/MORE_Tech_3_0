import { styled } from '@mui/material/styles'
import { FormControl } from '@mui/material'
import React from 'react'

const Root = styled(FormControl)(({ theme }) => ({
  '&': {
    minWidth: 320,
  },
}))

const AuthFormControl = (props) => {
  return <Root {...props} />
}

export default AuthFormControl
