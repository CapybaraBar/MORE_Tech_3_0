const { init } = require('../server/db')

void (async () => {
  await init()
})()
