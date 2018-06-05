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
                <span class="pr300">期号&nbsp; &nbsp; &nbsp;</span><span class="center">&nbsp; &nbsp; &nbsp;开奖号</span>
            </li>
            <li v-for="code in list">
                <span class="pr300">{{code.issue}}期</span><span class="red"><span class="blue dis">{{code.bonuscode.substring(0,14)}}</span>{{code.bonuscode.substring(14)}}</span>
            </li>
        </ul>
        <p class="rule lay-p clearfix"><span class="fl">请至少选择5个红球，2个蓝球</span></p>
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
                <!--<router-link class="addBet fr" v-bind:class="{is_addBet:isActive}" :to="{path:(isActive?'/numlist':'')}">加入投注单</router-link>-->
                <div class="addBet fr" v-bind:class="{is_addBet:isActive}" @click="addlist()">加入投注单</div>
            </div>
            <div class="total clearfix">
                <span class="clear" @click="clear()"><img src="./images/clear.png"/></span>
                <span class="total_txt">合计{{summoney}}元&nbsp;共{{sumnum}}注</span>
                <router-link class="bet betbtn fr" v-bind:class="{is_bet:isActives}" :to="{path:(isActives?'/Dltnumlist':'')}">
                    <span>投注</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import test from './js/test.js'
