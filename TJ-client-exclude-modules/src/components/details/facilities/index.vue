<template>
  <div class="DF-box">
    <!-- 标题 -->
    <div class="DF-title">房屋设施</div>
    <!-- 内容区域 -->
    <div class="DF-content">
      <!-- 每一行分类 后期使用v-for渲染-->
      <div>
        <div class="DF-content-1">
          <img
            width="20px"
            src="https://pic.tujia.com/upload/festatic/crn/jichu.png"
            alt=""
          />
          <div style="width: 100%; text-align: center">
            <font style="width: 100%">{{ base }}</font>
          </div>
        </div>
        <div class="DF-content-2">
          <div class="DF-content-2-content">
            <div v-for="(item, index) in shebei.base" :key="index">
              <img height="12px" :src="item.support ? src1 : src2" alt="" />
              <div>{{ item.name }}</div>
            </div>
            <!-- <div>
              <img
                height="12px"
                src="https://pic.tujia.com/upload/festatic/mp/error_red.png"
                alt=""
              />
              <div>电梯</div>
            </div>
            <div>
              <img
                height="12px"
                src="https://pic.tujia.com/upload/festatic/mp/check_green.png"
                alt=""
              />
              <div>无线网络</div>
            </div>
            <div>
              <img
                height="12px"
                src="https://pic.tujia.com/upload/festatic/mp/check_green.png"
                alt=""
              />
              <div>无线网络</div>
            </div> -->
          </div>
        </div>
      </div>
      <!-- ----------卫浴设施------------------- -->
      <div>
        <div class="DF-content-1">
          <img
            width="20px"
            src="https://pic.tujia.com/upload/festatic/crn/weiyu.png"
            alt=""
          />
          <div style="width: 100%; text-align: center">
            <font style="width: 100%">{{ bath }}</font>
          </div>
        </div>
        <div class="DF-content-2">
          <div class="DF-content-2-content">
            <div v-for="(item, index) in shebei.bath" :key="index">
              <img height="12px" :src="item.support ? src1 : src2" alt="" />
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- ----------------------厨房设施 -->
      <div>
        <div class="DF-content-1">
          <img
            width="20px"
            src="https://pic.tujia.com/upload/festatic/crn/chufang.png"
            alt=""
          />
          <div style="width: 100%; text-align: center">
            <font style="width: 100%">{{ kitchen }}</font>
          </div>
        </div>
        <div class="DF-content-2">
          <div class="DF-content-2-content">
            <div v-for="(item, index) in shebei.kitchen" :key="index">
              <img height="12px" :src="item.support ? src1 : src2" alt="" />
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部区域 查看全部 -->
    <div class="DF-lookAll" @click="other">
      <font style="padding-right: 16px"
        >查看全部设施
        <span class="arrow"></span>
      </font>
    </div>
    <div class="bianxian3"></div>
  </div>
</template>

<script>
export default {
  props: {
    facility: {
      type: null,
      require: true,
      default: function () {
        return {
          base: [
            {
              name: "",
              support: "",
            },
          ],
          bath: [],
          house: [],
          kitchen: [],
          nearby: [],
          secure: [],
          serve: [],
        };
      },
    },
  },
  data() {
    return {
      shebei: this.facility,
      src1: "https://pic.tujia.com/upload/festatic/mp/check_green.png",
      src2: "https://pic.tujia.com/upload/festatic/mp/error_red.png",
      base1: false,
    };
  },
  watch: {
    facility(val) {
      //   console.log(val);
      this.shebei = val;
      //   console.log(this.shebei);
    },
  },
  computed: {
    server() {
      //    console.log('存在')
      return this.shebei.hasOwnProperty("serve") ? "服务" : false;
    },
    base() {
      return this.shebei.hasOwnProperty("base") ? "基础设施" : false;

      // if(this.shebei.hasOwnProperty("base"))  {
      //     return "基础设施"
      // }else {
      //     this.base=fasle
      //     return ""
      // }
    },
    bath() {
      return this.shebei.hasOwnProperty("bath") ? "卫浴设施" : false;
    },
    kitchen() {
      return this.shebei.hasOwnProperty("kitchen") ? "厨房设施" : false;
    },
    house() {
      return this.shebei.hasOwnProperty("house") ? "建筑亮点" : false;
    },
    nearby() {
      return this.shebei.hasOwnProperty("nearby") ? "周边500米" : false;
    },
    secure() {
      return this.shebei.hasOwnProperty("secure") ? "安全服务" : false;
    },
  },
  methods: {
    other() {
      this.$toast({
        message: "功能待开发",
        icon: "smile",
      });
    },
  },
  mounted() {
    // console.log(this.shebei);
    // let basearr = this.$props.facility.map((item) => {
    //   return item.base;
    // });
    // console.log(basearr)
    // console.log(this.facility)
  },
};
</script>

<style scoped>
/* 房屋设施开始>>>>>>>>>start */
.DF-box {
  background: #fff;
}
.bianxian3 {
  width: 100%;
  border-bottom: 10px solid #f7f9fb;
}
.DF-title {
  padding: 14px 16px;
  font-size: 20px;
  color: #333;
  line-height: 22px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}
.DF-content {
  padding: 0px 16px 0px 16px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
}
.DF-content div {
  display: flex;
  background-color: #f7f9fb;
  border-radius: 6px;
}
.DF-content-1 {
  /* padding: 16px; */
  flex: 20%;
  flex-wrap: wrap;
  display: flex;
  box-sizing: border-box;
  padding: 16px 0px 16px 0px !important;
  justify-content: center !important;
  align-items: center;
  font-size: 11px;
  color: #333;
  font-weight: 600;
  margin-top: 3px;
}
.DF-content-1 image {
  flex-shrink: 0;
  width: 20;
  height: 20px;
}
.DF-content-2 {
  flex: 80%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-left: 16px;
}
.DF-content-2 div {
  flex: 48%;
  padding-left: 4px;
  font-size: 11px;
  color: #333;
  line-height: 14px;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  margin: 0;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.DF-lookAll {
  width: 100%;
  text-align: end;
  color: #ff9645;
  font-size: 14px;
  font-weight: 600;
  margin-top: 16px;
  padding-bottom: 16px;
}
.arrow {
  display: inline-block;
  background-image: url("/icon/tujia_arrow_right.png");
  width: 10px;
  background-size: 100% 100%;
  height: 10px;
  margin-left: 2px;
  background-repeat: no-repeat;
}
.DF-content-2-content {
  padding: 10px;
  flex-wrap: wrap;
}

/* 房屋设施结束>>>>>>>>>end */
</style>