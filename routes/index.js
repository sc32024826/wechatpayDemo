const router = require('koa-router')();
const ctrl = require('../controller/wechatpay');

//统一下单
router.get('/', ctrl.pay);
//查询订单
router.get('/', ctrl.orderSearch);
//关闭订单
router.get('/', ctrl.orderClose);
//申请退款
router.get('/', ctrl.refund);
//退款查询
router.get('/', ctrl.refundSearch);
//下载对账单
router.get('/', ctrl.downloadBill);
//下载资金账单
router.get('/', ctrl.downloadfundflow);
//支付结果通知
router.get('/', ctrl.payBack);
//退款结果通知
router.get('/', ctrl.refundBack);

 
module.exports = router
