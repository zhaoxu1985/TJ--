<template>
  <div class="map-img">
    <div class="map-title">位置周边</div>
    <div class="map-cont" @click="gomap">
      <div class="map-local">
        <!-- https://restapi.amap.com/v3/staticmap?markers=-1,${map.markersUrl},0:${map.location}&size=307*137&key=${map.key} -->
        <img
          :src="`https://api.map.baidu.com/staticimage/v2?zoom=17&dpiType=ph&ak=${map.bkey}&height=246&width=686&center=${map.location}&markers=${map.location}&coordtype=bd09ll&markerStyles=-1,https://pic.tujia.com/upload/festatic/mp/ndetail_black.png`"
          alt=""
        />
        <div class="map-top-tit">
          <div class="address-desc">
            <img
              src="https://pic.tujia.com/upload/festatic/mp/ndetail_black.png"
              alt=""
            />
            <div class="address-desc-text" id="copy">
              {{ $store.state.coordinate }}
            </div>
          </div>
          <div class="address-copy">
            <img
              src="https://pic.tujia.com/upload/festatic/mp/nedit_division.png"
              alt=""
            />
            <div @click.stop="copytext">复制</div>
          </div>
          <div class="bottom-arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   location: {
  //     type: String,
  //     require: true,
  //     default: function () {
  //       return "ss";
  //     },
  //   },
  // },
  data() {
    return {
      //https://api.map.baidu.com/staticimage/v2?
      //zoom=17&dpiType=ph&ak=m91xuYz3SV9eIruac2G0BuuZlpyNs4Py
      //&height=246&width=686&center=116.451531244796,39.940587155136555
      //&markers=116.451531244796,39.940587155136555&coordtype=bd09ll
      //&markerStyles=-1,http://pic.tujia.com/upload/festatic/crn/position2.png

      //https://restapi.amap.com/v3/staticmap?
      //markers=-1,http://pic.tujia.com/upload/festatic/crn/position2.png,0:116.294331,39.909518
      //&key=8105cb97f8e7c42bf9f281893eae3f4f
      map: {
        bkey: "G2KVCcxS91G0ZZ5XiUZxgP3pXaQy2g8v",
        key: "8105cb97f8e7c42bf9f281893eae3f4f",
        location: "", //：经度和纬度用","分隔 经纬度小数点后不得超过6位
        // zoom: "17", // 地图级别 地图缩放级别:[1,17]
        // markers: '-1',
        // markersUrl: "https://pic.tujia.com/upload/festatic/crn/position2.png", // 标注图片
        // size: "400*400", //图片大小
      },
      // locations: this.location,
    };
  },
  // created(){
  //   console.log(this.map)
  // },
  created() {
    console.log(this.$route)
     window.showLocation = (res)=>{
      
      let r =[res.result.location.lng,res.result.location.lat]
      this.$store.commit('getAddress',r)
      let loca = r.toString()
      this.map.location = loca
      
     }
     this.$nextTick()
     const script =  document.createElement('script')
    script.src = `https://api.map.baidu.com/geocoding/v3/?address=${this.$store.state.coordinate}&output=json&ak=G2KVCcxS91G0ZZ5XiUZxgP3pXaQy2g8v&callback=showLocation`;
    document.body.appendChild(script)
    console.log(this.$store.state)
  },
  methods: {
    gomap() {
      //rid=${this.$route.query.id}&city=${this.$store.state.coordinate}&ln=${this.$store.state.address[0]}&lr=${this.$store.state.address[1]}`
      //  rid: this.$store.state.coordinate,
       //  ln: this.$store.state.address[0],
         //lr: this.$store.state.address[1]
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

    copytext() {
      // var val = document.getElementById('copy');//此处为需要复制文本的包裹元素
      // window.getSelection().selectAllChildren(val);
      // document.execCommand ("Copy");
      // this.$toast('复制成功');
      let text = document.getElementById("copy").innerText;
      let inputElement = document.createElement("input");
      inputElement.value = text;
      document.body.appendChild(inputElement);
      inputElement.select(); //选中文本
      document.execCommand("copy"); //执行浏览器复制命令
      inputElement.remove();
      this.$toast("复制成功");
    },
  },
  // watch: {
  //   location(val) {
  //     this.locations = val;

  //     window.showLocation = (res)=>{
      
  //     let r =[res.result.location.lng,res.result.location.lat]
  //     this.maplocation = r;
  //     let loca = r.toString()
  //     this.map.location = loca
      
  //    }
  //   const script =  document.createElement('script')
  //   script.src = `https://api.map.baidu.com/geocoding/v3/?address=${val}&output=json&ak=G2KVCcxS91G0ZZ5XiUZxgP3pXaQy2g8v&callback=showLocation`;
  //   document.body.appendChild(script)
  //   },
  // },

};
</script>

<style lang="scss">
.map-img {
  background: #fff;
  .map-title {
    padding: 14px 16px;
    font-size: 20px;
    color: #333;
    font-weight: 600;
  }
  .map-cont {
    padding: 16px 16px 12px 16px;

    .map-local {
      border-radius: 8px 8px 0 0;
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 137px;
      img {
        width: 100%;
        height: 137px;
        // vertical-align: middle;
        // background-size: cover;
        border: 0;
        // vertical-align: middle;
      }
      .map-top-tit {
        position: absolute;
        display: flex;
        align-items: center;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        justify-content: space-between;
        padding: 0 12px;
        font-size: 11px;
        border-radius: 4px;
        background: #fff;

        .address-desc {
          display: flex;
          align-items: center;
          flex: 1;
          color: #666;

          img {
            width: 10px;
            height: 12px;
            margin-right: 8px;
          }

          .address-desc-text {
            width: 192px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }

        .address-copy {
          display: flex;
          align-items: center;
          font-weight: 600;
          white-space: nowrap;

          img {
            width: 8px;
            height: 30px;
            margin: 0 12px 0 8px;
          }
        }
        .bottom-arrow {
          width: 0;
          height: 0;
          border-width: 5px;
          border-style: solid;
          border-color: #fff rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
          position: absolute;
          bottom: -14px;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>