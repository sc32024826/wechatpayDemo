// let params = new Map()

// console.log(typeof params); //object

let res = {
    appid: "123",
    mch_id: "122",
    method: "post",
    postMessage: "asa",
    bacnk: "1231"
}

// const wxpay  = require('../utils/utils')

// let sing = wxpay.paysignjsapi(res)


let a = "1";
let b;

if (a) {
    res = Object.assign(res, { a: a })
    console.log("1");

    console.log(res);

}
if (b) {
    res = Object.assign(res, { b: b })
    console.log("2");

    console.log(res);

}



