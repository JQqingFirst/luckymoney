<template>
    <div class="checknum">
        <div class="nav clearfix">{{title}}
            <span class="fl some"  onClick="javascript :history.back(-1);"><img src="./images/backicon.png"/></span>

            <el-dropdown class="fr some1" @command="handleCommand" trigger="click">
				<span class="el-dropdown-link">
        <img src="./images/menu.png"/>
      </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="golist">我的订单</el-dropdown-item>
                    <el-dropdown-item command="goplaymethod">玩法介绍</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <p class="pastwin lay-p clearfix"><span class="fl">第{{issue}}期&nbsp;截止时间{{etime}}</span><span class="fr" @click="toggle()">历史开奖 <span class="upicon"><img src="./images/upicon1.png"/></span></span></p>
        <ul class="hislist" v-show="isShow">
            <li>
                <span class="pr300">期号&nbsp;</span><span class="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开奖号</span>
            </li>
            <li v-for="code in list">
                <span class="pr300">{{code.issue}}期</span><span class="blue"><span class="red dis">{{code.bonuscode.substring(0,14)}}</span>{{code.bonuscode.substring(14)}}</span>
            </li>
        </ul>
        <p class="rule lay-p clearfix" :class="{rule2:istop}"><span class="fl">请至少选择5个红球，2个蓝球</span></p>
        <div class="redball ballbox">
            <ul class="ball">
                <li v-for="n in 35" @click="checkred(n)" :class=" {n,redarr} | calculationred(n)">{{n | minTen}}</li>
            </ul>
        </div>
        <div class="blueball ballbox">
            <ul class="ball">
                <li v-for="n in 12" @click="checkblue(n)" :class=" {n,bluearr} | calculationblue(n)">{{ n | minTen}}</li>
            </ul>
            <div class="zhuijiaBox">
                <el-checkbox v-model="checked">追加投注</el-checkbox>
            </div>
        </div>
        <div class="foot">
            <div class="calculate clearfix">
                <a class="randomBet fl" @click="randomcheck()">随机一注</a>
                <span class="beishu">投<span class="borr" @click="checkmultiplecut()">-</span><span class="bor">{{multiple}}</span><span class="borrr" @click="checkmultipleadd()">+</span>倍</span>
            </div>
            <div class="total clearfix">
                <span class="clear" @click="clear()"><img src="./images/clear.png"/></span>
                <span class="total_txt">合计{{cost}}元&nbsp;共{{betnum}}注</span>
                <router-link class="bet betbtn fr" v-bind:class="{is_bet:isActives}" :to="{path:(isActives?'/Dltnumlist':'')}">
                    <span>投注</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import test from './js/test.js'
    import { mapState, mapMutations } from 'vuex'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: 'Dltnum',
        data() {
            return {
                loginWay: true, //登录方式，默认是登录
                items: test.fetch(),
                title: '标准选号',
                issue: '', //期号
                etime: '', //截止时间
                bonusmoney:'',
                list: [], //往期列表
                redarr: [], //红球
                bluearr: [], //蓝球
                checked: false, //默认不追加投注
                istop:false,
                zhuijia: '0',
                multiple: 1, //倍数
                betnum: '0', //注数
                betmoney: '0', //钱数
                isShow: false, //往期显示/隐藏
                isActive: false,
                isActives: false,
                money: '',
                ordertype: null,
                summoney: 0,
                sumnum: 0,
                typenum: 0,
                cost: 0
            }
        },
        computed: {
            ...mapState([
                'orderinfo', 'orderlist'
            ])
        },

        methods: {
            ...mapMutations([
                'ADD_ORDER',
                'ORDER_TYPE'
            ]),
            handleCommand(command) {
                if(command == 'golist') {
                    window.location.href = '#/myorder'
                } else if(command == 'goplaymethod') {
                    window.location.href = 'https://le.leaicai.com/m/content/webbiglottoinfo'
                }
            },
            init() {
                test.removeItem();
                window.localStorage.setItem('isclick', 0)
                let logstatus = window.localStorage.getItem('LACTK')
                if(logstatus == null) {
                    this.loginWay = true
                } else {
                    this.loginWay = false
                }
                //				test.removecookie();
                //获取往期开奖信息
                const info = (json) => new axios.post("/webapi/dlt/issue", qs.stringify(''));
                let x = info();
                let _this = this;
                (async function() {
                    let val = await x;
                    _this.issue = val.data.data.issue;
                    _this.etime = val.data.data.eTime;
                    _this.bonusmoney = val.data.data.bonusmoney;
                })();
                const winlist = (json) => new axios.post("/webapi/dlt/lists", qs.stringify({
                    page: '1',
                    size: '15'
                }));
                let y = winlist();
                let self = this;
                (async function() {
                    let listval = await y;
                    self.list = listval.data.data.list
                    var lists = self.list;
                })();

            },
            tologin() {
                window.location.href = '#/login'
            },
            checkred(n) {
                if(this.redarr.indexOf(n) !== -1) {
                    this.redarr = this.redarr.filter(t => t != n);
                } else {
                    this.redarr.push(n);
                }
            },
            checkblue(n) {
                if(this.bluearr.indexOf(n) !== -1) {
                    this.bluearr = this.bluearr.filter(t => t != n);
                } else {
                    this.bluearr.push(n);
                }
            },

            randomcheck() {
                let a = [];
                let b = [];
                for(var x = 0; x < 5; x++) {
                    let num = Math.floor(Math.random() * (35 - 1) + 1);
                    if(a.indexOf(num) !== -1) {
                        x--
                    } else {
                        a.push(num)
                        this.redarr = a
                    }
                }
                for(var y = 0; y < 2; y++) {
                    let num2 = Math.floor(Math.random() * (12 - 1) + 1);
                    if(b.indexOf(num2) !== -1){
                        y--
                    }else{
                        b.push(num2)
                        this.bluearr = b
                    }
                }

            },
            checkmultiplecut() {
                if(this.multiple > 1) {
                    this.multiple--;
                  if(this.checked){
                    this.cost = this.betnum  * this.multiple * 3;
                  }else{
                    this.cost = this.betnum  * this.multiple * 2;
                  }
                  this.addonelist()
                } else {
                    this.multiple = 1;
                }
            },
            checkmultipleadd() {
                if(this.multiple > 9998) {
                    this.multiple = 9999;
                } else {
                    this.multiple++;
                  if(this.checked){
                    this.cost = this.betnum  * this.multiple * 3;
                  }else{
                    this.cost = this.betnum  * this.multiple * 2;
                  }
                  this.addonelist()
                }


            },
            addonelist(){
              if(this.redarr.length >= 5 && this.bluearr.length >= 2) {
                let orderinfo = {
                  redorder: this.redarr,
                  blueorder: this.bluearr,
                  zhuijia: this.zhuijia,
                  betmoney: this.cost,
                  betnum: this.betnum,
                  multiple: this.multiple,
                  betype: this.ordertype,
                  type: this.typenum
                }
                this.items = []
                this.items.push(orderinfo)
                console.log(this.items)
                this.ifzhujia()
              }
            },
            addlist() {
                if(this.redarr.length >= 5 && this.bluearr.length >= 2) {
                    this.clearone()
                    console.log(orderinfo)
                    console.log(this.items)
                } else {
                    alert("请至少选择5个红球,2个蓝球")
                    return
                }

            },
            clearone() {
                this.redarr = []
                this.bluearr = []
                this.multiple = 1
            },
            clear() {
                test.removeItem()
                this.clearone()
                this.items = []
                this.summoney = 0
                this.sumnum = 0
                this.isActives = false

                alert('已清空')
            },
            //蓝球复试排列组合
            plzh: function(self, arr, index, newarr){
              if (self == "") {
                self = arr[index++];
                this.plzh(self, arr, index, newarr);
              } else if (index == arr.length) {
                for(let i = 0; i< arr.length; i++){
                  if(arr[i] == self){
                    index = i;
                  }
                }
//                index = $.inArray(self, arr);
                if (index == arr.length - 1) {
                  return;
                } else {
                  this.plzh("", arr, ++index, newarr);
                }
              } else {
                let other = arr[index++];
                newarr.push(self + other);
                this.plzh(self, arr, index, newarr);
              }
            },
            //红球复试排列组合
            plzhred: function(_selfs, _arr, _indexs, _newarr, _where){
              if (_selfs != null && _arr!= null && _arr.length >= _selfs.length) {
                if (_where < _selfs.length - 1) { //非末位
                  var index = _indexs[_where];
                  if (index == _arr.length) { //非末位末尾
                    --_where;
                    if (_where == -1) { //首位超出
                      return;
                    } else {
                      _indexs[_where] = _indexs[_where] + 1;
                      for (var i = _where + 1; i < _selfs.length; i++) {
                        _indexs[i] = _indexs[i - 1] + 1;
                      }
                      this.plzhred(_selfs, _arr, _indexs, _newarr, _where);
                    }
                  } else {
                    _selfs[_where] = _arr[index];
                    this.plzhred(_selfs, _arr, _indexs, _newarr, ++_where);
                  }
                } else { //末位
                  var index = _indexs[_where];
                  if (index == _arr.length) {  //直接末位末尾
                    --_where;
                    if (_where == -1) { //末位超出即 单关
                      return;
                    }
                    _indexs[_where] = _indexs[_where] + 1;
                    for (var i = _where + 1; i < _selfs.length; i++) {
                      _indexs[i] = _indexs[i - 1] + 1;
                    }
                    this.plzhred(_selfs, _arr, _indexs, _newarr, _where);
                  } else {
                    _selfs[_where] = _arr[index];
                    _newarr.push(this.deepCoby(_selfs));
                    var _nextIndex = _indexs[_where] + 1;
                    if (_nextIndex < _arr.length) {
                      _indexs[_where] = _nextIndex;
                      this.plzhred(_selfs, _arr, _indexs, _newarr, _where);
                    } else { //下一个末位末尾
                      --_where;
                      if (_where == -1) {
                        return;
                      }
                      _indexs[_where] = _indexs[_where] + 1;
                      for (var i = _where + 1; i < _selfs.length; i++) {
                        _indexs[i] = _indexs[i - 1] + 1;
                      }
                      this.plzhred(_selfs, _arr, _indexs, _newarr, _where);
                    }
                  }
                }
              }
            },
            deepCoby: function (obj) {
            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj)
              return obj;
            // Handle Date
            if (obj instanceof Date) {
              var copy = new Date();
              copy.setTime(obj.getTime());
              return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
              var copy = [];
              for (var i = 0, len = obj.length; i < len; ++i) {
                copy[i] = this.deepCoby(obj[i]);
              }
              return copy;
            }
            // Handle Object
            if (obj instanceof Object) {
              var copy = {};
              for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCoby(obj[attr]);
              }
              return copy;
            }
            throw new Error("Unable to copy obj! Its type isn't supported.");
          },
            calculation: function() {
                if(this.redarr.length < 5 || this.bluearr.length < 2) {
                    this.betnum = 0;
                    this.betmoney = 0;
                    this.cost= 0;
                    this.isActives = false;
                    return;
                }

                if(this.redarr.length == 5) {
                    this.betnum = this.bluearr.length/2;
                  this.cost = this.betnum * 2 * this.multiple;
                    if(this.bluearr.length > 1) {
                        if(this.bluearr.length == 2) {
                            this.isActives = true;
                            this.ordertype = '标准'
                            this.typenum = 1
                        } else if(this.bluearr.length > 2) {
                            this.isActives = true;
                            this.typenum = 4
                            this.ordertype = '蓝色复式'
                          var newarr = []
                          this.plzh("",this.bluearr, 0, newarr)
                          this.betnum = newarr.length
                          this.cost = this.betnum*2*this.multiple
                        }
                        this.addonelist()
                    } else {
                        this.isActives = false;
                        return
                    }
                    return

                }
                this.isActive = true;
                if(this.redarr.length > 5) {
                    if(this.bluearr.length == 2) {
                        this.ordertype = '红色复试'
                        this.typenum = 3
                      var _selfs = new Array(5);
                      var _arr = this.redarr;
                      var _indexs = [0,1,2,3,4]; //初始排列组合为 黑白黄，即对应的_arr的索引下标为0,1,2
                      var _where = 0;
                      var _newarr = [];
                      this.plzhred(_selfs, _arr, _indexs, _newarr, _where);
//                      console.log(JSON.stringify(_newarr));
                      this.betnum = _newarr.length
                      this.cost = this.betnum*2*this.multiple
                    } else if(this.bluearr.length > 2) {
                        this.ordertype = '全复试'
                        this.typenum = 5
                      var newarr = []
                      this.plzh("",this.bluearr, 0, newarr)

                      var _selfs = new Array(5);
                      var _arr = this.redarr;
                      var _indexs = [0,1,2,3,4]; //初始排列组合为 黑白黄，即对应的_arr的索引下标为0,1,2
                      var _where = 0;
                      var _newarr = [];
                      this.plzhred(_selfs, _arr, _indexs, _newarr, _where);
                      this.betnum = newarr.length * _newarr.length
                      this.cost = this.betnum*2*this.multiple
                    }
                }
                this.addonelist()
                if(this.cost >= 20000) {
                    alert('单次购买不超过2万元')
                    return;
                }
            },
            ifzhujia(){
                if(this.checked){
                    this.zhuijia = '1'
                    this.cost = this.betnum*3*this.multiple
                    this.items[0].betmoney = this.cost
                }else{
                    this.zhuijia = '0'
                  this.cost = this.betnum*2*this.multiple
                  this.items[0].betmoney = this.cost
                }

            },
            toggle: function() {
                this.isShow = !this.isShow;
                if(this.isShow) {
                  this.istop = true
                } else {
                  this.istop = false
                }
            }
        },
        filters: {
            minTen(val) {
                return val < 10 ? '0' + val : val;
            },
            calculationred(val) {
                function contains(a, obj) {
                    for(var i = 0; i < a.length; i++) {
                        if(a[i] === obj) {
                            return 'isred';
                        }
                    }
                    return '';
                }
                return contains(val.redarr, val.n)
            },
            calculationblue(val) {
                function contains(a, obj) {
                    for(var i = 0; i < a.length; i++) {
                        if(a[i] === obj) {
                            return 'isblue';
                        }
                    }
                    return '';
                }
                return contains(val.bluearr, val.n)
            },
        },
        watch: {
            redarr: function(val, oldval) {
              this.calculation();
            },
            bluearr: function(val, oldval) {
                this.calculation();
            },
            checked: function(val,oldval){
                this.ifzhujia();
            },
            items: {
                handler: function(items) {
                    test.save(items)
                },
                deep: true
            },

        },
        created() {},
        mounted() {
            this.init();
        }
    }
