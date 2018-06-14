<template>
    <div class="selfredbag" v-title='"红包中心"'>
      <p class="tips">红包中奖金需要绑定手机号并下载乐赢彩票APP进行绑卡提现</p>
      <!--个人信息-->
      <ul class="clearfix selfinfo">
        <li class="fl selfavatar">
          <img src="./images/avatar.png" alt="avatar"/>
        </li>
        <li class="fl">
          <p class="selfname">{{selfName}}</p>
          <p class="selfphone">绑定手机号:{{selfPhone}}</p>
        </li>
      </ul>
      <!--可提现金额-->
      <ul class="selfmoney clearfix">
        <li class="fl">红包奖金: <strong>{{bonusMoney}}</strong>元</li>
        <li class="withdraw fr" @click="ifpop()">提现</li>
      </ul>
      <!--发出/领取红包记录-->
      <div class="selflist">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收到的红包" name="first">
            <ul class="clearfix selflistul" v-for="item in perList">
              <li class="fl peravatar">
                <img src="./images/avatar.png" alt="avatar"/>
              </li>
              <li class="fl">
                <p class="pername">{{item.perName}}</p>
                <p class="pertime">{{item.perTime}}</p>
              </li>
              <li class="fr">
                <p class="permoney">¥<span>{{item.perMoney}}</span></p>
                <p class="perbouns" :class="{colred:(item.perbouns.substring(0,2) == '中奖')}"><span>{{item.perbouns}}</span></p>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="发出的红包" name="second">
            <ul class="clearfix selflistul" v-for="item in perList">
              <li class="fl peravatar">
                <img src="./images/avatar.png" alt="avatar"/>
              </li>
              <li class="fl">
                <p class="pername">{{item.perName}}</p>
                <p class="pertime">{{item.perTime}}</p>
              </li>
              <li class="fr">
                <p class="permoney">¥<span>{{item.perMoney}}</span></p>
                <p class="perbouns" :class="{colred:(item.perbouns.substring(0,2) == '中奖')}"><span>{{item.perbouns}}</span></p>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <router-link class="toputbtn" to="/">
        <img src="./images/toputbtn.png"/>
      </router-link>
      <div class="popupBox" v-show="ispop">
        <div class="certifietop">
          <!--<img src="./images/certifie.png" alt="什么破网!?你能不能刷新下!!"/>-->
          <ul>
            <li>资金提现需要绑定手机号</li>
            <li>绑定手机号完成后下载乐赢彩票APP，根据绑定好的手机号注册，登陆后在个人中心绑卡提现</li>
            <li>如有疑问请咨询官方客服：400-900-282或添加客服微信：lewin2017</li>
            <li>本活动最终解释权归乐赢彩票所有。</li>
          </ul>
        </div>
        <div class="certifiebotm">
          <div class="certified">
            <p class="txtbox">
              <input class="txtinput" type="text" placeholder="请输入手机号"/>
            </p>
            <div class="clearfix">
              <p class="verbox fl">
                <input class="txtinput" type="text" placeholder="验证码"/>
              </p>
              <p class="verbox1 fl">
                <input class="txtbtn" type="button" value="获取验证码"/>
              </p>
            </div>

          </div>
          <ul class="clearfix btn">
            <li class="fl" @click="ifpop()">取消</li>
            <li class="fl">确定</li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: 'Selfredbag',
        data() {
            return {
              ispop:false,
              selfName: '我自己',
              selfPhone: '未绑定',
              bonusMoney: '123.00',
              activeName: 'first',
              perList:[
                {
                  perName: 'Lee',
                  perTime: '2018-10-25 00:27',
                  perMoney: '2.00',
                  perbouns: '未中奖'
                },
                {
                  perName: 'Lee',
                  perTime: '2018-10-25 00:27',
                  perMoney: '2.00',
                  perbouns: '中奖¥500.00'
                },
                {
                  perName: 'Lee',
                  perTime: '2018-10-25 00:27',
                  perMoney: '2.00',
                  perbouns: '未中奖'
                },
                {
                  perName: 'Lee',
                  perTime: '2018-10-25 00:27',
                  perMoney: '2.00',
                  perbouns: '未中奖'
                }
              ],
            }
        },
        computed: {},

        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          },
          ifpop(){
            this.ispop = !this.ispop;
          },
          filters: {},
          watch: {},
          created() {},
          mounted() {}
        }
    }
