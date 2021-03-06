import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve => require(['../components/index/Index.vue'], resolve) //首页
const Dltnum = resolve => require(['../components/dltnum/Dltnum.vue'], resolve)//大乐透选号
const Dltnumlist = resolve => require(['../components/dltnum/Dltnumlist.vue'], resolve)//选号列表
const paypage = resolve => require(['../components/dltnum/paypage.vue'], resolve)//支付Openbag
const Openbag = resolve => require(['../components/openbag/Openbag.vue'], resolve)//打开红包
const Baglist = resolve => require(['../components/baglist/Baglist.vue'], resolve)//红包列表
const Selfredbag = resolve => require(['../components/selfredbag/Selfredbag.vue'], resolve)//红包中心
const Sharebag = resolve => require(['../components/sharebag/Sharebag.vue'], resolve)//红包分享
const Detail = resolve => require(['../components/detail/Detail.vue'], resolve)//彩票详情

const Error = resolve => require(['../components/error/Error.vue'], resolve) //错误链接


Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  },
    //大乐透
    {//选号页面
      path: '/Dltnum',
      name: 'Dltnum',
      component: Dltnum
    },
    {//列表页面
      path: '/Dltnumlist',
      name: 'Dltnumlist',
      component: Dltnumlist
    },
    {//支付页面
      path: '/paypage',
      name: 'paypage',
      component: paypage
    },
    {//打开红包页面
      path: '/Openbag',
      name: 'Openbag',
      component: Openbag
    },
    {//红包列表
      path: '/Baglist',
      name: 'Baglist',
      component: Baglist
    },
    {//红包中心
      path: '/Selfredbag',
      name: 'Selfredbag',
      component: Selfredbag
    },
    {//红包分享
      path: '/Sharebag',
      name: 'Sharebag',
      component: Sharebag
    },
    {//红包分享
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
  // ,{
  //   path: '/friend_id/:friend_id',
  //   name: 'Share',
  //   component: Index
  // }, {
  //   path: '/mycoop',
  //   name: 'mycoop',
  //   component: Mycoop
  // }, {
  //   path: '/goldchange',
  //   name: 'goldchange',
  //   component: Goldchange
  // }, {
  //   path: '/address',
  //   name: 'address',
  //   component: Address
  // }, {
  //   path: '/eggbasket',
  //   name: 'eggbasket',
  //   component: Eggbasket
  // }, {
  //   path: '/adopt',
  //   name: 'adopt',
  //   component: Adopt
  // },
  // {
  //   path: '/adoptPay',
  //   name: 'adoptPay',
  //   component: AdoptPay
  // },
  // {
  //   path: '/success',
  //   name: 'success',
  //   component: Success
  // },
  // {
  //   path: '/friend',
  //   name: 'friend',
  //   component: Friend
  // },
  // {
  //   path: '/distribution/:order_sn',
  //   name: 'distribution',
  //   component: Distribution
  // },
  // {
  //   path: '/getegg',
  //   name: 'getegg',
  //   component: Getegg
  // },
  {
    path: '/*',
    name: 'error',
    component: Error
  }

  ]
})
