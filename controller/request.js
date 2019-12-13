const ToXml = require('../utils/jsonToXml')
const axios = require('axios')

/**
 * 重复调用的方法
 *
 * @param {String} url 请求URL
 * @param {Object} json 请求参数
 */
async function Myrequest(url, json) {

    //首先将 请求参数json 转化成 xml 格式
    let data = ToXml(json);

    let res = axios({
        url: url,
        method: "POST",
        headers: {
            "Content-Type": "json/x-www-form-urlencoded;charset=utf-8"
        },
        data: data
    }.catch(e => {
        console.log(e);
        throw new error(e)
    }));

    if (res) {
        console.log(res);
        return res
    } else {
        throw new error("");
    }

}
module.exports = Myrequest