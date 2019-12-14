const config = require('../config/wechat');
const { appid, mch_id, spbill_create_ip, trade_type } = config;
const signData = require('../utils/utils')
const moment = require('moment')
const req = require('./request')

/**
 * 微信统一下单
 * 支付订单时 应当提供 商品描述,商户订单号,总价,商品详情
 * @param {*} ctx
 */
async function pay(ctx) {
    //获取ctx中的必要参数,
    let params = ctx.request.body;
    let { body, out_trade_no, total_fee, detail } = params;
    //订单的自定义参数
    let attach = "自定义参数";
    //随机字符串
    let nonce_str = signData.createNonceStr;
    //
    let notify_url = "";
    //用户标示
    let openid = "";
    //交易起始时间
    let time_start = moment().format('YYYY-MM-DD HH:mm');
    //交易结束时间
    let time_expire = moment().add(20, 'minute');
    console.log(time_expire);
    //签名数据
    let sign = signData.paysignjsapi(appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type);
    //组装请求数据
    let requestData = {
        appid,
        mch_id,
        // device_info, //设备号
        nonce_str,
        sign,
        // sign_type, //签名类型 默认为MD5，支持HMAC-SHA256和MD5。
        body,
        // detail,  //商品详情
        // attach,  //附加数据
        out_trade_no,
        // fee_type //符合ISO 4217标准的三位字母代码，默认人民币：CNY
        total_fee,
        spbill_create_ip,
        // time_start, //
        // time_expire,
        // goods_tag, //订单优惠标记
        notify_url,
        trade_type,
        // product_id, //商品ID
        // limit_pay, //指定支付方式
        // openid,
        // receipt, //电子发票入口开放标识
        // scene_info, //场景信息
    }

    const url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    const URLBAK = "https://api2.mch.weixin.qq.com/pay/unifiedorder";

    try {
        let res = await req(url, requestData)

    } catch (e) {

    }
}
/**
 * 查询订单
 *
 * @param {*} ctx
 */
async function orderSearch(ctx) {
    let url = "https://api.mch.weixin.qq.com/pay/orderquery";
    let url_bak = "https://api2.mch.weixin.qq.com/pay/orderquery";
    //签名数据
    let sign = signData.paysignjsapi(appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type);

    TODO: //transaction_id  out_trade_no 二选一
    let requestData = {
        appid,
        mch_id,
        out_trade_no,
        //transaction_id,
        nonce_str,
        sign,
        //sign_type
    };
    if (transaction_id) {
        requestData = Object.assign(requestData, { transaction_id: transaction_id })
    } else if (out_trade_no) {
        requestData = Object.assign(requestData, { out_trade_no: out_trade_no })
    } else {
        throw new error("缺少必要参数")
    }
    try {
        let res = await req(url, requestData)

        let { return_code, msg, } = res;

        if (return_code === 'SUCCESS') {
            let { appid, mch_id, nonce_str, sign, result_code } = res;

            if (result_code === 'SUCCESS') {
                //let { openid, is_subscribe, trade_type, trade_state, bank_type, total_fee, cash_fee, transaction_id, out_trade_no } = res;
                console.log(res);

            } else {
                let { err_code, err_code_des } = res;
                console.log(err_code);
                console.log(err_code_des);
            }
        } else {
            console.log(msg);
        }
    } catch (e) {

    }



}
/**
 * 关闭订单
 *
 * @param {*} ctx
 */
async function orderClose(ctx) {
    let url = "https://api.mch.weixin.qq.com/pay/closeorder";
    let requestData = {
        appid,
        mch_id,
        out_trade_no,
        nonce_str,
        sign,
        // sign_type
    };
    try {
        let res = await req(url, requestData)

    } catch (e) {

    }

}
/**
 * 退款申请
 *
 * @param {*} ctx
 */
