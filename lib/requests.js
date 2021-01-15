const axios = require('axios')

const sendHttpRequest = async ({ url, method, body, headers }) => {
    try {
        headers ? headers : headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = method === ('get' || 'delete') ? await axios[method](url, headers) : await axios[method](url, body, headers) 
        
        return data
    } catch (error) {
        if (error.response){
            throw error.response.message.data
        }
        throw error
    }
}

module.exports = {
    sendHttpRequest
}