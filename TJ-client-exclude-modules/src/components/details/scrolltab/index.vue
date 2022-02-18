<template>
  <div class="scrolltab">
    <van-tabs
      scrollspy
      sticky
      color="#ff9645"
      title-active-color="#ff9645"
      v-model="activeName"
     
    >
      <van-tab :title="'概览'" name="a">
        <intro-duce :title="title" :label="label"></intro-duce>
      </van-tab>
      <van-tab :title="'房源'" name="b">
        <you-hui></you-hui>
        <da-te ref="dataRef" @dateshow='cs($event)'></da-te>
        <calen-dar :titls='ss' ref="calend"></calen-dar>
        <hous-scource :params="params" :swiper="swiper" :jiage="jiage"></hous-scource>
      </van-tab>
      <van-tab :title="'设施'" name="c">
        <facil-ities :facility="facility"></facil-ities>
      </van-tab>
      <van-tab :title="'房东'" name="d">
        <land-lord :fowner="owner"></land-lord>
      </van-tab>
      <van-tab :title="'点评'" name="e">
        <com-ment :discuss="discuss"></com-ment>
      </van-tab>
      <van-tab :title="'须知'" name="f">
        <not-ice :notice="notice"></not-ice>
      </van-tab>
      <van-tab :title="'周边'" name="g">
        <!-- <map-around></map-around> -->
        <map-img></map-img>
        <map-tabs :circum="circum"></map-tabs>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import swipe from "@/components/details/swipe";
import introduce from "@/components/details/introduce";
import HousScource from "@/components/details/houssource";
import FacilIties from "@/components/details/facilities";
import landLord from "@/components/details/landlord";
import comMent from "@/components/details/comment";
import notIce from "@/components/details/notice";
// import map from "@/components/details/map";
import mapImg from "@/components/details/mapimg";
import mapTabs from "@/components/details/maptabs";
import youHui from "@/components/details/youhui";

import DaTe from "@/components/details/date";
import calenDar from "@/components/details/calendar";
export default {
   props: {
    allDate: {
      type: Object,
      require: true,
      default: function() {
        return {};
      }
    }

  },
  data() {
    return {
      activeName: "a",
      ss: '',

      swiper: undefined,
      title:'',
      label: undefined,
      params: undefined,
      jiage: '',
      facility: undefined,
      owner:'',
      discuss:'',
      notice: undefined,
      circum: undefined,
      // location:"",
      // collHistory: undefined

    };
  },
  components: {
    // "sw-ipe": swipe,
    "intro-duce": introduce,
    HousScource,
    FacilIties,
    landLord,
    comMent,
    notIce,
    // FooTer,
    // "map-around": map,
    mapImg,
    mapTabs,
    youHui,
    DaTe,
    calenDar

  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll,true); // 监听滚动事件

    // this.axios.get('/details/?rid=60c164a7074200005d003192').then(result=>{
    //   // console.log(result.data.result)
    //   const data = result.data.result
    //   console.log(data)

    //   // {(this.title.name),(this.title.star),(this.title.location),(this.title.nearby)} = {(data:'r_name'),(data.star),(data.location),(data.nearby)}
      
    //   let  {r_name:name,star,location,nearby,label,params,swiper, price, new_price,facility,owner,discuss,notice,circum} =data;
    //   // console.log(name,star,location,nearby)
    //   this.title = {
    //     name,
    //     star,
    //     location,
    //     nearby,
    //     label
        

    //   }
    //   // console.log(label)
    //   this.label = label;
    //   this.params = params;
    //   this.swiper = swiper;
    //   this.jiage = {
    //     price,
    //     new_price
    //   };

    //   this.facility = facility;
    //   this.owner = owner;
    //   this.discuss = discuss;
    //   this.notice = notice;
    //   this.circum = circum;


    //   // :swiper="swiper[0].url"
    //   // this.bus.$emit('url', this.swiper[0].url[0])
    //   // console.log(hsueh)
    //   // console.log(this.title)
    //   // console.log(this.swiper)
    //   // console.log(this.jiage)
    //   // console.log(facility)
    //   // console.log(owner)
    //   // console.log(discuss)
    //   // console.log(this.notice)
    //   // console.log(this.circum)


    // })

  },
  watch:{
    allDate:{ 
      deep: true,
     handler:function (val) {
      // console.log(val)
        let  {r_name:name,star,location,nearby,label,params,swiper, price, new_price,facility,owner,discuss,notice,circum} =val;
        this.title = {
        name,
        star,
        location,
        nearby,
        label,
        price,
        new_price
        

      }
       this.$store.commit('getCoordinate',location)
       console.log(this.$store.state)
      // console.log(label)
      this.label = label;
      this.params = params;
      this.swiper = swiper;
      this.jiage = {
        price,
        new_price,
        r_name:name

      };
    //   let imglist = swiper.map((item) => {
    //   return item.url[0];
    // });

    //    let collectionHistory = {
    //   rid: this.$route.query.id,
    //   imgList: imglist,
    //   title: name,
    //   params: params,
    //   score_count: discuss.length + 1,
    //   con_title: con_title,
    //   price: price,
    //   new_price: new_price,
    // }

    // this.collHistory = collectionHistory


        // console.log(this.collHistory)

      this.facility = facility;
      this.owner = owner;
      this.discuss = discuss;
      this.notice = notice;
      this.circum = circum;
      // this.location = location;


      // console.log(this.params)
      // console.log(this.iscollect)

     }
    }
    
  },
  methods: {
    cs(c) {
      this.$refs.calend.show=c
     
      
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      // let offsetTop = document.querySelector(".van-sticky").offsetTop
      let stick = document.querySelector(".van-sticky");


      if (scrollTop>='300') {
        // console.log(scrollTop)
        stick.classList.add("hsueh");
      } else if (scrollTop <= "300") {
        stick.classList.remove("hsueh");
      }
      },

      show(e) {
        console.log(e)
        console.log(tit)
      }
    
  },
  beforeDestroy() { // 在组件生命周期结束的时候销毁。
    window.removeEventListener('scroll', this.handleScroll,true)
  },
};
</script>


<style lang="scss">
.scrolltab {
  .van-sticky {
    display: none;
  }
  .hsueh {
    display: block;
  }
}
</style>