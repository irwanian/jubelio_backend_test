const { sendHttpRequest } = __lib('requests')
const { parseXmlToJson } = __lib('xmlConverter')
const { ELEVENIA_BASE_URL, ELEVENIA_API_KEY } = process.env

const getEleveniaProductIds = async (page) => {
    const eleveniaRequestElement = {
        method: 'get',
        url: `${ELEVENIA_BASE_URL}prodservices/product/listing?page=${page}`,
        headers: {
            headers: {
                'Content-type': 'application/xml',
                'Accept-Charset': 'utf-8',
                openapikey: ELEVENIA_API_KEY
            }
        }
    }

    const productsXmlData = await sendHttpRequest(eleveniaRequestElement)
    const jsonData = await parseXmlToJson(productsXmlData)
    const productIds = getProductId(jsonData.Products.product)

    return productIds
}

const getEleveniaProductDetail = async (page) => {
    if (page > 4) {
        throw { message: 'maximum page is 4' }
    }
    let ids = await getEleveniaProductIds(page)
    const productList = []
    const fetchData = new Promise((resolve, reject)=> {
        ids.forEach(async (id, index, array) => {
           const eleveniaRequestElement = {
               method: 'get',
               url: `${ELEVENIA_BASE_URL}prodservices/product/details/${id}`,
               headers: {
                   headers: {
                       'Content-type': 'application/xml',
                       'Accept-Charset': 'utf-8',
                       openapikey: ELEVENIA_API_KEY
                   }
               }
           }
           const productXmlData = await sendHttpRequest(eleveniaRequestElement)
           const jsonData = await parseXmlToJson(productXmlData)
           // console.log(jsonData.Product)
           productList.push(jsonData.Product)
           if (index === array.length - 1){
                resolve()
           }
       })
    })
    return fetchData.then(() => {
        return mapELeveniaProducts(productList)
    })
}

const getProductId = (products) => {
    let ids = []

    products.forEach(product => {
      ids.push(product.prdNo[0])  
    })

    return ids
}

const mapELeveniaProducts = (products) => {
    let mappedProducts = []
    products.forEach(product => {
        mappedProducts.push([
            product.prdNm[0],
            product.sellerPrdCd[0],
            product.prdImage01[0],
            product.htmlDetail[0],
            Number(product.selPrc[0])
        ]) 
    })

    return mappedProducts
}

module.exports = {
    getEleveniaProductDetail
}