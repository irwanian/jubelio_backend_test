const onSuccessResponse = ({ h, message, payload, rows }) => {
    return h.response({
        code: 200,
        rows,
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