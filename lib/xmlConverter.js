const { parseStringPromise } = require('xml2js')

const convertXmlToJson = async (xml) => {
    try {
        xml = xml.includes('\\') ? xml.replace(/\\/gi, '') : xml
    
        return await parseStringPromise(xml)
    } catch (error) {
        throw error        
    }
}

module.exports = {
    convertXmlToJson
}