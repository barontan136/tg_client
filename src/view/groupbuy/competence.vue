<template>
    <div class="competence_page">
        <dl>
            <dt><img src="../../assets/images/success.png">无权限</dt>
            <dd>确定</dd>
        </dl>
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
        };
    },
    mounted() {
        _g.jssdk(['onMenuShareAppMessage','onMenuShareTimeline']);
    },
    methods: {
    }
}
</script>
<style lang="less">
.competence_page{
    background: #f2f2f2;
    dl{
        dt{
            text-align: center;
            img{
                display: block;
                margin: 60px auto 10px;
            }
        }
        dd{
            margin:50px 20px;
            background: rgb(85,187,54);
            line-height: 46px;
            border-radius: 6px;
            color: #fff;
            font-size: 16px;
            letter-spacing: 2px;
            text-align: center;
        }
    }
}
</style>
