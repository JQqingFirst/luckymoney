<template>
  <div class="numlist" v-title='"投注单"'>
    <div class="nav clearfix">投注单
      <span class="fl some" @click="clearall()" onClick="javascript :history.back(-1);"><img src="./images/backicon.png"/></span>
    </div>
    <div class="listgroup">
      <div class="listup">
        <img src="./images/listup.png" alt="listup"/>
      </div>
      <div class="listcon" v-for="item in items">
        <div class="betlist clearfix">
          <div class="orderone fl">
            <p><span v-for="n in item.redorder" class="red">{{n | minTen}}</span>-<span v-for="n in item.blueorder"
                                                                                        class="blue">{{n | minTen}}</span>
            </p>
            <p class="distance">
              <span>{{item.betype}}</span>
              <span>{{item.betnum}}注</span>
              <span>{{item.multiple}}倍</span>
              <span>{{item.betmoney}}元</span>
            </p>
          </div>
          <p class="clear fr" @click="removeitem(item)"><img src="./images/clearnew.png"/></p>
        </div>
      </div>
    </div>
    <div class="listdown">
      <img src="./images/listdown.png" alt="listdown"/>
    </div>
    <p class="txt col666">购买即为同意
      <router-link to='/protocolh'><span class="col000">《乐赢彩票服务协议》</span></router-link>
    </p>
    <div class="foot">
      <div class="nav clearfix">
        <span class="fl some" @click="clearall()"><img src="./images/clear.png"/></span>
        <span class="red">共{{money}}元</span>&nbsp;<span class="fons">{{betnum}}注</span>
        <div class="fr isorder" :class="{isclick:isActive}" @click="payorder()">
          <!--:to="{path:(isActive?'/':'')}"-->
            确定
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex"
  import test from './js/test.js'
  import {getBrands, payCode, dltpayCode} from './../../service/getdata.js'

  export default {
    name: 'Dltnumlist',
    data() {
      return {
        items: test.fetch(),
        codeObj:test.codefetch(),
        title: '投注单',
        betnum: 0,
        redarr: null,
        bluearr: null,
        betype: '',
        money: 0,
        order: null,
        redorder: null,
        blueorder: null,
        isActive: false,
      }
    },
    computed: {
      ...mapState([
        'oneodrder', 'orderinfo'
      ])
    },
    methods: {
      init() {
        var total = 0;
        var count = 0
        console.log(this.items)
        for (var i = 0; i < this.items.length; i++) {
          total += this.items[i].betmoney
          count += this.items[i].betnum
        }
        this.money = total
        this.betnum = count
        this.active()
      },
      active() {
        if (this.items.length == 0) {
          this.isActive = false
        } else if (this.items.length > 0) {
          this.isActive = true
        }
      },
      createJson(items) {
        var codesList = [];
        var total = 0;
        var count = 0
        for (var i = 0; i < this.items.length; i++) {
          var codes = {
            cost: parseInt(this.items[i].betmoney),  //单注金额
            num: parseInt(this.items[i].multiple),  //单注倍数
            type: this.items[i].type,   //单注类型(标准/复试)
            code: this.getcode(this.items[i]) //单注选号
          }
          total += this.items[i].betmoney
          count += this.items[i].betnum
          this.money = total
          this.betnum = count
          codesList.push(codes)
        }
        var codesJson = {
          total: parseInt(total), //总金额
          codes: codesList,
          betNum: this.betnum  //注数
        }
        console.log(codesJson)
        test.saveCode(codesJson)
        return codesJson
//        return JSON.stringify(codesJson)
      },
      getcode(orderinfo) {
        var code = '';
        for (var i = 0; i < orderinfo.redorder.length; i++) {
          if (orderinfo.redorder[i] < 10) {
            orderinfo.redorder[i] = '0' + orderinfo.redorder[i];
          }
          code += orderinfo.redorder[i];

        }
        if (orderinfo.type == 1) {
          for (var i = 0; i < orderinfo.blueorder.length; i++) {
            if (orderinfo.blueorder[i] < 10) {
              orderinfo.blueorder[i] = '0' + orderinfo.blueorder[i];
            }
            code += orderinfo.blueorder[i];
          }
          code += "-";
          code += orderinfo.zhuijia;
        } else if (orderinfo.type == 2) {
          code += "-";
          for (var i = 0; i < orderinfo.blueorder.length; i++) {
            if (orderinfo.blueorder[i] < 10 && orderinfo.redorder[i].length < 2) {
              orderinfo.blueorder[i] = '0' + orderinfo.blueorder[i];
            }
            code += orderinfo.blueorder[i];
          }
          code += "-";
          code += orderinfo.zhuijia;
        }
        return code
      },
       payorder() {
        if (this.isActive) {
          test.saveCode(this.createJson(this.items))
          window.location.href = '/'
//          this.createJson(this.items) = null
//          this.codeObj = this.createJson(this.items)
//            let code = this.createJson(this.items)
//          let y = await dltpayCode({
//            req: code
//          })
//
//          if (y.data.errno == 1001 || y.data.errno == 6 || y.data.errno == 3) {
//            alert(y.data.errmsg)
//            if (y.data.errmsg == "用户未登录") {
//              window.location.href = '#/login'
//            } else {
//              return;
//            }
//          } else if (y.data.errno == 0) {
//            const orderno = ''
//            window.localStorage.setItem('orderno', y.data.data.orderNo)
//            window.location.href = '#/paypage'
//          } else {
//            alert(y.data.errmsg)
//          }
//          console.log(y)
        }

      },
      beforeMount() {},
      removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == val) {
            arr.splice(i, 1);
            break
          }
        }
      },
      removeitem(item) {
        console.log(item)
        this.removeByValue(this.items, item)
        this.init()
      },
      clearall() {
        this.items.splice(0, this.items.length)
        this.init()
        alert('已全部清空,请重新选号')
      }
    },
    filters: {
      minTen(val) {
        return val < 10 ? '0' + val : val;
      },
    },
    created() {},
    mounted() {
      this.init();
      this.beforeMount();
      this.active();
    },
    watch: {
      items: {
        handler: function (items) {
          test.save(items)
        },
        codeObj:{
          handler: function (codeObj) {
            test.saveCode(codeObj)
          },
        },
        deep: true
      },
    },
  }
