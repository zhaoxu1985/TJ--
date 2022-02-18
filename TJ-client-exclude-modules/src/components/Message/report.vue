<template>
  <div class="reportIndex">
    <div class="cardBox">
      <div class="continer">
        <div class="title">
          <span>疫情报备</span>
        </div>
        <div class="user-msg">
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
              v-model="value1"
              name="pattern"
              label="姓名"
              placeholder="姓名"
            />
            <van-field
              v-model="value2"
              name="pattern"
              label="证件号"
              placeholder="身份证号"
            />
            <van-field name="radio" label="性别">
              <template #input>
                <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">男</van-radio>
                  <van-radio name="2">女</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              v-model="value3"
              name="pattern"
              label="手机号"
              placeholder="手机号"
            />
            <!-- 地区选择 -->
            <van-field
              readonly
              name="picker"
              :value="value4"
              label="14日所在城市"
               class="van-cll"
            >
            <template #input>
                <span @click="showPicker = true">{{value4}}</span>
                <van-icon class="addIcon" name="add-o" @click="addField"/>
            </template>
            </van-field>
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
             <!-- 地区选择2 -->
            <van-field
              readonly
              name="picker1"
              :value="value5"
              label="14日所在城市"
              placeholder="点击选择城市"
               class="van-cll"
               v-show="field2"
            >
            <template #input>
                <span @click="showPicker1 = true">{{value5}}</span>
                <van-icon class="addIcon" name="close" @click="minusField"/>
            </template>
            </van-field>
            <van-popup v-model="showPicker1" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns1"
                @confirm="onConfirm1"
                @cancel="showPicker1 = false"
              />
            </van-popup>
             <!-- 地区选择3 -->
            <van-field
              readonly
              name="picker2"
              :value="value6"
              label="14日所在城市"
              placeholder="点击选择城市"
               class="van-cll"
               v-show="field3"
            >
            <template #input>
                <span @click="showPicker2 = true">{{value6}}</span>
                <van-icon class="addIcon" name="close" @click="minusField2"/>
            </template>
            </van-field>
            <van-popup v-model="showPicker2" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns2"
                @confirm="onConfirm2"
                @cancel="showPicker2 = false"
              />
            </van-popup>
            
            <!-- 疫苗接种记录 -->
             <van-field class="radio1" name="radio1" label="有无接种疫苗" ref="radioRef">
              <template #input>
                <van-radio-group v-model="radio1" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div class="btnSet">
              <van-button color="#ff9645" block @click="submit">提交</van-button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      value4: "点击选择城市",
      value5: "",
      value6: "",
      columns: [],
      columns1: [],
      columns2: [],
      showPicker: false,
      showPicker1: false,
      showPicker2: false,
      radio: "",
      radio1:"",
      pattern: /\d{6}/,
      num:1,
      field2:false,
      field3:false
    };
  },
  created(){
    axios.defaults.baseURL = 'http://tj.testw.top/'
      this.$axios.get('public/province.json').then((res)=>{
          console.log(res)
          for(let k of res.data){
            //   console.log(k)
              this.columns.push(k.name)
              this.columns1.push(k.name)
              this.columns2.push(k.name)
          }
          axios.defaults.baseURL = 'http://tj.testw.top/v1'
      })
  },
  mounted(){
      
  },
  watch:{
    num(val){
      if(val==1){
        this.field2 = false
        this.field3 = false
      }else if(val==2){
        this.field2 = true
        this.field3 = false
      }else if(val==3){
        this.field3 = true
      }else{
        val = 3
      }
    }
  },
  methods: {
    // 提交
    submit(){
      let phone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      let sf = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if(this.value1==''){
        return this.$toast.fail('姓名不能为空')
      }else if(!sf.test(this.value2)){
        return this.$toast.fail('身份证不合法')
      }else if(!this.radio){
        return this.$toast.fail('性别不能为空')
      }else if(!phone.test(this.value3)){
        this.$toast.fail('手机号格式不正确')
      }else if(this.value4=='点击选择城市' || this.value4==''){
        this.$toast.fail('地址不能为空')
      }else if(this.field2==true){
        if(this.value5==''){
          this.$toast.fail('地址不能为空')
        }
      }else if(this.field3==true){
        if(this.value6==''){
          return this.$toast.fail('地址不能为空')
        }
      }else if(!this.radio1==''){
        return this.$toast.fail('请选择是否接种疫苗')
      }
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    // onFailed(errorInfo) {
    //   console.log("failed", errorInfo);
    // },
    // 地区选择
    onConfirm(value) {
      this.value4 = value;
      this.showPicker = false;
    },
    onConfirm1(value) {
      this.value5 = value;
      this.showPicker1 = false;
    },
    onConfirm2(value) {
      this.value6 = value;
      this.showPicker2 = false;
    },
    // 添加所在城市
    addField(){
      if(this.value4!=='' && this.value4!=="点击选择城市"){
        this.num++
      }
    },
    minusField(){
      this.num = 1
    },
    minusField2(){
      this.num = 2
    }
  },
};
</script>

<style lang="scss">
html {
  height: 100%;
  background-color: #f0f3f6;
}

.reportIndex {
  .cardBox {
    width: 90vw;
    height: 90vh;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 5vh;
    .continer {
      width: 80vw;
      height: 100%;
      // background-color: red;
      margin: 0 auto;
      .title {
        float: left;
        margin-top: 3vh;
        border-left: 5px solid #FA9425;
        span {
          margin-left: 3vw;
          font-weight: bold;
          font-size: 20px;
        }
      }
      .user-msg {
        float: left;
        margin-top: 2vh;
        .van-field {
          margin-bottom: 3vh;
        }
      }
    }
  }
  .van-cll{
      span{
          width: 35vw;
          height: 3vh;
          float: left;
          margin-right: 5vw;
      }
  }
  .btnSet{
    width: 100%;
    height: 10vh;
    // background-color: red;
    display: flex;
    margin-left: 3vw;
    .van-button{
      width: 100%;
    }
  }
}
</style>
