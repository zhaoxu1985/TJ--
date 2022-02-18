<template>
  <div class="mapIndex">
     <van-nav-bar title="房屋地图"     fixed safe-area-inset-top>
    <span @click="goBack"  class="back" slot="left" >
      <img  src="/icon/mob-TjHeader-header-left.png" alt="">
      <img slot="left" class="last" src="/icon/mob-TjHeader-header-logo.png" alt="">

     <div class="back"></div>
    </span>


    </van-nav-bar>

    <!-- 地图 -->
    <div id="container" style="width:100%;height:100vh"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    var self = this
    AMap.plugin('AMap.Geocoder', function() {
  var geocoder = new AMap.Geocoder({
    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    city: '010'
  })

  geocoder.getLocation(self.$route.params.city, function(status, result) {
    if (status === 'complete' && result.info === 'OK') {
      // result中对应详细地理坐标信息
      console.log(result)
    }
  })
})

    var map = new AMap.Map("container", {
      zoom: 18, //设置地图的缩放级别
      center: [this.$route.params.ln, this.$route.params.lr],
    });

    // 同时引入工具条插件，比例尺插件和鹰眼插件
AMap.plugin([
    'AMap.Scale',
    'AMap.OverView',
], function(){



    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    map.addControl(new AMap.Scale({showZoomBar:true}));
    

    // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
    map.addControl(new AMap.OverView({isOpen:true}));

      // map.addControl(new AMap.ToolBar(
      // ));
    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制

    //  map.addControl(new AMap.Geolocation());
});

    // 创建一个 Marker 实例：
    var marker = new AMap.Marker({
      position: new AMap.LngLat(this.$route.params.ln, this.$route.params.lr), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      // icon: '//vdata.amap.com/icons/b18/1/2.png',
    });

    // 将创建的点标记添加到已有的地图实例：
    map.add(marker);

    // 添加content
    var content = [
            // "电话 : 010-84107000   邮编 : 100102",
            // "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div></div>",
          ];
     var infoWindow = new AMap.InfoWindow({
            content: content.join("<br>"), //传入 dom 对象，或者 html 字符串
          });

          infoWindow.open(map);
          var infoWindow = new AMap.InfoWindow({
            anchor: "bottom-center",
            content: `房屋位置:<br/>${this.$route.params.city}`,
          });

          infoWindow.open(map, [this.$route.params.ln, this.$route.params.lr]);
  },
  methods: {
    goBack() {
    this.$router.push(`/details?id=${this.$route.params.rid}`)
    }
  },
  created() {
    console.log(this.$route)
  }
};
</script>

<style lang="scss">
.mapIndex {
  height: 100%;
  .back {
   img {
     height: 18px;
     height: 15px;
     margin-left: 8px;
     

   }
  }
  #container {
    width: 100%;
    height: 100%;
  }
}
</style>
