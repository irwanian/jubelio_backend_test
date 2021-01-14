const onSuccessResponse = ({ h, message, payload }) => {
    return h.response({
        code: 200,
        message: message || 'success',
        payload: payload || {}
    })
}

const onErrorResponse = ({ h, message, payload }) => {
    return h.response({
        code: 400,
        message: message || 'request failed',
        payload: payload || {}
    })
}

module.exports = {
    onSuccessResponse,
    onErrorResponse
}