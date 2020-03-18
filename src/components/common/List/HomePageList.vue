<template>
    <div class="home-page-list" :style="{
        background:o.color ? 'rgba(255, 127, 13, .5)' : '',
        transform:o.color ? 'scale(1.02,1.02)' : 'scale(1,1)'
    }">
        <div class="title-img" :style="{
            background:o.color ? 'rgba(255, 127, 13, .5)' : 'rgba(255,255,255,.16)',color:'rgba(255,255,255,.75)'
        }">
            <span :class="icons[o.type]"></span>
        </div>
        <div class="ct-info">
            <p>{{o.name}}</p>
        </div>
        <div class="lines"></div>
        <div class="data">
            <p>
                <span class="xb_icon shuliang"></span>
                <span>{{o.thisMonth}}</span>
            </p>
            <p>
                <span class="xb_icon weichuli"></span>
                <span>{{o.unend}}</span>
            </p>
            <p>
                <span class="xb_icon chaoshi"></span>
                <span>{{o.overtime}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name:'HomePageList',
        props:{
            o:Object
        },
        data(){
            return {
                icons:[
                    'xb_icon mountains',
                    'xb_icon object-group',
                    'xb_icon guanggao',
                    'xb_icon shigong',
                    'xb_icon gongyong',
                    'xb_icon tufashijian',
	                'xb_icon headset',
                ]
            }
        },
        methods:{
            ts(){
                console.log(1)
            }
        }
    }
</script>

<style scoped lang="scss">
.home-page-list{
	width:600px;color:white;font-size:23px;height:80px;border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;
	margin:10px 0px;line-height: 80px;position:relative;transition:all .2s linear;cursor:pointer;
	background:rgba(255,255,255,0.04);
	.title-img{
		width:80px;height:80px;background:rgba(255,255,255,.2);transition:all .2s linear;
		span{font-size:40px;padding:20px;}
	}
	.ct-info{
		width:170px;
		p{padding:0 5px;text-align: left;text-indent: 10px}
	}
	.lines{border:1px solid #FFFFFF;height:50%;opacity: 0.18}
	.data{
		flex-grow: 1;display:flex;justify-content: space-around;
		p{
			width:100px;
			span{
				margin-left:10px;
			}
			span:nth-child(1){
				color: rgba(255,255,255,.5);
			}
			span:nth-child(2){
				font-size:29px;
				font-family:AbitareSans;
				font-weight:normal;
				color:rgba(254,255,254,1);
			}
		}
	}
	&:before{
		content:'';display:block;width:6px;height:6px;background:rgba(255,255,255,.5);position:absolute;top:-3px;left:-3px;
	}
	&:after{
		content:'';display:block;width:6px;height:6px;background:rgba(255,255,255,.5);position:absolute;top:-3px;right:-3px;
	}
}
</style>