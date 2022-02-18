<template>
  <div class="homestay-Index">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      show-action
      placeholder="搜索北京的景点、地标、房源"
      @click="searchLink"
    >
      <template #action>
        <div @click="cancalBtn">取消</div>
      </template>
      <template #left>
        <div class="bourn" @click="cityLink">
          <span>目的地</span>
          <br />
          <span class="city">{{$store.state.city}}</span>
        </div>
        <div class="search-time" @click="searchTimes">
          <span>住{{$store.state.starDate}}</span>
          <br />
          <span>离{{$store.state.endDate}}</span>
        </div>
      </template>
    </van-search>
    <!-- 条件查询栏 -->
    <div class="dropdown" id="dropDownRef" ref="dropDownRef">
      <van-dropdown-menu>
        <van-dropdown-item title="价格/钻级" ref="priceRefs">
          <!-- 价格筛选 -->
          <div class="price-section">
            <!-- 价格筛选标题 -->
            <div class="section-title">
              <span v-if="maxPrice < 1000"
                >价格区间￥{{ minPrice }}-￥{{ maxPrice }}</span
              >
              <span v-else>价格区间￥{{ minPrice }}-不限</span>
              <van-slider
                v-model="value"
                range
                @change="sliderChange"
                :step="50"
                :min="0"
                :max="1050"
                bar-height="5px"
                active-color="#FF9645"
              />
              <!-- 价格区间选择 -->
              <div class="price-select">
                <!-- 价格tag标签选项栏 -->
                <van-row gutter="24" ref="valueRef1">
                  <van-col
                    span="6"
                    v-for="(item, index) in valueSelect1"
                    :key="index"
                  >
                    <van-tag
                      color="#F8F8F8"
                      v-if="item[0] !== 0"
                      @click="priceFirst(item)"
                      >￥{{ item[0] }}-{{ item[1] }}</van-tag
                    >
                    <van-tag color="#F8F8F8" v-else @click="priceSecond(item)"
                      >￥100以下</van-tag
                    >
                  </van-col>
                </van-row>
                <van-row gutter="24" ref="valueRef2">
                  <van-col
                    span="6"
                    v-for="(item, index) in valueSelect2"
                    :key="index"
                  >
                    <van-tag
                      color="#F8F8F8"
                      v-if="item[0] !== 1000"
                      @click="priceThirdly(item)"
                      >￥{{ item[0] }}-{{ item[1] }}</van-tag
                    >
                    <van-tag color="#F8F8F8" v-else @click="priceFourthly(item)"
                      >￥1000以上</van-tag
                    >
                  </van-col>
                </van-row>
              </div>
            </div>
            <div class="steel-grade">
              <div class="steel-title">
                <span class="steel-item">
                  钻级
                </span>
                <span class="steel-explain">
                  钻级说明
                </span>
              </div>
              <div class="steel-tag">
                <van-tag round type="primary">
                  <span>二钻</span><br />
                  <span>经济</span>
                </van-tag>
                <van-tag round type="primary">
                  <span>三钻</span><br />
                  <span>舒适</span>
                </van-tag>
                <van-tag round type="primary">
                  <span>四钻</span><br />
                  <span>豪华</span>
                </van-tag>
                <van-tag round type="primary">
                  <span>五钻</span><br />
                  <span>奢华</span>
                </van-tag>
              </div>
            </div>
            <div class="foot-base">
              <van-button round color="#F3F4F6" class="empty" @click="emptyBtn">清空</van-button>
              <van-button round color="#FF9645" class="examine"
                @click="selectHouse">查看房源</van-button
              >
            </div>
          </div>
        </van-dropdown-item>
        <!--  -->
        <van-dropdown-item v-model="value1" :options="option1" />
        <!-- 地区 -->
        <van-dropdown-item title="怀柔风景区"> </van-dropdown-item>

        <van-dropdown-item title="筛选"> </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 滑动轮播 -->
      <div class="scroball">
        <ul>
          <li v-for="(item, index) in 20" :key="index">
            <van-tag round>连住优惠</van-tag>
          </li>
        </ul>
      </div>
    </div>
    <!-- 民宿列表 -->
    <!-- <v-touch
      @swipeup="upTouch"
      @swipedown="downTouch"
      style="touch-action: pan-y!important"
    > -->
    <div class="header-continer">
      <div class="header-stay" v-for="item in result" :key="item._id" @click="skipBtn(item._id)">
        <van-swipe :autoplay="0" @change="carRoll">
