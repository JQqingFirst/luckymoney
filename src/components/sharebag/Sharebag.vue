<template>
    <div class="sharebag" v-title='"分享彩票"'>
      <div class="bagimg"></div>
      <div class="sharebtn">
        <img src="./images/sharebtn.png" alt="点击分享"/>
      </div>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: 'Sharebag',
        data() {
            return {
                title: '我是标题'
            }
        },
        computed: {},

        methods: {
            filters: {},
            watch: {},
            created() {},
            mounted() {
            }
        }
    }
</script>
<style scoped>
  body {background-color: #f8f8f8;}
  .sharebag{position: relative; width: 100%;background-color: #FFD5B6;min-height: 200px;padding-top: 24px; padding-bottom: 48px;}
  .bagimg{position: relative; width: 100%; height: 420px; background: url("./images/sharebg.png") no-repeat;background-size: 100% 100%;}
  .sharebtn{position: relative; width: 200px; height: auto; margin: 24px auto 0;}
  .sharebtn img{width: 100%;}
</style>
