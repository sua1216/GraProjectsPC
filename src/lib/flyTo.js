class flyTo {
    constructor(control){
        this.control = control;
	    this.satellite= {
		    "id": "mapbox-satellite",
			    "type": "raster",
			    "source": "weixing",
			    "maxzoom": 16,
			    "layout": {},
		    "paint": {
			    "raster-saturation": -1,
				    "raster-fade-duration": 400,
				    "raster-opacity": ["interpolate", ["linear"],
				    ["zoom"], 12.95, 0.28, 13, 0.28, 14, 0
			    ]
		    }
	    },
	    this.layerBox = {"wjjkq-three-grid-an98yh":{"id":"wjjkq-three-grid-an98yh","type":"line","source":"siyang","source-layer":"siyang_three_grid","layout":{"line-miter-limit":2,"visibility":"none"},"paint":{"line-color":"hsl(209, 65%, 100%)","line-width":["interpolate",["linear"],["zoom"],14,5,14.1,11],"line-opacity":1,"line-gap-width":0}},"wjjkq-base-grid-5w4j6g copy":{"id":"wjjkq-base-grid-5w4j6g copy","type":"line","source":"siyang","source-layer":"siyang_base_grid","layout":{"visibility":"none"},"paint":{"line-color":["interpolate",["linear"],["zoom"],14,"hsl(0, 0%, 100%)",14.1,"hsl(193, 0%, 100%)"],"line-width":["interpolate",["linear"],["zoom"],14,3,14.1,8],"line-opacity":1}},"wujiang-poi-merge-7urqrm copy":{"id":"wujiang-poi-merge-7urqrm copy","type":"symbol","source":"siyang","source-layer":"siyang_poi","minzoom":14,"filter":["all",["match",["get","rank"],[34,2,5,7,6,8,9,10,12,11,17,16],true,false],["match",["get","icon"],["car-repair","furniture","religious-jewish","town-hall","car","farm","garden","college","castle","charging-station","parking","hospital","bank","ranger-station","clothing-store","laundry","restaurant","amusement-park","stadium","suitcase","monument"],true,false]],"layout":{"text-size":["interpolate",["exponential",1.16],["zoom"],14,14,17,16,20,18,22,24],"icon-image":["step",["zoom"],["concat",["get","icon"],"-11"],15,["concat",["get","icon"],"-15"]],"text-font":["yahei"],"text-offset":["interpolate",["linear"],["zoom"],0,["match",["get","icon"],["","bank","lodging"],["literal",[0,0.1]],["literal",[0,0.4]]],15,["match",["get","icon"],["lodging","bank"],["literal",[0,0.9]],["literal",[0,1]]]],"text-anchor":"top","text-field":["get","name"],"visibility":"none"},"paint":{"icon-opacity":["step",["zoom"],["step",["get","sizerank"],0,5,1],17,["step",["get","sizerank"],0,13,1]],"text-color":["case",["match",["get","icon"],["restaurant"],true,false],"hsl(22, 80%, 31%)",["match",["get","icon"],["hospital"],true,false],"hsl(340, 48%, 42%)",["match",["get","icon"],["garden"],true,false],"hsl(100, 45%, 37%)",["match",["get","icon"],["town-hall","laundry","religious-jewish","clothing-store","parking","car-repair","stadium","castle","furniture","bank","ranger-station","amusement-park","suitcase"],true,false],"hsl(26, 38%, 19%)",["match",["get","icon"],["college"],true,false],"hsl(62, 75%, 19%)",["match",["get","icon"],["car"],true,false],"#623b1e",["match",["get","icon"],["monument","charging-station"],true,false],"hsl(79, 47%, 26%)",["match",["get","icon"],["suitcase"],true,false],"hsl(26, 53%, 25%)","hsl(240, 25%, 31%)"],"text-opacity":["interpolate",["linear"],["zoom"],0,1,22,1],"text-halo-color":"hsla(0, 0%, 100%, 0.79)","text-halo-blur":0.2,"text-halo-width":1.8}},"自贡_村4_point":{"id":"自贡_村4_point","type":"symbol","source":"siyang","source-layer":"siyang_point","metadata":{"mapbox:group":"70c7d236a27e4d1b145a241d6e0b4202"},"minzoom":14,"filter":["match",["get","place"],["village"],true,false],"layout":{"text-size":["step",["zoom"],["step",["get","sizerank"],11,5,11],17,["step",["get","sizerank"],14,13,14]],"text-offset":[0,1.2],"text-font":["yahei"],"icon-image":"dot-11","text-anchor":["step",["zoom"],["step",["get","sizerank"],"center",5,"top"],17,["step",["get","sizerank"],"center",13,"top"]],"text-field":["get","name"]},"paint":{"icon-opacity":["step",["zoom"],["step",["get","sizerank"],0,5,1],17,["step",["get","sizerank"],0,13,1]],"text-halo-blur":1,"text-color":"#0b2e56","text-halo-width":1,"text-halo-color":"hsl(212, 0%, 100%)"}},"自贡_乡镇_point":{"id":"自贡_乡镇_point","type":"symbol","source":"siyang","source-layer":"siyang_point","metadata":{"mapbox:group":"70c7d236a27e4d1b145a241d6e0b4202"},"minzoom":13,"filter":["match",["get","place"],["town"],true,false],"layout":{"text-size":["interpolate",["exponential",1.21],["zoom"],0,16,13,18],"text-offset":[0,1.1],"text-font":["yahei"],"icon-image":"dot-11","text-anchor":["step",["zoom"],["step",["get","sizerank"],"center",5,"top"],17,["step",["get","sizerank"],"center",13,"top"]],"text-field":["get","name"]},"paint":{"icon-opacity":["step",["zoom"],["step",["get","sizerank"],0,5,1],17,["step",["get","sizerank"],0,13,1]],"text-color":"#0b2e56","text-opacity":["interpolate",["linear"],["zoom"],0,1,22,1],"text-halo-width":2,"text-halo-blur":1,"text-halo-color":"hsl(0, 0%, 100%)"}},"自贡_高速_polyline copy 1":{"id":"自贡_高速_polyline copy 1","type":"symbol","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"02c50d788beb229dd398469c5e0a8362"},"minzoom":12,"filter":["match",["get","highway"],["motorway","motorway_link"],true,false],"layout":{"text-field":["to-string",["get","name"]],"text-size":["interpolate",["linear"],["zoom"],14,14,16,18,17,28],"symbol-placement":"line-center","text-font":["yahei"]},"paint":{"text-color":"#ffffff","text-halo-width":2,"text-halo-blur":1,"text-halo-color":"hsl(42, 0%, 19%)"}},"自贡_高速_polyline":{"id":"自贡_高速_polyline","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"02c50d788beb229dd398469c5e0a8362"},"minzoom":8,"filter":["match",["get","highway"],["motorway_link","motorway"],true,false],"layout":{"line-join":"round","line-cap":"round"},"paint":{"line-color":["step",["zoom"],"hsl(33, 53%, 66%)",13.95,"#c4b573"],"line-width":["interpolate",["exponential",1.5],["zoom"],5,0.75,18,66,19,76,20,100],"line-opacity":["interpolate",["linear"],["zoom"],13.95,0.56,14,1]}},"自贡_省道_polyline copy 1":{"id":"自贡_省道_polyline copy 1","type":"symbol","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"0f3c77b41c9b434241964f8f2967b78a"},"minzoom":12,"filter":["match",["get","highway"],["tertiary","primary","secondary"],true,false],"layout":{"symbol-placement":"line-center","text-field":["to-string",["get","name"]],"text-size":["interpolate",["linear"],["zoom"],14,14,15,16,16,20,17,24,18,28],"text-line-height":1.2,"text-font":["yahei"]},"paint":{"text-color":"hsl(230, 0%, 100%)","text-halo-blur":1,"text-halo-width":2,"text-halo-color":"hsl(56, 0%, 16%)"}},"自贡_省道_polyline copy 2":{"id":"自贡_省道_polyline copy 2","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"0f3c77b41c9b434241964f8f2967b78a"},"minzoom":8,"maxzoom":17,"filter":["match",["get","highway"],["tertiary","primary","secondary"],true,false],"layout":{"line-join":"round","line-cap":"round"},"paint":{"line-color":["step",["zoom"],"hsl(211, 39%, 38%)",13.95,"hsl(211, 29%, 39%)",14,["match",["get","class"],"trunk","hsl(46, 88%, 65%)","hsl(49, 58%, 65%)"]],"line-width":["interpolate",["exponential",1.5],["zoom"],10,2,11,3,17.868,40],"line-opacity":["interpolate",["linear"],["zoom"],13.95,1,14,0.58]}},"自贡_省道_polyline":{"id":"自贡_省道_polyline","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"0f3c77b41c9b434241964f8f2967b78a"},"minzoom":17,"filter":["match",["get","highway"],["tertiary","primary","secondary"],true,false],"layout":{"line-join":"round","line-cap":"round"},"paint":{"line-gap-width":0.75,"line-width":["interpolate",["exponential",1.5],["zoom"],10,2,11,3,18,40,19,50,20,60],"line-opacity":["interpolate",["linear"],["zoom"],10.7,0.1,13,1],"line-pattern":"road-pattern-02"}},"自贡_乡镇村道2_polyline copy 5":{"id":"自贡_乡镇村道2_polyline copy 5","type":"symbol","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"1d8ca3e3d7206ece84a5a048b21e8fc4"},"minzoom":14,"filter":["all",["match",["get","highway"],["road"],true,false],["match",["get","name"],["noname"],false,true]],"layout":{"symbol-placement":"line-center","text-field":["to-string",["get","name"]],"text-size":["interpolate",["linear"],["zoom"],14,12,17,18,20,24],"text-letter-spacing":0.2,"text-font":["yahei"]},"paint":{"text-color":["interpolate",["linear"],["zoom"],14.95,"hsl(147, 0%, 100%)",15,"hsl(147, 0%, 100%)"],"text-halo-color":"#0f1015","text-halo-blur":1,"text-halo-width":1}},"自贡_乡镇村道2_polyline copy 4":{"id":"自贡_乡镇村道2_polyline copy 4","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"1d8ca3e3d7206ece84a5a048b21e8fc4"},"minzoom":11,"maxzoom":17,"filter":["match",["get","highway"],["","road"],true,false],"layout":{"line-join":"round","line-cap":"round"},"paint":{"line-color":["interpolate",["linear"],["zoom"],13.95,"#507395",14,"hsl(182, 47%, 63%)",16.95,"hsl(182, 47%, 63%)",17,"hsl(182, 0%, 27%)"],"line-width":["interpolate",["exponential",1.5],["zoom"],10,0.5,13,2,14,2,16,10,17,18,17.95,100,18,120,19,50,20,60],"line-opacity":["interpolate",["linear"],["zoom"],13.95,0.44,14,1]}},"自贡_乡镇村道2_polyline copy 1":{"id":"自贡_乡镇村道2_polyline copy 1","type":"symbol","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"80402973b045ea47accf1633fdb8e62e"},"minzoom":15,"filter":["all",["match",["get","highway"],["unclassified"],true,false],["match",["get","name"],["noname"],true,false]],"layout":{"text-field":["to-string",["get","name"]],"text-size":["interpolate",["linear"],["zoom"],14,10,17,22],"symbol-placement":"line","text-font":["yahei"]},"paint":{"text-color":"hsl(0, 0%, 100%)","text-halo-color":"#0f1015","text-halo-width":1}},"自贡_乡镇村道2_polyline copy 7":{"id":"自贡_乡镇村道2_polyline copy 7","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"80402973b045ea47accf1633fdb8e62e"},"minzoom":13.95,"filter":["match",["get","highway"],["unclassified"],true,false],"layout":{"line-join":"round","line-cap":"round"},"paint":{"line-color":["interpolate",["linear"],["zoom"],0,"hsl(0, 0%, 62%)",16.95,"hsl(210, 49%, 32%)",17,"hsl(210, 52%, 26%)"],"line-width":["interpolate",["exponential",1.5],["zoom"],12,0.75,13,3,14,1.6,15,4,16,7,17,16,18,36,19,50,20,60],"line-opacity":["interpolate",["linear"],["zoom"],14.1,0.8,16.95,0.68,17,1],"line-gap-width":0}},"自贡_乡镇村道2_polyline copy 2":{"id":"自贡_乡镇村道2_polyline copy 2","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"80402973b045ea47accf1633fdb8e62e"},"minzoom":17,"filter":["match",["get","highway"],["unclassified"],true,false],"layout":{"line-join":"round","line-cap":"round"},"paint":{"line-color":["interpolate",["linear"],["zoom"],0,"hsl(0, 0%, 62%)",16.5,"#113d6a",17.05,"hsl(210, 26%, 49%)"],"line-width":["interpolate",["exponential",1.5],["zoom"],12,0.75,13,3,14,1.6,15,5,16,8,16.95,0,17,26,18,46,19,60,20,70],"line-opacity":["interpolate",["linear"],["zoom"],14,0.31,14.1,1],"line-gap-width":0}},"tietu":{"id":"tietu","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"80402973b045ea47accf1633fdb8e62e"},"minzoom":17,"filter":["match",["get","highway"],["unclassified"],true,false],"layout":{"line-join":"round","line-cap":"round","visibility":"none"},"paint":{"line-color":["interpolate",["linear"],["zoom"],13.95,"hsl(209, 0%, 70%)",14,"hsl(209, 0%, 64%)"],"line-width":["interpolate",["exponential",1.5],["zoom"],17,26,18,36,19,46,20,60],"line-opacity":1,"line-gap-width":0.5,"line-pattern":"road-pattern-02"}},"自贡_乡镇村道2_polyline copy 6":{"id":"自贡_乡镇村道2_polyline copy 6","type":"symbol","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"dc4538485342681565f7211042486e46"},"minzoom":14,"filter":["match",["get","highway"],["footway"],true,false],"layout":{"text-field":["to-string",["get","name"]],"text-size":["interpolate",["linear"],["zoom"],14.6,11,17,16],"symbol-placement":"line","text-font":["yahei"],"visibility":"none"},"paint":{"text-color":"hsl(0, 0%, 100%)","text-halo-color":"#0f1015","text-halo-width":1}},"自贡_其它道路2_polyline copy 3":{"id":"自贡_其它道路2_polyline copy 3","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"dc4538485342681565f7211042486e46"},"minzoom":16,"maxzoom":20,"filter":["match",["get","highway"],["footway"],true,false],"layout":{"line-join":"round","line-cap":"round"},"paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],13,3,14,4,16,5,18,20],"line-color":"hsl(210, 46%, 46%)","line-opacity":["interpolate",["linear"],["zoom"],16.95,1,17,0.83]}},"自贡_其它道路2_polyline copy 2":{"id":"自贡_其它道路2_polyline copy 2","type":"line","source":"siyang","source-layer":"siyang_polyline","metadata":{"mapbox:group":"dc4538485342681565f7211042486e46"},"minzoom":16,"maxzoom":20,"filter":["match",["get","highway"],["footway"],true,false],"layout":{"line-join":"round","line-cap":"round"},"paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],13,3,14,4,16,12,18,28],"line-color":"hsl(198, 58%, 30%)","line-opacity":["interpolate",["linear"],["zoom"],16.95,1,17,0.83]}}}
	    this.init()
    }

    init(){
        let map = this.control.map
        let that = this
        let timer = null
        map._flyTo = map.flyTo

        map.flyTo = function(params){
            if(timer){
                clearInterval(timer)
                timer = null
            }else{
                that.flyToStart(params)
            }
            setTimeout(() => {
                map._flyTo(params)
            }, 0)
            timer = setInterval(() => {
                if(!map.isZooming()){
                    that.flyToEnd(params)
                    clearInterval(timer)
                    timer = null
                }
            }, 16)
        }
    }

    flyToStart(params){
	    if(params.zoom&&params.zoom>=14&&this.control.map.getLayer('mapbox-satellite')){
	    	this.control.map.removeLayer('mapbox-satellite')
	    }
		for(let i in this.layerBox){
		    if(this.control.map.getLayer(i)){
                this.control.map.removeLayer(i)
            }
		}
	    
        console.log('flyTo')
    }
    flyToEnd(params){
	    if(params.zoom&&params.zoom<=14&&!this.control.map.getLayer('mapbox-satellite')){
		    this.control.map.addLayer(this.satellite)
	    }
	    for(let i in this.layerBox){
		    if(!this.control.map.getLayer(i)){
			    this.control.map.addLayer(this.layerBox[i])
		    }
	    }
	    if(params.callback){
	    	params.callback()
	    }
        console.log('flyTo end')
    }
}

export  default flyTo
