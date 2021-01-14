const { Pool, Client } = require('pg')

const connectionString = 'postgres://lzuquwin:v8Hpu0kN_JVXs5nlV1MKswuZZyITABmX@john.db.elephantsql.com:5432/lzuquwin'

const pool = new Pool({
  connectionString,
})

const client = new Client({
  connectionString,
})

client.connect()

module.exports = {
    pool,
    client
}