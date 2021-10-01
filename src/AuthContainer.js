import React from 'react'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const Root = styled('div')(({ theme }) => ({
  '&': {
    textAlign: 'center',
    paddingTop: theme.spacing(8),
    backgroundColor: '#00264c',
    background: 'url(/background.jpg)',
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    height: '100%',
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  '&': {
    color: '#ffffff',
  },
}))

const AuthContainer = ({ children }) => {
  return (
    <Root>
      <Title variant="h2">ВТБ Data Marketplace</Title>
      <React.Fragment>{children}</React.Fragment>
    </Root>
  )
}

export default AuthContainer