async function refund(ctx) {
    let url = "https://api.mch.weixin.qq.com/secapi/pay/refund";

    let requestData = {
        appid,
        mch_id,
        nonce_str,
        sign,
        // sign_type,        
        out_refund_no,
        total_fee,
        refund_fee,
        // refund_fee_type, //退款货币种类
        // refund_desc, //退款原因
        // refund_account, //退款资金来源
        // notify_url //退款结果通知url
    }
    //二选一 参数
    if (out_refund_no) {
        requestData = Object.assign(requestData, { out_refund_no: out_refund_no })
        console.log(requestData);
    } else if (transaction_id) {
        requestData = Object.assign(requestData, { transaction_id: transaction_id })
        console.log(transaction_id);
    } else {
        throw new error("缺少必要参数")
    }

    try {
        let res = await req(url, requestData)

    } catch (e) {

    }

}
/**
 * 退款查询
 *
 * @param {*} ctx
 */
async function refundSearch(ctx) {
    let url = "https://api.mch.weixin.qq.com/pay/refundquery";

    let { out_trade_no, transaction_id, out_refund_no, refund_id } = ctx.request.body;
    //签名
    TODO: 签名算法参数还需修改
    let sign = signData.paysignjsapi(appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type);

    let requestData = {
        appid,
        mch_id,
        nonce_str,
        sign,
        // offset  //偏移量
    };
    // 四个参数选择一个
    if (out_trade_no) {
        requestData = Object.assign(requestData, { out_trade_no: out_trade_no })
    } else if (transaction_id) {
        requestData = Object.assign(requestData, { transaction_id: transaction_id })
    } else if (out_refund_no) {
        requestData = Object.assign(requestData, { out_refund_no: out_refund_no })
    } else if (refund_id) {
        requestData = Object.assign(requestData, { refund_id: refund_id })
    } else {
        throw new error("参数错误")
    }


    try {
        let res = await req(url, requestData)

    } catch (e) {

    }


}
/**
 * 下载对账单
 *
 * @param {*} ctx
 */
async function downloadBill(ctx) {
    let url = "https://api.mch.weixin.qq.com/pay/downloadbill";

    let requestData = {
        appid,
        mch_id,
        nonce_str,
        sign,
        bill_date,  //对账单日期
        // bill_type, //账单类型
        // tar_type //压缩账单
    };

    try {
        let res = await req(url, requestData)

    } catch (e) {

    }

}
/**
 * 下载资金账单
 *
 * @param {*} ctx
 */
async function downloadfundflow(ctx) {
    let url = "https://api.mch.weixin.qq.com/pay/downloadfundflow";

    let requestData = {
        appid,
        mch_id,
        nonce_str,
        sign,
        // sign_type,  //签名类型，目前仅支持HMAC-SHA256
        bill_date,
        account_type,
        // tar_type //压缩账单
    };
    try {
        let res = await req(url, requestData)

    } catch (e) {

    }

}
/**
 * 支付结果通知
 *
 * @param {*} ctx
 */
async function payBack(ctx) {
    let res = ctx.request.body;
    let { return_code, msg, } = res;

    if (return_code === 'SUCCESS') {
        let { appid, mch_id, nonce_str, sign, result_code } = res;

        if (result_code === 'SUCCESS') {
            let { trade_type, prepay_id, code_url } = res;

        } else {
            let { err_code, err_code_des } = res;
            console.log(err_code);
            console.log(err_code_des);
        }
    } else {
        console.log(msg);
    }
}
/**
 * 退款结果通知
 *
 * @param {*} ctx
 */
async function refundBack(ctx) {
    let res = ctx.request.body;
    let { return_code, return_msg } = res;

    if (return_code === 'SUCCESS') {
        { appid, mch_id, nonce_str, req_info }
        { transaction_id, out_trade_no, refund_id, out_refund_no, total_fee }
        { refund_fee, settlement_refund_fee, refund_status, success_time, settlement_total_fee }
        { refund_recv_accout, refund_account, refund_request_source }
    }
}

module.exports = {
    pay,
    orderSearch,
    orderClose,
    refund,
    refundSearch,
    downloadBill,
    downloadfundflow,
    payBack,
    refundBack
}