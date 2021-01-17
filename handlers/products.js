const format = require('pg-format')
const { onSuccessResponse, onErrorResponse } = __lib('responses')
const { getEleveniaProductDetail } = __lib('eleveniaDataDownloader')
const { client } = __model

const getAllProducts = async (request, h) => {
    try {
        const { page = 1, rows = 50, order = 'id asc', keyword } = request.query
        const sqlQuery = `select *, count(*) over() as rows
                          from products${keyword ? ` where Lower(name) like Lower('%${keyword}%')` : ' '}
                          order by ${order} offset ${(page - 1) * rows} limit ${rows}`
    
        const sqlResponse = await client.query(sqlQuery)
        const totalRows = sqlResponse.rows.length > 0 ? Number(sqlResponse.rows[0].rows) : 0

        return onSuccessResponse({ h, rows: totalRows, payload: sqlResponse.rows })
    } catch (error) {
        return onErrorResponse({ h, payload: error.message })        
    }
}

const getProduct = async (request, h) => {
    try {
        const { id } = request.params
        const sqlQuery = `select * from products where id = ${id}`
    
        const sqlResponse = await client.query(sqlQuery)
        return onSuccessResponse({ h, payload: sqlResponse.rows })
    } catch (error) {
        return onErrorResponse({ h, payload: error.message })        
    }
}

const updateProduct = async (request, h) => {
    try {
        const { id } = request.params
        const { name, price, description, sku, image } = request.payload
        const sqlQuery = `update products set
                          name = '${name}',
                          price = ${price},
                          description= '${description}',
                          sku = '${sku}',
                          image = '${image}'
                          where id = ${id}
                          returning *`
    
        const sqlResponse = await client.query(sqlQuery)
        return onSuccessResponse({ h, payload: sqlResponse.rows })
    } catch (error) {
        return onErrorResponse({ h, payload: error.message })        
    }
}

const removeProduct = async (request, h) => {
    try {
        const { id } = request.params
        const sqlQuery = `delete from products where id = ${id} returning *`
    
        const sqlResponse = await client.query(sqlQuery)

        return onSuccessResponse({ h, payload: sqlResponse.rows })
    } catch (error) {
        return onErrorResponse({ h, payload: error.message })        
    }
}

const downloadProductsData = async (request, h) => {
    try {
        const page = request.query.page
        const result = await getEleveniaProductDetail(page)
        const dataWrittenIntoDb = await insertEleveniaProductToDB(result)

        return onSuccessResponse({ h, payload: dataWrittenIntoDb.rows })
    } catch (error) {
        return onErrorResponse({ h, payload: error.message })
    }
}

const insertEleveniaProductToDB = async (values) => {
    try {
        const sqlQuery = format(`insert into products ("name", "sku", "image", "description", "price")
        values %L returning *`, values)
        return await client.query(sqlQuery)
    } catch (error) {
        throw error        
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    downloadProductsData,
    removeProduct,
    updateProduct
}