const http = require('http')

function loadDatasets() {
  const body =
    '{"query":"{ search(input: { type: DATASET, query: \\"*\\", start: 0, count: 100 }) { start, count, total, searchResults { entity { urn, type, ...on Dataset{    properties { description, externalUrl }, name, urn, tags { tags { tag {urn, type, name} } }}}}}}","variables":null}'

  const options = {
    hostname: 'datahub.yc.pbd.ai',
    port: 9002,
    path: '/api/graphql',
    method: 'POST',
    headers: {
      Host: 'datahub.yc.pbd.ai',
      'Content-Length': body.length,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie:
        'bid=9d930be2-1d41-467d-833f-9b0c5500454e; PLAY_SESSION=669be67ce71855799441548a73a0d8a4293d0b89-actor=urn%3Ali%3Acorpuser%3Adatahub; actor=urn:li:corpuser:datahub',
    },
  }

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        method: 'POST',
        ...options,
      },
      (res) => {
        const chunks = []
        res.on('data', (data) => chunks.push(data))
        res.on('end', () => {
          let body = Buffer.concat(chunks)
          switch (res.headers['content-type']) {
            case 'application/json':
              body = JSON.parse(body)
              break
          }
          resolve({
            total: body.data.search.total,
            datasets: body.data.search.searchResults,
          })
        })
      },
    )
    req.on('error', reject)
    if (body) {
      req.write(body)
    }
    req.end()
  })
}

module.exports = loadDatasets
