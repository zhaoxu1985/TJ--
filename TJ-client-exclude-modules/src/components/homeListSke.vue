<template>
  <div v-if="show">
        <div id="grad1" v-for="item in 8" :key="item">
            <div class="Ske-head">
                <div></div>
            </div>
            <div class="Ske-location">
                <div></div>
                <div></div>
                <div></div>
                <div class="streamDiv">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'listSke',
    props:{
        show:{
            type:Boolean,
        }
    }
}
</script>

<style>
#grad1 {
    height: 30vh;
    width: 42%;
    display: inline-block;
    animation: loading 6s linear infinite;
    background-image: linear-gradient(110deg, #f3f2f2, #e8e7e7 52%, #f3f2f2 55%, #e8e7e7 58%, #f3f2f2);
    background-size: 500% 300%;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 20px;
    margin: 10px 10px;
    box-sizing: border-box;
}
#grad1 div{
    border-radius: 6px;
}
.Ske-head{
    width: 100%;
    height: 40%;
    background-color:rgb(246, 245, 245);
}
.Ske-location{
    height: 10%;
    width: 100%;
    box-sizing: border-box;
}
.Ske-location div{
    width: 50%;
    height: 100%;
    background-color: rgb(246, 245, 245);
    border-radius: 5px !important;
    margin-top:5px;
}
.Ske-location div:nth-child(2){
    width: 100%;
}
.Ske-location div:nth-child(3){
    width: 80% !important;
}
.Ske-location div:nth-child(3){
    width: 30%;
}
.streamDiv{
    width: 100% !important;
    display: flex;
    background-color: rgb(255, 250, 250,0) !important;
}
.streamDiv div{
    flex: 1;
    margin-right: 20px;
    background-color: rgb(246, 245, 245);
}
@keyframes loading {
    0% {
        background-position: 400% 100%;
        z-index:1000;
    }
    to {
        background-position: 0% 50%;
        z-index:1000;
    }
}
</style>