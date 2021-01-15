const format = require('pg-format')
const { onSuccessResponse, onErrorResponse } = __lib('responses')
const { getEleveniaProductDetail } = __lib('eleveniaDataDownloader')
const { client } = __model

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

const removeProduct = async (request, h) => {
    try {
        const { id } = request.params
        console.log(request.params)
        const sqlQuery = `delete from products where id = ${id} returning *`
    
        const sqlResponse = await client.query(sqlQuery)
        console.log({ sqlResponse: sqlResponse.rows })

        return onSuccessResponse({ h, payload: sqlResponse.rows })
    } catch (error) {
        console.log({ error })
        return onErrorResponse({ h, payload: error.message })        
    }
}
const downloadProductsData = async (request, h) => {
    try {
        const page = request.query.page
        const result = await getEleveniaProductDetail(page)
        const dataWrittenIntoDb = await insertEleveniaProductToDB(result)
        console.log({ dataWrittenIntoDb: dataWrittenIntoDb.rows })

        return onSuccessResponse({ h, payload: dataWrittenIntoDb.rows })
    } catch (error) {
        return onErrorResponse({ h, payload: error.message })
    }
}

const insertEleveniaProductToDB = async (values) => {
    try {
        const sqlQuery = format(`insert into products ("name", "sku", "image", "description", "price")
        values %L returning *`, values)
        // console.log({ values })
        return await client.query(sqlQuery)
    } catch (error) {
        console.log({ error })
        throw error        
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    downloadProductsData,
    removeProduct
}