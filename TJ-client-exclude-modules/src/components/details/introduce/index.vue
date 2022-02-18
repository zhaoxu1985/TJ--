<template>
  <div class="introduce">
    <!-- <div class="xian"></div> -->
    <!-- <van-divider /> -->
    <!-- <van-cell value="内容" /> -->
    <!-- <div class="describe">
    天津西青大学城幕围电影主题大床房
    天津西青大学城幕围电影主题大床房
    </div> -->

    <div class="discount" v-if="chajiashow" >特惠价格！已优惠{{chajia}}元</div>

    <van-cell-group class="grub">
      <div class="van-cell__title ">
       
    {{biaoti.name}}
    <!-- X -->
        <span v-for="(val, index) in biaoti.star" :key="index">
          <img src="/icon/diamondLevel.png" alt=""
        /></span>
      </div>
      <div class="lable" >
        <span  v-for="val,i  in miaoshu.base " :key="i" class="lablelist">{{
          val
        }}</span>
        <span v-for="k in miaoshu.play" :key="k" class="lablelist2">{{ k }}</span>
      </div>
      <div class="listinfo" @click="other">
        <span class="pingfen">4.9</span>
        <span class=".zan">超赞</span>
        <span class="pingyu">"房东超赞"</span>
        <span class="pinglun">89条评论<span><img src="/icon/tujia_arrow_right.png" alt=""></span></span>
      </div>
      <!-- <div class="listinfo2">
        <div class="leftlist">
          <div class="van-ellipsis">
            石景山区, 北京石景山区鲁谷大街与京源路交叉口紫御长安
          </div>
          <div class="ditie">
            <img src="/icon/position_subway.png" alt="" />
            近地铁站.距离八角游乐园地铁站直线距离443m，步行约9min
          </div>
          
        </div>
        <div class="rightlist"><span>地图</span> <span>周边></span></div>
        
      </div> -->

      <div class="ditu" >
      <div class="ditu-cont">
        <div class="ditu-left">
          <div class="dizhi">{{biaoti.location}}</div>
          <div class="juli" v-if="ditieshow">
            <img src="/icon/position_subway.png" alt="">
            {{biaoti.nearby}}
          </div>
        </div>
        <div class="ditu-right"  @click="gomp">
          <span class="text" >地图·周边</span>
          <span><img src="/icon/tujia_arrow_right.png" alt=""></span>
        </div>
      </div>
    </div>
    </van-cell-group>
   
    <div class="xbx"></div>
    <!-- <div v-for="k in 50" :key="k">dsadadasdaddadsas</div> -->
  </div>
</template>

<script>

export default {
  props:{
    title: {
      type: String | Number,
      require: true,
      default: function() {
        return {}
      }
    },
    label:{
      type: Array | String,
      require: true,

      default: function() {
        return {
          base:[''],
          play:['']
        }
      }

    }
  },
  data() {
    return {
      show: false,
      
      biaoti:'',
      miaoshu: '',
      goodtime: 3,
      chajia:'',
      chajiashow:true,
      ditieshow: true
         
          //  base: this.title.label.base,
          //  play: this.title.label.play,
          // titles: {
          //   label: {
          //     base: [''],
          //     play: ['']
          //   }

          // }
    
   

    }
    
  },
  watch: {
    title(val) {
      this.biaoti=val
      this.chajia = (val.price - val.new_price)
      // console.log(this.chajia);
      if(this.chajia == 0) {
        this.chajiashow = false
      }
      if(val.nearby == '') {
        this.ditieshow = false
      }
    },
     label(val) {
       this.miaoshu = val
     }
    
  },
  mounted() {
    // console.log(this.title)
    // console.log(this.title.label.base)
    // console.log(this.lable)
  },
  methods: {
    gomp() {
       this.$router.replace({
         name: 'mapIndex',
         params: {
            rid: this.$route.query.id,
            ln: this.$store.state.address[0],
            lr: this.$store.state.address[1],
            city: this.$store.state.coordinate
         }
       
       })

    },
      other() {
      this.$toast({
        message: "功能待开发",
        icon: "smile",
      });
    },
  },
  // watch: {
  //   title(newval,oldval) {
  //     this.titles = newval
  //     console.log(newval)
  //   }

  // }

};
</script>

<style lang="scss">
.introduce {
  .grub {
    padding: 12px 16px;
  }
  .discount {
    background-image: url("/icon/big_promotion_bg.png");
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .van-cell__title {
    margin: 0 0 6px;
    font-weight: 700;
    font-size: 20px;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
    span {
      img {
        width: 12px;
      }
    }
  }
  .lable {
    display: flex;
    flex-flow: row wrap;
    max-height: 47px;
    overflow: hidden;
    margin-bottom: 12px;

    .lablelist {
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 2px;
      margin: 4px 4px 0 0;
      color: rgb(255, 150, 69);
      background: rgba(255, 150, 69, 0.15);
    }
    .lablelist2 {
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 2px;
      margin: 4px 4px 0 0;
      color: rgb(23, 210, 188);
      background: rgba(23, 210, 188, 0.1);
    }
  }
  .listinfo {
    height: 30px;
    background: #f5f7fa;
    border-radius: 5px;
    padding: 0 12px;
    line-height: 30px;
    font-size: 12px;

    .pingfen {
      font-size: 18px;
      color: #333;
      font-weight: 700;
      margin-left: 2px;
    }
    .zan {
      color: #333;
      font-weight: 700;
    }
    .pinglun {
      float: right;
      color: #ff9645;
      img {
          width: 5px;
          height: 8px;
          margin-left: 2px;

      }
    }
    .pingyu {
      color: #666;
    }
  }



  .ditu {
    padding: 12PX;
    position: relative;
    margin-top: 15px;
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      background-image: url('/icon/map_bg.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border-radius: 6px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      opacity: .5;
    }
    .ditu-cont {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 6px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      .ditu-left {
        flex: 1;
        overflow: hidden;

        .dizhi {
          font-weight: 700;
          font-size: 14px;
          color: #333;
          line-height: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow : ellipsis;
        }
        .juli {
          font-size: 12px;
          line-height: 14px;
          color: #666;
          margin-top: 4px;
          overflow: hidden;
          // text-overflow: ellipsis;
          white-space: nowrap;
          img {
            width: 10px;
            height: 10px;
            vertical-align: middle;
          }
        }
      }

      .ditu-right {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        .text {
          width: 60px;
          font-size: 10px;
          color: #ff9645;
          text-align: right;
        }
        .text + span >img {
          width: 5px;
          height: 8px;
          margin-left: 2px;
        }
      }
    }
  }





  .xbx {
    height: 5px;
    // background-color: #333;
    border-bottom: 10px solid #f7f9fb;
  }
  // .describe {
  //   font-weight: 700;
  //   font-size: 20px;
  //   color: #333;
  //   text-align: center;
  //   line-height: 24px;
  //   overflow: hidden;
  //   margin-bottom: 6px;
  // }
  //  .xian {
  //    border-bottom: 1px solid black;
  //  }
}
</style>
