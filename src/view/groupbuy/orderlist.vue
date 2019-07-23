<template>
    <div class="orderlist_page">
        <div class="header">
            <div class="tab tab-fixed">
                <ul>
                    <li class="cur">全部订单[<span>{{cnt_all}}</span>]</li>
                    <li>未付款[<span>{{cnt_not_pay}}</span>]</li>
                </ul>
            </div>
            <!--
            <div class="search">
                <img src="../../assets/images/so_icon.png" alt="">
                <input type="text" autocomplete="off" placeholder="请输入完整手机号搜索">
            </div> -->
        </div>
        <div class="orderBox">
            <!--<span v-if="item.order_type==1">[团长]</span>-->
            <!--<span v-if="item.order_type==2">[团员]</span>-->

            <div class="items" v-for="(item,kone) in orderlist" :key='kone'>
                <div class="hd">
                    <span>订单号：{{item.id}}</span>
                    <span>直接推荐人：{{item.ref_nick_name}}</span>
                    <em v-if="item.status==2">已付款</em>
                    <em v-if="item.status==1">未付款</em>
                </div>
                <div class="bd">
                    <div class="photo"><img v-bind:src="item.head_img" class="align-middle-li"></div>
                    <div class="info">
                        <p>姓名：{{item.user_name}}<em>￥9.90</em></p>
                        <p>手机：<span>{{item.mobile}}</span></p>
                        <p>昵称：{{item.nick_name}}</p>
                    </div>
                </div>
                <div class="ft">
                    <em>推荐：无</em>
                    <span>时间：{{item.create_datetime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/assets/css/public.less";
import VueClipboard from "vue-clipboard2";
import Vue from "vue";
// import { Marquee, MarqueeItem } from 'vux'
import { Previewer } from 'vux'
Vue.use(VueClipboard);
import {
    Flexbox,
    FlexboxItem,
    Divider,
    XButton,
    Group,
    Cell,
    Tabbar,
    TabbarItem
} from "vux";
export default {
    components: {
        Flexbox,
        FlexboxItem,
        Divider,
        XButton,
        Tabbar,
        TabbarItem,
        Group,
        Cell,
        Previewer,
        // Marquee,
        // MarqueeItem
    },
    data() {
        return {
            orderlist: [],
            cnt_all: 0,
            cnt_not_pay: 0,
            auth: 0,
        };
    },
    mounted() {
        this.getActivityData();
        this.checkAuth();
        _g.jssdk(['onMenuShareAppMessage','onMenuShareTimeline']);
    },
    methods: {
        getActivityData() {
            let params = {
                activity_id: route.query.id,
                user_id: win_user.user_id,
                order_id: route.query.order_id,
                admin_id: route.query.admin_id,
                ref_user_id: route.query.ref_user_id,
                long_share_url: this.long_share_url,
                nick_name: win_user.nickname,
                head_img: win_user.headimgurl,
                appid: win_appid
            };
            _g.apiPost(
                "group/order_list",
                params,
                data => {
                    this.orderlist = data.order_list;
                    this.cnt_all = data.cnt_all;
                    this.cnt_not_pay = data.cnt_not_pay;

                    //window.location.href = "/competence";
                    this.auth = data.auth;
                },
            );
        },
        checkAuth(){
            setTimeout(function(){
                console.log('ddddd');
                if (this.auth == 1){
                    this.$router.push("/competence");
                }
            },2000);
        },
    }
}
</script>
<style lang="less">
.header{
    position: fixed;
    z-index: 10;
    width: 100%;
    background: #fff;
}
.tab{
    height: 40px;
    background: #fff;
    width: 100%;
    overflow: hidden;
    ul{
        display: flex;
        line-height: 39px;
        li{
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            text-align: center;
            border-bottom:1px #ccc solid;
            span{
                color: red;
            }
        }
        li.cur{
            border-color: red;
        }
    }
}
.search{
    border:1px #eee solid;
    height: 36px;
    position: relative;
    z-index: 1;
    margin: 10px;
    overflow: hidden;
    input[type='text']{
        border: 0;
        zoom: 1;
        background: none;
        padding: 0 40px 0 8px;
        line-height: 36px;
        display: block;
        width: 100%;
        color: #666;
        font-size: 14px;
        box-sizing: border-box;
    }
    img{
        position: absolute;
        right: 9px;
        top: 5px;
        cursor: pointer;
    }
}
.orderBox{
    background: #f7f7f7;
    //padding: 98px 0 10px;
    padding: 50px 0 10px;
    .items{
        width: 100%;
        clear: both;
        background: #fff;
        border-top: 1px #eee solid;
        border-bottom: 1px #eee solid;
        margin-bottom: 10px;
        font-size: 14px;
        .hd{
            line-height: 40px;
            padding: 0 10px;
            clear: both;
            overflow: hidden;
            span{
                float: left;
                color: #555;
                margin-right: 6px;
            }
            em{
                font-style: normal;
                float: right;
                color: #f60;
            }
        }
        .bd{
            clear: both;
            padding: 10px;
            background: #f7f7f7;
            border-top: 1px #eee solid;
            border-bottom: 1px #eee solid;
            overflow: hidden;
            .photo{
                float: left;
                width: 80px;
                height: 80px;
                margin-right: 8px;
                img{
                    width: 80px;
                    height: 80px;
                }
            }
            .info{
                float: left;
                width: 70%;
                p{
                    line-height: 26px;
                    color: #333;
                    em{
                        font-style: normal;
                        float: right;
                        color: #f60;
                    }
                    span{
                        color: blue;
                        text-decoration: underline;
                    }
                }
                p:last-child{
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            }
        }
        .ft{
            line-height: 40px;
            padding: 0 10px;
            em{
                font-style: normal;
                color: #f60;
            }
            span{
                float: right;
                color: #555;
            }
        }
    }
}
</style>
