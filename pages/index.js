import * as React from 'react'

import DatasetCard from '../client/DatasetCard'
import getServerSideProps from '../server/get-server-side-props'

export default function Index({ datasetPreviews, categories }) {
  return (
    <div>
      <div>
        <div>Категории</div>
        <ul>
          {categories.map(({ id, name }, index) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        {datasetPreviews.map((dataset) => (
          <DatasetCard key={dataset.id} {...dataset} />
        ))}
      </div>
    </div>
  )
}

export { getServerSideProps }
