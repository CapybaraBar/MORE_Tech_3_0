import * as React from 'react'
import { getAuthCookie } from '../server/auth'

import Dashboard from '../client/Dashboard'

export default function Index() {
  return <Dashboard />
}

export const getServerSideProps = async function ({ req, res }) {
  const user = await getAuthCookie(req)

  if (user == null) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}
