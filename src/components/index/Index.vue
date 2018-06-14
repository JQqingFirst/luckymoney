<template>
	<div class="index" v-title='"助力世界杯"'>
		<div>
       <ul class="box1 bag-type fcol333 clearfix">
         <li class="fl">大乐透红包</li>
         <li class="fr"><router-link to="/Dltnum">彩票选号>></router-link></li>
       </ul>
       <div class="box2 bag-check">
         <span class="mr">默认为大乐透玩法</span>
       </div>
       <ul class="box1 clearfix">
         <li class="fl">总金额
           <span>
             <img class="imgw1" src="./images/pin_icon.png"/>
           </span>
         </li>
         <li class="fr">
           <input type="text" placeholder="请输入金额" class="box-input" :value="total.toFixed(2)" disabled/>
           元
         </li>
       </ul>
      <div class="box2">当前为拼手气红包</div>
      <ul class="box1 clearfix">
        <li class="fl">红包个数</li>
        <li class="fr">
          <input type="text" placeholder="请填写个数" class="box-input" v-model="bagNum" :value="bagNum"/>
          个
        </li>
      </ul>
      <div class="box1 mtop">
        <input type="text" placeholder="拼手气,中千万大奖!" class="box-input1" maxlength="20" :value="content"/>
      </div>
    </div>
    <div class="bag-money">¥{{total.toFixed(2)}}</div>
    <div class="saibtn" @click="addlist()">
      <img src="./images/sai_btn.png" alt="赛彩票进红包"/>
    </div>
    <p class="showTip" :class="{showtips: ifshowTip}">红包个数不能为空</p>
		<!--<foot></foot>-->
	</div>
</template>

<script>
  import Vue from 'vue'
	import foot from '../common/footer/footer.vue'
	import { mapState, mapMutations } from 'vuex'
  import test from './js/test.js'
  import {packagee} from './../../service/getdata.js'


	export default {
		name: 'mycoop',
		data() {
			return {
        codeObj: test.codefetch(),
        total: '',  //总金额
        bagNum: '',
        content: '',
        ifshowTip: false,
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
			  console.log(this.codeObj)
        console.log(this.codeObj.total)
        this.total = this.codeObj.total;
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

      async addlist(){
			  if(this.bagNum == ''){
          this.ifshowTip = true
          return
        }else{

        }
			  if(this.content == ''){
          this.content = '拼手气,中千万大奖!'
        }
			  let finalist = {
          award_stop: '0', //追号中奖停 (暂无追号)
          codes: this.codeObj.codes,
          issues: 1,  //追期
          total: this.codeObj.total,
          betNum: this.codeObj.betNum,
          redNum: this.bagNum,
          content: this.content
        }
          console.log(finalist)
        let y = await packagee({
            req: JSON.stringify(finalist)
          })
        console.log(y)
        if(y.data.errno == 0){
          const orderno = ''
          window.localStorage.setItem('orderno', y.data.data.orderNo)
          window.location.href = '#/paypage'

        }

      }

		},
		created() {},
		mounted() {
			this.init();
		},
    filters: {

    },
    watch:{
      codeObj:{
        handler: function (codeObj) {
          test.saveCode(codeObj)
        },
      },
      deep: true,
      bagNum:function(){
        this.bagNum = this.bagNum.replace(/\D/g, '')
        if(this.bagNum == 0){
          this.bagNum =''
        }
        if(this.bagNum != ''){
          this.ifshowTip = false
        }
      }
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
  .bag-type li a:link,.bag-type li a:visited,.bag-type li a:hover,.bag-type li a:active{color: #409CFD;cursor: pointer;}
  .imgw1{width: 18px;}
  .box-input{text-align: right;font-size: 16px;margin-top: -4px;border-width:0;border-color:#fff;border-style:none;background:none;}
  .box-input:focus,box-input1:focus{outline:none;}
  .box-input1{width:100%; font-size: 16px; color:#666; margin-top: -4px;border-width:0;border-color:#fff;border-style:none;background:none; outline: none;}
  .bag-money{position:relative;width:100%;margin-top: 48px;font-size: 42px;color:#FD5545;text-align: center;}
  .saibtn{display: block; position: relative; width: 198px;height: auto;margin: 42px auto 80px;}
  .saibtn img{width: 100%;}
  .showTip {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 25px;
    color: #fff;
    display: none;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    min-width: 5rem;
    padding: 0 15px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 30% 300px;
    z-index: 1001;
  }
  .showtips{display: block;}
</style>
