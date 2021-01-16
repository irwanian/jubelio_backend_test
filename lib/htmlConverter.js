const createTextVersion = require('textversionjs')

const convertHtmlToText = (html) => {
    return createTextVersion(html).replace(/\n/gi, '')
}

module.exports = {
    convertHtmlToText
}