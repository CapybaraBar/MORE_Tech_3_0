import * as React from 'react'
import { styled } from '@mui/material/styles'
import { FormControl } from '@mui/material'

const Root = styled(FormControl)(({ theme }) => ({
  '&': {
    minWidth: 320,
    ['@media (max-width:780px)']: {
      minWidth: '100%',
    },
  },
}))

const AuthFormControl = (props) => {
  return <Root {...props} />
}

export default AuthFormControl
