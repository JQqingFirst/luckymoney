<template>
  <div class="openbag"  v-title='"大乐透红包"'>
    <div class="bagbg">
      <ul class="givePer">
        <li class="avatar">
          <img src="./images/avatar.png" alt="头像">
        </li>
        <li class="nick">{{giveNickName}}</li>
        <li>发给您一个大乐透红包</li>
      </ul>
      <p class="nomoney" :class="{havemoney:ishavemoney}"><strong>{{bagMoney}}</strong>元</p>
      <div class="open" :class="{rotate:clickopen,opennone: ishavemoney}" @click="open()">
        <img src="./images/open.png" alt="開"/>
      </div>
      <router-link class="todetail" to="/Baglist">
        查看领取详情>>
      </router-link>
    </div>
    <div class="bomlogo">
      <img src="./images/logo.png" alt="logo"/>
    </div>
  </div>
</template>
<script type="text/javascript">
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'Openbag',
    data() {
      return {
        title: '我是标题',
        givebagPersonAvatar:'http://a1.leaicai.com/20170731/43685cab_otxs3d.png',
        giveNickName: '施才其',
        bagMoney: '5.20',
        clickopen: false,
        ishavemoney: false
      }
    },
    computed: {

    },

    methods: {
      init(){
        alert('111')
      },
      open(){
        this.clickopen = true
        //获取抢到红包数据
        if(this.bagMoney != ''){
          this.ishavemoney = true

        }
        //动画消失
        //图片消失
        //显示红包数据
      }
    },
    filters: {
//      numFilter:function(val){
//        let realVal = val.toFixed(2)
//        return realVal
//      }
    },
    watch: {},
    created() {},
    mounted() {
//            this.init()
    }
  }
</script>
<style scoped>
  body {background-color: #f8f8f8;}
  ul li{list-style: none;}
  .openbag{position: relative; width: 100%;min-height: 600px;overflow: hidden;background-color: #FFD5B6;}
  .bagbg{ position: relative; width: 80%; height: 460px; margin: 65px auto 36px; padding-top:36px; background: url("./images/bagbg.png") no-repeat; background-size: 100% 100%;}
  .givePer li{text-align: center; color: #FFE99F;}
  .avatar{position: relative; width: 60px; height: 60px;border-radius: 50%;margin: 0 auto 10px;}
  .avatar img,.open img,.bomlogo img{width: 100%;}
  .nick{font-size: 18px;}
  .givePer li:last-child{font-size: 12px; line-height: 30px}
  .nomoney{display: none;width:100%;color: #FFE99F; font-size: 14px; text-align: center; margin-top: 5px;}
  .havemoney{display: block;}
  .nomoney strong{font-size: 50px;}
  .open{display: block;width: 100px; height: 100px;margin: 36px auto 0;}
  .opennone{display: none;}
  .todetail{position: absolute; width: 100%; bottom: 0;margin-bottom: 40px;text-align: center; color: #FFE99F;text-decoration: none;}
  .rotate{
    -webkit-animation: anim .6s infinite alternate;
    -ms-animation: anim .6s infinite alternate;
    animation: anim .6s infinite alternate;
  }
  @-webkit-keyframes anim {
    from { -webkit-transform: rotateY(180deg); }
    to { -webkit-transform: rotateY(360deg); }
  }
  @-ms-keyframes anim {
    from { -ms-transform: rotateY(180deg); }
    to { -ms-transform: rotateY(360deg); }
  }
  @keyframes anim {
    from { transform: rotateY(180deg); }
    to { transform: rotateY(360deg); }
  }
  .bomlogo{width: 72px; margin: 0 auto;}
</style>
