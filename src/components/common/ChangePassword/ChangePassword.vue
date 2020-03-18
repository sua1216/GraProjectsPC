<template>
    <div class="change-password">
        <div class="item-box">
            <div class="close-box ivu-icon ivu-icon-ios-close" @click="isShowPage"></div>
            <div class="item-title">修改密码</div>
            <div class="login-id">
                <div>*</div>
                <input type="text" placeholder="请输入当前密码">
            </div>
            <div class="login-id">
                <div>*</div>
                <input type="text" placeholder="请输入新密码">
            </div>
            <div class="login-id">
                <div>*</div>
                <input type="text" placeholder="再次输入新密码">
            </div>
            <div class="hint">旧密码输入错误请重新输入</div>
            <div class="login-btm" >修改</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChangePassword",
        data(){
            return{
            }
        },
        methods:{
            isShowPage(){
                this.$store.state.isChangePassword  = false
            }
        }
    }
</script>

<style scoped>
    .close-box{
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-size: 50px !important;
    }
    .login-btm{
        width:446px;
        height:62px;
        background:rgba(19,159,224,1);
        border-radius:31px;
        margin: 0 auto;
        line-height: 62px;
        font-size: 28px;
        letter-spacing:90px;
        cursor: pointer;
        padding-left: 95px;
        text-align: center;
    }
    .hint{
        font-size: 20px;
        color:rgba(255,72,0,1);
        width: 100%;
        margin-top: 20px;
        margin-bottom: 22px;
        text-align: center;
    }
    ::-webkit-input-placeholder {
        color: rgba(227,237,248,0.5);
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    }
    input{
        background:none;
        outline:none;
        border:none;
        font-size: 24px;
        color: white;
        margin-left: 10px;
    }
    .login-id > div:first-child{
        font-size: 48px;
        font-weight: bold;
        color:rgba(227,237,248,1);
        margin-left: 14px;
    }
    .login-id,.login-password{
        height: 50px;
        width: 440px;
        margin: 0 auto;
        display: flex;
        border-bottom:1px solid rgba(255,255,255,0.2);
        margin-top: 34px;
    }
    .item-title{
        font-size: 43px;
        width: 100%;
        text-align: center;
        font-weight: bold;
    }
    .item-box{
        width: 720px;
        height: 540px;
        box-shadow:0px 7px 18px 0px rgba(7,18,29,1);
        border-radius: 10px;
        background:rgba(84,106,128,0.8);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        padding-top: 36px;
        padding-bottom: 46px;
    }
    .change-password{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 20;
        width: 3840px;
        height: 1017px;
        background-color: rgba(0,0,0,0.38);
    }
</style>