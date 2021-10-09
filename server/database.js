const { Client } = require('pg')
const util = require('util')
const userUtils = require('./user')

function getClient() {
  const user = process.env.PGUSER || 'postgres'
  const host = process.env.PGHOST || 'localhost'
  const database = process.env.PGDATABASE || 'postgres'
  const password = process.env.PGPASSWORD || '12345'
  const port = parseInt(process.env.PGPORT) || 5432

  return new Client({
    user,
    host,
    database,
    password,
    port,
  })
}

function escapeId(str) {
  return `"${String(str).replace(/(["])/gi, '$1$1')}"`
}

function escapeStr(str) {
  return `'${String(str).replace(/(['])/gi, '$1$1')}'`
}

async function executeStatement(sql, isDebug) {
  const client = getClient()

  try {
    await client.connect()

    if (isDebug) {
      console.log('Sql:', sql)
    }

    const { rows } = await client.query(sql)

    if (isDebug) {
      console.log('Result:', rows)
    }

    if (rows == null) {
      return []
    }
    return rows
  } finally {
    await client.end()
  }
}

const schemaName = 'vtb'
const schemaNameAsId = escapeId(schemaName)

const usersTableName = 'users'
const usersTableNameAsId = escapeId(usersTableName)

async function init() {
  await executeStatement(`
    DROP SCHEMA IF EXISTS ${schemaNameAsId} CASCADE;
  `)
  await executeStatement(`
    CREATE SCHEMA ${schemaNameAsId};
  `)

  /* Users */

  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${usersTableNameAsId} (
      ${escapeId('id')} UUID NOT NULL PRIMARY KEY,
      ${escapeId('createdAt')} BIGINT NOT NULL,
      ${escapeId('username')} TEXT NULL,
      ${escapeId('hash')} TEXT NULL,
      ${escapeId('salt')} TEXT NULL,
      ${escapeId('googleId')} TEXT NULL
    );
  `)

  await createUser(
    userUtils.createUserInMemory({ username: 'admin', password: 'admin'})
  )
}

async function show() {
  console.log('Users:')
  console.log(
    util.inspect(
      await executeStatement(`
      SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId};
    `),
      { compact: true, depth: 100, colors: true },
    ),
  )
}


async function createUser({ id, createdAt, username, hash, salt, googleId }) {
  await executeStatement(`
    INSERT INTO ${schemaNameAsId}.${usersTableNameAsId} (
      ${escapeId('id')},
      ${escapeId('createdAt')},
      ${escapeId('username')},
      ${escapeId('hash')},
      ${escapeId('salt')},
      ${escapeId('googleId')}
    ) VALUES (
      ${escapeStr(id)},
      ${createdAt},
      ${username == null ? 'NULL' : escapeStr(username)},
      ${hash == null ? 'NULL' : escapeStr(hash)},
      ${salt == null ? 'NULL' : escapeStr(salt)},
      ${googleId == null ? 'NULL' : escapeStr(googleId)}
    );
  `)
}

async function findUserByName(username) {
  const rows = await executeStatement(`
    SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId} 
    WHERE ${escapeId('username')} = ${escapeStr(username)}
    LIMIT 1;
  `, true)

  if (rows.length === 0 || rows[0].id == null) {
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

async function findUserByGoogleId(googleId) {
  const rows = await executeStatement(`
    SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId} 
    WHERE ${escapeId('googleId')} = ${escapeStr(googleId)}
    LIMIT 1;
  `, true)

  if (rows.length === 0 || rows[0].id == null) {
    return null
  }

  return {
    id: rows[0].id,
    createdAt: +rows[0].createdAt,
    username: rows[0].username,
    googleId: rows[0].hash
  }
}

module.exports = {
  createUser,
  findUser: findUserByName,
  init,
  show,
  escapeStr,
  escapeId,
  executeStatement
}
