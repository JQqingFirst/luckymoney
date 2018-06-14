<template>
    <div class="detail" v-title='"彩票详情"'>
      <div class="maintop">
        <div class="dltlogo">
          <img src="./images/dltlogo.png" alt="大乐透"/>
        </div>
        <p class="phase">{{phase}}</p>
        <ul class="ordertop clearfix">
          <li class="fl">
            <span>订单金额</span><br>
            <span>{{orderlist.ordermoney}}元</span>
          </li>
          <li class="fl">
            <span>订单状态</span><br>
            <span>{{orderlist.status}}</span>
          </li>
          <li class="fl">
            <span>税后奖金</span><br>
            <span class="colred">{{orderlist.luckmoney}}</span>
          </li>
        </ul>
        <div class="line"></div>
        <div class="orderinfo">
          <ul class="tit clearfix">
            <li class="fl"></li>
            <li class="fl">投注信息</li>
          </ul>
          <ul class="orderlist clearfix">
            <li class="ball redball fl" v-for="num in orderlist.ordernumred">{{num < 10 ? '0'+ num : num}}</li>
            <li class="fl">-</li>
            <li class="ball blueball fl">{{orderlist.ordernumblue < 10 ? '0'+ orderlist.ordernumblue : orderlist.ordernumblue}}</li>
          </ul>
          <p class="ordertype">
            <span>标准</span>
            <span>0.5注</span>
            <span>1元</span>
          </p>
        </div>
        <div class="line"></div>
      </div>
      <div class="mainbotm">
        <ul class="clearfix moreinfo">
          <li class="fl">订单号码</li>
          <li class="fl">{{orderlist.orderno}}</li>
        </ul>
        <ul class="clearfix moreinfo">
          <li class="fl">下单时间</li>
          <li class="fl">{{orderlist.ordertime}}</li>
        </ul>
        <ul class="clearfix moreinfo">
          <li class="fl">赠送人</li>
          <li class="fl">{{orderlist.ordername}}</li>
        </ul>
        <ul class="clearfix moreinfo">
          <li class="fl">购买地</li>
          <li class="fl">{{orderlist.orderder}}</li>
        </ul>
        <div class="line2"></div>
        <router-link class="toputbtn" to="/">
          <img src="./images/toputbtn.png" alt="点击发红包"/>
        </router-link>
      </div>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: 'Detail',
        data() {
            return {
              phase: '大乐透2017102期',
              orderlist:{
                ordermoney: '1.00',
                status:'待开奖',
                luckmoney: '--',
                ordernumred:[1,4,6,22,23,32],
                ordernumblue: '1',
                orderno:'GC161229162409721231851711',
                ordertime: '2018-07-01 18:26',
                ordername: '徐大毛',
                orderder: '乐赢彩票'
              }
            }
        },
        computed: {},

        methods: {
            filters: {

            },
            watch: {},
            created() {
            },
            mounted() {
            }
        }
    }
</script>
<style scoped>
  .fl{float: left;}
  .fr{float: right;}
  .clearfix{overflow: auto; zoom:1;}
  ul li{list-style: none;}
  body {background-color: #f8f8f8;}
  .detail{position: relative; width: 100%; background-color: #F2F7F9;min-height: 600px;padding: 24px 0;}
  .maintop{position: relative; width: 90%; background-color: #fff;min-height: 255px;margin: 0 auto; padding-top: 35px;border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;}
  .dltlogo{z-index: 10; position: absolute; width: 48px;height: auto;top:0; left: 0; right: 0; margin: -15px auto 0;}
  .dltlogo img,.toputbtn img{width: 100%;}
  .phase{position: relative;width: 100%;text-align: center; color: #333; font-size: 15px;}
  .ordertop{width: 92%; margin: 12px auto;}
  .ordertop li{width: 30%; margin-right: 12px; background-color: #F2F7F9; padding: 0 18px; line-height: 27px;text-align: center;}
  .ordertop li span:first-child{font-size: 13px; color: #666;}
  .ordertop li span:last-child{font-size: 16px; color: #333;}
  .ordertop li:last-child{margin-right:0;}
  .colred{color: #FD5545 !important;}
  .line{position: relative; width: 92%; margin: 5px auto;height: 3px; background: url("./images/line.png") no-repeat;background-size: 100% 100%;}
  .orderinfo{width: 92%;margin: 20px auto 0;}
  .orderinfo .tit li{font-size: 14px;}
  .orderinfo .tit li:first-child{width: 3px; height: 14px; background-color: #ED4E39; margin: 3px;}
  .orderlist{padding: 12px;}
  .orderlist li{margin: 0 2px;}
  .orderlist .ball{width: 23px; height: 23px; line-height: 22px; border: 1px solid #999; border-radius: 50%;text-align: center;font-size: 14px; margin-right: 6px;}
  .orderlist .redball{color: #ED4E39;}
  .orderlist .isred{border-color: #ED4E39; background-color: #ED4E39; color: #fff;}
  .orderlist .blueball{color: #409CFD;}
  .orderlist .isblue{border-color: #409CFD; background-color: #409CFD; color: #fff;}
  .ordertype{height: 25px; line-height: 25px; font-size: 12px; padding-left: 18px; color: #333;}
  .ordertype span{margin-right:7px;}
  .mainbotm{position: relative; width: 90%; background-color: #fff;min-height: 275px;margin: -5px auto 0;border-top-left-radius: 20px; border-top-right-radius: 20px;padding-top: 10px;box-shadow: 0px 10px 15px #DBE7EB;}
  .moreinfo{position: relative; width: 90%; padding: 5px 0; margin: 0 auto;}
  .moreinfo li{font-size: 14px; text-align: left; line-height: 20px;}
  .moreinfo li:first-child{width: 20%;margin-right: 14px;color: #999;}
  .line2{position: relative; width: 90%;height: 36px;margin: 15px auto; background: url("./images/botmbg.png") no-repeat;background-size: 100% 100%;}
  .toputbtn{position: fixed;width: 198px;bottom: 0;left: 0; right: 0; margin: 0 auto 120px; cursor: pointer;}
</style>
