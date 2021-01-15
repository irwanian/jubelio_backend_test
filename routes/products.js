const handler = __handlers('products')

const getAllProducts = {
    method: 'GET',
    path: '',
    handler: handler.getAllProducts
  }

const getProduct = {
    method: 'GET',
    path: '{id}',
    handler: handler.getProduct
}

const downloadProductsData = {
  method: 'GET',
  path: 'download-products',
  handler: handler.downloadProductsData
}
   
  module.exports = [getAllProducts, getProduct, downloadProductsData]