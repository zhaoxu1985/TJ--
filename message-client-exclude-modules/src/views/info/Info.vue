<template>
    <el-container class="home">
        <el-header>
            <el-row :gutter="3">
                <el-col :span="1.5">
                    <el-image class="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiOTA1N2MyOC05YzM3LTQ5YTItOGM4Ny02YmM5YTc2NTUwMjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjA5RTRGMjU0NkNFMTFFOUE5MUREMjJDMjdCMTlBOUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjA5RTRGMjQ0NkNFMTFFOUE5MUREMjJDMjdCMTlBOUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNWMxYTE4Mi0zMzNkLTQ1NDktOTFhYS03NjJlYTE1Zjc5MzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YjkwNTdjMjgtOWMzNy00OWEyLThjODctNmJjOWE3NjU1MDI5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"></el-image>
                </el-col>
                <el-col class="title" :span="6">
                    <h2>途家租房数据面板</h2>
                </el-col>
            </el-row>
            
        </el-header>
        <el-main>
            <el-row class="user">
                <el-col :span="6">
                    <el-card>
                        <div class="bj user">
                            <div class="flex">
                                <div class="icon iconfont">&#xe657;</div>
                                <div class="txt">
                                    <div class="number">{{result.userCount}}</div>
                                    <div class="title">用户量</div>
                                </div>
                            </div>
                            <div class="time">{{day}}</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        <div class="bj order">
                            <div class="flex">
                                <div class="icon iconfont">&#xe664;</div>
                                <div class="txt">
                                    <div class="number">{{result.orderCount}}</div>
                                    <div class="title">订单数量</div>
                                </div>
                            </div>
                            <div class="time">{{day}}</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        <div class="bj deal">
                            <div class="flex">
                                <div class="icon iconfont">&#xe69c;</div>
                                <div class="txt">
                                    <div class="number">￥{{result.priceTotal}}</div>
                                    <div class="title">交易额度</div>
                                </div>
                            </div>
                            <div class="time">{{day}}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            result: {
                userCount: '加载中...',
                orderCount: '加载中...',
                priceTotal: '加载中...',
            },
            day: this.$getDate()
        }
    },
    created() {
        const _this = this
        this.chat.$on('result', data=>{
            _this.result = data
            window.sessionStorage.setItem('result', JSON.stringify(data))
        })
        const count = JSON.parse(window.sessionStorage.getItem('result'))
        this.result = count
        setInterval(async _=>{
            const {data: ret} = await this.axios.get('https://tj.testw.top/v1/dataCollect')
            this.result = ret.result
        },3000)
    },
    // watch() {
        
    // }
}
</script>
<style lang="scss">
    .home {
        background-image: linear-gradient(direction, #ff9645, #fff);
        .el-header {
            .el-row {
                height: 100%;
                .el-col {
                    height: 100%;
                    .el-image {
                        width: 60px;
                    }
                }
                .title {
                    width: 200px;
                    height: 100%;
                    padding: 10px;
                    color: #ff9645;
                }
            }
        }
        .el-main {
            .el-row {
                margin: 50px;
                padding: 30px;
                margin-left: 10%;
                .el-col {
                    height: 150px;
                    margin: 2%;
                    .el-card {
                        height: 100%;
                        border-radius: 30px;
                        cursor: pointer;
                        .el-card__body {
                            height: 100%;
                            padding: 0;
                            .bj {
                                height: 100%;
                                -webkit-clip-path: polygon(0 0, 98% 0, 72% 100%, 0% 100%);
                                clip-path: polygon(0 0, 98% 0, 72% 100%, 0% 100%);
                                .flex {
                                    display: flex;
                                    align-items: center;
                                    margin-left: 10%;
                                    padding-top: 30px;
                                    .icon {
                                        width: 50px;
                                        height: 50px;
                                        font-size: 50px;
                                        margin-right: 10px;
                                        color: #ff9645;
                                    }
                                    .txt {
                                        text-align: left;
                                        .number {
                                            font-size: 20px;
                                            font-weight: bolder;
                                            color: #63445F;
                                        }
                                        .title {
                                            font-size: 14px;
                                            color: #9392a0;
                                        }
                                    }
                                }
                                .time {
                                    text-align: left;
                                    padding-left: 10%;
                                    margin-top: 10px;
                                    color: #7B6495;
                                    font-size: 13px;
                                }
                            }
                            .user {
                                background-color: #E1E9FD;
                            }
                            .order {
                                background-color: #DDF7F4;
                            }
                            .line {
                                background-color: #FFF4DE;
                            }
                            .deal {
                                background-color: #FFE1EB;
                            }
                        }
                    }
                }
            }
        }
    }
</style>