<template>
  <div class="Index-view">
    <!-- 头部标题 -->
    <div class="test-scroll-wrap">
      <div class="headerTitle">
        <span class="titleLogo">途家民宿</span>
      </div>
      <!-- 背景图 -->
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" v-lazy="image" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator" ref="indecatorRef">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </template>
      </van-swipe>
      <!-- 搜索订单卡片 -->
      <div class="cardSearch">
        <div>
          <van-cell class="current-location">
            <div class="current-city">
              <!-- 定位地点 -->
              <span style="font-weight: bold" @click="SearchCity">
                {{ $store.state.city }}
              </span>
            </div>
            <!-- 定位按钮 -->
            <div class="currentBtn">
              <div v-if="local!='定位中...'">
                <img
                  width="18px"
                  src="https://pic.tujia.com/upload/festatic/publicImages/icon-weizhi-tujia.png"
                  alt=""
                  style="margin-top: -3px;
    height: auto;"
                />
                <span @click="getLocation()"> 我的位置 </span>
              </div>
              <van-loading v-else size="12px" color="#ff9645" text-color="#666"
                >我的位置...</van-loading
              >
            </div>
          </van-cell>
        </div>
        <!-- 选择日期 -->
        <div class="option-date">
          <van-cell @click="optionDate">
            <div class="option-dateDiv">
              <span style="font-size: 10px;color: #A4A4A4">入住</span>
              <span class="star-date">{{ $store.state.starDate }}</span>
            </div>
            <div>
              <span class="allTime">{{ $store.state.night }}晚</span>
            </div>
            <div>
              <span style="font-size: 10px;color: #A4A4A4">离店</span>
              <span class="end-date">{{ $store.state.endDate }}</span>
            </div>
          </van-cell>
          <!-- 日期选择 -->
          <van-calendar
            color="#FF9645"
            v-model="show"
            type="range"
            @confirm="onConfirm"
            @select="onCalfirm"
            :style="{ height: '100%' }"
          >
            <!-- 日期选择标题 -->
            <template #title>
              <div class="date-continer">
                <span class="clear-empty" @click="dateEmpty">清空</span>
                <span class="checkDate">{{ checkDate }}</span>
                <span class="sumDate">共{{ sumDate }}晚</span>
                <span class="leaveDate">{{ leaveDate }}</span>
              </div>
            </template>
          </van-calendar>
        </div>
        <!-- 选择价格人数 -->
        <div class="price-person">
          <van-row>
            <van-col span="16">
              <van-cell @click="showPopup">
                <div>
                  <span v-if="$store.state.priceData.length>1">{{ $store.state.priceData[0]+'-'+$store.state.priceData[1] }}</span>
                  <span v-else>{{ priceSum }}</span>
                </div>
              </van-cell>
            </van-col>
            <van-col span="8" @click="peoNumShow = true">
              <van-cell>
                <div>
                  <span>{{ peoNumData }}</span>
                </div>
              </van-cell>
            </van-col>
          </van-row>
        </div>
        <!-- 搜索关键字 -->
        <div class="keywordSearch" @click="keyword">
          <van-cell>
            <span v-if="$store.state.searchData != ''">关键字/位置/民宿名</span>
            <span v-else>{{ store.state.searchData }}</span>
          </van-cell>
        </div>
        <!-- 关键地点搜索 -->
        <div class="dataTag" style="border: 0">
          <!-- 搜索按钮 -->
          <van-button
            color="linear-gradient(to right, #FA8D1E, #FCAF3F)"
            @click="searchBtn"
          >
            开始搜索
          </van-button>
        </div>
