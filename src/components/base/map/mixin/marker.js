
import vue from 'vue'
import mapboxgl from 'mapbox-gl'
let vueMarkerMixin  = {

	methods:{
		makeVueMarker(options){
			if(!options){return false}
			if(!options.lnglat){throw new Error('options.lnglat不应该为空')}
			if(!options.vuecp){throw new Error('缺少扎点vue组件')}

			let div = document.createElement('div');
			div.className = 'marker';

			let marker = new mapboxgl.Marker({
				element:div,
				anchor:'bottom'
			}).setLngLat(options.lnglat);

			options.props['marker'] = marker;
			options.props['parent'] = this;
			if(options.props&&!options.props.path){
				options.props['path'] = this.$route.path;
			}

			let prePointer = vue.extend(div);
			const vuedom = new prePointer({
				el : div,
				render:function (h) {/*h相当于createElement，但是又有区别，传入h备用*/
					return h(options.vuecp,{props:options.props},[])
				}
			})
			marker.vue = vuedom.$children[0];
			div.appendChild(vuedom.$el)
			return marker
		},
		addVueMarker(target,map){
			for(let keys in target){ // 遍历目标
				if(target[keys].hasOwnProperty){
					if(target[keys].hasOwnProperty('_anchor')){
						target[keys].addTo(map)
					}else if(target[keys].constructor === Array||target[keys].constructor === Object){
						this.addVueMarker(target[keys],map)
					}
				}
			}
		},
		//移除marker
		removeMarker(target){
			for(let keys in target){ // 遍历目标
				if(target[keys].hasOwnProperty){
					if(target[keys].hasOwnProperty('_anchor')){
						target[keys].remove()
					}else if(target[keys].constructor === Array||target[keys].constructor === Object){
						this.removeMarker(target[keys])
					}
				}
			}
		},
	}

}
export default vueMarkerMixin