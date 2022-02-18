<template>
    <el-container class="box">
        <aside-list></aside-list>
        <main-write></main-write>
    </el-container>
</template>
<script>
import asideList from './modules/Aside'
import mainWrite from './modules/main'
export default {
    data() {
        return {
            
        }
    },
    components: {
        asideList,
        mainWrite
    },
}
</script>
<style lang="scss" scope>
    .box {
        width: 100%;
        height: 100%;
    }
</style>