<!--          <div v-for="(image, index) in item.swiper" :key="index">-->
            <van-swipe-item v-for="(image, index) in item.swiper" :key="index">
              <img :src="image" />
            </van-swipe-item>
<!--          </div>-->
        </van-swipe>
        <!-- <div class="header-comment"> -->
          <!-- <strong class="comment-grade">4.5分</strong> -->
          <!-- <span>十大打阿斯顿打撒阿三大苏打算</span> -->
        <!-- </div> -->
<!--        <div class="header-moods">-->
<!--          <span>怀柔风景区人气榜 No.1</span>-->
<!--        </div>-->
        <div class="header-user">
          <van-image
            round
            width="2rem"
            height="2rem"
            src="https://pic.tujia.com/upload/customeravatar/day_190818/thumb/201908182139522553_90_90.jpg"
          />
          <van-icon name="like" :color="iconColor" ref="iconRefs" size="1.5rem" @click.stop="collect(item._id,item.swiper[0],item.r_name,item.params,item.star,item.price,item.new_price)">
            <span>111</span>
          </van-icon>
          <van-icon name="chat" color="#FFFFFF" size="1.5rem">
            <span>111</span>
          </van-icon>
        </div>
        <div class="foot-comment">
          <div class="foot-title">
            <van-tag color="#3F4954">近圈中心1,2公里</van-tag>
            <span class="aaa">{{ item.params.attr }} · {{item.params.house}}居{{item.params.bed}}床{{item.params.person_count}}人</span>
          </div>
          <div class="foot-msg">
            <span>
            {{ item.r_name }}
            </span>
          </div>
          <div class="foot-tag">
            <van-tag type="primary" v-for="(i,index) in item.label.base" :key="index">{{i}}</van-tag>
          </div>
          <div class="foot-price">
            <div class="price-num">
              <span class="price">￥{{item.new_price}}</span>
              <span class="price-unit">/晚</span>
              <span class="price-original" v-if="item.price!=item.new_price">￥{{item.price}}</span>
              <van-tag round color="#FD5858" v-if="item.price!=item.new_price" style="line-height: initial;">{{parseInt(item.price/(item.price-item.new_price))}}.0折，连住优惠</van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </v-touch> -->
    <!-- 时间选择组件 -->
    <calender ref="calenderRef"/>
  </div>
</template>

