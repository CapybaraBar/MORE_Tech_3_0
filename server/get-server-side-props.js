import url from 'url'
import { getAuthCookie } from './auth'

const MAX_DATASETS_PER_PAGE = 20

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
  const page = +query.page
  let maxPages = null
  let datasetPreviews = []
  let categories = []

  const { pathname } = url.parse(req.url)

  if (pathname === '/') {
    // datasetPreviews = await getDatasetPreviews({ skip: MAX_DATASETS_PER_PAGE * page, limit: MAX_DATASETS_PER_PAGE })
    maxPages = Math.ceil(datasetPreviews.length / MAX_DATASETS_PER_PAGE)
  }
  if (pathname.includes('/categories/')) {
    // datasetPreviews = await getDatasetPreviewsByCategoryId({
    //   categoryId,
    //   skip: MAX_DATASETS_PER_PAGE * page,
    //   limit: MAX_DATASETS_PER_PAGE,
    // })
    maxPages = Math.ceil(datasetPreviews.length / MAX_DATASETS_PER_PAGE)
  }

  return {
    props: {
      user,
      categoryId,
      categories,
      page,
      maxPages,
      datasetPreviews,
    },
  }
}

export default getServerSideProps
