import * as React from 'react'
import { getLoginSession } from '../lib/auth'

import Dashboard from '../src/Dashboard'

export default function Index() {
  return <Dashboard />
}

export const getServerSideProps = async function ({ req, res }) {
  const session = await getLoginSession(req)
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
