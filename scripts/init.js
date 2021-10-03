const { init } = require('../server/database')

void (async () => {
  await init()
})()