<!--        -->
        <div class="complain" style="border: 0">
          <span>
            全国旅游投诉平台 www.12301.cn
          </span>
        </div>
      </div>
      <!-- 滑动轮播 -->
      <div class="scroball">
        <ul>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_210329/202103291824074567.png"
              alt=""
            /><br />
            <span>房东入住</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241613557364.png"
              alt=""
            /><br />
            <span>新房特惠</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241606527781.png"
              alt=""
            /><br />
            <span>实拍美屋</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241609392352.png"
              alt=""
            /><br />
            <span>品牌民宿</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241610475893.png"
              alt=""
            /><br /> 
            <span>整套出租</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241619599744.png"
              alt=""
            /><br />
            <span>做饭方便</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241618017144.png"
              alt=""
            /><br />
            <span>LOFT</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241616084091.png"
              alt=""
            /><br />
            <span>客栈</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241615137585.png"
              alt=""
            /><br />
            <span>别墅</span>
          </li>
          <li>
            <img
              src="https://pic.tujia.com/upload/resourcespic/day_201124/202011241611372682.png"
              alt=""
            /><br />
            <span>优选</span>
          </li>
        </ul>
      </div>
      <!-- 瀑布流民宿数据 -->
      <keep-alive>
      <div class="waterfall">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <div class="homestay">
              <list-ske class="homestay ske" :show="skeShow"></list-ske>
            <div
              class="homestay-item"
              v-for="item in result"
              :key="item._id"
              @click="skipBtn(item._id)"
            >
              <img :src="item.swiper" alt="" />
              <van-tag round class="preference">{{ item.con_title }}</van-tag>
              <div class="text-introduce">
                <span class="city"><img src="icon/local.png" alt="">{{ item.location.slice(4, 10) }}</span>
                <p>{{ item.r_name }}</p>
                <span class="class"
                  >{{ item.params.attr }} · {{ item.params.house }}居{{
                    item.params.bed
                  }}床{{ item.params.person_count }}人</span
                ><br />
                <span class="price"> ¥{{ item.new_price }} </span>
                <span class="originalPrice" v-if="item.price!==item.new_price"> ¥{{ item.price }} </span>
                <van-tag class="itemPrice" round type="danger" v-if="item.price!==item.new_price"
                  >已减¥{{ item.price - item.new_price }}</van-tag
                >
              </div>
            </div>
          </div>
        </van-list>
      </div>
      </keep-alive>
      <!-- 价格弹出层 -->
      <van-popup
        v-model="showPrice"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <div class="continer">
          <div>
            <span>价格/星级</span>
            <van-icon name="cross" @click="empty" />
          </div>
          <div class="continer-card">
            <div class="price-section">
              <span v-if="maxPrice < 1000"
                >价格区间￥{{ minPrice }}-￥{{ maxPrice }}</span
              >
              <span v-else>价格区间￥{{ minPrice }}-不限</span>
            </div>
            <div class="price-slider">
              <!-- 价格滑块 -->
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
            </div>
            <!-- 价格区间选择 -->
            <div class="price-select">
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
          <!-- 功能按钮 -->
          <div class="btnSet">
            <van-button type="default" @click="emptyBtn">清空</van-button>
            <van-button color="#FF9645" @click="affirmBtn">确认</van-button>
          </div>
        </div>
      </van-popup>
      <!-- 人数弹出层 -->
      <van-popup
        style="border-radius: 0"
        v-model="peoNumShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <div class="peoNumContiner">
          <div class="title">
            <van-icon name="cross" @click="peoNumShow = false" />
            <div class="title-text">
              <span> 选择入住人数 </span>
            </div>
          </div>
          <div
            class="peoNumItem"
            v-for="(item, index) in peoNum"
            :key="index"
            @click="peoNumBtn(item[0])"
          >
            <span>{{ item[0] }}</span>
            <van-icon v-if="peoNumData == item[0]" name="success" />
          </div>
        </div>
      </van-popup>
      <!-- 搜索框弹出 -->
      <van-search
        v-model="searchValue"
        v-show="searchShow"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
        <template #left>
          <div class="bourn">
            <span>目的地</span>
            <br />
            <span class="city">{{ $store.state.city }}</span>
          </div>
          <div class="search-time">
            <span>住{{ $store.state.starDate }}</span>
            <br />
            <span>离{{ $store.state.endDate }}</span>
          </div>
        </template>
      </van-search>
    </div>
    <table-bar v-show="tabbar"></table-bar>
  </div>
</template>

