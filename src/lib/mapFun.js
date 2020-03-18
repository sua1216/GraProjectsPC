/*
* 地图上比较业务的功能就写在这里。
*
* */
import dutygrid from './GridJson/dutyGrid.js'
import managegrid from './GridJson/manageGrid.js'
import newGrid from './GridJson/newGridData.js'
class mapFun {
    constructor(control){
        this.control = control
    }

    createTrack(track){

        console.log('track',track)

        this.control.trackPeople(track);

        let source = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": track[1]
            }
        };

        if(this.control.map.getLayer('mapFun_track')){
            this.control.map.getSource('mapFun_track').setData(source);
        }else{
            this.control.map.addLayer({
                "id": "mapFun_track",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": source
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#00ff84",
                    "line-width": 10
                }
            });
        }

    }

    cancelTrack(){

        //todo   没有找到 正确的时机来调用这个函数  这个函数也没测试。  应该是routechange 的时候  父组件里面去 改 扎点组件里面  mapFun类的cancelTrack方法


        this.control.removeTrack();
        if(this.control.map.getLayer('mapFun_track')){
            this.control.map.removeLayer('mapFun_track')
        }
        if(this.control.map.getSource('mapFun_track')){
            this.control.map.removeSource('mapFun_track')
        }
    }

    //添加dutygrid面
	addDutyGridFill(){
    	let map = this.control.map;
		let filllayer = {
			"id": "DutyGridFill",
			"type": "fill",
			"source": {
				"type": "geojson",
				"data": dutygrid
			},
			"paint": {
				'fill-color':'white',
				'fill-opacity':.3
			}
		};
		if(map.getLayer('DutyGridFill')){
			map.removeLayer('DutyGridFill');
			map.removeSource('DutyGridFill');
		}
		map.addLayer(filllayer)
	}
	//添加dutygrid网格线
	addDutyGridLine(){
		let map = this.control.map2;

		let linelayer = {
			id:"DutyGridLine",
			type:'line',
			source:{
				type:'geojson',
				data: {
					type:'FeatureCollection',
					'features':[]
				}
			},
			paint:{
				'line-color':'rgba(255,255,255,.7)',
				'line-width':2
			}
		}
		for(let i in newGrid.data){
			let area = {
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "LineString",
					"coordinates": newGrid.data[i]
				}
			};
			linelayer.source.data.features.push(area)
		}

		if(map.getLayer('DutyGridLine')){
			map.removeLayer('DutyGridLine');
			map.removeSource('DutyGridLine');
		}
		map.addLayer(linelayer)
	}
	//添加新的网格线
	addGridLine(){
		let map = this.control.map;

		let linelayer = {
			id:"GridLine",
			type:'line',
			source:{
				type:'geojson',
				data: {
					type:'FeatureCollection',
					'features':[]
				}
			},
			paint:{
				'line-color':'white',
				'line-width':8
			}
		}
		for(let i in newGrid){
			let area = {
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "LineString",
					"coordinates": newGrid[i]
				}
			};
			linelayer.source.data.features.push(area)
		}

		if(map.getLayer('GridLine')){
			map.removeLayer('GridLine');
			map.removeSource('GridLine');
		}
		map.addLayer(linelayer)
	}


	//managegrid
	addManageGridFill(){
		let map = this.control.map;
		let filllayer = {
			"id": "ManageGridFill",
			"type": "fill",
			"source": {
				"type": "geojson",
				"data": managegrid
			},
			"paint": {
				'fill-color':'white',
				'fill-opacity':.3
			}
		};
		if(map.getLayer('ManageGridFill')){
			map.removeLayer('ManageGridFill');
			map.removeSource('ManageGridFill');
		}
		map.addLayer(filllayer)
	}
	addManageGridLine(){
		let map = this.control.map2;
		let linelayer = {
			id:"ManageGridLine",
			type:'line',
			source:{
				type:'geojson',
				data: {
					type:'FeatureCollection',
					'features':[]
				}
			},
			paint:{
				'line-color':'rgba(255,255,255,.7)',
				'line-width':3
			}
		}
		for(let i in newGrid.data2){
			let data = newGrid.data2[i];
			let area = {
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "LineString",
					"coordinates": data
				}
			};
			linelayer.source.data.features.push(area)
		}
		if(map.getLayer('ManageGridLine')){
			map.removeLayer('ManageGridLine');
			map.removeSource('ManageGridLine');
		}
		map.addLayer(linelayer)
	}

	//移除网格线
	removeDutyGridLine(){
		let map = this.control.map2;
		if(map.getLayer('DutyGridLine')){
			map.removeLayer('DutyGridLine');
			map.removeSource('DutyGridLine');
		}
	}
	//移除dutygrid面
	removeDutyGridFill(){
		let map = this.control.map;
		if(map.getLayer('DutyGridFill')){
			map.removeLayer('DutyGridFill');
			map.removeSource('DutyGridFill');
		}
	}
	removeManageGridFill(){
		let map = this.control.map;
		if(map.getLayer('ManageGridFill')){
			map.removeLayer('ManageGridFill');
			map.removeSource('ManageGridFill');
		}
	}
	removeManageGridLine(){
		let map = this.control.map2;
		if(map.getLayer('ManageGridLine')){
			map.removeLayer('ManageGridLine');
			map.removeSource('ManageGridLine');
		}
	}
	removeGridLine(){
		let map = this.control.map2;
		if(map.getLayer('GridLine')){
			map.removeLayer('GridLine');
			map.removeSource('GridLine');
		}
	}
}





export  default mapFun
