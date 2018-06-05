<template>
    <div class="error" v-title='"404"'>
        <img src="./timg.png">
        <div class="clear10"></div>
        <div class="text-center">
            <router-link to="/" class='el-button el-button--warning el-button--large'>返回首页</router-link>
        </div>
    </div>
</template>
<style scoped>
    .error img{width: 80%;margin-left: 10%; margin-top: 200px;}
</style>
