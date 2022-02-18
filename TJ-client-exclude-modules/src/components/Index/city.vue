<template>
  <div class="cityIndex">
    <!-- <form action="/"> -->
      <!-- <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      /> -->
    <!-- </form> -->
    <van-index-bar z-index="0">
      <div v-for="(i, index) of indexList" :key="index">
      <van-index-anchor :index="i.initial" />
      <van-cell v-for="(item, code) of i.list" :key="code" :title="item.name" @click="city(item.name)"/>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      indexList: [],
      value: '',
    };
  },
  created() {
    this.cityJSON();
  },
  destroyed(){
    
  },
  methods: {
    cityJSON() {
      axios.defaults.baseURL = 'https://tj.testw.top/'
      this.$axios.get("public/city.json").then((res) => {
        console.log(res);
        this.indexList = res.data.city;
        axios.defaults.baseURL = 'https://tj.testw.top/v1'
      });
    },
    city(name){
      console.log(name)
      this.$store.commit('cityData',name)
      this.$router.go(-1)
    }
    // onSearch(val) {
    //   console.log(val);
    // },
    // onCancel() {
    //   console.log('取消');
    // },
  },
};
</script>

<style lang="scss">
.cityIndex {
    .van-index-bar{
        .van-index-anchor{
            background-color: #f1f6f6;
        }
    }
    .van-search{
        width: 100%;
        position: fixed;
        top: 0;
        height: 5vh;
        z-index: 1;
    }
}
</style>
