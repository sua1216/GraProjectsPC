/*
* Power By J.S.Patrick
* 页面状态存储及操作代理
* 主要操作如下
*
* 生成的对象：存储到vue上，以被后续函数调用
*
* 传参：
*       target：     vue对象，也可以是某个被监听的对象
*       handler：    属性监听对象，包含被监听对象的所有要监听的属性
*                    内容为键值对，属性名和对应的handle对象
*       recordList： 将要记录的属性名称列表，自动去重
*
* 操作对象:
*       ProxyObj:    被监听的虚假对象，所有要对target的操作都用该对象进行
*                    被操作时会有proxy拦截，先进行事件的回调，再进行修改
* */
import vue from "vue";

class Status {
	/*
	* option作为中转站，留存数据
	* 把handler抽离，得到数据变化前后的间隙来调用数据变化的回调
	* StatusBox存储数据在某个时间节点的状态和名称
	* */
	constructor(option){
		this.StatusBox = null;
		this.recordList = null;
		this.option = option;
		this.ProxyObj = null;
		let _THIS = this;
		this.ProxyHandler = {
			get:function(obj, prop){
			    _THIS.getCallback(obj, prop);
				return obj[prop];
			},
			set:function (obj, prop, value) {
				_THIS.setCallback(obj, prop, value);
				obj[prop] = value;
				return true
				//set一定要return true，不然会报错
			}
		};
		this.init(option)
	}
	init(option){
		this.StatusBox = {};
		this.recordList = [];
		this.addRecordList();
		this.ProxyObj = new Proxy(option.target,this.ProxyHandler);
		this.record('init')
	}
	//把要监控的对象名称添加到list中
	addRecordList(){
		for(let i in this.option.handler){
			this.recordList.push(i)
		}
		if(this.option.recordList){
			for(let i of this.option.recordList){
				this.recordList.push(i)
			}
		}
		if(this.option.recordAll){
			for(let i in this.option.target){
				this.recordList.push(i)
			}
		}
		//数组去重
		this.recordList = [...new Set(this.recordList)];
	}
	//get回调
	getCallback(obj, prop){
		for(let i in this.option.handler){
			if(prop===i&&('get' in this.option.handler[i])){
				this.option.handler[i].get(obj,prop)
			}
		}
	}
	//set回调
	setCallback(obj, prop, value){
		for(let i in this.option.handler){
			if(prop===i&&('set' in this.option.handler[i])){
				this.option.handler[i].set(value)
			}
		}
	}
	//记录当前的配置信息
	record(name){
		if(this.recordList.length<1){return}
		let tempObj = {};
		for(let i of this.recordList){
			tempObj[i] = this.deepClone(this.ProxyObj[i]);
		}
		this.StatusBox[name] = tempObj;
	}
	//回到某个历史记录
	revert(name){
		if(this.StatusBox[name]){
			let tempObj = this.StatusBox[name];
			for(let i in tempObj){
				this.ProxyObj[i] = tempObj[i];
			}
		}
	}
	deepClone(source){
		if(Array.isArray(source)&&Object.prototype.toString.call(source) === "[object Object]"||!source){
			return source
		}
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
	}
}
//把$Status这个对象添加到uve的原型中，可以直接调用
function registryStatus (){
	vue.prototype.$Status = Status;
}
export default registryStatus