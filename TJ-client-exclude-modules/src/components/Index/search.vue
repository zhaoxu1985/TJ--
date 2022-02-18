<template>
  <div class="search-Index">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="hot-search">
      <div class="title">
        <span class="title-search">热门搜索</span>
        <span class="radio" @click="radioBtn">{{radioStatus}}</span>
      </div>
      <div class="search-continer" style="overflow: hidden;" ref="continerRef">
        <van-tag v-for="(item,index) in result" :key="index" v-if="index<3" class="hot" @click="search(item)">{{item}}<van-icon name="fire" color="red"/></van-tag>
        <van-tag v-else @click="search(item)">{{item}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      radioStatus:'展开',
      result:[]
    };
  },
  components:{
  },
  created() {
    this.getSearchList()
  },
  mounted(){
  },
  methods: {
    // 热搜
    async getSearchList(){
      const {data:res} = await this.$axios.get('search/hot')
      console.log(res)
      this.result = res.result
    },
    // 搜索
    onSearch(val) {
      console.log(val);
      if(val!=''){
        this.$store.commit('searchData',{
          "wd":val,
          "page":1,
          "count":10,
          "minPrice":this.$store.state.priceData[0],
          "maxPrice":this.$store.state.priceData[1],
          "star":[1,2,3,4]
        })
        this.$store.commit('cityData',val)
        console.log(this.$store.state)
        this.$router.push('/stay')
      }
    },
    onCancel() {
    //   console.log("取消");
    this.$router.push('/')
    },
    radioBtn(){
        if(this.radioStatus == '展开'){
        this.$refs.continerRef.style.overflow = ''
        this.radioStatus = '收起'
        }else{
        this.$refs.continerRef.style.overflow = 'hidden'
        this.radioStatus = '展开'
        }
        
    },
    search(item){
    this.$store.commit('searchData',{
          "wd":item,
          "page":1,
          "count":10,
          "minPrice":this.$store.state.priceData[0],
          "maxPrice":this.$store.state.priceData[1],
          "star":[1,2,3,4]
        })
        this.$store.commit('cityData',item)
        console.log(this.$store.state)
        this.$router.push('/stay')
  }
  },
  
};
</script>

<style lang="scss">
.search-Index {
  form {
    .van-search {
      width: 100%;
      position: fixed;
      top: 0;
    }
  }
  .hot-search {
    margin-top: 12vh;
    .title {
      width: 90%;
      margin-left: 5%;
      height: 3vh;
      display: flex;
      justify-content: space-between;
      // background-color: red;
      border-left: 4px solid #ff9645;
      .title-search {
        margin-left: 3vw;
        font-weight: 500;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333;
      }
      .radio {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 10px;
        color: #666;
        line-height: 20px;
        margin-right: 5px;
      }
    }
    .search-continer {
      width: 90%;
      margin-top: 2vh;
      margin-left: 5%;
       height: 10vh;
    //   background-color: red;
      flex-wrap: wrap;
      .van-tag {
        font-size: 12px;
        background-color: rgb(255, 244, 236);
        border-radius: 14px;
        display: inline-block;
        padding: 6px 12px;
        color: #000;
        margin-left: 3vw;
        margin-top: 1vh;
      }
    }
  }
}
</style>
