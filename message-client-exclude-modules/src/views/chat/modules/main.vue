<template>
    <el-container class="chatWin">
        <el-header>
            <span class="username">{{heardName}}</span>
        </el-header>
        <!-- <el-main v-if="user.length==0"></el-main> -->
        <el-main id="main">
            <el-button type="info" @click="history">获取历史消息</el-button>
            <div class="record-wrapper" v-for="(item,i) in chatList" :key="item.id">
                <div v-if="item.uid == id" class="msg msg-right">
                    <!-- <div v-if="chat.uname==item.uname"> -->
                        <div class="img-wrapper">
                            <img class="img" :src="myAvatar" />
                        </div>
                        <div class="dateFlex divFlex">
                            <div style="text-align: right; margin-right: 5px">{{item.send_date+'/'+item.send_time}}</div>
                            <div class="msgBox">
                                <div class="message-wrapper message-wrapper-right" :style="item.type=='audio/mp3'?'width: 80px':'width: auto;'">
                                    <div class="message" v-if="item.type=='text'">{{ item.message }}</div>
                                    <div style="width: 100px; height:20px" class="message" v-else-if="item.type == 'audio/mp3'" @click="voice($event,i)">
                                        <div class="bg" id="bg"></div>
                                        <audio ref="refaudio" :src="item.audio" @ended="stop"></audio>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                            
                </div>
                <!-- <div v-else-if="chat.uname!==item.uname"></div> -->
                <div v-else class="msg msg-left">
                    <div class="img-wrapper">
                        <img class="img" :src="item.head_img" />
                    </div>
                    <div class="dateFlex">
                        <div style="text-align: left; margin-left:5px;">{{item.send_date+'/'+item.send_time}}</div>
                        <div class="message-wrapper message-wrapper-left" :style="item.type=='audio/mp3'?'width: 80px':''">
                            <div class="message" v-if="item.type=='text'">{{item.message}}</div>
                            <div style="width: 100%; height: 24px" class="message" v-else-if="item.type == 'audio/mp3'" @click.stop="voice($event,i)">
                                <div class="bg" id="bg"></div>
                                <audio :src="item.audio" controls style="visibility: hidden; height:50px" @ended="stop"></audio>
                                <el-badge :hidden="item.audio_isRead==1"  is-dot class="itemAudio"></el-badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
        <div ref="rowResize" class="rowResize" @mousedown="rowResize" @mouseup="topUp"></div>
        <el-footer id="write" height="30%" @click.native="txt">
            <el-input
                id="text"
                type="textarea"
                placeholder="在此处编辑信息"
                v-model="textarea"
                autosize
                @keydown.enter.native="send">
            </el-input>
            <el-button class="send" size="mini" @click="send()">点击发送&#x3000;(s)</el-button>
            <el-tooltip class="item" effect="dark" content="语音" placement="top">
                <el-button size="mini" round class="yuyin icon iconfont" @click="record">&#xe681;</el-button>
            </el-tooltip>
        </el-footer>
    </el-container>
