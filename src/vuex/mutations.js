//方法名和属性名称一致
const mutations = {
  isloading(state, isloading) {
            state.isloading = isloading;
      },
  loadingmsg(state, loadingmsg) {
            state.loadingmsg = loadingmsg;
      },
  mallmenu(state, mallmenu) {
            state.mallmenu = mallmenu;
       },
  menushow(state, menushow) {
            state.menushow = menushow;
       },
  mpmenu(state, mpmenu) {
            state.mpmenu = mpmenu;
       },
  mpmenushow(state, mpmenushow) {
            state.mpmenushow = mpmenushow;
       },
  transitionname(state, transitionname) {
            state.transitionname = transitionname;
       },
  address(state, address) {
            state.address = address;
        },
  addresslist(state, addresslist) {
            state.addresslist = addresslist;
        },
  updateGoodInfo(state, goodinfo){
    state.good_info = goodinfo;
  },
  updateCard(state, card){
    state.selectcard = card;
  },
  updateGoldConfig(state,gold_config){
    state.gold_config = gold_config;
  },
  user(state,user){
    state.user = user;
  },
  customer(state,customer){
    state.customer = customer;
  },
  admin_user(state,admin_user){
    state.admin_user = admin_user;
  }
}

export default mutations