<script>
import calender from './calender.vue'
export default {
  data() {
    return {
      // 搜索内容
      searchValue: "",
      // 条件筛选
      value1: 0,
      switch1: false,
      switch2: false,
      //   条件筛选数据
      option1: [
        { text: "推荐排序", value: 0 },
        { text: "距离近→远", value: 1 },
        { text: "好评优先", value: 2 },
        { text: "点评数多→少", value: 3 },
        { text: "低价优先", value: 4 },
        { text: "高价优先", value: 5 },
      ],
      // 价格滑条
      value: [0, 150],
      minPrice: 0,
      maxPrice: 150,
      // 价格区间
      valueSelect1: [
        [0, 100],
        [100, 200],
        [200, 300],
        [300, 400],
      ],
      valueSelect2: [
        [400, 600],
        [600, 800],
        [800, 1000],
        [1000, 1050],
      ],
      // 轮播图片
      images: [
      ],
      // 轮播图指示器
      current: 0,
      // 入住
      // starDate:'',
      // 离店
      // endDate:''
      result:{},
      request:[],
      // 图标颜色
      iconColor:'#FFFFFF'
    };
  },
  components:{
    calender
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, true);  
    // 监听（绑定）滚轮 滚动事件
  },
  created() {
    this.getStayList()
    // this.collectList()
  },
  updated(){
    this.starDate = this.$refs.calenderRef.checkDate
    console.log('刷新')
  },
  
   methods: {
    // 点击收藏
    //  async collectList(){
    //    const {data:res} = await this.$axios.get('profile/collect')
    //    console.log(res)
    //    this.request = res
    //
    //  },
    //  async collect(id,image,name,params,star,price,newPrice){
    //   const {data:res} = await this.$axios.post('profile/collect',{
    //     "rid":id,
    //     "imgList":image,
    //     "title":name,
    //     "params":params,
    //     "score":star,
    //     "score_count":star,
    //     "con_title": "天天特惠",
    //     "price": price,
    //     "new_price": newPrice
    //   })
    //    console.log(res)
    //    if(res.ok==1){
    //      console.log(this.$refs.iconRefs)
    //      return this.iconColor = "#DC2513"
    //    }
    // },
    // 获取列表
    async selectHouse(){
    const {data:res} = await this.$axios.post('search/find',{
        "wd":this.$store.state.city.slice(0,1),
        "page": 1,
        "count": 100,
        "minPrice": this.minPrice,
        "maxPrice": this.$store.state.priceData.length>1?this.$store.state.priceData[1]:2000,
        "star": [1,2,3,4],
      })
      this.result=res.result
      this.$refs.priceRefs.toggle()
      console.log(res.result)
      // this.switch1 = false
  },
    // 页面跳转
    skipBtn(id){
      this.$router.push('/details?id='+id)
    },
    // 返回
    cancalBtn(){
      this.$router.push('/')
    },
    // 获取数据请求
    async getStayList(){
      const {data:res} = await this.$axios.post('search/find',{
        "wd":this.$store.state.city.slice(0,1),
        "page": 1,
        "count": 100,
        "minPrice": this.$store.state.priceData.length>1?this.$store.state.priceData[0]:0,
        "maxPrice": this.$store.state.priceData.length>1?this.$store.state.priceData[1]:2000,
        "star": [1,2,3,4],
      })
      this.result=res.result
      console.log(this.result)
    },
    // 选择时间
    searchTimes(){
      console.log(this.$store.state.starDate)
      this.$refs.calenderRef._data.show = true
      console.log(this.$refs.calenderRef)

    },
    // 搜索跳转
    searchLink(){
      this.$router.push('/search')
    },
    // 监听滚动
    handleScroll(){
            // 页面滚动距顶部距离
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
                      document.body.scrollTop
                      // console.log(scrollTop)
            var scroll = scrollTop - this.i;
            this.i = scrollTop;
            if(scroll<0){
                // console.log()
                this.$refs.dropDownRef.style.display = 'block'
                // document.getElementById('dropDownRef').style.transform = 'translateY(0)'
                // this.$refs.dropDownRef.style.transform = 'translateY(0)'
                
            }else if(scroll>0 && scrollTop>80){
                // console.log(this.$refs.dropDownRef)
                 this.$refs.dropDownRef.style.display = 'none'
                // document.getElementById('dropDownRef').style.transform = 'translateY(-100px)'
                //  this.$refs.dropDownRef.style.transform = 'translateY(-100px)'
                //  this.$refs.dropDownRef.style.top = '-7vh'
                //  this.$refs.dropDownRef.transition = '2s'
                // console.log(this.$refs.dropDownRef.style)

            }
        },
    //目的地跳转
    cityLink(){
      this.$router.push('/city')
    },
    // 价格滑块控制
    sliderChange(value) {
      let arr = [...value];
      this.minPrice = arr[0];
      this.maxPrice = arr[1];
      if (value[1] > 1000) {
        this.maxPrice = "不限";
      }
    },
    // 价格区间选择
    priceFirst(item) {
      let arr = [...item];
      this.value = arr;
      this.minPrice = arr[0];
      this.maxPrice = arr[1];
    },
    priceSecond(item) {
      let arr = [...item];
      this.value = arr;
      this.minPrice = arr[0];
      this.maxPrice = arr[1];
    },
    priceThirdly(item) {
      let arr = [...item];
      this.value = arr;
      this.minPrice = arr[0];
      this.maxPrice = arr[1];
    },
    priceFourthly(item) {
      let arr = [...item];
      this.value = arr;
      this.minPrice = arr[0];
      this.maxPrice = arr[1];
    },
    // 清空按钮
    emptyBtn() {
      this.getStayList()
      this.$refs.priceRefs.toggle()
    },
    // touch上滑和下滑事件
    // upTouch() {
    //   console.log("1");
    // },
    // downTouch() {
    //   console.log("2");
    // },
    // 轮播图指示器
    carRoll(index) {
      this.current = index;
      console.log(index)
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll,true)
  }
};

</script>

<style lang="scss" scoped>
@import 'public/scss/stay.scss';
</style>

