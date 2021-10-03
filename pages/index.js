import * as React from 'react'
import { getAuthCookie } from '../server/auth'

import Dashboard from '../client/Dashboard'

export default function Index() {
  return <Dashboard />
}

export const getServerSideProps = async function ({ req, res }) {
  const session = await getAuthCookie(req)
  console.log(session)

  if (session == null) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  const user = session

  return {
    props: {
      user,
    },
  }
}
