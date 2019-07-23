//名称全为小写
const state = {
	user:false,//微信用户
	customer:false,//会员信息
	admin_user:false,//管理员信息
  isloading: false,
  loadingmsg:'页面载入中...',//加载的文字替换
  address:[],//商城选中的收货地址
  addresslist:[],//我的地址列表
  menushow:false,//是否显示商城主菜单
  mallmenu:3,//商城主菜单选中的值(1:商城首页，2：金卡定制，3：我的订单)
  mpmenushow:false,//是否显示管理端主菜单
  mpmenu:1,//管理端主菜单选中的值(1:上传素材，2：设置金价，3：电子保单，4：提货查询)
  transitionname:'slide-left',
  good_info:{},//商城购买商品
  selectcard:{},//选择的卡券
  gold_config:{},//购买的金卡配置信息
}

export default state
