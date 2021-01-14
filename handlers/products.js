const { onSuccessResponse, onErrorResponse } = __lib('responses')
const { client } = require('../model')

const getAllProducts = async (request, h) => {
    try {
        const { page = 1, rows = 50, order = 'id asc', keyword } = request.query
        const sqlQuery = `select * from products${keyword ? ` where name like '%${keyword}%'` : ''}
                          order by ${order} offset ${page - 1} limit ${rows}`
    
        const sqlResponse = await client.query(sqlQuery)
        console.log({ sqlResponse: sqlResponse.rows })
        return onSuccessResponse({ h, payload: sqlResponse.rows })
    } catch (error) {
        console.log({ error })
        return onErrorResponse({ h, payload: error.message })        
    }
}

const getProduct = async (request, h) => {
    try {
        const { id } = request.params
        console.log(request.params)
        const sqlQuery = `select * from products where id = ${id}`
    
        const sqlResponse = await client.query(sqlQuery)
        console.log({ sqlResponse: sqlResponse.rows })
        return onSuccessResponse({ h, payload: sqlResponse.rows })
    } catch (error) {
        console.log({ error })
        return onErrorResponse({ h, payload: error.message })        
    }
}

module.exports = {
    getAllProducts,
    getProduct
}