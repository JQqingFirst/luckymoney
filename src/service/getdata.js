
import axios from 'axios'
import qs from 'qs'
// import md5 from 'js-md5';

let mobile =15810650915;
// if(localStorage.getItem("person")){
// 	mobile=JSON.parse(localStorage.getItem("person")).mobile;
// }


let version="1.2.2";
let timestamp=new Date().getTime();
// validate.url+"/Api/Keeper/getInfo?signature="+signature+"&tel="+mobile+"&timestamp="+timestamp+"&version="+version
// let signature=md5("timestamp="+mobile+"&tel="+mobile+"&version=1.2.2"+version+"Tv,cM02kjf^lWoU")
// function changejson(json){
// 	json.signature = signature;
// 	json.tel = mobile;
// 	json.timestamp = timestamp;
// 	json.version = version;
// 	return json
// }

//大乐透支付
export const confirmCode = (json) => new axios.post("/webapi/pay/index", qs.stringify(json));
//大乐透投注
export const dltpayCode = (json) => new axios.post("/webapi/dlt/buy", qs.stringify(json));
// 投注
export const packagee = (json) => new axios.post("/webapi/dlt/package", qs.stringify(json));
// export const info = (json) =>new axios.get("/Api2/ZjisheDankuang/info",{'params':json});
// //我的好友列表
// export const userFriendList = (json) =>new axios.get("/Api2/ZjisheFriends/userFriendList", {'params':json});
// //帮好友喂鸡接口
// export const feed = (json) =>new axios.get("/Api2/ZjisheGamelog/feed", {'params':json});
// //偷蛋
// export const stealEgg = (json) =>new axios.get("/Api2/ZjisheGamelog/stealEgg", {'params':json});
// //鸡舍动态			user_id
// export const gameLogList = (json) =>new axios.post("/Api2/ZjisheGamelog/gameLogList", qs.stringify(json));
// //添加我的联系地址
// export const add = (json) =>new axios.post("/Api2/ZjisheAddress/add", qs.stringify(json));
// //获取默认收货地址信息
// export const getDefault = (json) =>new axios.get("/Api2/ZjisheAddress/getDefault",{'params':json});
// //订单配送计划  order_sn=JS20170719131130151
// export const infoList = (json) =>new axios.get("/Api2/EggDistributionInfo/infoList",{'params':json});
// //延期配送 		id=431
// export const delayedDelivery = (json) =>new axios.get("/Api2/EggDistributionInfo/delayedDelivery", {'params':json});
// //获取最近配送  http://123.57.65.163:10016/EggDistributionInfo/nextDelivery  我的蛋筐
// export const nextDelivery = (json) =>new axios.get("/Api2/EggDistributionInfo/nextDelivery", {'params':json});
// //领养鸡下单
// export const order = (json) =>new axios.post("/Api2/EggOrder/order", qs.stringify(json));
// //我的界面
// export const main = (json) =>new axios.get("/Api2/ZjisheDankuang/main", {'params':json});
// //掉微信接口
// export const wxpay = (json) =>new axios.get("http://weixin.yangjiguanjia.com/wxpay2/example/jsapi2.php", {'params':json});
// //金币兑换鸡蛋接口
// export const goldforegg = (json) =>new axios.post("/Api2/ZjisheFriends/goldforegg",qs.stringify(json));
// //领取好友赠送的鸡蛋
// export const getGift = (json) =>new axios.post("/Api2/EggDistributionInfo/getGift",qs.stringify(json));
// //添加朋友
// export const addFriends = (json) =>new axios.get("/Api2/ZjisheFriends/addFriends", {'params':json});
// //获取微信分享权限参数
// export const weichat = (json) =>new axios.get("http://weixin.yangjiguanjia.com/LaneWeChat2/api_getsign.php",{'params':json});




