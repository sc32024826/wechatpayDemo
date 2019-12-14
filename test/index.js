// let params = new Map()

// console.log(typeof params); //object

let res = {
    appid: "123",
    mch_id: "122",
    method: "post",
    postMessage: "asa",
    bacnk: "1231"
}

const wxpay  = require('../utils/utils')

let sing = wxpay.paysignjsapi(res)