<script>
import listSke from '../homeListSke.vue'
export default {
  components:{
    listSke
  },
  data() {
    return {
      // 轮播图
      images: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn10118%2F220%2Fw640h380%2F20190109%2F98b3-hrkkweh3334597.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627216756&t=e2981e43a5675eefc1da31a8accc6da6",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F36bed585-3ead-4b42-81cb-d467445070f9%40r_750w_750h_ss1.jpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627216800&t=b0d4989351129a664361a357298c3eae",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuserimg.qunar.com%2Fimgs%2F201302%2F21%2F18ugU11pmia-VQum1720.jpg&refer=http%3A%2F%2Fuserimg.qunar.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627216827&t=27b1d5862dac43dcba3662cea0580622",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn14%2F726%2Fw1400h926%2F20180820%2F1e35-hhxaafz1666444.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627216859&t=d0f8ba65b1afabd3fd9b8111dd764a59",
      ],
      // 时间弹出层
      show: false,
      // tabbar
      tabbar: true,
      // 入住时间
      starDate: "",
      // 离店时间
      endDate: "",
      // 价格选择隐藏
      showPrice: false,
      // 人数弹出层隐藏
      peoNumShow: false,
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
        [1000, "不限"],
      ],
      // 价格显示
      priceSum: "价格等级不限",
      // 优选评论
      rateValue: 5,
      // 选择人数
      peoNum: [
        ["1人"],
        ["2人"],
        ["3人"],
        ["4人"],
        ["5人"],
        ["6人"],
        ["7人"],
        ["8人"],
        ["9人"],
        ["10人+"],
        ["不限人数"],
      ],
      // 主页人数
      peoNumData: "人数不限",
      // 天数
      putDate: 1,
      // 关键地点搜索数据
      waterList: [],
      loading: false,
      finished: true,
      // 搜索框弹出层
      searchShow: false,
      // 搜索内容
      searchValue: "",
      // 入住日期
      checkDate: "入住日期",
      // 间隔时间
      sumDate: 0,
      // 离店日期
      leaveDate: "离店日期",
      dataDate: [],
      result: {},
      //  地址
      local: "",
      skeShow:true
    };
  },
  created() {
    let date = new Date();
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);
    let cotin = date.getTime();
    if (this.$store.state.starDate == "" && this.$store.state.endDate == "") {
      this.starDate = `${date.getMonth() + 1}月${date.getDate()}日`;
      this.endDate = `${date.getMonth() + 1}月${date.getDate() + 1}日`;
      this.$store.commit("hotelStarDate", this.starDate);
      this.$store.commit("hotelEndDate", this.endDate);
      this.$store.commit("hotDataDate", [cotin, cotin + 86400000]);
    }
    console.log(this.$store.state);
    let that = this;
    this.$nextTick((_) => {
      document.querySelector(".test-scroll-wrap").onscroll = function () {
        let dom = this.scrollTop;
        if (dom > 520) {
          that.searchShow = true;
        } else {
          that.searchShow = false;
        }
      };
    });
    this.getIndexList();
    if(this.$store.state.city==''){
      console.log('目前还是空')
      this.getLocation();
    }

  },
  watch: {
    local(val) {
      console.log(val);
      this.$store.commit("cityData", val);
    },
    show(val) {
      if (val == true) {
        return (this.tabbar = false);
      }
      this.tabbar = true;
    },
    showPrice(val) {
      if (val == true) {
        return (this.tabbar = false);
      }
      this.tabbar = true;
    },
  },
  methods: {
    // 跳转到选择城市
    SearchCity(){
      this.$router.push('/city')
    },
    // 页面跳转
    skipBtn(id) {
      this.$router.push("/details?id=" + id);
    },
    // 搜索
    onSearch() {
      console.log(this.searchValue);
      if (this.searchValue != "") {
        this.$store.commit("searchData", {
          wd: this.searchValue,
          page: 1,
          count: 10,
          minPrice: this.$store.state.priceData[0],
          maxPrice: this.$store.state.priceData[1],
          star: [1, 2, 3, 4],
        });
        this.$store.commit("cityData", this.searchValue);
        console.log(this.$store.state);
        this.$router.push("/stay");
      }
    },
    // 显示日期选择
    optionDate() {
      this.show = true;
    },
    // 地理位置获取
    getLocation() {
      this.local = "定位中...";
      const self = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 1000,
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);
        function onComplete(data) {
          // data是具体的定位信息
          console.log("定位成功信息：", data);
          console.log(data);
          self.local = data.addressComponent.district?data.addressComponent.district:data.addressComponent.province;
        }
        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          // 调用ip定位
          self.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      let that = this;
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("通过ip获取当前城市：", result);
            that.local = result.city;
            //逆向地理编码
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  console.log(data);
                }
              });
            });
          }
        });
      });
    },
    // 请求数据
    async getIndexList() {
      const { data: res } = await this.$axios.get(
        "index/list?page=1&count=100"
      );
      this.skeShow=false
      this.result = res.result;
      
    },
    // 轮播图
    onChange(index) {
      let div = this.$refs.indecatorRef.querySelectorAll("div");
      for (var k = 0; k < div.length; k++) {
        div[k].style.backgroundColor = "gray";
      }
      div[index].style.backgroundColor = "white";
    },
    formatDate(date) {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    },
    // 起始时间和结束时间
    onConfirm(date) {
      const [start, end] = date;
      date[0].setHours(12);
      date[1].setHours(12);
      console.log(date);
      this.putDate =
        parseInt(date[1].getTime() / 1000 / 60 / 60 / 24) -
        parseInt(date[0].getTime() / 1000 / 60 / 60 / 24);
      this.$store.commit("night", this.putDate);
      this.show = false;
      this.starDate = this.formatDate(start);
      this.endDate = this.formatDate(end);
      let data = [];
      data.unshift(date[0].getTime());
      data.unshift(date[1].getTime());
      this.dataDate = data;
      this.$store.commit("hotelStarDate", this.starDate);
      this.$store.commit("hotelEndDate", this.endDate);
      this.$store.commit("hotDataDate", this.dataDate);
      console.log(this.$store.state);
    },
    // 控制弹出层
    showPopup() {
      this.showPrice = true;
      // this.show = true;
    },
    // 关闭弹出层
    empty() {
      this.showPrice = false;
    },
    // 价格滑块控制
    sliderChange(value) {
      let arr = [...value];
      console.log(arr);
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
    // 关键字
    keyword() {
      this.$router.push("search");
    },
    // 清空按钮
    emptyBtn() {
      this.value = [0, 1050];
      this.minPrice = 0;
      this.maxPrice = "不限";
    },
    // 确认按钮
    affirmBtn() {
      this.priceSum = `￥${this.minPrice}- ${this.maxPrice}`;
      this.showPrice = false;
      if(this.maxPrice!='不限'){
      this.$store.commit("priceData", [this.minPrice, this.maxPrice]);
      }else{
         this.$store.commit("priceData", [this.minPrice, 2000]);
      }
      console.log(this.$store.state);
    },
    // 选择人数
    peoNumBtn(item) {
      this.peoNumData = item;
      this.peoNumShow = false;
    },
    // 页面选择时间
    onCalfirm(date) {
      this.sumDate = 0;
      this.leaveDate = "离店日期";
      let checkDateMonth = date[0].getMonth() + 1;
      let checkDateDate = date[0].getDate();
      this.checkDate = `${checkDateMonth}月${checkDateDate}日`;
      if (date[1] !== null) {
        let leaveDateMonth = date[1].getMonth() + 1;
        let leaveDateDate = date[1].getDate();
        this.leaveDate = `${leaveDateMonth}月${leaveDateDate}日`;
        let timea = date[0].getTime() / 1000 / 60 / 60 / 24;
        let timeb = date[1].getTime() / 1000 / 60 / 60 / 24;
        this.sumDate = timeb - timea;
      }
    },
    // 选择时间清空
    dateEmpty() {
      this.sumDate = 0;
      this.leaveDate = "离店日期";
      this.checkDate = "入住日期";
    },
    //开始搜索
    searchBtn() {
      this.$router.push("/stay");
    },
  },
};
</script>

<style lang="scss">
@import "public/scss/index.scss";
.ske{
  align-items: center;
  display: flex;
  text-align: center;
  z-index:1;
}
.van-search--show-action{
  z-index: 1024;
}
</style>
