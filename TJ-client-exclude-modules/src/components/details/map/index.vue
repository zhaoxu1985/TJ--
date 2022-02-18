<template>
  <div class="mapIndex">
    <div class="map-title">位置周边</div>
    <!-- 地图 -->
    <div class="map">
      <div id="container"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      qrigine: "",
      curse: "",
    };
  },
  mounted() {
    // console.log(position)
    //    console.log(this.position)
    this.getLocation();
  },
  methods: {
    getLocation() {
      const self = this;
      var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 11,
        center: [116.397428, 39.90923],
      });

      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true

          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        // geolocation.
        map.addControl(geolocation);
        geolocation.getCurrentPosition();

        AMap.event.addListener(geolocation, "complete", onComplete);

        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息

          console.log("定位成功信息：", data);
          this.curse = data.position.R;
          this.qrigine = data.position.Q;
          self.aMapSearchNearBy([this.curse, this.qrigine]);
          var marker = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [this.curse, this.qrigine],
          });
          var circle = new AMap.Circle({
            center: new AMap.LngLat(this.curse, this.qrigine), // 圆心位置
            radius: 1000, //半径
            strokeColor: "#F33", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 3, //线粗细度
            fillColor: "#ee2200", //填充颜色
            fillOpacity: 0.35, //填充透明度
          });
          map.add(marker);
          var content = [
            // "电话 : 010-84107000   邮编 : 100102",
            // "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div></div>",
          ];
          // 创建 infoWindow 实例
          var infoWindow = new AMap.InfoWindow({
            content: content.join("<br>"), //传入 dom 对象，或者 html 字符串
          });

          infoWindow.open(map);
          var infoWindow = new AMap.InfoWindow({
            anchor: "bottom-center",
            content: `房屋位置:<br/>北京海淀区达内`,
          });

          infoWindow.open(map, [this.curse, this.qrigine]);
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
      const self = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();

        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息

            console.log("通过ip获取当前城市：", result);
            let arr = result.rectangle.split(",");
            self.curse = arr[0];
            self.qrigine = arr[2];
            self.aMapSearchNearBy([self.curse, self.qrigine]);
            // self.aMapSearchNearBy([this.R, this.Q])
            //逆向地理编码

            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode

                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");

              geocoder.getAddress(lnglat, function(status, data) {
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
    aMapSearchNearBy(centerPoint, city) {
      AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 100, // 每页10条
          pageIndex: 1, // 获取第一页
          city: city, // 指定城市名(如果你获取不到城市名称，这个参数也可以不传，注释掉)
        });

        // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
        // 第二个参数是经纬度，数组类型
        // 第三个参数是半径，周边的范围
        // 第四个参数为回调函数
        placeSearch.searchNearBy("", centerPoint, 10000, function(
          status,
          result
        ) {
          if (result.info === "OK") {
            var locationList = result.poiList.pois; // 周边地标建筑列表 // 生成地址列表html

            console.log(locationList);
          } else {
            console.log("获取位置信息失败!");
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.mapIndex {

  .map-title {
    padding: 14px 16px;
    font-size: 20px;
    color: #333;
    font-weight: 600;
    background: #fff;

  }
  .map {
    padding: 16px 16px 12px 16px;
    background-color: aliceblue;



    #container {
      margin-top: -6px;
      border-radius: 20px 20px 20px 20px;
      // overflow: hidden;
      width: 100%;
      height: 200px;

  }

  }

}
</style>