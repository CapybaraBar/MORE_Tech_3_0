import { getAuthCookie } from './auth'
import loadDatasets from './load-datasets'

const getServerSideProps = async function ({ req, res, params = {}, query = {} }) {
  const user = await getAuthCookie(req)

  if (user == null) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const { categoryId = null } = params
  let {total, datasets} = await loadDatasets()
  let categories = []
console.log(require('util').inspect(datasets, {depth:1000}))

  return {
    props: {
      user,
      categoryId,
      categories,
      datasets,
      total
    },
  }
}

export default getServerSideProps
