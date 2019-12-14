const fs = require('fs')
const config = require('../config/wechat')
const crypto = require('crypto')

const wxpay = {
    //金额转化为分
    getmoney: function (money) {
        return parseFloat(money) * 100
    },

    // 随机字符串产生函数
    createNonceStr: function () {
        return Math.random().toString(36).substr(2, 15)
    },

    // 时间戳产生函数
    createTimeStamp: function () {
        return parseInt(new Date().getTime() / 1000) + ''
    },

    //签名加密算法
    paysignjsapi: function (ret) {

        // let list = [...ret].filter(([k, v]) => k !== 'sign' && v)
        let list = [];
        for (let i in ret) {
            let s = i + "=" + ret[i]
            list.push(s);
        }
        console.log(list);
        
        //按照ASCII 码排序
        list.sort()
        //用&拼接
        let paramsString = list.join('&')
        console.log(paramsString);
        
        //读取 私钥
        let privateKey = fs.readFileSync(config.PRIVATEKEY_PATH, 'utf-8')

        let stringSignTemp = paramsString.join('&key=' + privateKey)

        console.log(stringSignTemp);

        let md5 = crypto.createHash('md5')
        //MD5 加密 并转换成大写
        let sign = md5.update(stringSignTemp).digest('hex').toUpperCase()

        return sign


    }
}

module.exports = wxpay