</template>
<script>
let Audio = false;
let recorder = new Recorder({
  bitRate: 40, //参数采样率
  sampleRate: 10100,
  success: function (v) {
    this.Audio = true;
  },
  error: function (v) {
    this.Audio = false;
    alert("录音设备损坏");
  },
  fix: function (v) {
    alert("您的设备不支持录音");
  },
});
export default {
    data() {
        return {
            play: false,
            textarea: '',
            myAvatar: window.sessionStorage.getItem('avatar'),
            id: window.sessionStorage.getItem('uid'),
            reco: false,
            chatList: [],
            heardName: '',
            user: {},
            msgList: []
        }
    },
    mounted() {
        const _this = this
        this.chat.$on('msg', data=>{
            _this.chatList = data.message
            _this.heardName = data.uname
            _this.user = data
            _this.msgList = data.userList
            const main = document.getElementById('main')
            const text = document.getElementById('text')
            main.scrollTop = main.scrollHeight
            text.focus()
        })
        
    },
    created() {
        const _this = this
        this.chat.$on('first', data=>{
            if(data.length ==0) {
                return
            }
            _this.heardName = data[0].be.uname
            _this.chatList = data[0].msgArr
            _this.user = {
                headImg: data[0].be.head_img,
                uid: data[0].be.uid,
                uname: data[0].be.uname
            }
            window.sessionStorage.setItem('recordCurrentSid', data[0].be.uid)
            const main = document.getElementById('main')
            const text = document.getElementById('text')
            main.scrollTop = main.scrollHeight
            text.focus()
        })
    },
    sockets: {
        oToMessage(data) {
            const main = document.getElementById('main')
            main.scrollTop = main.scrollHeight
        },
        heartBeat(data){
            console.log(data);
        }
    },
    methods: {
        rowResize(event) {
            const write = document.getElementById('write')
            const rowResize = this.$refs.rowResize
            let firstY = event.clientY
            let writeHeight = write.offsetHeight
            const minHeight = 200
            const maxHeight = 500
            document.onmousemove = e =>{
                let height = writeHeight - (e.clientY - firstY)
                if(height < maxHeight && height > minHeight) {
                    rowResize.style.bottom = height + 'px'
                    write.style.height = height + 'px'
                }else {
                    document.onmousemove = null
                }
            }
        },
        topUp() {
            document.onmousemove = null
            document.onmouseup = null
        },
        // 语音消息播放
        voice(e,i) {
            const ev = e.target.children[1]
            const cla = e.target.children[0]
            this.play = !this.play
            if(this.play===true) {
                cla.classList.add('voicePlay')
                if(cla.classList == undefined) return
                ev.play()
                console.log(this.chatList[i])
                if(this.user.uid==this.chatList[i].uid) {
                    this.chatList[i].audio_isRead = 1
                    this.$set(this.chatList, i, this.chatList[i])
                    this.axios.post('/updateVoiceRead', {uid: this.chatList[i].uid, sid: this.id, m_id: this.chatList[i].m_id,})
                }
            }else{
                cla.classList.remove('voicePlay')
                if(cla.classList == undefined) return
                ev.pause()
            }
        },
        // 语音播放完毕
        stop() {
            const cla = document.getElementById('bg')
            cla.classList.remove('voicePlay')
        },
        // 发送消息
        send() {
            if(this.chatList.length==0) {
                return this.$toast.fail('未选择联系人')
            }
            let sendObj = {
                uid: window.sessionStorage.getItem('uid'),
                sid: this.user.uid,
                audio: null,
                message: this.textarea,
                type: 'text',
                head_img: window.sessionStorage.getItem('avatar'),
                uname: window.sessionStorage.getItem('username'),
                is_read: 0,
                send_date: this.$getDate(),
                send_time: this.$getTime(),
                audio_isRead: 1,
                m_id: Date.now(),
                be_uname: this.user.uname,
                be_head_img: this.user.head_img,
            }
            this.$socket.emit('puoToMessage', sendObj)
            this.chatList.push(sendObj)
            this.textarea = null
            // 自动到最底部
            const main = document.getElementById('main')
            const text = document.getElementById('text')
            main.scrollTop = main.scrollHeight
            text.focus()
        },
        // 发送语音消息
        record() {
            this.reco = !this.reco
            if(this.chatList.length==0) {
                return this.$toast.fail('未选择联系人')
            }
            if(this.reco ==true) {
                if(this.Audio = false) {
                    return this.$message.error('不支持语音')
                }
                recorder.start()
                this.$toast.loading({
                    message: '正在录音...',
                    duration: 0
                })
            }else {
                let _this = this
                recorder.getBlob(function(blob){
                    let sendObj = {
                        uid: window.sessionStorage.getItem('uid'),
                        sid: _this.user.uid,
                        audio: blob,
                        message: null,
                        type: 'audio/mp3',
                        head_img: window.sessionStorage.getItem('avatar'),
                        uname: window.sessionStorage.getItem('username'),
                        is_read: 1,
                        send_date: _this.$getDate(),
                        send_time: _this.$getTime(),
                        audio_isRead: 0,
                        m_id: Date.now(),
                        be_uname: _this.user.uname,
                        be_head_img: _this.user.head_img,
                    }
                    _this.$socket.compress(true).emit('puoToMessage', sendObj)
                    sendObj.audio = URL.createObjectURL(blob)
                    _this.chatList.push(sendObj)
                })
                recorder.stop();
                this.$toast.clear()
                this.$toast.success('发送成功')
                const main = document.getElementById('main')
                const text = document.getElementById('text')
                main.scrollTop = main.scrollHeight
                text.focus()
                return false
            }
        },
        // 点击获取历史消息
        async history() {
            if(this.chatList.length==0) {
                return this.$toast.fail('当前未选择联系人')
            }
            const {data:ret} = await this.axios.get('/getHistoryPage', {params: {uid: this.id, sid: this.user.uid, m_id: this.chatList[0].m_id, pageSize: 2}})
            ret.data.forEach(element => {
                this.chatList.unshift(element)
            });
            if(ret.data.length==0) {
                return this.$message.warning('无更多消息')
            }
        },
        txt() {
            const text = document.getElementById('text')
            text.focus()
        }
    }
}
</script>
<style lang="scss">
    // 隐藏滚动条
    #main {
        overflow-y: auto;
        -ms-overflow-style: none;
        scrollbar-width: none; 
    }
    #main::-webkit-scrollbar {
        display: none;
    }
    .chatWin {
        position: relative;
        .el-header,.el-main,.el-footer {
            padding: 0;
        }
        .el-header {
            text-align: left;
            border-bottom: 1px solid #e6e6e6;
            line-height: 70px;
            background-color: #ff9645;
            .username {
                font-size: 18px;
                padding: 20px;
            }
        }
        .rowResize {
            width: 100%;
            cursor: n-resize;
            border-top: 1px solid #e6e6e6;
            position: absolute;
            bottom: 30%;
        }
        .el-footer {
            position: relative;
            .el-textarea__inner {
                border:none;
                resize: none;
                overflow-y: hidden;
                font-size: 12px;
            }
            .send {
                position: absolute;
                right: 5%;
                bottom: 15%;
                height: 30px;
                width: 100px;
                background-color: #ff9645;
            }
            .yuyin {
                position: absolute;
                left: 5%;
                bottom: 12%;
                background-color: #ff9645;
            }
        }
        .el-main {
            .write {
                height: 50px;
            }
            .record-wrapper {
                margin: 4px;
                padding: 4px;
            }
            .record-wrapper:last-child{
                margin-bottom: 100px;
            }
            .msg {
                display: flex;
                flex-direction: row;
                .dateFlex {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    position:relative
                }
                .message-wrapper {
                    align-self: baseline;
                    max-width: 220px;
                    margin: 0px 10px 0px 10px;
                    min-height: 38px;
                    .message {
                        margin: 8px;
                        word-wrap: break-word; //英文换行
                    }
            }

            .message-wrapper-left {
                background-color: #e6e6e6;
                border-radius: 0px 12px 12px 12px;
                text-align: left;
            }
            .message-wrapper-right {
                background-color: #ff9645;
                border-radius: 12px 0px 12px 12px;
                text-align: right;
                .message {
                    margin-top: 10px;
                    padding: 7px;
                }
            }

            .img {
                flex: auto;
                height: 36px;
                width: 36px;
                border-radius: 8px;
            }
            }
            .msg-right {
            flex-direction: row-reverse;
            }
            .msg-left {
            flex-direction: row;
            }
        }
    }

    .bg {
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzlFRDZDRDNENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzlFRDZDRDJENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTAxQkEzQ0RENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxQkEzQ0VENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4K4iKVAAACUUlEQVR42uSazytEURTHvTHjR4kaU8xsSDZSdmbjx4oSK8XGQrJlpSwYTSmxEWWhUIpsZK3kD7DRNBuSBZFCNjZ+JPKcV6ecXu/d3sy7595bc+vbfXPue5/749z77o83lm3bZYYFC8RZqAbQAigP2tXNj5aZF7gdkAZNk9+7WvnOCCgxRUCb9n/o1sk3pUH6QDHF/GNsoM+QeYfiy6qkFeLZDBb0GlTB4AAR/xXT9nXxZVa0WCekQd9Y0HOJjg3CHySviiZmfjO3AyIhnu0gBc0wjAIR/wLtW8z87aAOWAI9gqaYRoAff4ZUoi7EKCiUP462j4CdSCrfK4N1Ahpi6I0i/hPa50M4oFB+Dbm/SzXfL5MD4rUogxP8+Itozynm59E+q5ovyuQdHxphWh568XvR5kxq1SEn40L4e0XMA1L4EcEe7RTjLqYdqRf/gezQUwr5LxjXq+aLHPCFcTmTA7z4tutIQhXfLiJPKXyRA/oxzgW8v9DgxU+S62eF/ATGr6r5fg26Corj9RHD4Z0fvwfjS9CbQn4bxrfK+R6TyzxZNk260solTL4i/g3al10TsMXIryA72T7VfK8MnJO8X9CKy14lafXjxx8jFUsSeyUzfxhtPwHPoqTy/TJJMJzJiPgNpJdsuNJizPwztB/q4JtwHN2KW3sn3HuMOouR30l6bbsOvgkOyGIBnaPbRldalJl/h2knuvgmOKAWNAFKMUz4Iv4O6Z1xXXxTPxtazHy6khnVyS/Fb8IDpHGyuvmWgX9L4Q4toDnQFWhNN/9PgAEAR4w1ULjdCbEAAAAASUVORK5CYII=) right 0 no-repeat;
        width: 24px;
        height: 24px;
        background-size: 400%;
    }

    .voicePlay {
        animation-name: voicePlay;
        animation-duration: 1s;
        animation-direction: normal;
        animation-iteration-count: infinite;
        animation-timing-function: steps(3);
    }

    @keyframes voicePlay {
        0% {
            background-position: 0;
        }
        100% {
            background-position: 100%;
        }
    }
    .itemAudio {
        position: absolute !important;
        top: 33px;
        right: 20px;
    }
</style>