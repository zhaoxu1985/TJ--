<template>
  <div class="details">
    <!-- <button @click="qingq">请求</button> -->
    <nav-bar></nav-bar>
    <detail-ske :skeShow="skeShow"></detail-ske>

          <sw-ipe ref="cs" :swiper="swiper" :collhistory="collhistory" ></sw-ipe>
          <scroll-tab :allDate="allDate"></scroll-tab>

          <!-- <intro-duce></intro-duce>
          <hous-scource></hous-scource>
          <facil-ities></facil-ities>
          <land-lord></land-lord>
          <com-ment></com-ment>
          <not-ice></not-ice> -->
          <foo-ter></foo-ter>
          <act-ion :prices="prices"></act-ion>
  </div>
</template>

<script>
import navbar from "@/components/details/navbar";
import scrolltab from "@/components/details/scrolltab";
import swipe from "@/components/details/swipe";
// import introduce from "@/components/details/introduce";
// import HousScource from "@/components/details/houssource";
// import FacilIties from "@/components/details/facilities";
// import landLord from "@/components/details/landlord";
// import comMent from "@/components/details/comment";
// import notIce from "@/components/details/notice";
import action from "@/components/details/action";
import FooTer from "@/components/details/footer";
import detailSke from '@/components/detailListSke'
export default {
  data() {
    return {
      swiper: "",
      allDate: undefined,
      prices: undefined,
      collhistory: undefined,
      vuex:'',
      // iscollect: undefined,

      //骨架屏
      skeShow:true
    };
  },
  beforeCreate() {
    console.log(this.$store.state);
  },
  // mounted() {
  //     this.$axios.get(`/details/?rid=${this.$route.query.id}`).then(result=>{
  //     const data = result.data.result;
  //     this.allDate = data;
  //     console.log(data);
  //     this.swiper = data.swiper;
  //     const { price, new_price, r_name, params, owner } = data;

  //     // console.log(price,new_price)
  //     this.prices = {
  //       price,
  //       new_price,
  //       uid: this.$route.query.id,
  //       fm: this.swiper[0].url[0],
  //       bt: r_name,
  //       fbt: params,
  //       owner: owner,
  //     };
  //     // console.log(this.prices)
  //     // console.log(this.$route)
  //     // console.log(this.prices);
  //   });d
  // },

  async created() {

    let { data: data } = await this.$axios.get(
      `/details/?rid=${this.$route.query.id}`
    );
    this.skeShow=false
    const dataes = data.result;
    this.allDate = dataes;
    console.log(this.allDate);

    this.swiper = dataes.swiper;
    const { price, new_price, r_name, params, owner, con_title, discuss, isCollect} =
      dataes;

    // console.log(price,new_price)
    this.prices = {
      price,
      new_price,
      uid: this.$route.query.id,
      fm: this.swiper[0].url[0],
      bt: r_name,
      fbt: params,
      owner: owner,
    };
    let imgurl = dataes.swiper;
    const sc = {
      issc: isCollect.toString()
    };
    this.vux=isCollect
    this.css(isCollect)
 //你穿的
    // await this.$store.commit('getCollection',sc)
    // console.log('输出>>')
    // console.log(isCollect)
    // console.log('传递前vuex')
    // console.log(this.$store.state.isCollection)



    let imglist = imgurl.map((item) => {
      return item.url[0];
    });

      let collectionHistory = {
      rid: this.$route.query.id,
      imgList: imglist,
      title: r_name,
      params: params,
      score: discuss[0].score,
      score_count: discuss.length + 1,
      con_title: con_title,
      price: price,
      new_price: new_price,
    }
    this.collhistory = collectionHistory
    // console.log(collectionHistory)
    let { data: res } = await this.$axios.post("/profile/history",collectionHistory);

    const startdate = Math.min.apply(null, this.$store.state.dataDate);
    const enddate = Math.max.apply(null, this.$store.state.dataDate);
    let {data: result} = await this.$axios
      .get(
        `/details/is?start=${startdate}&end=${enddate}&rid=${this.$route.query.id}`
      )
      this.$store.commit('getReserve',result.ok)
      // console.log(this.$store.state.isReserve)



    // console.log(res)

    //  let imglist=[];
    //  for(let k in imgurl){
    //     //  console.log()
    //      imglist.push(imgurl[k].url[0])
    //  }
    //  console.log(imglist)

    // })
    // console.log(imglist)

    // let {data: his} = await this.$axios.post('/profile/history', {
    //   rid: this.$route.query.id,
    //   imgList
    //   title
    //   params
    //   params
    //   score_count
    //   con_title
    //   price
    //   new_price

    // })
  },
  methods:{
    css(val){
      console.log(val)
    this.$refs.cs.cs=val
    }
  },
  components: {
    "nav-bar": navbar,
    "scroll-tab": scrolltab,
    "sw-ipe": swipe,
    detailSke,
    // "intro-duce": introduce,
    // HousScource,
    // FacilIties,
    // landLord,
    // comMent,
    // notIce,
    FooTer,
    "act-ion": action,
  },
  // methods: {
  //   qingq() {

  //     this.axios.get('/details/?rid=60c164a7074200005d003192').then(result=>{
  //       console.log(result)
  //     })

  //   }
  // }
};
</script>
<style lang="scss"></style>
