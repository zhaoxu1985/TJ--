<template>
  <div class="maptabs">
    <van-tabs
      type="card"
      color="#ff9645"
      animated
      title-inactive-color="#666666"
    >
      <van-tab :title="traffic" v-if="tabtra">
        <div class="map-local">
          <div class="map-local-address" v-for="item,index in zhoubian.traffic" :key="index">
            <span class="item-left">{{item.item}}</span>
            <div class="item-right">{{item.distance}}</div>
          </div>
          <!-- <div class="map-local-address">
            <span class="item-left">雁栖湖旅游商品店</span>
            <div class="item-right">直线距离3.4km</div>
          </div>
          <div class="map-local-address">
            <span class="item-left">雁栖湖旅游商品店</span>
            <div class="item-right">直线距离3.4km</div>
          </div> -->
        </div>
      </van-tab>
      <van-tab :title="sights" v-if="tabsig">
        <div class="map-local">
          <div class="map-local-address" v-for="item,index in zhoubian.sights" :key="index">
            <span class="item-left">{{item.item}}</span>
            <div class="item-right">{{item.distance}}</div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="repast" v-if="tabrep">
        <div class="map-local">
          <div class="map-local-address"  v-for="item,index in zhoubian.repast" :key="index">
            <span class="item-left">{{item.item}}</span>
            <div class="item-right">{{item.distance}}</div>
          </div>
      
        </div>
      </van-tab>
      <van-tab :title="shop" v-if="tabshop">
        <div class="map-local">
          <div class="map-local-address"  v-for="item,index in zhoubian.shop" :key="index">
            <span class="item-left">{{item.item}}</span>
            <div class="item-right">{{item.distance}}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  props: {
    circum: {
      type: Object,
      require: true,
      default: () => {
        return {
          repast: [],
          shop: [],
          sights: [],
          traffic: [],
        };
      },
    },
  },
  data() {
    return {
      zhoubian: this.circum,
      tabtra: true,
      tabsig: true,
      tabrep: true,
      tabshop: true,
    };
  },
  watch: {
    circum(val) {
      this.zhoubian = val;
      // console.log(this.zhoubian)
    },
  },
  // filters: {
  //     getname(val) {
  //         if(val.hasOwnProperty("traffic")) {
  //             return "交通"

  //         }else if(val.hasOwnProperty("sights")){
  //             return "景点"
  //         }else if(val.hasOwnProperty("repast")) {
  //             return "餐饮"

  //         }else if(val.hasOwnProperty("shop")) {
  //             return "商超"
  //         }

  //     }
  // },
  computed: {
    traffic() {
      if (this.zhoubian.hasOwnProperty("traffic")) {
        return "交通";
      } else {
        this.tabtra = false;
        return;
      }

      //  return (this.zhoubian.hasOwnProperty("traffic") )?   (this.tabtra = false) : '交通'
    },
    sights() {
      if (this.zhoubian.hasOwnProperty("sights")) {
        return "景点";
      } else {
        this.tabsig = false;
        return;
      }
    },
    repast() {
      if (this.zhoubian.hasOwnProperty("repast")) {
        return "餐饮";
      } else {
        this.tabrep = false;
        return;
      }
    },
    shop() {
      if (this.zhoubian.hasOwnProperty("shop")) {
        return "商超";
      } else {
        this.tabshop = false;
        return;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.maptabs {
  background: #fff;
  // padding: 0  12px;
  .van-tabs__nav--card {
    border: none;

    .van-tab {
      border: none;
      border-radius: 5px;
      height: 23px;

      background-color: #f5f6f7;
    }
  }
  .van-tab__pane,
  .van-tab__pane-wrapper {
    padding: 0 12px;
  }
  .map-local {
    .map-local-address {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      overflow: hidden;
      .item-left {
        font-size: 12px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-right {
        font-size: 10px;
        color: #999;
        white-space: nowrap;
      }
    }
  }
}
</style>