//    import downicon from './images/downicon.png'
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
                } else {
                    this.multiple = 1;
                }
                this.cost = this.betmoney * this.multiple;
            },
            checkmultipleadd() {
                if(this.multiple > 9998) {
                    this.multiple = 9999;
                } else {
                    this.multiple++;
                }
                this.cost = this.betmoney * this.multiple;
                let orderinfo = {
                    redorder: this.redarr,
                    blueorder: this.bluearr,
                    betmoney: this.cost,
                    betnum: this.betnum,
                    multiple: this.multiple,
                    betype: this.ordertype,
                    type: this.typenum,
                    zhuijia: this.zhuijia
                }
            },
            addlist() {
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
                    console.log(orderinfo)
                    this.items.push(orderinfo)
                    this.summoney = 0
                    this.sumnum = 0
                    if(this.items.length > 0) {
                        this.isActives = true
                    } else {
                        this.isActives = false
                    }
                    for(var i = 0; i < this.items.length; i++) {
                        this.summoney += this.items[i].betmoney
                        this.sumnum += this.items[i].betnum
                    }
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
            calculation: function() {
                if(this.redarr.length < 5) {
                    this.betnum = 0;
                    this.betmoney = 0;
                    this.isActive = false;
                    return;
                }
                if(this.redarr.length == 5) {
                    this.betnum = this.bluearr.length/2;
                    this.betmoney = this.betnum * 2;
                    this.cost = this.betmoney;

                    if(this.bluearr.length > 1) {

                        if(this.bluearr.length == 2) {
                            this.isActive = true;
                            this.ordertype = '标准'
                            this.typenum = 1

                        } else if(this.bluearr.length > 2) {
                            this.isActive = true;
                            this.typenum = 4
                            this.ordertype = '蓝色复式'
                        }
                        let orderinfo = {
                            redorder: this.redarr,
                            blueorder: this.bluearr,
                            betmoney: this.cost,
                            betnum: this.betnum,
                            betype: this.ordertype,
                            type: this.typenum,
                            zhuijia: this.zhuijia
                        }
                        //												this.ORDER_TYPE(orderinfo);
                        //						this.oneodrder = this.redarr + '-' + this.bluearr;
                        //						this.ADD_ORDER(this.oneodrder);
                        //				    	    alert(this.oneodrder);
                    } else {
                        this.isActive = false;
                        return
                    }
                    return

                }
                var times = 1,
                    ss = 1;
                for(let i = this.redarr.length - 4; i <= this.redarr.length; i++) {
                    times = times * i;
                }
                for(let i = 1; i <= 5; i++) {
                    ss = ss * i;
                }
                this.betnum = times / ss * (this.bluearr.length);
                this.betmoney = (times / ss * (this.bluearr.length)) * 2;
                this.cost = this.betmoney;
                this.isActive = true;
                if(this.redarr.length > 5) {
                    if(this.bluearr.length == 2) {
                        this.ordertype = '红色复试'
                        this.typenum = 3
                    } else if(this.bluearr.length > 2) {
                        this.ordertype = '全复试'
                        this.typenum = 5
                    }
                }
                let orderinfo = {
                    redorder: this.redarr,
                    blueorder: this.bluearr,
                    betmoney: this.cost,
                    betnum: this.betnum,
                    multiple: this.multiple,
                    betype: this.ordertype,
                    type: this.typenum,
                    zhuijia: this.zhuijia
                }
                //				this.ORDER_TYPE(orderinfo);
                //				this.oneodrder = this.redarr + '-' + this.bluearr;
                //				this.ADD_ORDER(this.oneodrder);
                //				this.ORDER_TYPE({redorder:this.redarr,blueorder:this.bluearr,betmoney:this.betmoney,betnum:this.betnum});
                //				    	    alert(this.oneodrder);
                //				return (times / ss * (this.bluearr.length)); //复试计算公式
                if(this.cost >= 20000) {
                    alert('单次购买不超过2万元')
                    return;
                }
            },
            ifzhujia(){
                if(this.checked){
                    this.zhuijia = '1'
                }else{
                    this.zhuijia = '0'
                }
            },
            toggle: function() {
                this.isShow = !this.isShow;
                if(this.isShow) {

                } else {

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
  .nav {width: 100%;height: 65px;background-color: #FFFFFF;font-size: 18px;line-height: 65px;text-align: center; border-bottom: 1px solid #b2b2b2;}
  .nav .some {width: 15px;position: relative;margin-left: 18px;margin-top: 10px;}
  .nav .some1[data-v-877f5d1c] {width: 25px;position: relative;margin-right: 18px;margin-top: 10px;}
  .nav .some img,.nav .some1 img{width: 100%;}
  body {background-color: #f8f8f8;}

  .dis{padding-right: 15px;}
    .logs {
        font-size: 30px;
        color: #00A0FF;
        margin-left: 30px;
        cursor: pointer;
    }
    .upicon img{
      width: 14px;
        margin: 8px 0 0 10px;
    }

    .checknum {
        width: 100%;
        height: 100%;
    }

    .checknum .hislist {
        height: 500px;
        overflow-y: auto;
    }

    .checknum .hislist li {
        width: 100%;
        line-height: 48px;
        font-size: 25px;
    }

    .checknum .hislist li:nth-child(odd) {
        background-color: #eee;
    }

    .checknum .pr300 {
        padding-left: 40px;
        padding-right: 160px;
    }

    .checknum .lay-p {
      line-height: 30px;
      font-size: 12px;
      padding: 0 15px;
    }

    .checknum .pastwin {
        background-color: #4fbdff;
        color: #FFFFFF;
    }

    .checknum .rule {
        color: #999;
    }

    .checknum .ballbox {
        width: 94%;
        margin: 15px auto 0 auto;
        border-bottom: 1px solid #EEEEEE;
    }

    .checknum .redball ul li {
        color: #ed4e39;
    }

    .checknum .blueball {
        border: none;
    }

    .checknum .blueball ul li {
        color: #00A0FF;
    }

    .checknum .ball li {
        display: inline-block;
        margin-right: 24px;
        margin-bottom: 15px;
        width: 105px;
        height: 105px;
        border: 1px solid #cdcdcd;
        border-radius: 50%;
        text-align: center;
        line-height: 105px;
        font-size: 44px;
    }

    .checknum .isred {
        background-color: #e74c3c;
        color: #FFFFFF !important;
    }

    .checknum .isblue {
        background-color: #4476D8;
        color: white !important;
    }

    .checknum .foot {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        height: auto;
        padding: 5px 15px 5px 15px;
    }

    .checknum .foot img {
        width: 20px;
        cursor: pointer;
    }

    .checknum .foot span {
        display: inline-block;
        text-align: center;
    }

    .checknum .foot .beishu {
        display: inline-block;
        margin-left: 7px;
        line-height: 35px;
        font-size: 14px;
    }

    .checknum .foot .bor {
        border-top: 1px solid #cdcdcd;
        border-bottom: 1px solid #cdcdcd;
        width: 35px;
        height: 35px;
        text-align: center;
    }

    .checknum .foot .borr {
        border: 1px solid #cdcdcd;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        width: 35px;
        height: 35px;
        text-align: center;
        cursor: pointer;
        margin-left: 5px;
    }

    .checknum .foot .borrr {
        border: 1px solid #cdcdcd;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        width: 35px;
        height: 35px;
        text-align: center;
        cursor: pointer;
        margin-right: 5px;
    }

    .checknum .foot .router-link-active {
        text-decoration: none;
    }

    .checknum .total {
        border-top: 1px solid #F8F8F8;
        background-color: #fff;
        line-height: 25px;
        /*font-size: 40px;*/
        padding: 2px 5px;
    }

    .checknum .total>.clear {
        margin-left: 7px;
        margin-right: 7px;
        /*margin-top: .5rem;*/
    }

    .checknum .total>.total_txt {
        /*line-height: 100px;*/
        font-size: 15px;
        color: #E74C3C;
    }

    .checknum .total>.bet {
        font-size: 16px;
        padding: 3px 12px;
        border-radius: 3%;
        color: #fff;
        cursor: pointer;
        border: 1px solid #ddd;
        background-color: #ddd;
    }

    .checknum .total>.is_bet {
        border: 1px solid #E74C3C;
        background-color: #E74C3C;
    }

    .checknum .calculate {
        background-color: #fff;
        padding: 3px 7px;
    }

    .checknum .calculate>.randomBet {
        border: 1px solid #ddd;
        border-radius: 4%;
        padding: 5px 5px;
        font-size: 14px;
        color: #E74C3C;
    }

    .checknum .calculate>.addBet {
        border: 1px solid #ddd;
        border-radius: 3%;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 14px;
        color: #999;
    }

    .checknum .calculate>.is_addBet {
        color: #E74C3C;
    }
    /*.checknum .calculate>.addMultiple {
        font-size: 28px;
    }

    .checknum .calculate>.addMultiple>span {
        line-height: 35px;
        margin: 0 10px;
    }

    .checknum .calculate>.addMultiple .sdddq {
        font-size: 1.25rem;
        height: 2rem;
        width: 7rem;
    }*/
    .zhuijiaBox{
        width: 10%;
        margin: 40px auto 0;
    }

</style>
