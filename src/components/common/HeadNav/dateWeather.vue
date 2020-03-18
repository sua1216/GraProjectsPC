<template>
	<div class="header-right">
		<div class="header-right-dateWeather">
			<div class="header-right-time">{{time}}</div>
			<div class="header-right-date" >{{date}}</div>
		</div>
		<div class="header-right-2">
		<!--	<div class="header-right-time">{{week}}</div>-->
			<div class="header-right-weather"><img :src="weatherData.weather_icon" :zz="weatherData.weather_icon">{{weatherData.temperature}}</div>
		</div>
		<div class="heanav-box-hoverder-right-3"><p>PM2.5</p><p>{{weatherData.aqi}}</p></div>
	</div>
</template>

<script>
	export default {
		name: "dateWeather",
		data:function(){
			return{
				isClick:false,
				date:'',
				week:'',
				time:'',
				publicPath: process.env.BASE_URL,
				weatherData:{

				}
			}
		},
		mounted:function(){
			let that = this;
			window.wh=this
			setInterval(function(){
				that.date = that.getCurrentDate();
				that.week = that.getCurrentWeek();
				that.time = that.getCurrentTime();
			},1000);
			this.axios.post('http://sy.bddeve.xbcx.com.cn/dsj_sy_show/api/data/weather').then(function (req) {
				let data = req.data
				that.weatherData = {
					aqi:data.aqi,
					weather_curr:data.weather_curr,
					temperature:data.temperature,
					wind:data.wind,
					weather_icon:`${that.publicPath}images/war_`+data.weatid+'.png',
				}
			}).catch(function (error) {
				console.log(error);
			});
		},
		methods:{

			getCurrentDate(){
				var date=new Date(), str='';
				str +=date.getFullYear()+'年';
				str +=date.getMonth()+1+'月';
				str +=date.getDate()+'日';
				return str
			},
			getCurrentWeek(){
				var date=new Date();
				var week = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
				var today = week[date.getDay()];
				return today;
			},
			getCurrentTime(){
				var date=new Date();
				var h=date.getHours();       //获取当前小时数(0-23)
				var m=date.getMinutes();     //获取当前分钟数(0-59)
				var s=date.getSeconds();
				if(m < 10){
					m = '0'+m;
				}
				if(s < 10){
					s = '0'+s;
				}
				var time = h +':'+ m + ':' + s;
				return time;
			}
		}
	}
</script>

<style scoped>
.header-left-interval{position:absolute;left:660px;display:inline-block;vertical-align:middle;}
.header-center{position:absolute;display:inline-block;vertical-align:middle;left:874px;z-index:3;width: 1362px;top: -7px}
.header-center-title{display:flex;align-items:center;justify-content:center;padding:5px 125px 25px;font-size:50px;font-weight:bold;color:#d6e9ff;text-shadow:0 0 20px #145f87,0 0 20px #145f87,0 0 20px #145f87;
	background:url(../../../assets/common/images/navimg/nav_title_bg.png) no-repeat;background-size:100%;}
.header-right-interval{position:absolute;right:658px;display:inline-block;vertical-align:middle;z-index:2;}
.header-right-interval img{transform:rotateX(360deg) rotateY(180deg)}
.header-right{position:absolute;display:inline-block;vertical-align:middle;right:0;top:0;}
.header-right .header-right-bg{position:absolute;right:0;top:0;transform:rotateX(360deg) rotateY(180deg)}
.header-right-dateWeather{width:195px;font-size:18px;border-right: 1px solid rgba(255,255,255,0.5);height: 80px;word-break: keep-all}
.header-right-date{display:inline-block;vertical-align: middle;padding-right:20px;font-size: 16px;
	font-size:16px;
	font-family:Microsoft YaHei;
	font-weight:bold;
	color:rgba(255,255,255,1);}
.header-right-weather{display:flex;vertical-align: middle;font-size: 34px;font-weight: 500;align-items: center}
.header-right-weather img{display:inline-block;vertical-align: middle;margin-right:5px;width: 120px;height: 120px}
.header-right-time{
	font-size:30px;
	font-family:AbitareSans;
	font-weight:normal;
	color:rgba(255,255,255,1);
}
.header-right{
	display: flex;
	position: unset;
	align-items: center;
	height: 100%;
}
.header-right-3{
	padding-left: 32px;
	height: 63px;
}
.heanav-box-hoverder-right-3{
	margin-left: 30px;
	border-left: 1px solid rgba(255,255,255,.5);
	padding-left: 20px;
}
.heanav-box-hoverder-right-3 > p:first-child{
	font-size: 16px;
	margin: 0 !important;
}
.heanav-box-hoverder-right-3 > p:last-child{
	font-size: 26px;
	font-weight: bold;
	margin: 0 !important;
}
</style>
