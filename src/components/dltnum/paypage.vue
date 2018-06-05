<template>
	<div class="paypage">
		<div class="nav clearfix">支付订单
			<span class="fl some" onClick="javascript :history.back(-1);" @click="clearclick()"><img src="./images/backicon.png" alt="backicon"/></span>
		</div>
		<div class="wraptop">
			<ul class="con1 clearfix">
				<li class="ballsize fl windball"><img :src="iconURL" alt="dball" /></li>
				<li class="fl win_type">{{name}}</li>
			</ul>
			<div class="con clearfix">
				<span class="fl">订单金额:</span>
				<span class="fr col999"><span class="paymoney">{{orderAmount}}</span>元</span>
			</div>
			<div class="con clearfix">
				<span class="fl">红包抵扣:</span>
				<span class="fr col999 payredbag">使用app可抵扣红包</span>
			</div>
			<div class="con clearfix">
				<span class="fl">还需支付:</span>
				<span class="fr col999"><span class="lastpaymoney">{{orderAmount}}</span>元</span>
			</div>
			<div class="line"></div>
		</div>
		<div class="wrapbottom">
			<div class="con">支付方式</div>
			<div class="line"></div>
			<div class="paytypelists">
				<div class="boxline" >
					<div class="typebox">
						<div class="ticon">
							<p class="wayicon" v-for="item in this.paylist"><img :src="item.icon"/></p>
						</div>
						<el-radio-group v-model="radio" @change="radiochange()" fill="#ed4e3c">
							<el-radio v-for="item in this.paylist" :label="item.type">{{item.text}}</el-radio>
						</el-radio-group>
					</div>
				</div>
			</div>
		</div>
		<div id="pay" class="foot " type="button" @click="confirmPay()">确认支付</div>
	</div>
</template>

