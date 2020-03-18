<template>
    <div id="base-map" ref="baseMap">
        <div id="map"></div>
    </div>
</template>

<script>
    import mapboxgl,{Map} from 'mapbox-gl'
	import {style} from './style.js'

    let grid1 = window.grid1
    let grid2 = window.grid2
    let grid3 = window.grid3
    let grid4 = window.grid4
    let grid5 = window.grid5
    let grid6 = window.grid6
    export default {
        name: "BaseMap",
        data(){
            return {
				showLoading: true,
                //map config
                size:[3840,1023],
                token:'pk.eyJ1Ijoid3pqOTI3MTIiLCJhIjoiY2pxNXphMmgyMjl4dzN4c3oxZTczaXFuNCJ9.7iqkAVOCgYhh4vdW-hmz4g',
                map : null,
                center:[101.54749427959842, 25.31077898153245],
	            zoom:8,
                bearing:0,
                pitch:0,
                url:process.env.BASE_URL
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                mapboxgl.accessToken = this.token;
                this.map = new Map({
                    container:this.$refs.baseMap.querySelector('#map'),
                    style:style,
					// style:'mapbox://styles/mapbox/dark-v9',
                    center:this.center,
                    zoom:this.zoom,
                    maxZoom:20,
                    bearing:this.bearing,
                    // minZoom:8,
                    pitch:this.pitch,
                });
                this.$store.commit('initMap',this.map)

                this.map.on('load',() => {
                    // this.drawGrid()
                    // this.test()

                    this.map.on('click', (e)=>{
                        console.log(e);
                        console.log('['+e.lngLat.lng+','+e.lngLat.lat+']');
                        console.log('center:'+e.target.getCenter());
                        console.log('zoom:'+e.target.getZoom());
                        console.log('bearing:'+e.target.getBearing());
                        console.log('pitch:'+e.target.getPitch());
                    })
                })

            },
			drawGrid(){
                this.grid2()
			},
            grid1() {
                this.map.addLayer({
                    id:'grid',
                    type:'fill',
                    source:{
                        type:'geojson',
                        data:{
                            type:'Feature',
                            geometry:{
                                type:'Polygon',
                                coordinates:[grid1]
                            }
                        }
                    },
                    paint:{
                        'fill-color':'red'
                    }
                })
            },
            grid2(){
                const second = grid2.slice(1)
                const grid2Features = second.map(d => {
                    return {
                        type:'Feature',
                        geometry:{
                            type:'Polygon',
                            coordinates:[d]
                        }
                    }
                })

                this.map.addLayer({
                    id:'grid2',
                    type:'fill',
                    source:{
                        type:'geojson',
                        data:{
                            type:'FeatureCollection',
                            features:grid2Features
                        }
                    },
                    paint:{
                        'fill-color':'white'
                    }
                })
                this.map.on('click','grid2',(e) => {

                })
            },
            grid3(){
                const grid3Features = grid3.map(d => {
                    return {
                        type:'Feature',
                        geometry:{
                            type:'Polygon',
                            coordinates:[d]
                        }
                    }
                })

                this.map.addLayer({
                    id:'grid3',
                    type:'fill',
                    source:{
                        type:'geojson',
                        data:{
                            type:'FeatureCollection',
                            features:grid3Features
                        }
                    },
                    paint:{
                        'fill-color':'orange'
                    }
                })
                this.map.on('click','grid3',(e) => {
                    console.log(e);
                })
            },
            test(){

                grid2.forEach((d,i) => {
                    this.map.addLayer({
                        id:'test-'+i,
                        type:'fill',
                        source:{
                            type:'geojson',
                            data:{
                                type:'Feature',
                                geometry:{
                                    type:'Polygon',
                                    coordinates:[d]
                                }
                            }
                        }
                    })
                })
            }
		}
    }
</script>

<style lang="scss">
    @import '../../../../node_modules/mapbox-gl/src/css/mapbox-gl.css';
    #base-map{
        position:absolute;top:0;left:0;width:3840px;height:1023px;
        #map{
            position:absolute;top:0;left:0;width:3840px;height:1022px;
        }
    }
</style>