const mongoose = require('mongoose')
const Schema = mongoose.Schema

//订单
const orderSchema = new Schema({
    body: String,               //商品描述
    detail: String,             //商品详情
    attach: String,             //附加数据
    out_trade_no: String,       //商户订单号
    total_fee: Number,          //标价金额
    spbill_create_ip: String,   //终端IP
    time_start: String,         //交易起始时间
    time_expire: String,        //交易结束时间
    goods_tag: String,          //订单优惠标记
    product_id: String,         //商品ID
    openid: String,             //用户标示
    return_code: String,        //返回状态码
    result_code: String,        // 交易成功标识
    return_msg: String,         //返回信息
    err_code: String,           //错误代码
    err_code_des: String,       //错误代码描述
})

const order = mongoose.model("wechatpay", orderSchema);

module.exports = order