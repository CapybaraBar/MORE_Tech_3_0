const { Client } = require('pg')

function getClient() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345',
    port: 5432,
  })
  return client
}

/*
const { Pool } = require('pg')
const { RDS } = require('aws-sdk')

const signerOptions = {
  credentials: {
    accessKeyId: 'YOUR-ACCESS-KEY',
    secretAccessKey: 'YOUR-SECRET-ACCESS-KEY',
  },
  region: 'us-east-1',
  hostname: 'example.aslfdewrlk.us-east-1.rds.amazonaws.com',
  port: 5432,
  username: 'api-user',
}
const signer = new RDS.Signer()
const getPassword = () => signer.getAuthToken(signerOptions)
 */

function escapeId(str) {
  return `"${String(str).replace(/(["])/gi, '$1$1')}"`
}

function escapeStr(str) {
  return `'${String(str).replace(/(['])/gi, '$1$1')}'`
}

async function executeStatement(sql) {
  const client = getClient()

  try {
    await client.connect()

    const { rows } = await client.query(sql)

    if (rows == null) {
      return []
    }
    return rows
  } finally {
    await client.end()
  }
}

async function init() {
  await executeStatement(`
    DROP SCHEMA IF EXISTS ${escapeId('vtb')} CASCADE;
  `)
  await executeStatement(`
    CREATE SCHEMA ${escapeId('vtb')};
  `)

  await executeStatement(`
    CREATE TABLE ${escapeId('vtb')}.${escapeId('users')} (
      ${escapeId('id')} UUID PRIMARY KEY,
      ${escapeId('createdAt')} BIGINT,
      ${escapeId('username')} TEXT,
      ${escapeId('hash')} TEXT,
      ${escapeId('salt')} TEXT
    );
  `)
}
async function show() {
  console.log('Users:')
  console.log(
    await executeStatement(`
      SELECT * FROM ${escapeId('vtb')}.${escapeId('users')};
    `),
  )
}

async function createUser({ id, createdAt, username, hash, salt }) {
  await executeStatement(`
    INSERT INTO  ${escapeId('vtb')}.${escapeId('users')} (
      ${escapeId('id')}, 
      ${escapeId('createdAt')}, 
      ${escapeId('username')}, 
      ${escapeId('hash')}, 
      ${escapeId('salt')}
    ) VALUES (
      ${escapeStr(id)},
      ${createdAt},
      ${escapeStr(username)},
      ${escapeStr(hash)},
      ${escapeStr(salt)}
    );
  `)
}

async function findUser(username) {
  const rows = await executeStatement(`
    SELECT * FROM ${escapeId('vtb')}.${escapeId('users')} 
    WHERE ${escapeId('username')} = ${escapeStr(username)}
    LIMIT 1;
  `)

  if (rows.length === 0) {
    return null
  }

  return {
    id: rows[0].id,
    createdAt: +rows[0].createdAt,
    username: rows[0].username,
    hash: rows[0].hash,
    salt: rows[0].salt,
  }
}

module.exports = {
  createUser,
  findUser,
  init,
  show,
  escapeStr,
  escapeId,
  executeStatement,
}
