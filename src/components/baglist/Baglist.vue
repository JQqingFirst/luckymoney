<template>
    <div class="baglist" v-title='"乐赢彩票"'>
      <div class="list-top">
        <ul class="giveperson">
          <li class="avatar">
            <img src="./images/avatar.png" alt="头像">
          </li>
          <li class="nick"><span>{{giveNickName}}</span>的大乐透红包</li>
          <li class="bagmoney"><strong>{{bagMoney}}</strong>元<span>({{bagBet}}注)</span></li>
          <li class="toputbtn">
            <router-link to="/">
              <img src="./images/toputbtn.png" alt="点击发红包"/>
            </router-link>
          </li>
          <li>查看彩票详情>></li>
        </ul>
        <p class="btn btn-left" @click="ifpop()">
          更多红包
        </p>
        <p class="btn btn-right sharebtn">分享</p>
        <router-link to="/Selfredbag" class="btn btn-right bagcenter">
          红包中心
        </router-link>
        <span class="coner coner-left"><img src="./images/coner-left.png"/></span>
        <span class="coner coner-right"><img src="./images/coner-right.png"/></span>
      </div>
      <div class="list-bottom">
        <p class="putnum">领取<span>{{putNum}}</span>个/20个</p>
        <div class="perlist">
          <ul class="clearfix" v-for="item in perList">
            <li class="fl oneavatar">
              <img src="./images/avatar.png" alt="avatar"/>
            </li>
            <li class="fl">
              <p class="onename">{{item.oneName}}</p>
              <p class="onetime">{{item.oneTime}}</p>
            </li>
            <li class="fr">
              <p class="onemoney">¥<span>{{item.oneMoney}}</span></p>
              <p class="onebet"><span>{{item.oneBet}}</span>注</p>
            </li>
          </ul>
        </div>

      </div>
      <!-- 弹出层一 -->
      <div class="popupBox" v-show="ispop" >
        <div class="closebtn" @click="ifpop()">
          <img src="./images/close-icon.png" alt="关闭"/>
        </div>
        <div class="erbg">
          <!--<div></div>二维码位置-->
          <p class="erbg-txt">识别二维码或添加“小乐”微信号(lewin2017)邀请进群 抢更多红包</p>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: 'Baglist',
        data() {
            return {
              title: '我是标题',
              giveNickName: "施才其",
              bagMoney:'5.20',
              bagBet: 2.3,
              putNum: 3,
              perList:[
                {
                  oneName: 'Lee',
                  oneTime: '2018-10-25 00:27',
                  oneMoney: '2.00',
                  oneBet: '1'
                },
                {
                  oneName: 'Lee',
                  oneTime: '2018-10-25 00:27',
                  oneMoney: '2.00',
                  oneBet: '1'
                },
                {
                  oneName: 'Lee',
                  oneTime: '2018-10-25 00:27',
                  oneMoney: '2.00',
                  oneBet: '1'
                },
                {
                  oneName: 'Lee',
                  oneTime: '2018-10-25 00:27',
                  oneMoney: '2.00',
                  oneBet: '1'
                }
              ],
              ispop: false
            }
        },
        computed: {},

        methods: {
          ifpop(){
            this.ispop = !this.ispop;
          },
            filters: {},
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
  .baglist{position: relative; width: 100%;}
  .list-top {position: relative;height: 307px;padding-top: 30px;
    background: -webkit-linear-gradient(#FC704B, #FD4140); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#FC704B, #FD4140); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#FC704B, #FD4140); /* Firefox 3.6 - 15 */
    background: linear-gradient(#FC704B, #FD4140); /* 标准的语法（必须放在最后)*/
  }
  .giveperson li{text-align: center; color: #FFE99F;}
  .avatar{position: relative; width: 60px; height: 60px;border-radius: 50%;margin: 0 auto 15px;}
  .avatar img,.toputbtn img,.coner img,.oneavatar img,.closebtn img{width: 100%;}
  .nick{font-size: 18px;font-weight: 500;}
  .bagmoney{font-size: 14px;margin: 12px 0 18px;}
  .bagmoney strong{font-size: 30px;padding-right: 3px;}
  .bagmoney span{padding-left: 8px;}
  .toputbtn{width: 198px;height: 60px;margin: 0 auto;}
  .giveperson li:last-child{color: #fff;margin-top: 20px;}
  .btn{position: absolute;width: 80px; height: 30px; line-height: 30px; background-color: rgba(0,0,0,0.2); font-size: 12px; color:#FFE99F; text-align: center;text-decoration: none;}
  .btn-left{border-top-right-radius: 50px;border-bottom-right-radius: 50px;left: 0; top: 0;margin-top: 30px;}
  .btn-right{border-top-left-radius: 50px;border-bottom-left-radius: 50px; right: 0; top: 0;}
  .sharebtn{margin-top: 30px;}
  .bagcenter{margin-top: 96px;}
  .coner{position: absolute;width: 18px; height: 18px;bottom: 0; margin-bottom: 25px;}
  .coner-left{left: 0; margin-left: 18px;}
  .coner-right{right: 0; margin-right: 18px;}
  .list-bottom{position: relative;border-top-left-radius: 7px;border-top-right-radius: 7px;margin-top: -7px;background-color: #fff;padding: 0 20px;height: 100px;}
  .putnum{height: 40px; line-height: 40px; font-size: 12px; color: #666;}
  .perlist ul{border-bottom: 1px solid #D0D0D0;padding: 12px 0;}
  .oneavatar{width: 42px; height: 42px;margin-right: 12px;}
  .oneavatar img{vertical-align: middle;}
  .onename{font-size: 18px; color: #333; line-height: 30px;}
  .onetime{font-size: 12px; color: #999;}
  .onemoney{font-size: 18px; color: #FD5545; line-height: 30px;}
  .onebet{font-size: 12px; color: #999;text-align: right;}
  .popupBox{z-index: 500; position: fixed; top: 0;bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,0.8);}
  .closebtn{position: absolute; top: 0; right: 0; width: 30px; height: 30px; margin-top: 36px; margin-right: 36px;}
  .erbg{position: relative; width: 300px; height: 402px; margin: 102px auto 0; background: url("./images/erbg.png") no-repeat; background-size: 100% 100%;}
  .erbg-txt{position: relative; width: 100%;text-align: center;font-size: 13px; color: #fff;line-height: 25px;padding: 280px 20px 0;}
</style>
