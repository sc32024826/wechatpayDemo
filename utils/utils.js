const xmlreader = require('xmlreader')
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
    paysignjsapi: function (appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type) {
        let ret = {
            appid: appid,
            mch_id: mch_id,             //商户ID
            nonce_str: nonce_str,       //随机字符串 
            body: body,                 //商品描述
            notify_url: notify_url,     //支付结果通知地址
            out_trade_no: out_trade_no, //商户订单号
            spbill_create_ip: spbill_create_ip, //终端IP
            total_fee: total_fee,       //标价金额 订单总金额
            trade_type: trade_type      //交易类型
        }

        let list = [...ret].filter(([k, v]) => k !== 'sign' && v)
        //按照ASCII 码排序
        list.sort()
        //用&拼接
        let paramsString = list.map(([k, v]) => `${k}=${v}`).join('&')

        //读取 私钥
        let privateKey = fs.readFileSync(config.PRIVATEKEY, 'utf-8')

        let stringSignTemp = paramsString.join('&key=' + privateKey)

        console.log(stringSignTemp);

        let md5 = crypto.createHash('md5')
        //MD5 加密 并转换成大写
        let sign = md5.update(stringSignTemp).digest('hex').toUpperCase()

        return sign


    }
}

module.exports = wxpay