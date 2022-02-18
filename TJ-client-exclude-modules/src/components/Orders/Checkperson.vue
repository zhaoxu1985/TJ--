<template>
  <div class="check_person" :style="{ height: outheight }">
    <van-nav-bar
      title="入住人"
      left-arrow
      @click-left="onClickLeft"
      class="head1"
    />
    <div class="head" @click="addperson">+ 添加入住人</div>
    <div class="person_list" v-for="(item, i) in user_info" :key="i">
      <div>
        <van-checkbox
          v-model="item.person_show"
          @click="change_edit(i)"
          checked-color="#ff9645"
        ></van-checkbox>
      </div>
      <div>
        <div>
          <span>{{ item.uname }}</span>
          <span class="last">已认证</span>
        </div>
        <div>
          <span>身份证：&nbsp;</span> <span>{{ md(item.id) }}</span>
        </div>
      </div>
      <div>
        <van-icon name="arrow" @click="go(item.uname, item.id, item.iid)" />
      </div>
    </div>
    <div class="foot">
      根据公安局酒店经营管理条例，预订经营性质的酒店/民宿，需要提供当前账户的实名身份信息。当前账户的实名身份信息只用于必要的身份核实，途家民宿会为您严格保密。
    </div>
    <div class="bott">
      <van-button color="#ff9645" size="large" @click="go_order">
        确定</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      outheight: "",
      checked: true,
      user_info: [],
    };
  },
  methods: {
    change_edit(i) {
      //更改用户选中状态
      console.log(this.user_info[i].person_show);
      this.user_info[i].person_show = this.user_info[i].person_show;
    },
    go_order() {
      //去往订单页
      sessionStorage.setItem("check_person", JSON.stringify(this.user_info));
      this.$router.push("/order_edit");
    },
    onClickLeft() {
      this.$router.push("/order_edit");
    },
    addperson() {
      this.$router.push("/add_person");
    },
    go(name, id, iId) {
      this.$router.push({
        name: "edit_person",
        params: { uname: name, user_iden: id, iId:iId },
      });
    },
  },
  computed: {
    md() {
      return function (value) {
        value = String(value);
        return value.substr(0,parseInt(value.split('').length/5))+'*************'+value.substr(parseInt(value.split('').length/2+6),value.split('').length)
      };
    },
  },
  async created() {
    this.$toast.loading({
      forbidClick: true,
    });
    let user_info = await this.$axios.get("order/resideInfo"); //获取入住人的信息
    this.user_info = user_info.data.result || []; //用户人信息
    this.$toast.clear();
    this.outheight = window.outerHeight + "px";
  },
};
</script>
<style lang="scss">
.check_person {
  width: 100%;
  background-color: #f7f9fb;
  .head1 {
    .van-icon {
      color: #ff9654 !important;
    }
  }
  .head {
    padding: 10px 0;
    text-align: center;
    margin: 8px 0;
    color: #ff9645;
    background-color: #fff;
  }
  .person_list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    padding: 15px 0;
    & > div:nth-child(2) {
      width: 80%;
      text-align: left;
      & > div:first-child {
        display: flex;
        align-items: center;
      }
      & > div:last-child {
        display: flex;
        justify-content: flex-start;
        span {
          font-size: 12px;
          color: #999;
          line-height: 16px;
        }
      }
      & > span:first-child {
        max-width: 80%;
        min-width: 20%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }
      .last {
        height: 16px;
        white-space: nowrap;
        font-weight: 500;
        font-size: 10px;
        color: #44d39f;
        background: rgba(68, 211, 159, 0.1);
        padding: 0 4px;
        margin-left: 10px;
        border-radius: 2px;
      }
    }
  }
  .foot {
    padding: 20px;
    line-height: 15px;
    font-family: PingFangSC-Regular;
    font-size: 11px;
    color: #999;
    text-align: left;
  }
  .bott {
    background-color: #fff;
    padding: 10px;
    width: 100%;
    display: flex;
    border: 0 !important;
    position: fixed;
    bottom: 0;
    button {
      width: 95%;
      border-radius: 5px;
      border-color: 0;
    }
  }
}
</style>