</script>

<style>
    .el-dropdown-menu {
        z-index: 10;
        margin-right: -6px;
        margin-top: -25px;
        min-width: 110px;
    }

    .el-dropdown-menu li {
        text-align: center;
        font-size: 18px;
        line-height: 35px;
    }
    .zhuijiaBox .el-checkbox__label{
        font-size: 15px;
    }
</style>
<style scoped>
  .fl{float:left;}
  .fr{float:right;}
  .clearfix{overflow: auto;zoom:1;}
  .nav {position:fixed;top:0;width: 100%;height: 60px;background-color: #FFFFFF;font-size: 18px;line-height: 60px;text-align: center; border-bottom: 1px solid #b2b2b2;}
  .nav .some {width: 10px;position: relative;margin-left: 15px;}
  .nav .some1 {width: 20px;position: relative;margin-right: 15px;}
  .nav .some img,.nav .some1 img{width: 100%;vertical-align: middle;}
  body {background-color: #f8f8f8;}
  .dis{padding-right: 15px;}
  .upicon img{width: 14px;margin: 8px 0 0 10px;}
  .checknum {width: 100%;height: 100%;overflow-y: auto;padding-bottom: 120px;}
  .checknum .hislist {height: 200px;overflow-y: auto;margin-top: 90px;}
  .checknum .hislist li {width: 100%;line-height: 30px;font-size: 12px;}
  .checknum .hislist li:nth-child(odd) {background-color: #eee;}
  .checknum .pr300 {padding-left: 40px;padding-right: 60px;}
  .checknum .hislist .blue{color: #00A0FF; text-align: center}
  .checknum .hislist .blue .red{color: #ed4e3c;}
  .checknum .lay-p {line-height: 25px;font-size: 12px;padding: 0 15px;}
  .checknum .pastwin {position: fixed;top:9%;width: 100%;background-color: #4fbdff;color: #FFFFFF;}
  .checknum .rule {margin-top: 90px;color: #999;}
  .checknum .ballbox {width: 94%;margin: 6px auto 0 auto;border-bottom: 1px solid #EEEEEE;}
  .checknum .redball ul li {color: #ed4e39;}
  .checknum .blueball {border: none;}
  .checknum .blueball ul li {color: #00A0FF;}
  .checknum .ball li {display: inline-block;margin: 4px 5px;width: 40px;height: 40px; border: 1px solid #cdcdcd;border-radius: 50%;text-align: center;line-height: 40px;font-size: 16px;}
  .checknum .isred {background-color: #e74c3c;color: #FFFFFF !important;}
  .checknum .isblue {background-color: #00A0FF;color: white !important;}
  .zhuijiaBox{width: 10%;margin: 40px auto 0;}
  /*foot*/
  .checknum .foot {z-index:100;position: fixed;left: 0;right: 0;bottom: 0;background-color: #fff; height: auto;padding: 5px 0;}
  .checknum .foot img {width: 20px;cursor: pointer;vertical-align: middle;}
  .checknum .foot span {display: inline-block;text-align: center;}
  .checknum .calculate {background-color: #fff;padding: 5px 15px;border-top: 1px solid  #F8F8F8;}
  .checknum .calculate>.randomBet {border: 1px solid #ddd;border-radius: 4%;padding: 5px 7px;font-size: 14px;color: #E74C3C;margin-top: 2px;}
  .checknum .foot .beishu {display: inline-block;margin-left: 15px;line-height: 30px;font-size: 14px;}
  .checknum .foot .bor {border-top: 1px solid #cdcdcd;border-bottom: 1px solid #cdcdcd;width: 30px;height: 30px;text-align: center;}
  .checknum .foot .borr {border: 1px solid #cdcdcd;border-top-left-radius: 3px;border-bottom-left-radius: 3px; width: 30px; height: 30px;text-align: center; cursor: pointer; margin-left: 4px;}
  .checknum .foot .borrr {border: 1px solid #cdcdcd;border-top-right-radius: 3px;border-bottom-right-radius: 3px;width: 30px;height: 30px;text-align: center;cursor: pointer;margin-right: 4px;}
  .checknum .calculate>.addBet {border: 1px solid #ddd;border-radius: 6%;padding: 5px 7px;cursor: pointer;font-size: 14px;color: #999;margin-top: 2px;}
  .checknum .calculate>.is_addBet {color: #E74C3C;}
  .checknum .total {border-top: 1px solid #F8F8F8;background-color: #fff;line-height: 25px;padding: 5px 15px;}
  .checknum .total>.clear {margin-right: 7px;}
  .checknum .total>.total_txt {font-size: 15px;color: #E74C3C;}
  .checknum .total>.bet {width: 50px; height: 30px; line-height: 30px; text-align: center; font-size: 18px;border-radius: 4px; color: #fff; cursor: pointer; border: 1px solid #ddd; background-color: #ddd;}
  .checknum .total>.is_bet {border: 1px solid #E74C3C;background-color: #E74C3C;}
  .checknum .foot .router-link-active {text-decoration: none;}
  .rule2{margin-top: 0 !important;}
  /*.logs {*/
  /*font-size: 30px;*/
  /*color: #00A0FF;*/
  /*margin-left: 30px;*/
  /*cursor: pointer;*/
  /*}*/
</style>
