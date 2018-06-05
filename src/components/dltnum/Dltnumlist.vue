<template>
  <div class="numlist" v-title='"投注单"'>
    <div class="nav clearfix">投注单
      <span class="fl some" @click="clearall()" onClick="javascript :history.back(-1);"><img src="./images/backicon.png"/></span>
    </div>
    <div class="randbox">
      <span class="mar" @click="randomcheck()">+&nbsp;随机1注</span>
      <span class="mar" @click="randomcheck5()">+&nbsp;随机5注</span>
      <span @click="randomcheck10()">+&nbsp;随机10注</span>
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
            <p class="distance"><span>{{item.betype}}</span><span>{{item.betmoney}}元</span><span>{{item.betnum}}注</span>
            </p>
          </div>
          <p class="clear fr" @click="removeitem(item)"><img src="./images/clear.png"/></p>
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
        <span class="fr isorder" v-bind:class="{isclick:isActive}" @click="payorder()">付款</span>
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
            cost: parseInt(this.items[i].betmoney),
            num: parseInt(this.items[i].multiple),
            type: this.items[i].type,
            code: this.getcode(this.items[i])
          }
          total += this.items[i].betmoney
          count += this.items[i].betnum
          this.money = total
          this.betnum = count
          codesList.push(codes)
        }
        var codesJson = {
          total: parseInt(total),
          codes: codesList,
          issues: 1
        }
        return JSON.stringify(codesJson)
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
            if (orderinfo.blueorder[i] < 10) {
              orderinfo.blueorder[i] = '0' + orderinfo.blueorder[i];
            }
            code += orderinfo.blueorder[i];
          }
          code += "-";
          code += orderinfo.zhuijia;
        }
        return code
      },
      randomcheck() {
        let a = [];
        let b = [];
        for (var x = 0; x < 5; x++) {
          let num = Math.floor(Math.random() * (35 - 1) + 1);
          if (a.indexOf(num) !== -1) {
            x--
          } else {
            a.push(num)
            this.redarr = a
          }
        }
        for (var y = 0; y < 2; y++) {
          let num2 = Math.floor(Math.random() * (12 - 1) + 1);
          if (b.indexOf(num2) !== -1) {
            y--
          } else {
            b.push(num2)
            this.bluearr = b
          }
        }

        let orderinfo = {
          redorder: this.redarr,
          blueorder: this.bluearr,
          betmoney: 2,
          betnum: 1,
          multiple: 1,
          betype: '标准',
          type: 1,
          zhuijia: 0
        }
        this.items.unshift(orderinfo)
        this.init()
      },
      randomcheck5() {
        for (var x = 0; x < 5; x++) {
          this.randomcheck()
        }
      },
      randomcheck10() {
        for (var x = 0; x < 10; x++) {
          this.randomcheck()
        }
      },
      async payorder() {
        if (this.isActive) {
          let code = this.createJson(this.items)
          let y = await dltpayCode({
            req: code
          })

          if (y.data.errno == 1001 || y.data.errno == 6 || y.data.errno == 3) {
            alert(y.data.errmsg)
            if (y.data.errmsg == "用户未登录") {
              window.location.href = '#/login'
            } else {
              return;
            }
          } else if (y.data.errno == 0) {
            const orderno = ''
            window.localStorage.setItem('orderno', y.data.data.orderNo)
            window.location.href = '#/paypage'
          } else {
            alert(y.data.errmsg)
          }
          console.log(y)
        }

      },
      beforeMount() {
        //				alert(this.users)
        //				this.users = 'ou3anbly1jo4oismju1sk2xfrfg4i77'
        //				document.cookie = "LACTK=" + this.users;
        //				alert(document.cookie)
      },
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
        //				this.active();
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
        deep: true
      },
    },
  }
</script>
<style scoped>
  .fl{float:left;}
  .fr{float:right;}
  .clearfix{overflow: auto;zoom:1;}
  .nav {width: 100%;height: 60px;background-color: #FFFFFF;font-size: 18px;line-height: 60px;text-align: center; border-bottom: 1px solid #b2b2b2;}
  .nav .some {width: 15px;position: relative;margin-left: 18px;margin-top: 10px;}
  .nav .some1 {width: 25px;position: relative;margin-right: 18px;margin-top: 10px;}
  .nav .some img,.nav .some1 img{width: 100%;}
  body {background-color: #F3F3F3;}
  .numlist{background-color: #F3F3F3;min-height: 600px;padding-bottom: 80px;}
  .numlist .randbox {width: 90%;margin: 0 auto;padding: 15px 0;}
  .red{color:#ed4e3c;}
  .blue{color:#00A0FF;}
  .randbox span {display: inline-block;border: 1px solid #d2d2d2;border-radius: 4px;background-color: #FFFFFF;width: 28%;height: 40px;line-height: 40px;text-align: center;font-size: 14px;color: #E74C3C;}
  .randbox .mar {margin-right: 20px;}
  .listup {width: 90%;margin: 0 auto;}
  .listup img, .listdown img {width: 100%;}
  .listdown {width: 86%;margin: 0 auto;}
  .listcon {width: 100%;margin: 0 auto;position: relative;margin-top: -8px;z-index: 1;}
  .betlist {margin: 0 auto;width: 86%;min-height: 60px;line-height: 25px;background-color: #fff; padding: 6px 0;border-top: 1px solid #E9E9E9;}
  .betlist img{height: 16px;width: 16px;}
  .betlist .orderone {width: 84%;margin: 5px 10px;font-size: 15px;word-wrap: break-word;}
  .betlist .orderone .red {margin-right: 7px;}
  .betlist .orderone .blue {margin-left: 7px;}
  .betlist .orderone .distance span {padding-right: 8px;font-size: 14px;color:#666;}
  .clear {margin-top: 20px;margin-right: 15px;}
  .txt {width: 100%;text-align: center;line-height: 25px;font-size: 12px;}
  .foot {z-index: 10;position: fixed;left: 0;right: 0;bottom: 0;width: 100%;background-color: #fff;}
  .foot .nav {border: none;}
  .fons {font-size: 20px;}
  .isorder {margin-right: 15px;margin-top: 15px;border-radius: 5px;width: 50px;height: 30px;line-height: 30px;text-align: center;background-color: #EEEEEE;color: #666;font-size: 18px;}
  .isclick {background-color: #e74c3c;color: #fff;}
</style>
