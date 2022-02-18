<template>
        <div v-show="skeShow" class="detail-ske-box">
            <div id="grad">
                <div class="Ske-carousel">
                </div>
                <div class="Ske-title">
                </div>
                <div class="Ske-title">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div v-for="item in 2" :key="item" class="Detail-ske-list">
                    <div></div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="detail-ske-bottom"></div>
            </div>
            <!-- <div class="detail-ske-box"></div> -->
        </div>
</template>

<script>
export default {
    props:{
        skeShow:Boolean,
    },
    data() {
        return {}
    },
}
</script>

<style>
#grad{
    width: 100%;
    height: 100%;
    animation: loading 6s linear infinite;
    background-image: linear-gradient(110deg, #f3f2f2, #e8e7e79c 52%, #f3f2f293 55%, #e8e7e770 58%, #f3f2f2);
    background-size: 500% 300%;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 20px;
    box-sizing: border-box;
}
.detail-ske-box{
    width: 100vw;
    height: 93vh;
    padding: 10px;
    position: sticky;
    z-index: 99999;
    box-sizing: border-box;
    background: white;
}

.Ske-carousel{
    height: 30%;
    background-color: hsla(0, 0%, 100%, 0.6);
    border-radius: 6px;
}
.Ske-title{
    height: 7%;
    background-color: hsla(0, 0%, 100%, 0.6);
    margin-top: 10px;
    border-radius: 6px;
    display: flex;
    justify-content: flex-start;
    padding: 8px;
    box-sizing: border-box;
}
.Ske-title div{
    width: 20%;
    height: 100%;
    border-radius: 6px;
    margin: 0px 10px;
    background-color: #F4F3F3;
}

.Detail-ske-list{
    width: 100%;
    height: 20%;
    background-color: hsla(0, 0%, 100%, 0.6);
    margin-top:10px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
}
.Detail-ske-list>div:nth-child(1){
    width: 30%;
    background-color: white;
    height: 100%;
}
.Detail-ske-list>div:nth-child(2){
    border-radius: 6px;
    width: 65%;
    height: 100%;
    margin-left: 3%;
    box-sizing: border-box;
}
.Detail-ske-list>div:nth-child(2) div{
    width: 100%;
    height: 25%;
    margin: 5px;
    border-radius:6px;
    background-color: #F4F3F3;
}
.detail-ske-bottom{
    width: 100%;
    height: 8%;
    background-color: white;
     border-radius:6px;
    margin-top: 10px;
}


@keyframes loading {
    0% {
        background-position: 400% 100%;
        z-index:999999;
    }
    to {
        background-position: 0% 50%;
        z-index:999999;
    }
}
</style>