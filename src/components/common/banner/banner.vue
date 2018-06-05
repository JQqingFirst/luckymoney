<template>
    <div class="banner">
        <a><img @click='addfriend=true' src="./img/banner.png" alt=""></a>
        <div class="addfriend" v-show='addfriend' @click='addfriend=false'>
            <img src="./img/addf.png" alt="">
        </div>
    </div> 
</template>
<style scoped>
.banner a img{width: 100%; padding:10px 10px 0;}
.addfriend{position: fixed;top: 0;left: 0;right: 0;bottom: 0;height: 100%;background-color:rgba(0,0,0,.4);z-index: 33;}
.addfriend>img{float: right;margin: 20px 30px 0 0;width: 70%;}
</style>
<script>
export default {
  name: 'banner',
  data () {
    return {
        addfriend:false,
    }
  }
}
</script>
