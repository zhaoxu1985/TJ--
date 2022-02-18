<template>
  <div class="DF-box" v-if="dianping">
    <div class="xiahuaxian1"></div>
    <div class="DF-title">
      <div class="DF-title-left">房客点评</div>
      <div class="DF-title-right">
        <div class="Df-title-right-score">
          <p>5.0</p>
          <div class="DF-title-right-1-line"></div>
        </div>
        <div>
          <p>超赞</p>
          <p>96条评论</p>
          <van-rate
            v-model="dtAvgRage"
            :size="8"
            allow-half
            readonly
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
    </div>
    <!--  评价中心 -->
    <div class="DF-content-box">
      <!-- ------------------------------ -->
      <div class="DF-content" v-for="(item, index) in dianping" :key="index">
        <div class="DF-content-head">
          <div class="DF-content-head-userInfo">
            <img height="32px" :src="item.uimg" alt="" />
            <div>
              <div>
                {{ item.uname }}
              </div>
              <div>{{ getdatee }} 入住</div>
            </div>
          </div>
          <div>
            <p>{{ item.score.toFixed(1) }}</p>
            <van-rate
              v-model="item.score"
              :size="8"
              allow-half
              readonly
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>
        <div class="Df-content-message">
          {{ item.content }}
        </div>
      </div>
      <!-- ------------- -->
    </div>
    <!--    end -->

    <div class="DF-bottom-lookAllComments" @click="other">
      <font style="padding-right: 16px"
        >查看全部99条评价 <span class="arrow"></span
      ></font>
    </div>
    <div class="xiahuaxian"></div>
  </div>
</template>

<script>
export default {
  props: {
    discuss: {
      type: String | Array,
      require: true,
    },
  },
  data() {
    return {
      //防瞌平均评分
      dtAvgRage: 4,
      dianping: this.discuss,
    };
  },
  watch: {
    discuss(val) {
      this.dianping = val;
      // console.log(this.dianping)
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
  // filters: {
  //    getday (val) {

  //       if (typeof val == 'string'){
  //           return val.split(/T\s*/)[0];
  //       }else if (typeof val == "number") {
  //             let a = new Date(val);

  //             console.log(a)
  //       }

  //    }
  // },
  computed: {
    getdatee() {
      const times = this.dianping[0].order_time;
      const tim = new Date(times);

      if (typeof times == "string") {
        return times.split(/T\s*/)[0];
      } else if (typeof times == "number") {
        return (
          tim.getFullYear() + "-" + (tim.getMonth() + 1) + "-" + tim.getDate()
        );
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.xiahuaxian1 {
  width: 100%;
  border-bottom: 10px solid #f7f9fb;
  /* margin-top: 15px; */
}

/* 房客点评开始>>>>>>>>>>>>>start  */
p {
  margin: 0;
}
.DF-title {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: PingFangSC-Regular, Helvetica Neue, sans-serif;
}
.DF-title-left {
  color: #333;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
}
.DF-title-right {
  display: flex;
  align-items: center;
}
.DF-title-right div:nth-child(1) {
  font-size: 48px;
  font-weight: 600;
  line-height: 25px;
}
.Df-title-right-score {
  margin-right: 15px;
}
.DF-title-right div:nth-child(2) {
  font-size: 12px;
}
.DF-title-right-1-line {
  width: 100%;
  height: 5px;
  border-radius: 20px;
  background: linear-gradient(90deg, #fa8c1d, #fcaf3f);
}
.DF-content-box {
  padding: 16px;
}
.DF-content {
  border-radius: 6px;
  background-color: #f7f9fb;
  padding: 12px;
}
.DF-content-head {
  display: flex;
  justify-content: space-between;
}
.DF-content-head-userInfo {
  display: flex;
  align-items: center;
  font-size: 10px;
}
.DF-content-head-userInfo div {
  margin-left: 5px;
}
.DF-content-head p {
  text-align: end;
  font-size: 18px;
  font-weight: 600;
}
.Df-content-message {
  margin-top: 15px;
  font-size: 12px;
}
/* 底部点击弹出所有评论  可以使用房屋设施 ` .DF-lookAll ` 样式代替，待优化 。。。  */
.DF-bottom-lookAllComments {
  width: 100%;
  text-align: end;
  color: #ff9645;
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 16px;
}
/* 房客点评结束>>>>>>>>>>>>>end  */
.arrow {
  display: inline-block;
  background-image: url("/icon/tujia_arrow_right.png");
  width: 10px;
  background-size: 100% 100%;
  height: 10px;
  margin-left: 2px;
  background-repeat: no-repeat;
}
.xiahuaxian {
  width: 100%;
  border-bottom: 10px solid #f7f9fb;
  /* margin-top: 15px; */
}
</style>