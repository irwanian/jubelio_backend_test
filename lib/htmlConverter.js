const { htmlToText } = require('html-to-text')

const convertHtmlToText = (html) => {
    return htmlToText(html).replace(/\n+/gi, '')
}

module.exports = {
    convertHtmlToText
}