const { Client } = require('pg')

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

const schemaName = 'vtb'
const schemaNameAsId = escapeId(schemaName)

const usersTableName = 'users'
const usersTableNameAsId = escapeId(usersTableName)

const categoriesTableName = 'categories'
const categoriesTableNameAsId = escapeId(categoriesTableName)

const datasetsTableName = 'datasets'
const datasetsTableNameAsId = escapeId(datasetsTableName)

const supportedFormats = ['xml', 'csv', 'json']

async function init() {
  await executeStatement(`
    DROP SCHEMA IF EXISTS ${schemaNameAsId} CASCADE;
  `)
  await executeStatement(`
    CREATE SCHEMA ${schemaNameAsId};
  `)

  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${usersTableNameAsId} (
      ${escapeId('id')} UUID NOT NULL PRIMARY KEY,
      ${escapeId('companyId')} UUID NULL,
      ${escapeId('createdAt')} BIGINT NOT NULL,
      ${escapeId('username')} TEXT NOT NULL,
      ${escapeId('hash')} TEXT NOT NULL,
      ${escapeId('salt')} TEXT NOT NULL
    );
  `)

  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${categoriesTableNameAsId} (
      ${escapeId('id')} UUID NOT NULL PRIMARY KEY,
      ${escapeId('name')} TEXT NOT NULL
    );
  `)

  await executeStatement(`
    CREATE TABLE ${schemaNameAsId}.${datasetsTableNameAsId} (
      ${escapeId('id')} UUID NOT NULL PRIMARY KEY ,
      ${escapeId('userId')} UUID NOT NULL,
      ${escapeId('categoryId')} UUID NOT NULL,
      ${escapeId('title')} TEXT NOT NULL,
      ${escapeId('description')} TEXT NOT NULL,
      ${escapeId('format')} TEXT NOT NULL,
      ${escapeId('viewCount')} BIGINT NOT NULL,
      ${escapeId('downloadCount')} BIGINT NOT NULL,
      ${escapeId('releases')} JSONB NOT NULL,
      ${escapeId('structure')} JSONB NOT NULL,
      ${escapeId('subscriptionPrice')} BIGINT NULL,
      ${escapeId('oneTimeSalePrice')} BIGINT NULL
    );
  `)

  // releases: JSONB Array<{ releasedAt, releaseId, price }>

  // structure: {
  //   fieldName: text,
  //     description?: text
  //   englishDescription?: text,
  //     russianDescription?: text,
  //     format?: text
  // }
}
async function show() {
  console.log('Users:')
  console.log(
    await executeStatement(`
      SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId};
    `),
  )
  console.log('Categories:')
  console.log(
    await executeStatement(`
      SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId};
    `),
  )
  console.log('Categories:')
  console.log(
    await executeStatement(`
      SELECT * FROM ${schemaNameAsId}.${sou};
    `),
  )
}

async function createUser({ id, createdAt, username, hash, salt }) {
  await executeStatement(`
    INSERT INTO  ${schemaNameAsId}.${usersTableNameAsId} (
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
    SELECT * FROM ${schemaNameAsId}.${usersTableNameAsId} 
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
