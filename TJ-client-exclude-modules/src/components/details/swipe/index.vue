<template>
  <div class="swipe">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      z-index="10"
      safe-area-inset-top
      loop
      touchable
      @change="onChange"
    >
      <van-swipe-item v-for="(item, index) in swipers" :key="index" >
        <img :src="item.url[0]" alt="" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator" >{{lei}}</div>
      </template>
    </van-swipe>
   <!-- <button @click="showarr">点击</button> -->
    <van-icon name="like-o" 
    class="like "
    @click="colaction"
    ref="collection"
    
   
     />
  </div>
</template>

<script>
export default {
//  props:['swiper','collHistory'],
 props: {
   swiper: {
     type: Object,
     require: true
   },
   collhistory: {
     type: Object,
     require: true
   },
  //  iscollect: {
  //    type: Boolean,
  //    require: true
  //  }

 },
  data() {
    return {
      lei: "封面",
      likelist: this.collhistory,
      swipers: this.swiper,
      ylikesate: '',
      cs:''
      // state: !this.iscollect
    };
  },
  watch: {

    swiper: {
      deep: true,
      handler:function(nval,oldval) {
        this.$nextTick(()=> {
          this.swipers = nval
        })
      }
    },
    collhistory: {
      deep: true,
      handler: function(val) {
        console.log(val)
        this.likelist = val

      }

    },
    // iscollect: {
    //   handler(nval) {
    //     this.ylikesate = nval
    //   }
    // }
  },
  updated(){
    // console.log('我更新了')
    console.log(this.cs)
    if(this.cs) {
     this.$refs.collection.classList.toggle('van-icon-like')
     this.$refs.collection.classList.toggle('likes')
    console.log(this.$refs.collection.classList)
    //  this.state = true
  } 
  },
// created() {
// console.log(this.ylikesate)
// },
mounted() {
  // console.log(`后台vuex传递后${this.$store.state.isCollection.issc}`)
  // console.log(this.$store.state.isCollection)
  // if(this.iscollect) {
  //    this.$refs.collection.classList.toggle('van-icon-like')
  //   console.log(this.$refs.collection.classList)
  //   //  this.state = true
  // } 
},
methods: {
    onChange(index) {
      let mx=this.swipers.map(item=> {
       return item.class_name
      })
      this.lei = mx[index];
    },
    // colaction() {
    //   // console.log('----后台数据'+this.ylikesate)
    //   // console.log('---------状态'+ this.state)
    //   // console.log(this.$refs.collection)
    //   // this.state = true
    //   // if(this.ylikesate) {
    //   //   console.log('---------状态'+ this.state)
    //   //   this.$refs.collection.classList.toggle('likes')
    //   //   this.state = false
    //   //   console.log('---------状态'+ this.state)
    //   // }

    // }
   colaction() {
     console.log(this.$refs.collection)
     this.$refs.collection.classList.toggle('van-icon-like')
     this.$refs.collection.classList.toggle('likes')
      this.likedate = !this.likedate;
     if(this.likedate) {
      //  this.likelist =false

     this.$axios.post('/profile/collect',this.likelist)
       

     }else {
     
        
          this.$axios.delete('/profile/collect',{
        data: {rid: this.$route.query.id}
      })

     }

  }

    // showarr() {
    //   // console.log(this.swiper)
    //   // console.log(this.images)
    // }
  },
  computed: {

    // mioashu() {
    //   console.log(this.swiper)
    //     let mx;
    //   for(let i in this.swiper[]) {
    //     // console.log(this.swiper[i])
    //      mx= this.swiper[i]

    //   }
    //   console.log(mx)

    //   return "ss"
      
   
      
    // }

    // miaoshu () {
    //   this.swiper.map(item=> {
    //    return item.class_name
    //   })
    // }
 
  }
};
</script>

<style lang="scss">
.swipe {
   position: relative;
  .my-swipe .van-swipe-item {
   
    
    
    img {
      width: 100%;
 
    }
  }
  .custom-indicator {
    position: absolute;
    color: #fff;
    border-radius: 35px;
    right: 35px;
    bottom: 35px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  .like {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #fff;
    font-size: 25px;

  }
  .likes {
    color: red;

  }

  
}
</style>
