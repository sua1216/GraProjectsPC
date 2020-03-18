let tool = {
	//获取格式化的日期
	getNowFormatDate(i) {
		let date = new Date();
		let seperator1 = "-";
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let month_now = date.getMonth() + 1;
		let strDate = date.getDate();
		let monthLast = ''
		let monthLast3 = ''
		if (month >= 1 && month <= 9) {
			month = "0" + month;
			monthLast = "0" + (month - 1);
			monthLast3 = "0" + (month - 3)
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		let currentdate = '';
		// 传值
		// 1: 当前日期,格式：YYY-MM-DD;
		// 2：当前日期,格式：YYY年MM月DD日;
		// 3：当前日期加一天,格式：YYY-MM-DD;
		// 4：当前月份,纯数字;
		// 5: 当前月份,YYYY-MM;
		// 6: 当前月份的上一个月,YYYY-MM;
		// 7: 当前月份的上三个月,YYYY-MM;
		// 8:当前日期的近30天,YYY-MM-DD;
		if (i == 1) {
			currentdate = year + seperator1 + month + seperator1 + strDate;
		} else if (i == 2) {
			currentdate = year + '年' + month + '月' + strDate + '日';
		} else if (i == 3) {
			let numDate = date.getDate() + 1;
			if (numDate >= 1 && numDate <= 9) {
				numDate = "0" + numDate;
				currentdate = year + seperator1 + month + seperator1 + numDate;
			} else {
				currentdate = year + seperator1 + month + seperator1 + (strDate + 1);
			}
		}else if(i == 4){
			currentdate = month_now
		}else if(i ==5) {
			currentdate = year + seperator1 + month
		}else if(i ==6){
			currentdate = year + seperator1 + monthLast
		}else if(i ==7){
			currentdate = year + seperator1 + monthLast3
		}else if(i == 8){
			currentdate = year + seperator1 + monthLast + seperator1 + strDate;
		}
		return currentdate;
	},
	//随机数生成器
	random(min,max,isZ=true){
		if(isZ){
			return Math.floor(Math.random()*(max-min+1)+min);
		}else{
			return Math.random()*(max-min+1)+min;
		}
	},
	//深拷贝对象数组
	deepClone(source){
		const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
		for(let keys in source){ // 遍历目标
			if(source.hasOwnProperty(keys)){
				if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
					targetObj[keys] = source[keys].constructor === Array ? [] : {};
					targetObj[keys] = this.deepClone(source[keys]);
				}else{ // 如果不是，就直接赋值
					targetObj[keys] = source[keys];
				}
			}
		}
		return targetObj;
	},
	//数字格式化
	filterNumber(target,type){
		let result;
		switch (Number(type)) {
			case 1:
				result = addComma(target);
				break;
		}


		function addComma(target){
			target = target+'';
			target = target.split("").reverse();
			let res = [];
			for(let i in target){
				res.push(target[i]);
				if(i&&i!=target.length-1&&(i+1)%3===0){
					res.push(",")
				}
			}
			res = res.reverse().join("");
			return res
		}
		return result;
	},
	//生成随机id
	randomId(num){
		var returnStr = "",
			charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for(var i=0; i<num; i++){
			if(i==0){returnStr+='P';continue}
			var index = Math.round(Math.random() * (charStr.length-1));
			returnStr += charStr.substring(index,index+1);
		}
		return returnStr;
	},

	//移除layer
	removeLayer(target,map){
		for(let i in target.removeList){
			if(map.getLayer(target.removeList[i])){
				map.removeLayer(target.removeList[i]);
				map.removeSource(target.removeList[i]);
			}
		}
		for(let i in target.addList){
			if(!map.getLayer(i)){
				map.addLayer(target.addList[i]);
			}
		}
	},
	// 通过给定差值来计算时间，未判断跨年月的情况
    calDate(offset){
        //计算一天的分钟数
        let dayMinutes = 24 * 60


        //1、计算当前时间
        let d = new Date()
        let date = d.getDate()
        let month = d.getMonth() + 1

        let hour = d.getHours()
        let min = d.getMinutes()

        if(Math.abs(offset) > dayMinutes){
            //如果超过一天了，则先计算天
            date += parseInt(offset / dayMinutes)
            offset = offset % dayMinutes
        }

        //如果时间往后
        if(offset > 0){
            let offHour = parseInt((min + offset) / 60)
            let offMin = (min + offset) % 60

            hour += offHour
            min = offMin
        }
        if(offset < 0){
            if(min + offset < 0){
                //需要借小时数来减
                //负数需要向下取整
                let tmpOff = Math.floor((min + offset) / 60)

                hour += tmpOff

                min = 60 + (min + offset) % 60

            }else{
                min += offset
            }
        }

        return `${month}-${date} ${hour}:${min < 10 ? '0'+min : min}`
    },
    //计算本月的天数
	calMontDayNum(){
		let d = new Date()
		let month = d.getMonth() + 1
		let year = d.getFullYear()
		let flag = false;
		const BIG_MONTH = 31
		const SMALL_MONTH = 30


		//计算是否闰年

		//是否需要除以100
		if(/00$/.test(year)){
			flag = true
		}

		switch (month) {
			case 1:{
				return BIG_MONTH
			}
			case 2:{
				if(flag){
					if(year % 400 == 0){
						//闰年
						return 29
					}else{
						return 28
					}
				}else{
					if(year % 4 == 0){
						//闰年
						return 29

					}else{
						return 28
					}
				}
			}
			case 3:{
				return BIG_MONTH
			}
            case 4:{
                return SMALL_MONTH
            }
            case 5:{
                return BIG_MONTH
            }
            case 6:{
                return SMALL_MONTH
            }
            case 7:{
                return BIG_MONTH
            }
            case 8:{
                return BIG_MONTH
            }
            case 9:{
                return SMALL_MONTH
            }
            case 10:{
                return BIG_MONTH
            }
            case 11:{
                return SMALL_MONTH
            }
            case 12:{
                return BIG_MONTH
            }
        }

	}

};
let heatMap = {
	//   option{
		//    _vue:传过来的vue对象(一般传调用界面的this)
		//    dataList:传过来的热力图数据,包含坐标等(也可以不传,不传自动请求演示数据)
		//    layerId:传过来的热力图ID,这个ID一定要是独一无二的.
	//    }
	init(option){
		this.setHeatMap(option)
		this.showHeatMap(option)
	},
	//设置热力图属性,传入option对象参数
	setHeatMap:function(option){
		let map = option._vue.control.map;
		let _vue = option._vue;
		let geoJsons = {
			"type": "FeatureCollection",
			"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
			"features": []
		};
		//没有真数据时,默认用假数据
		if(option.dataList){
			setData(option.dataList)
		}else {
			_vue.axios({
				url:window.baseURL+'/hotMap',
			}).then(d => {
				setData(d.data.lists)
			})
		}
		function randomNum(minNum,maxNum){
			switch(arguments.length){
				case 1:
					return parseInt(Math.random()*minNum+1,10);
				// break;
				case 2:
					if((Math.random()*(1+1+1)-1)>0){
						return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
					}else{
						return -parseInt(Math.random()*(maxNum-minNum+1)+minNum,10)
					}
				// break;
				default:
					return 0;
				// break;
			}
		}
		function setData(datalist) {
			for(let i in datalist){
				let data = {
					"type": "Feature",
					"properties": {
						"mag": 6,
					},
					"geometry": {
						"type": "Point",
						"coordinates": [Number(datalist[i].lnglat[0]),Number(datalist[i].lnglat[1]),Number(datalist[i].countValue)]
					}
				};
				geoJsons.features.push(data)
				for(let j =0 ; j<30;j++){
					let lng = Number(datalist[i].lnglat[0])+randomNum(0,300)/100000;
					let lat = Number(datalist[i].lnglat[1])+randomNum(0,300)/100000;
					let val = Number(datalist[i].countValue)*0.75;
					let data = {
						"type": "Feature",
						"properties": {
							"mag": 6,
						},
						"geometry": {
							"type": "Point",
							"coordinates": [lng,lat,val]
						}
					};
					geoJsons.features.push(data)
				}
			}
			for(let i in geoJsons.features){
				geoJsons.features[i].geometry.coordinates[0]-=0.002;
				geoJsons.features[i].geometry.coordinates[1]+=0.0035;
			}
			if(!map.getSource('earthquakes')){
				map.addSource('earthquakes', {
					"type": "geojson",
					"data": geoJsons
				});
			}
		}
	},
	//显示热力图
	showHeatMap:function(option){
		let map = option._vue.control.map;
		if(!map.getLayer(option.layerId)){
			if(map.getSource('earthquakes')){
				map.addLayer({
					"id": option.layerId,
					"type": "heatmap",
					"source": "earthquakes",
					"minzoom":11,
					"maxzoom": 16,
					"paint": {
						"heatmap-weight": [
							"interpolate",
							["linear"],
							["get", "mag"],
							0, 0,
							6, 1
						],
						"heatmap-color": [
							"interpolate",
							["linear"],
							["heatmap-density"],
							0, "rgba(0,0,0,0)",
							0.2, "rgba(65,106,135,1)",
							0.4, "rgba(73,187,191,1)",
							0.6, "rgba(51,189,88,1)",
							0.8, "rgba(184,199,50,1)",
							1, "rgba(204,113,80,1)"
						],
						"heatmap-radius": [
							"interpolate",
							["linear"],
							["zoom"],
							11, 8,
							14, 12
						],
					}
				});
			}else{
				var timeout = null;
				let _this = this;
				(function() {
					if(timeout !== null){
						clearTimeout(timeout);
					}
					timeout = setTimeout(()=>{
						_this.setHeatMap(option)
						_this.showHeatMap(option)
					}, 3000);
				})()
			}
		}
	},
	//隐藏热力图
	hideHeatMap:function(option){
		let map = option._vue.control.map;
		if(map.getLayer(option.layerId)){
			map.removeLayer(option.layerId)
		}
	},

};
let sortUtil = {
    //插入排序
	selectSort(arr){
	    for(let i=0;i<arr.length;i++){
	        for(let j = i;j<arr.length;j++){
	            if(arr[j] < arr[i]){
	                let tmp = arr[j]
                    arr[j] = arr[i]
                    arr[i] = tmp
                }
            }
        }
    }
}
export {tool,heatMap,sortUtil}