<script>
	import test from './js/test.js'
	import axios from 'axios'
	import qs from 'qs'
	import { confirmCode } from './../../service/getdata.js'

	export default {
		name: 'paypage',
		data() {
			return {
				items: test.fetch(),
				orderno: test.fetch(),
				iconURL: '123',
				name: '123',
				orderAmount: '0',
				paylist: [],
                payed_type: -1,
				icon: '123',
				text: '123',
				radio: 18,
				timecount: 0,
			}
		},
		computed: {},

		methods: {
			init() {
				let orderno = window.localStorage.getItem('orderno')
				this.paytype = window.localStorage.getItem('paytype')
				this.payQuery()
				//支付请求
				const order = (json) => new axios.post("/webapi/pay/order", qs.stringify({
					orderNo: orderno
//					LACTK: coo
				}));
				let x = order();
				let _this = this;
				(async function() {
					let val = await x;
					console.log(val)
					_this.iconURL = val.data.data.icon;
					_this.name = val.data.data.name;
					_this.orderAmount = val.data.data.order_amount;
				})();
				//获取支付方式
				let del = {"del_type": ["16","20"]}
//				let key =  eval(del)
				const paytype = (json) => new axios.post("/webapi/pay/lists", {});
				let y = paytype();
				let self = this;
				(async function() {
					let val = await y;
					let paylist1 = val.data.data
                    paylist1.splice(1,1)
                    paylist1.splice(2,1)
					self.paylist = paylist1;
				})();
			},
//			getCookie(name) {
//				var search = name + "=" //查询检索的值
//				var returnvalue = ""; //返回值
//				if(document.cookie.length > 0) {
//					var sd = document.cookie.indexOf(search);
//					if(sd != -1) {
//						sd += search.length;
//						var end = document.cookie.indexOf(";", sd);
//						if(end == -1)
//							end = document.cookie.length;
//						//unescape() 函数可对通过 escape() 编码的字符串进行解码。
//						returnvalue = unescape(document.cookie.substring(sd, end))
//					}
//				}
//				return returnvalue;
//			},
			clearclick(){
				window.localStorage.setItem('isclick', 0)
			},
			async confirmPay() {
				const ortime = ''
				const paytype = ''
                const isclick = window.localStorage.setItem('isclick', 1)
				alert(isclick)
				let orderno = window.localStorage.getItem('orderno')
				let z = await confirmCode({
					orderNo: orderno,
					payType: this.radio
				});
				let _this = this;
				console.log(z)
				if(z.data.errno == 0) {
					window.localStorage.setItem('ortime', z.data.data.orderNo)
					this.payed_type = z.data.data.payType
					if(this.payed_type == 1) {
					    //余额支付
						window.localStorage.setItem('paytype', this.payed_type)
						this.payQuery()
					} else if(this.payed_type == 11 || this.payed_type == 15) {
					    //支付宝支付
				        window.localStorage.setItem('paytype', this.payed_type)
                        this.payQuery()
						window.location.href = z.data.data.url

					} else if(this.payed_type == 16) {
					    //京东支付
                        window.localStorage.setItem('paytype', this.payed_type)
                        this.payQuery()
                        window.location.href = z.data.data.url
					}else if(this.payed_type == 18){
                        //微信支付
                        window.localStorage.setItem('paytype', this.payed_type)
                        this.payQuery()
                        window.location.href = z.data.data.url

					}
				} else if(z.data.errno == 4) {
					alert(z.data.errmsg)
					return
				}
			},
			payQuery() {
				let orderNo = window.localStorage.getItem('orderno')
				if(this.timecount >= 6 || orderNo == '' || this.paytype == -1 || window.localStorage.getItem('isclick') == 0) {
					return
				}
				this.timecount++
					if(this.timecount > 5) {
						alert("支付失败")
						return
					}
				console.log("pay_query", "开始轮训" + this.timecount)
				//获取轮询接口
				console.log(orderNo)
				console.log(this.paytype)
				const payquery = (json) => new axios.post("/webapi/pay/query", qs.stringify({
					orderNo: orderNo,
					payType: this.paytype
				}));
				let p = payquery();
				let self = this;
				(async function() {
					let val = await p;
					console.log(val)
					if(val.data.errno == 0) {
						test.removeItem() //支付成功后清空缓存中购彩列表
						alert(val.data.errmsg)
						window.localStorage.setItem('isclick',0)
                        window.location.href = 'http://test.leapp.leaicai.com/m/content/listsdetail?orderno=' + orderNo
					} else if(val.data.errno == 2) {
						alert('支付失败')
						return
					} else if(val.data.errno == 1) {
						self.payQuery()
						return
					} else {
						alert(val.data.errmsg)
						return
					}
				})();
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
	},
	filters: {
			minTen(val) {
				return val < 10 ? '0' + val : val;
			},
		},
		watch: {

		},
		mounted() {
			this.init()

		}
	}
</script>
<style>
	.el-radio-group{
		width: 82%;
		vertical-align: top;
	}
	.el-radio-group .el-radio{
		z-index: 100;
		width: 100%;
		font-size: 40px;
		color: #333333;

	}
	.el-radio+.el-radio{
		margin-left: 0;
	}
</style>
<style scoped>
  .fl{float:left;}
  .fr{float:right;}
  .clearfix{overflow: auto;zoom:1;}
  .nav {width: 100%;height: 60px;background-color: #FFFFFF;font-size: 18px;line-height: 60px;text-align: center; border-bottom: 1px solid #b2b2b2;}
  .nav .some {width: 15px;position: relative;margin-left: 18px;margin-top: 10px;}
  .nav .some1 {width: 25px;position: relative;margin-right: 18px;margin-top: 10px;}
  .nav .some img,.nav .some1 img{width: 100%;}
	.elshow{
		display: none;
	}
	.paypage .nav .some {
		position: absolute;
		left: 25px;
		margin-top: 30px;
	}

	.paypage .nav .some img {
		height: 35px;
		width: 35px;
	}

	.wraptop {
		position: relative;
		width: 100%;
		background-color: #fff;
		margin: 0 auto;
	}

	.con {
		width: 94%;
		margin: 0 3%;
		line-height: 90px;
		font-size: 38px;
	}

	.con1 {
		width: 92%;
		margin: 0 auto;
		padding: 15px 0;
		border-bottom: 1px solid #EEEEEE;
	}

	.ballsize {
		width: 110px;
	}

	.ballsize img {
		width: 110px;
	}

	.win_type {
		line-height: 110px;
		font-size: 45px;
		margin-left: 25px;
	}

	.wrapbottom {
		position: relative;
		width: 100%;
		background-color: #fff;
		margin-top: 15px;
	}

	.boxline {
		width: 100%;
		border: 1px solid #F8F8F8;
	}

	.typebox {
		display: block;
		width: 94%;
		margin: 0 3%;
		font-size: 38px;
		padding: 30px 0;
	}

	.typebox:hover,
	.typebox:link,
	.typebox:visited {
		color: #333;
	}

	.typebox .typetxt {
		line-height: 90px;
	}
	.typebox .ticon{
		width: 12%;
		display: inline-block;
	}
	.typebox .wayicon {
		width: 90px;
		height: 90px;
		margin-bottom: 10px;
	}

	.typebox .wayicon img {
		width: 100%;
	}
	.foot {
		position: fixed;
		bottom: 20px;
		left: 50%;
		margin-left: -300px;
		width: 600px;
		background-color: #e74c3c;
		color: #fff;
		height: 100px;
		line-height: 100px;
		text-align: center;
		border-radius: 8px;
		font-size: 44px;
		cursor: pointer;
	}

	.foot:link,
	.foot:visited,
	.foot:hover {
		color: #fff;
	}
</style>
<style>
	.paypage .el-radio__label {
		font-size: 38px;
		line-height: 100px;
	}

	.paypage .el-radio__input {
		line-height: 100px;
	}

	.paypage  .el-radio__input {
		position: absolute;
		right: 2%;
	}
	.paypage  .el-radio__input .el-radio__inner{
		width: 40px;
		height: 40px;
	}

	.paypage .el-radio__input.is-checked .el-radio__inner {
		border-color: #E74C3C;
		background:#E74C3C;
	}

</style>
