<template>
	<div>
		<div :style="setStyles(0)"></div>
		<div :style="setStyles(1)"></div>
		<div :style="setStyles(2)"></div>
		<div :style="setStyles(3)"></div>
	</div>

</template>

<script>
	export default {
		name: "Cornerimg",
		props:['size','color','mode','type','angleSize'],
		methods:{
		    setStyles(key){
		    	let sty = '';
		    	let size = this.size;
		    	let color = this.color;
		    	if(this.type=='sharp'){
					if(this.mode){
						if(!(this.mode+'').includes('1')&&key==0){size=0}
						if(!(this.mode+'').includes('2')&&key==1){size=0}
						if(!(this.mode+'').includes('3')&&key==2){size=0}
						if(!(this.mode+'').includes('4')&&key==3){size=0}
						switch (Number(key)) {
							case 0:
								sty=`width:${size}px;height:${size}px;position:absolute;top:0px;border-left:${this.angleSize?this.angleSize:4}px solid;border-top:${this.angleSize?this.angleSize:4}px solid;
							left:0px;border-color:${color};`
								break;
							case 1:
								sty=`width:${size}px;height:${size}px;position:absolute;top:0px;border-right:${this.angleSize?this.angleSize:4}px solid;border-top:${this.angleSize?this.angleSize:4}px solid;
							right:0px;border-color:${color};`
								break;
							case 2:
								sty=`width:${size}px;height:${size}px;position:absolute;bottom:0px;border-left:${this.angleSize?this.angleSize:4}px solid;border-bottom:${this.angleSize?this.angleSize:4}px solid;
							left:0px;border-color:${color};`
								break;
							case 3:
								sty=`width:${size}px;height:${size}px;position:absolute;bottom:0px;border-right:${this.angleSize?this.angleSize:4}px solid;border-bottom:${this.angleSize?this.angleSize:4}px solid;
							right:0px;border-color:${color};`
								break;
						}
					}else{
						switch (Number(key)) {
							case 0:
								sty=`width:${size}px;height:${size}px;position:absolute;top:0px;border-left:${this.angleSize?this.angleSize:4}px solid;border-top:${this.angleSize?this.angleSize:4}px solid;
							left:0px;border-color:${color};`
								break;
							case 1:
								sty=`width:${size}px;height:${size}px;position:absolute;top:0px;border-right:${this.angleSize?this.angleSize:4}px solid;border-top:${this.angleSize?this.angleSize:4}px solid;
							right:0px;border-color:${color};`
								break;
							case 2:
								sty=`width:${size}px;height:${size}px;position:absolute;bottom:0px;border-left:${this.angleSize?this.angleSize:4}px solid;border-bottom:${this.angleSize?this.angleSize:4}px solid;
							left:0px;border-color:${color};`
								break;
							case 3:
								sty=`width:${size}px;height:${size}px;position:absolute;bottom:0px;border-right:${this.angleSize?this.angleSize:4}px solid;border-bottom:${this.angleSize?this.angleSize:4}px solid;
							right:0px;border-color:${color};`
								break;
						}
					}
				}else{
				    if(this.mode){
					    if(!(this.mode+'').includes('1')&&key==0){size=0}
					    if(!(this.mode+'').includes('2')&&key==1){size=0}
					    if(!(this.mode+'').includes('3')&&key==2){size=0}
					    if(!(this.mode+'').includes('4')&&key==3){size=0}
					    switch (Number(key)) {
						    case 0:
							    sty=`width:${size}px;height:${size}px;position:absolute;top:${(-Number(size)/2)}px;
							left:${(-Number(size)/2)}px;background:${color};`
							    break;
						    case 1:
							    sty=`width:${size}px;height:${size}px;position:absolute;top:${(-Number(size)/2)}px;
							right:${(-Number(size)/2)}px;background:${color};`
							    break;
						    case 2:
							    sty=`width:${size}px;height:${size}px;position:absolute;bottom:${(-Number(size)/2)}px;
							left:${(-Number(size)/2)}px;background:${color};`
							    break;
						    case 3:
							    sty=`width:${size}px;height:${size}px;position:absolute;bottom:${(-Number(size)/2)}px;
							right:${(-Number(size)/2)}px;background:${color};`
							    break;
					    }
				    }else{
					    switch (Number(key)) {
						    case 0:
							    sty=`width:${size}px;height:${size}px;position:absolute;top:${(-Number(size)/2)}px;
							left:${(-Number(size)/2)}px;background:${color};`
							    break;
						    case 1:
							    sty=`width:${size}px;height:${size}px;position:absolute;top:${(-Number(size)/2)}px;
							right:${(-Number(size)/2)}px;background:${color};`
							    break;
						    case 2:
							    sty=`width:${size}px;height:${size}px;position:absolute;bottom:${(-Number(size)/2)}px;
							left:${(-Number(size)/2)}px;background:${color};`
							    break;
						    case 3:
							    sty=`width:${size}px;height:${size}px;position:absolute;bottom:${(-Number(size)/2)}px;
							right:${(-Number(size)/2)}px;background:${color};`
							    break;
					    }
				    }
				}
		    	return sty
			}
		},
	}
</script>

<style scoped lang="scss">

</style>