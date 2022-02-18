<template>
  <div class="table_bar">
    <van-tabbar
      v-model="active"
      active-color="#ff9645"
      inactive-color="#818181"
      class="table__bar"
      route
    >
      <van-tabbar-item to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon1.active : icon1.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/order">
        <span>订单</span>
        <template #icon="props">
          <img :src="props.active ? icon2.active : icon2.inactive" />
        </template>
      </van-tabbar-item>
      <van-badge :content="$store.state.unread_msg==0?'':$store.state.unread_msg">
        <van-tabbar-item to="/msg_list" class="count_msg">
          <span>消息</span>
          <template #icon="props">
            <img :src="props.active ? icon3.active : icon3.inactive" />
          </template>
        </van-tabbar-item>
      </van-badge>

      <van-tabbar-item to="/user">
        <span>我的</span>
        <template #icon="props">
          <svg
            v-if="props.active"
            t="1623948594664"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13894"
            width="36"
            height="24"
          >
            <path
              d="M512 1024C229.248 1024 0 794.7776 0 512S229.248 0 512 0s512 229.2224 512 512-229.248 512-512 512z m0-928C282.2656 96 96 282.24 96 512c0 107.4432 41.088 205.056 107.9552 278.8608 60.2368-29.1328 38.144-4.864 116.9664-37.3504 80.64-33.152 99.7632-44.7232 99.7632-44.7232l0.768-76.416s-30.208-22.9376-39.6032-94.8736c-18.9184 5.4272-25.1392-22.016-26.2656-39.5008-1.024-16.896-10.9568-69.632 12.1088-64.8704-4.7104-35.2-8.0896-66.9696-6.4-83.7888 5.76-59.0336 63.0528-120.7296 151.3216-125.2352 103.8336 4.48 144.9728 66.1504 150.7328 125.184 1.6896 16.8448-2.048 48.6144-6.7584 83.7632 23.0656-4.6848 13.056 47.9488 11.9296 64.8448-1.024 17.4848-7.424 44.8512-26.24 39.424-9.4464 71.936-39.68 94.6688-39.68 94.6688l0.7424 76.0576s19.0976 10.8288 99.7632 43.9808c78.848 32.4608 56.704 9.6256 116.9664 38.8352C886.912 717.056 928 619.4432 928 512c0-229.76-186.24-416-416-416z"
              fill="#ff9645"
              p-id="13895"
            ></path>
          </svg>
          <svg
            v-else
            t="1623948444975"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="12332"
            data-spm-anchor-id="a313x.7781069.0.i22"
            width="30"
            height="24"
          >
            <path
              d="M639.488 541.538462c91.017846-44.544 154.348308-137.216 154.348308-245.208616 0-151.079385-122.88-273.998769-273.92-273.998769a274.274462 274.274462 0 0 0-273.99877 273.998769c0 107.992615 63.330462 200.664615 154.387693 245.248C215.552 593.880615 79.635692 763.628308 79.635692 964.883692a36.864 36.864 0 0 0 73.728 0c0-202.161231 164.391385-366.670769 366.552616-366.670769s366.552615 164.509538 366.552615 366.670769a36.785231 36.785231 0 0 0 73.649231 0c0-201.255385-135.876923-371.003077-320.590769-423.305846zM319.566769 296.369231A200.625231 200.625231 0 0 1 519.876923 95.940923a200.625231 200.625231 0 0 1 200.270769 200.388923 200.546462 200.546462 0 0 1-200.270769 200.310154 200.546462 200.546462 0 0 1-200.349538-200.310154z"
              fill="#818181"
              p-id="12333"
            ></path>
          </svg>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arrlength: [], //消息列表
      active: 3,
      count: "", //消息总条数
      uid: '', ///假设的账号
      icon1: {
        active:
          "https://pic.tujia.com/upload/festatic/publicImages/icon-tab-index-p.png",
        inactive:
          "https://pic.tujia.com/upload/festatic/publicImages/icon-tab-unindex.png",
      },

      icon2: {
        active:
          "https://pic.tujia.com/upload/festatic/publicImages/icon-tab-order-p.png",
        inactive:
          "https://pic.tujia.com/upload/festatic/publicImages/icon-tab-unorder.png",
      },
      icon3: {
        active:
          "https://pic.tujia.com/upload/festatic/publicImages/icon-tab-unIM.png",
        inactive:
          "https://pic.tujia.com/upload/festatic/publicImages/icon-tab-unIM.png",
      },
    };
  },
};
</script>
<style lang="scss" >
.table_bar {
  // position: fixed;
  // z-index: 111111111;
  // left: 0;
  // height: 55px;
  // bottom: 0;
  .van-tabbar--fixed {
    height: 55px;
    left: 0;
    right: 0;
    .van-badge__wrapper {
      width: 25%;
      .count_msg {
        height: 100%;
      }
      .van-badge--fixed {
        top: 15%;
        right: 35%;
      }
      .van-tabbar-item {
        bottom: 0;
      }
    }

    // van-badge__wrapper
  }
  .table__bar {
    .van-tabbar-item__icon img {
      height: 28px;
      width: 36px;
    }
  }
}
</style>