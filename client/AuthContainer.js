import * as React from 'react'
import {Card, CardContent, Typography} from '@mui/material'
import { styled } from '@mui/material/styles'

const Root = styled('div')(({ theme }) => ({
  '&': {
    textAlign: 'center',
    paddingTop: theme.spacing(8),
    backgroundColor: '#00264c',
    backgroundImage: 'url(/images/background.jpg)',
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    height: '100%',
    ['@media (max-width:780px)']: {
      paddingTop: theme.spacing(4),
    },
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  '&': {
    color: '#ffffff',
    ['@media (max-width:780px)']: {
      fontSize: '2rem',
    },
  },
}))

const Container = styled(Card)(({ theme }) => ({
  '&': {
    width: '480px',
    margin: `${theme.spacing(4)} auto`,
    ['@media (max-width:780px)']: {
      width: '100%',
    },
    padding: theme.spacing(4),
  },
}))

// const Container = styled(Card)(({ theme }) => ({
//   '&': {
//
//   },
// }))

const AuthContainer = ({ children }) => {
  return (
    <Root>
      <Title variant="h2">ВТБ Data Marketplace</Title>
      <Container>
        {/*<Container>*/}
          <CardContent>{children}</CardContent>
{/*        </Container>*/}
      </Container>
    </Root>
  )
}

export default AuthContainer
