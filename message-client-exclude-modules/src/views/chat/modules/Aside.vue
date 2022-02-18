<template>
    <el-aside width="200px" id="list">
    <audio src="/ding.mp3" id="ding" ended></audio>
        <div class="search">
            <el-input
                size="medium"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="search"
                v-if="searchBtn == false ? true : false"
                >
            </el-input>
            <el-popover
                placement="right-start"
                visible-arrow
                width="200"
                trigger="click"
                v-if="searchBtn"
            >
            <el-input
                size="medium"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                clearable
                v-model="search"
                >
                </el-input>
                <el-button slot="reference" icon="el-icon-search"></el-button>
            </el-popover>
        </div>
        <div class="friendList">
            <div class="user" ref="user" :style="i==0?'background-color: #e3e3e3;':''" draggable="true" v-for="(index,i) in userList" :key="index.id"  @click="chatWrite(index.msgArr, index.be.uname, index.sid, index.be.head_img,i)">
                <div class="userAvatar">
                    <el-image
                        :src="index.be.head_img"
                    ></el-image>
                </div>
                <div class="info">
                    <div class="uname">{{index.be.uname}}</div>
                    <div class="news" v-if="index.msgArr[index.msgArr.length-1].type=='text'">{{index.msgArr[index.msgArr.length-1].message}}</div>
                    <div class="news" v-else>[语音消息]</div>
                </div>
                <el-badge class="badgeNum" :hidden="index.chatNum==0?true:false" :value="index.chatNum"></el-badge>
            </div>
        </div>
        <div
            ref="colResize"
            class="colResize"
            @mousedown="resizeRight"
            @mouseup="rightUp"
            ></div>
    </el-aside>
</template>
<script>
export default {
	data() {
        return {
            search: '',
            searchBtn: false,
            userList:[],
            hidden: true,
            sid: null
        }
    },
    sockets: {
        oToMessage(data) {
            const ding = document.getElementById("ding")
            ding.play()
            // console.log(ding)
            let  i = 0;
            let sum=0
            for(var key in this.userList) {
                if(this.userList[key].be.uid==data.uid){
                    this.userList[key].msgArr.push(data)
                    i += 1
                    if(data.uid!==window.sessionStorage.getItem('recordCurrentSid')){
                        sum++
                    }
                    this.userList[key].chatNum += sum
                    this.$set(this.userList, key, this.userList[key])
                }
            }
            sum=0
            if(i==0){
                this.userList.push(
                    {
                        be:{
                            head_img:data.head_img,
                            uid:data.uid,
                            uname:data.uname
                        },
                        chatNum: 1,
                        msgArr:[data],
                        sid:data.sid,
                        uid:data.uid
                    }
                )
            }
        },
        heartBeat(data) {
            console.log(data)
        }
    },
    methods: {
        resizeRight(event) {
            const list = document.getElementById('list')
            const minWidth = 80
            const maxWidth = 680
            let firstX = event.clientX
            let listWidth = list.offsetWidth
            document.onmousemove = e =>{
                let width = listWidth + (e.clientX - firstX)
                if(width<minWidth) {
                    this.searchBtn = true
                    document.onmousemove = null
                    return
                }else if(width>=minWidth&&width<=maxWidth) {
                    this.searchBtn = false
                    list.style.width = width + 'px'
                }else if(width>maxWidth) {
                    document.onmousemove = null
                    return
                }
            }
        },
        rightUp() {
            document.onmousemove = null
            document.onmouseup = null
        },
        //获取所有聊天记录
        async asideLists() {
            const {data: ret} = await this.axios.get('/getHistoryMsg', {params:{uid:window.sessionStorage.getItem('uid')}})
            this.userList = ret.data
            this.chat.$emit('first', ret.data)
            this.updateMsgRead()
        },
        chatWrite(message, uname, uid, head_img,i) {
            window.sessionStorage.setItem('recordCurrentSid',uid)
            this.chat.$emit('msg', {message: message,uname:uname, uid: uid, headImg: head_img, userList:this.userList   })
            // this.updateMsgRead()
            console.log(this.sid)
            this.userList[i].chatNum = 0
            this.$set(this.userList, i, this.userList[i])
            this.axios.post('updateMsgRead',{uid:uid,sid:window.sessionStorage.getItem('uid')})
            let user = this.$refs.user
            user.forEach((item,key)=>{
                if(key==i) {
                    user[key].style.backgroundColor = '#e3e3e3'
                }else {
                    user[key].style.backgroundColor = null
                }
            })
        },
        async updateMsgRead() {
            let sum = 0
            this.userList.forEach((item, key)=>{
                item.msgArr.forEach(index=>{
                    if(item.be.uid==index.uid&&index.is_read==0||item.be.uid==index.uid&&index.audio_isRead==0) {
                        console.log(index)
                        sum++
                    }
                    this.userList[key].chatNum = sum
                })
                sum = 0
            })
        }
    },
    created() {
        this.asideLists()
        this.updateMsgRead()
    },
};
</script>
<style lang="scss">
        #list {
            overflow-y: auto;
            -ms-overflow-style: none;
            scrollbar-width: none; 
        }
        #list::-webkit-scrollbar {
            display: none;
        }
        .el-aside {
            border: none;
            height: 100%;
            position: relative;
            .search {
                margin: 35px auto;
                .el-input {
                    width: 80%;
                }
                .el-button {
                    border: none;
                }
                .el-button:hover {
                    color: #fc6719;
                }
            }
            .friendList {
                position: absolute;
                top: 10%;
                .user {
                    height: 60px;
                    min-width: 80px;
                    width: 200px;
                    max-width: 680px;
                    position: relative;
                    padding-top: 10px;
                    cursor: pointer;
                    .badgeNum {
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .userAvatar {
                        width: 50px;
                        height: 50px;
                        border: 1px solid #e6e6e6;
                        border-radius: 4px;
                        position: absolute;
                        left: 15px;
                    }
                    .el-image {
                        width: 100%;
                        height: 100%;
                        border-radius: 3px;
                    }
                    .info {
                        position: relative;
                        position: absolute;
                        left: 80px;
                        .uname {
                            font-size: 16px;
                        }
                        .news {
                            font-size: 10px;
                            color: #aaa;
                        }
                        .uname,
                        .news {
                            padding: 5px;
                            text-align: left;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                    .infoTime {
                        font-size: 12px;
                        color: #888;
                        z-index: 100;
                        position: absolute;
                        right: 10px;
                    }
                }
                .user:hover {
                    background-color: #e6e6e6;
                }
            }
            .colResize {
                height: 100%;
                border-right: 1px solid #e6e6e6;
                position: absolute;
                top: 0;
                right: 0;
                cursor: w-resize;
            }
        }
    .el-popover {
        height: 400px;
    }
</style>