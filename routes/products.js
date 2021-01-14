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
   
  module.exports = [getAllProducts, getProduct]