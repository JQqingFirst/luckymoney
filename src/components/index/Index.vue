<template>
	<div class="index" v-title='"助力世界杯"'>
		<div>
       <ul class="box1 bag-type fcol333 clearfix">
         <li class="fl">红包类型</li>
         <li class="fr">大乐透红包</li>
       </ul>
       <div class="box2 bag-check">
         <span class="mr">默认为机选彩票</span>
         <span><router-link to="/Dltnum">我要自购彩票>></router-link></span>
       </div>
       <ul class="box1 clearfix">
         <li class="fl">总金额
           <span>
             <img class="imgw1" src="./images/pin_icon.png"/>
           </span>
         </li>
         <li class="fr">
           <input type="text" placeholder="请输入金额" class="box-input"/>
           元
         </li>
       </ul>
      <div class="box2">当前为拼手气红包</div>
      <ul class="box1 clearfix">
        <li class="fl">红包个数</li>
        <li class="fr">
          <input type="number" placeholder="请填写个数" class="box-input"/>
          个
        </li>
      </ul>
      <div class="box1 mtop">
        <input type="text" placeholder="拼手气,中千万大奖" class="box-input1"/>
      </div>
    </div>
    <div class="bag-money">¥0.00</div>
    <div class="saibtn">
      <img src="./images/sai_btn.png" alt=""/>
    </div>
		<!--<foot></foot>-->
	</div>
</template>
<script>
	import foot from '../common/footer/footer.vue'
	import { info, gameLogList, addFriends, weichat,stealEgg } from '../../service/getdata.js'
	import { mapState, mapMutations } from 'vuex'

	export default {
		name: 'mycoop',
		data() {
			return {
				chickenNum: 2, //我领养鸡的数量
				showSteal:false,//当点击的鸡蛋的 时候
				inforesult: {
					"id": "1",
					"user_id": '',
					"chicken_num":6, //鸡的数量
					"egg_num": 11, //蛋的数量
					"update_at": "", //更新时间
					"xi_egg": 100 //喜蛋进度
				},
				friendinfo: {}
			}
		},
		computed: {
			...mapState([
				'userId',
			]),
		},
		components: {
			foot
		},
		methods: {
			...mapMutations([
				'RECORD_USERID'
			]),
			init() {
			  //window.localStorage.getItem('user_id')
        //window.localStorage.getItem('nickname');
        //window.localStorage.getItem('headimgurl');
				let user_id = 'jqq'
				this.RECORD_USERID(user_id)
				let nickname = 'j'
				let headimgurl = './images/pin_icon.png'
				let _this = this;
				//先判断有没有好友

				//我的鸡笼

				//我的好友

			},

			showchange: function(data) {
				console.log(data);
			}
		},
		created() {},
		mounted() {
			this.init();
		}
	}
</script>
<style scoped>
  .index{position: relative;width: 100%;background-color: rgba(242,247,249,1); padding-top: 14px; height: auto;padding-bottom: 10px;}
  /*.index img{width: 100%;}*/
  .fl{float: left;}
  .fr{float: right;}
  .clearfix{overflow: auto; zoom:1;}
  .fcol333{color: #333;}
  .mtop{margin-top: 18px;}
  ul li{list-style: none;}
  .box1{position: relative;width: 100%;background-color: #fff;border-top: 1px solid #D0D0D0;border-bottom: 1px solid #D0D0D0;height: 45px; line-height: 45px;font-size: 16px;padding: 0 15px;}
  .box2{width: 100%; height: 40px; line-height: 40px;font-size: 16px; padding-left: 15px;}
  .bag-check .mr{margin-right: 12px;}
  .bag-check span a:link,.bag-check span a:visited,.bag-check span a:hover,.bag-check span a:active{color: #409CFD;cursor: pointer;}
  .imgw1{width: 18px;}
  .box-input{text-align: right;font-size: 18px;margin-top: -4px;border-width:0;border-color:#fff;border-style:none;background:none;}
  .box-input:focus,box-input1:focus{outline:none;}
  .box-input1{font-size: 18px;margin-top: -4px;border-width:0;border-color:#fff;border-style:none;background:none;}
  .bag-money{position:relative;width:100%;margin-top: 48px;font-size: 42px;color:#FD5545;text-align: center;}
  .saibtn{position: relative; width: 198px;height: auto;margin: 42px auto 80px;}
  .saibtn img{width: 100%;}
</style>
