const { Pool, Client } = require('pg')

const connectionString = process.env.ELEPHANT_SQL_CONNECTION

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