<template>
    <div>
        <van-nav-bar fixed placeholder safe-area-inset-top>
            <template #title>
                <div class="titleRouter">
                    <van-button :class="route==='/collects'?'bg':''" @click="collects('/collects')" to="/collects" type="default" size="small">我的收藏</van-button>
                    <van-button :class="route==='/history'?'bg':''" @click="collects('/history')" to="/history" type="default" size="small">浏览历史</van-button>
                </div>
            </template>
        </van-nav-bar>
        <router-view></router-view>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            route: '',
        }
    },
    created() {
        this.route = this.$route.fullPath
    },
    methods: {
        collects(route) {
            this.route = route
        },
    },
}
</script>
<style lang="scss" scoped>
    .titleRouter {
        border: 0.1vh solid #e3e3e3;
        border-radius: 0.4vh;
        .van-button {
            border-radius: 0.4vh;
            border: none;
        }
        .bg {
            background-color: #ff9645;
            color: #ffffff;
        }
    }
</style>