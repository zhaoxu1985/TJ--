<template>
  <div class="historyIndex">
    <!-- 没有收藏状态 -->
    <van-empty v-if="result.length==0"
    description="暂无历史"
    image="https://fe.tujiacdn.com/mob/static/img/empty_favorite.44731802.png">
      <van-button color="#ff9645" round type="danger"  size="normal" @click="$router.push('/')" class="bottom-button">
        去逛逛
      </van-button>
    </van-empty>
    <!-- 有收藏状态 -->
    <div v-else class="collectBox">
      <div class="cotainer" v-for="item in result" :key="item.rid">
        <div class="cotainer-item" @click="$router.push('/details?id='+item.rid)">
          <div class="card">
            <img
              width="100%"
              :src="item.imgList.length==0?'http://www.sjsheji.com/wp-content/uploads/2016/11/1-150Q9232344.gif':item.imgList[0]"
            />
            <template>
              <div class="imageMsg">
                <div class="msg-title">
                  <span class="city">
                    {{item.title}}
                  </span>
                </div>
                <div class="msg-price">
                    <span class="newprice">{{item.new_price}}</span>
                    <span class="price">{{item.price}}</span>
                    <span class="discout" v-if="item.con_title!==''">{{item.con_title}}</span>
                </div>
              </div>
            </template>
          </div>
            
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: []
    }
  },
  created() {
    this.collectList()
  },
  methods: {
    async collectList() {
      this.$toast.loading('加载中···')
      const {data: ret} = await this.$axios.get('/profile/history', {token:window.localStorage.getItem('token')})
      if(ret.result.length === 0) {
        this.$toast.clear()
        return this.$toast('您还没有任何浏览历史')
      }
      this.result = ret.result
    }
  }
}
</script>

<style lang="scss">
.historyIndex{
.bottom-button {
  width: 30vh;
}
.collectBox {
  .cotainer{
  margin-top: 2vh;
  width: 100%;
  .cotainer-item{
    text-align: center;
    position: relative;
    .card{
      width: 90%;
      height: 320px;
      background-color: #fff;
      -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      margin: auto;
      border-radius: 10px;
      img {
        border-radius: 10px;
      }
      .imageMsg{
        width: 100%;
        .msg-title{
          margin-top: 10px;
          font-size: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
          .city{
            background: #3f4954;
            border-radius: 2px;
            font-family: PingFangSC-Regular;
            font-size: 11px;
            color: #fff;
            line-height: 14px;
            display: inline-flex;
            margin-right: 4px;
            padding: 1px 2px;
            box-sizing: content-box;
            margin-left: 5px;
          }
        }
        .msg-price{
          display: flex;
          margin: 10px 0 0 10px;
          span{
            margin-right: 10px;
          }
          .newprice{
            font-size: 20px;
            color: var(--tjc-theme-price,#ff9645);
          }
          .price{
            text-decoration: line-through;
            font-weight: 500;
            font-size: 12px;
            color: #999;
            line-height: 30px;
          }
          .discout{
            color: rgb(255, 255, 255);
            margin-top: 5px;
            border-radius: 7px;
            background-image: linear-gradient(
                    -270deg
                , rgb(251, 74, 74) 1%, rgb(255, 102, 102) 99%);
            height: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 10px;
            padding: 0 5px;
          }
        }
      }
    }
  }
}
}
}
.txt {
  font-size: 11px;
  color: #999;
  text-align: center;
  margin-top: 5vh;
}
</style>