</script>
<style scoped>
  .fl{float:left;}
  .fr{float:right;}
  .clearfix{overflow: auto;zoom:1;}
  .nav {width: 100%;height: 50px;background-color: #FFFFFF;font-size: 18px;line-height: 50px;text-align: center; border-bottom: 1px solid #b2b2b2;}
  .nav .some {width: 10px;position: relative;margin-left: 15px;}
  .nav .some1 {width: 25px;position: relative;margin-right: 18px;margin-top: 10px;}
  .nav .some img,.nav .some1 img{width: 100%; vertical-align: middle;}
  body {background-color: #F3F3F3;}
  .numlist{background-color: #F3F3F3;min-height: 620px;padding-bottom: 80px;}
  .numlist .randbox {width: 90%;margin: 0 auto;padding: 15px 0;}
  .red{color:#ed4e3c;}
  .blue{color:#00A0FF;}
  .randbox span {display: inline-block;border: 1px solid #d2d2d2;border-radius: 4px;background-color: #FFFFFF;width: 28%;height: 40px;line-height: 40px;text-align: center;font-size: 14px;color: #E74C3C;}
  .randbox .mar {margin-right: 20px;}
  .listup {width: 90%;margin: 10px auto 0;}
  .listup img, .listdown img {width: 100%;}
  .listdown {width: 86%;margin: 0 auto;}
  .listcon {width: 100%;margin: 0 auto;position: relative;margin-top: -8px;z-index: 1;}
  .betlist {margin: 0 auto;width: 86%;min-height: 60px;line-height: 25px;background-color: #fff; padding: 6px 0;border-top: 1px solid #E9E9E9;}
  .betlist img{height: 16px;width: 16px;}
  .betlist .orderone {width: 84%;margin: 5px 10px;font-size: 15px;word-wrap: break-word;}
  .betlist .orderone .red {margin-right: 7px;}
  .betlist .orderone .blue {margin-left: 7px;}
  .betlist .orderone .distance span {padding-right: 2px;font-size: 14px;color:#666;}
  .clear {margin-top: 20px;margin-right: 15px;}
  .txt {width: 100%;text-align: center;line-height: 30px;font-size: 12px;}
  .txt a{color: #00A0FF; text-decoration: none;}
  .foot {z-index: 10;position: fixed;left: 0;right: 0;bottom: 0;width: 100%;background-color: #fff;}
  .foot .nav {border: none;}
  .foot .nav img{width: 25px;}
  .fons {font-size: 20px;}
  .isorder {margin-right: 15px;margin-top: 10px;border-radius: 4px;width: 50px;height: 30px;line-height: 30px;text-align: center;background-color: #EEEEEE;color: #666;font-size: 18px;}
  .router-link-active {text-decoration: none;}
  .isclick {background-color: #e74c3c;color: #fff;}
</style>