</script>
<style>
  .el-tabs__item.is-active{color: #F6463D;}
  .el-tabs__active-bar{background-color: #F6463D;}
</style>
<style scoped>
  .fl{float: left;}
  .fr{float: right;}
  .clearfix{overflow: auto; zoom:1;}
  ul li{list-style: none;}
  body {background-color: #F2F7F9;}
  .selfredbag{background-color: #F2F7F9;min-height: 500px;}
  .tips{position: relative;height: 24px; line-height: 24px; font-size: 12px; color: #fff; background-color: #F4483C;padding-left: 18px;}
  .selfinfo{padding: 18px; background-color: #fff;border-bottom: 1px solid #F2F7F9;}
  .selfavatar{width: 60px; height: 60px; border-radius: 50%; margin-right: 6px;}
  .selfavatar img,.peravatar img,.certifietop img,.toputbtn img{width: 100%;}
  .selfname{font-size: 16px; color: #333;line-height: 35px;}
  .selfphone{font-size: 14px; color: #666;}
  .selfmoney{height: 50px; padding: 7px 18px; background-color: #fff;}
  .selfmoney li:first-child{line-height: 36px;}
  .selfmoney li:first-child strong{font-size: 18px; color: #E74C3C;padding: 0 3px;}
  .withdraw{ width: 90px; height: 36px; line-height: 36px; text-align: center; border: 1px solid #F4483C; border-radius: 50px; color: #F4483C; cursor: pointer;}
  .selflist{position: relative; width: 100%;margin-top: 12px; background-color: #fff;padding: 0 12px 30px; min-height: 200px;}
  .selflistul{border-bottom: 1px solid #D0D0D0;padding: 12px 0;}
  .peravatar{width: 42px; height: 42px;margin-right: 12px;}
  .peravatar img{vertical-align: middle;}
  .pername{font-size: 18px; color: #333; line-height: 30px;}
  .pertime{font-size: 12px; color: #999;}
  .permoney{font-size: 12px; color: #666;text-align: right; line-height: 30px;}
  .perbouns{font-size: 15px; color: #999;}
  .colred{color: #FD5545;}
  .toputbtn{position: fixed;width: 198px;bottom: 0;left: 0; right: 0; margin: 0 auto 30px; cursor: pointer;}
  .popupBox{z-index: 500; position: fixed; top: 0;bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,0.8);}
  .certifietop{position: relative;width: 342px; height: 204px; margin: 78px auto 0; background: url("./images/certifie.png") no-repeat;background-size: 100% 100%;}
  .certifietop ul{position: relative; width: 100%;padding: 35px 30px 0 46px;}
  .certifietop ul li{list-style: disc;font-size: 12px; color: #fff; line-height: 20px;}
  .certifiebotm{width: 303px;min-height: 225px;background-color: #fff;margin: -5px auto 0; border-bottom-left-radius: 7px; border-bottom-right-radius: 7px;}
  .certified{width: 94%; margin: 0 auto; padding: 12px 18px 20px;}
  .txtbox{width: 100%; height: 44px; border: 1px solid #979797; border-radius: 4px; margin-bottom: 18px;padding: 3px 12px;}
  .verbox{width: 55%;height: 44px; border: 1px solid #979797; border-radius: 4px; margin-bottom: 18px; margin-right:7px; padding: 3px 12px;}
  .txtinput{width: 100%; height: 35px; font-size: 14px;outline: none;}
  .verbox1{width: 42%;height: 44px;background-color: #FDD591; text-align: center;line-height: 44px; border-radius: 4px;}
  .verbox1 input{color: #fff;}
  .btn{width: 90%; margin: 0 auto;}
  .btn li{width: 46%; height: 44px; line-height: 44px; text-align: center; border-radius: 22px;font-size: 18px;}
  .btn li:first-child{color: #979797; background-color: #fff;border: 1px solid #979797;margin-right: 18px;}
  .btn li:last-child{color: #FDD591; background-color: #F8453E;border: 1px solid #F8453E;}
</style>
