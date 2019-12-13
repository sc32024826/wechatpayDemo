const xml2 = require('xml2js');

/**
 * 将json 数据转化成xml 数据
 *
 * @param {*} object
 */
function ToXml(object) {

    let build = new xml2.Builder();
    let xml = build.buildObject(object);

    return xml
}

module.exports = ToXml