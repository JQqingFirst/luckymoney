<template>
    <footer>
      <ul>
        <li :class="$route.path=='/'?'on':''">
            <router-link to="/">
                <img src="./img/home.png" v-if="$route.path!='/'">
                <img src="./img/home2.png" v-if="$route.path=='/'"><br>
                首页
            </router-link>
        </li>
        <!--<li>-->
        <!--<a href="https://h5.youzan.com/v2/showcase/homepage?alias=15ykd2n8k&redirect_count=2 ">-->
                <!--<img src="./img/mall.png"><br>-->
                <!--商城-->
        <!--</a>-->
        <!--</li>-->
        <li :class="$route.path=='/mycoop'?'on':''">
            <router-link to="/mycoop">
                <img src="./img/mind.png" v-if="$route.path!='/mycoop'">
                <img src="./img/mind2.png" v-if="$route.path=='/mycoop'"><br>
                我的
            </router-link>
        </li>
      </ul>
    </footer>
</template>
<style scoped>
    footer{position:fixed;bottom:6px;left:0;width:100%;background-color:#fff;padding-top: 6px;}
    footer ul{width:100%;}
    footer li{float:left;width:50%;text-align:center;}
    footer li.on a{color: #f7ab26;}
    footer li img{margin-bottom:6px;width:30px;height:30px;}
    footer a{color:#959595;}
</style>
