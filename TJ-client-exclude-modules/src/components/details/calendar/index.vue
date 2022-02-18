<template>
  <div class="calenderIndex">
    <van-calendar
      color="#FF9645"
      v-model="show"
      type="range"
      @confirm="onConfirm"
      @select="onCalfirm"
      :style="{ height: '100%' }"
    >
      <!-- 日期选择标题 -->
      <template #title>
        <div class="date-continer">
          <span class="clear-empty" @click="dateEmpty">清空</span>
          <span class="checkDate">{{ checkDate }}</span>
          <span class="sumDate">共{{ sumDate }}晚</span>
          <span class="leaveDate">{{ leaveDate }}</span>
        </div>
      </template>
    </van-calendar>
  </div>
</template>

<script>
export default {
  props:['titls'],
  data() {
    return {
      // 时间弹出层
      show:false,
      // 入住日期
      checkDate: "入住日期",
      // 间隔时间
      sumDate: 0,
      // 离店日期
      leaveDate: "离店日期",
      dataDate: '',
      starDate: '',
      endDate: ''
    };
  },
  created(){
  },
  methods: {
      
    formatDate(date) {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    },
    // 起始时间和结束时间
    onConfirm(date) {
      const [start, end] = date;
      this.putDate =
        parseInt(date[1].getTime() / 1000 / 60 / 60 / 24) -
        parseInt(date[0].getTime() / 1000 / 60 / 60 / 24);
      this.show = false;
      this.starDate = this.formatDate(start);
      this.endDate = this.formatDate(end);
      // var res = parseInt(date[1].getTime()/1000/60/60/24)
      //   let data = [];
      //   // for(let i = 0;i<=this.putDate;i++){
      //   data.unshift(date[0].getTime());
      //   data.unshift(date[1].getTime());
      //   // }
      //   // console.log(data)
      //   this.dataDate = data;
      //   // 点击开始搜索再保存先写在这date[0].getTime()
      //   this.$store.commit("hotelStarDate", this.starDate);
      //   // this.$store.commit("hotelStarDate", date[0].getTime());
      //   this.$store.commit("hotelEndDate", this.endDate);
      //   // this.$store.commit("hotelEndDate", date[1].getTime());
       let data = [];
       data.unshift(date[1].getTime());
       data.unshift(date[0].getTime());
       this.dataDate = data;
      this.$store.commit("hotDataDate", this.dataDate);
      //   console.log(this.$store.state);
      this.$store.commit('hotelStarDate',this.starDate)
      this.$store.commit('hotelEndDate',this.endDate)
      this.$store.commit('night',this.sumDate)
    },
    // 页面选择时间
    onCalfirm(date) {
      this.sumDate = 0;
      this.leaveDate = "离店日期";
      let checkDateMonth = date[0].getMonth() + 1;
      let checkDateDate = date[0].getDate();
      this.checkDate = `${checkDateMonth}月${checkDateDate}日`;
      if (date[1] !== null) {
        let leaveDateMonth = date[1].getMonth() + 1;
        let leaveDateDate = date[1].getDate();
        this.leaveDate = `${leaveDateMonth}月${leaveDateDate}日`;
        let timea = date[0].getTime() / 1000 / 60 / 60 / 24;
        let timeb = date[1].getTime() / 1000 / 60 / 60 / 24;
        this.sumDate = timeb - timea;
      }
      
    },
    // 选择时间清空
    dateEmpty() {
      this.sumDate = 0;
      this.leaveDate = "离店日期";
      this.checkDate = "入住日期";
    },
  },
};
</script>

<style lang="scss">
.calenderIndex {
  .van-calendar {
    border-radius: 0 !important;
  }
  .date-continer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 5vh;
    .checkDate {
      margin-left: 13vw;
      font-size: 21px;
      color: #999;
    }
    .sumDate {
      content: "";
      // width: 40px;
      height: 1px;
      color: #ff9645;
      -webkit-font-smoothing: antialiased;
    }
    .leaveDate {
      margin-right: 13vw;
      font-size: 21px;
      color: #999;
    }
  }
  .clear-empty {
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: 16px;
    color: #666;
    line-height: 1;
  }
}
</style>
