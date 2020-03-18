import ConvertUtil from './convert.js'
import mapboxgl from 'mapbox-gl'
import * as THREE from 'three'
import XBCameraSync from './threelib/XBCameraSync.js'
import People from './threelib/People.js'

export default class threebox{

    constructor(threeDom,map) {
        this.map = map;
        this.threeDom = threeDom;
        this.size = [3840, 1017];

        this.convert=new ConvertUtil();
        this.scene = new THREE.Scene();
        //这个modelOrigin绝对不能从mapbox的方法中取 zhh
        // this.modelOrigin = [map.getCenter().lng,map.getCenter().lat];
        // this.modelOrigin =  [120.643274, 31.184503];
        this.modelOrigin =  [118.66914190809405,33.727482000827635];

        this.modelAltitude = 0;
        this.modelRotate = [0,0,0];
        this.modelScale = this.convert._projectedUnitsPerMeter( this.modelOrigin[1])/this.convert.XBLLC_WORLD_SIZE;

        this.directionalLight = null;
        this.light_int = 0.8;
        this.lightPos = {x:-80,y:-100,z:80};

        this.clock = new THREE.Clock();
        this.personArr = [];
        this.firstTimeMove = true;
        this.cameraFollow = true;
        this.cameraPosChanged = false;
        this.personMove = false;
        this.buildingsOpacityChanged = false;
        this.cameraOffsetTheta = 0;
        this.pathMeshArr = [];

        this.shadowMaterial = null;

        this.glassDistance1 = 15;
        this.glassDistance2 = 0;
        this.glassMovingLimit = 15;
        this.glassMovingFlag = true;

        this.lastMapZoomStatus = false;
    }

    init(object){
        this.object = object;

        this.initThree();
        this.initMap();

    }

    initThree(){
        this.canvas = this.threeDom;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: this.canvas,
            alpha: true
        });
        this.renderer.castShadow = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize( this.size[0], this.size[1] );

        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();

        let ambientLight = new THREE.AmbientLight(0x666666,1);
        this.scene.add( ambientLight );

        this.createDirectionalLightForShadow();

        let planeGeometry = new THREE.PlaneBufferGeometry( 25000, 60000, 32, 32 );
        this.shadowMaterial = new THREE.ShadowMaterial();
        this.shadowMaterial.transparent = true;
        this.shadowMaterial.opacity = 0.6;
        let plane = new THREE.Mesh( planeGeometry, this.shadowMaterial );
        plane.position.z -= 0.5;
        plane.receiveShadow = true;
        this.scene.add( plane );

    }

    initMap(){
        let that = this;
        let modelTransform = {
            translateX: mapboxgl.MercatorCoordinate.fromLngLat(this.modelOrigin, this.modelAltitude).x,
            translateY: mapboxgl.MercatorCoordinate.fromLngLat(this.modelOrigin, this.modelAltitude).y,
            translateZ: mapboxgl.MercatorCoordinate.fromLngLat(this.modelOrigin, this.modelAltitude).z,
            rotateX: this.modelRotate[0],
            rotateY: this.modelRotate[1],
            rotateZ: this.modelRotate[2],
            scale:this.modelScale
        };
        this.map.addLayer({
            type:'custom',
            id:'3d',
            renderingMode:'3d',
            render(gl,matrix){
                let rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1,0,0),modelTransform.rotateX)
                let rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0,1,0),modelTransform.rotateY)
                let rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0,0,1),modelTransform.rotateZ)

                let m = new THREE.Matrix4().fromArray(matrix)
                let l = new THREE.Matrix4().makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    modelTransform.translateZ).scale(
                    new THREE.Vector3(
                        modelTransform.scale,
                        -modelTransform.scale,
                        modelTransform.scale
                    )
                ).multiply(rotationX)
                    .multiply(rotationY)
                    .multiply(rotationZ);

                let pm = m.multiply(l);
                XBCameraSync.sync(that.camera, that.map, pm);

                that.render();
                that.map.triggerRepaint();
            }
        })
    }

    regPerson(model){
        let person = new People(model);
        person.stepLimit = 0.00004;
        this.scene.add(person.model);
        person.movingLoop = false;

        this.personArr.push(person);
        return person;
    }

    getPerson(){
        let personModel = this.object.models.person;

        this.personArr[0] = this.regPerson(personModel);

        return this.personArr[0];
    }

    trackPeople(track){
        let  personObj = this.getPerson();
        personObj.setPos(
            track[0],track[1]
        );
        personObj.setPosToCurrent(false);
    }

    removeTrack(){
        this.personArr.length = 0;
        this.scene.remove(this.object.models.person);
    }

    createDirectionalLightForShadow(param){

        if (! param) {
            param = this.getShadowLightParam();
        }

        this.directionalLight = new THREE.DirectionalLight(0xffffff,this.light_int);
        this.directionalLight["dis_type"] = param.dis_type;
        this.directionalLight.position.set(this.lightPos.x, this.lightPos.y, this.lightPos.z);
        this.scene.add(this.directionalLight);
        this.scene.add(this.directionalLight.target);

        let cast_shadow = param.castShadow;
        if (!cast_shadow) return;

        let mapCenter = this.map.transform.center;
        let xy = this.convert.getXY([mapCenter.lng, mapCenter.lat], this.modelOrigin);
        this.directionalLight.position.multiplyScalar( param.scale );
        this.directionalLight.position.x += xy.x;
        this.directionalLight.position.y += xy.y;
        this.directionalLight.target.position.set( xy.x,xy.y,0 );

        let d = param.d;
        this.directionalLight.castShadow = cast_shadow;
        let size = param.size;
        this.directionalLight.shadow.mapSize.width = size;
        this.directionalLight.shadow.mapSize.height = size;
        this.directionalLight.shadow.camera.far = param.far;
        this.directionalLight.shadow.camera.near = 0;
        this.directionalLight.shadow.camera.left = - d;
        this.directionalLight.shadow.camera.right = d;
        this.directionalLight.shadow.camera.top = d;
        this.directionalLight.shadow.camera.bottom = - d;

        this.directionalLight.shadow.bias = -0.0002;
        this.directionalLight.name = "XB_DirectionalLight";


        if ( ! this.reUseShadowmap ) {
            let pars = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                anisotropy: 4
            };
            this.reUseShadowmap = new THREE.WebGLRenderTarget( size, size, pars );
        }

        this.directionalLight.shadow.map = this.reUseShadowmap;
        this.directionalLight.shadow.camera.updateProjectionMatrix();

    }

    getShadowLightParam(){
        let zoom = this.map.getZoom();
        let d = 150, far = 1500, scale = 5, size = 8192, dis_type = 0, castShadow = true;
        if (zoom >= 20.5){
            d = 60;
            far = 500;
            scale = 2;
            size = 8192;
            dis_type = 20.5;
        } else if (zoom >= 18.5){
            d = 150;
            far = 1500;
            scale = 5;
            size = 8192;
            dis_type = 18.5;
        } else if (zoom >= 17.5){ //17.5
            d = 300;
            far = 3000;
            scale = 10;
            dis_type = 17.5;
            size = 8192;
        } else if (zoom >= 16.5){ //16.5
            d = 600;
            far = 6000;
            scale = 20;
            dis_type = 16.5;
            size = 8192;
        } else if (zoom >= 15.5){ //15.5
            d = 1200;
            far = 12000;
            scale = 40;
            dis_type = 15.5;
            size = 8192;
        } else if (zoom >= 14.5){ //12.5
            d = 2400;
            far = 24000;
            scale = 80;
            dis_type = 14.5;
            size = 8192;
        } else {
            d = 2400;
            far = 24000;
            scale = 80;
            dis_type = 0;
            size = 8192;
            castShadow = false;
        }
        return {size:size, dis_type:dis_type, d:d, far:far, scale:scale, castShadow:castShadow};
    }

    changeLightShadow_delay(){
        this.scene.remove(this.directionalLight.target);
        this.scene.remove(this.directionalLight);
        this.createDirectionalLightForShadow();
    }

    changeLightShadow(){

        if (!this.directionalLight) return false;
        let param = this.getShadowLightParam();
        if (param.dis_type !== this.directionalLight.dis_type){
            this.directionalLight.dis_type = param.dis_type;
            this.changeLightShadow_delay();
        }else{
            let map_center = this.map.transform.center;
            let xy = this.convert.getXY( [map_center.lng, map_center.lat], this.modelOrigin );
            if (xy.x === this.directionalLight.target.position.x) return false;
            this.directionalLight.target.position.set( xy.x, xy.y, 0 );
            this.directionalLight.position.set( this.lightPos.x, this.lightPos.y, this.lightPos.z );
            this.directionalLight.position.multiplyScalar( param.scale );
            this.directionalLight.position.x += xy.x;
            this.directionalLight.position.y += xy.y;
        }
        return true;
    }

    showWeilanOrNot(flag){
        if(this.object.models.weilanbig){
            this.object.models.weilanbig.visible = !!flag;
        }
    }

    cameraFollowOrNot(flag){
        this.cameraFollow = !!flag;
    }

    personMoveOrNot(flag){
        this.personMove = !!flag;
    }

    getPosNumber(){
        let arr = [];
        if(this.personArr && this.personArr.length){
            this.personArr.forEach(el=>{
                arr.push(el.getTotalPosNumber());
            });
        }
        return arr;
    }

    getCurrentPosNumber(){
        let arr = [];
        if(this.personArr.length){
            this.personArr.forEach(el=>{
                arr.push(el.getObjectCurrentPosNumber());
            });
        }
        return arr;
    }

    setObjectPosition(num){
        if(this.personArr.length){
            this.personArr.forEach(el=>{
                el.setObjPosToSomeWhere(num);
            });
        }
    }

    resetPos(){
        this.personMove = false;
        this.cameraOffsetTheta = 0;
        if(this.personArr.length){
            this.personArr.forEach(el=>{
                el.resetAll();
            });
        }
        if(this.pathMeshArr.length){
            this.pathMeshArr.forEach(el=>{
                this.scene.remove(el);
            });
        }
    }

    changeBuildingsOpacity(num){
        if(this.object.models.buildings_90) this.object.models.buildings_90.material[0].opacity = num;
        if(this.object.models.buildings_90) this.object.models.buildings_90.material[1].opacity = num;
        if(this.object.models.buildings_75) this.object.models.buildings_75.material[0].opacity = num;
        if(this.object.models.buildings_75) this.object.models.buildings_75.material[1].opacity = num;
        if(this.object.models.buildings_30) this.object.models.buildings_30.material[0].opacity = num;
        if(this.object.models.buildings_30) this.object.models.buildings_30.material[1].opacity = num;
        if(this.object.models.buildings_15) this.object.models.buildings_15.material[0].opacity = num;
        if(this.object.models.buildings_15) this.object.models.buildings_15.material[1].opacity = num;
    }

    showWeilan13(flag){
        if(this.object.models.weilan13Inside){
            this.object.models.weilan13Inside.visible = !!flag;
        }
    }

    showWeilan47(flag){
        if(this.object.models.weilan47Inside){
            this.object.models.weilan47Inside.visible = !!flag;
        }
    }

    static getCircle(pos, pos2, radius){
        let posTmp = new THREE.Vector2();
        let originPos = new THREE.Vector2(1,0);
        posTmp.subVectors(pos2,pos);
        let theta = Math.acos(posTmp.dot(originPos)/(originPos.length()*posTmp.length()));
        let shape = new THREE.Shape();
        shape.absarc( pos2.x, pos2.y, radius, theta+Math.PI/2, theta+3*Math.PI/2, true );
        shape.absarc( pos.x, pos.y, radius, 3*Math.PI/2+theta, theta+3*Math.PI/2+Math.PI,true );
        let geo = new THREE.ShapeBufferGeometry(shape);
        let mat = new THREE.MeshBasicMaterial({
            color: 0x880000,
            side: 2
        });
        return new THREE.Mesh(geo, mat);
    }

    cameraLookUp(){
        this.cameraFollow = false;
        let currentArr = this.personArr[0].currentPos;
        let lngLat = this.convert.getLngLat({x:currentArr[0],y:currentArr[1]},this.modelOrigin);
        this.map.easeTo({
            zoom: 15.6,
            center: lngLat,
            pitch: 0,
            bearing: 0,
            easing: t=>{
                return t*(3-t);
            }
        });
    }

    alwaysShowWeilan47(flag){
        this.object.alwaysShow47Inside = flag;
        if(flag){
            this.object.models.weilan47Inside.visible = true;
        }
    }

    render(){

	    if(this.map.isZooming()){
            this.lastMapZoomStatus = false;
	    }else{
	        if(!this.lastMapZoomStatus){
                this.lastMapZoomStatus = true;
                setTimeout(()=>{
                    this.changeLightShadow();
                },1000)
            }
        }

        if(this.personArr.length && this.personMove){
            this.personArr.forEach(el => {
                if(el.destinationPos.length === 0){
                    return;
                }
                // if(el.currentPos && el.currentPos.length && el.destinationPos &&  el.destinationPos.length){
                //     let mesh = threebox.getCircle(
                //         {x:el.currentPos[0],y:el.currentPos[1]},
                //         {x:el.destinationPos[0][0],y:el.destinationPos[0][1]},
                //         8
                //     );
                //     this.pathMeshArr.push(mesh);
                //     this.scene.add(mesh);
                // }
                let currentArr = el.currentPos;
                let lngLat = this.convert.getLngLat({x:currentArr[0],y:currentArr[1]},this.modelOrigin);
                let destinationArr = el.destinationPos;
                let currentVector = new THREE.Vector2(currentArr[0],currentArr[1],0);
                let nextVector = new THREE.Vector2(destinationArr[0][0],destinationArr[0][1],0);
                let theta = 0;
                let vector = new THREE.Vector2(0,-1);
                if(this.firstTimeMove){
                    let thetaTmp = Math.acos(nextVector.dot(vector)/(vector.length()*nextVector.length()))*180/Math.PI;
                    if(nextVector.x<=0){
                        theta = 180+thetaTmp;
                    }else{
                        theta = 180-thetaTmp;
                    }
                    this.firstTimeMove = false;
                }else{
                    let vectorTmp = new THREE.Vector2();
                    vectorTmp.subVectors(nextVector,currentVector);
                    let thetaTmp = Math.acos(vectorTmp.dot(vector)/(vector.length()*vectorTmp.length()))*180/Math.PI;
                    if(vectorTmp.x<=0){
                        theta = 180+thetaTmp;
                    }else{
                        theta = 180-thetaTmp;
                    }
                }
                if(this.cameraFollow){
                    // if(this.cameraOffsetTheta>-60){
                    //     this.cameraOffsetTheta-=0.25;
                    // }
                    this.map.easeTo({
                        zoom: 16.5,
                        // zoom: 17.8,
                        center: lngLat,
                        pitch: 60,
                        bearing: theta?(theta+this.cameraOffsetTheta):0,
                        easing: t=>{
                            return t*(3-t);
                        }
                    });
                    this.cameraPosChanged = false;
                }else{
                    if(!this.cameraPosChanged){
                        this.map.easeTo({
                            zoom: 15.6,
                            center: lngLat,
                            pitch: 0,
                            bearing: theta?theta:0,
                            easing: t=>{
                                return t*(3-t);
                            }
                        });
                        this.cameraPosChanged = true;
                    }
                }
                el.moving();
            });

        }
        if(this.personMove){
            if(!this.buildingsOpacityChanged){
                this.changeBuildingsOpacity(0.3);
                this.shadowMaterial.opacity = 0.1;
                this.buildingsOpacityChanged = true;
            }
        }else{
            if(this.buildingsOpacityChanged){
                this.changeBuildingsOpacity(1);
                this.shadowMaterial.opacity = 0.6;
                this.buildingsOpacityChanged = false;
            }
        }
        if(this.object.models.jingmo1 && this.object.models.jingmo1.visible){
            if(this.object.models.jingmo1_person && this.object.models.jingmo1_person.length){
                this.object.models.jingmo1_person.forEach(el=>{
                    if(!el.personRightMove){
                        if(el.personFirstTimeRotate){
                            el.rotateY(Math.PI);
                            el.personFirstTimeRotate = false;
                        }
                        el.position.x += 0.1;
                        el.personMoveLength -= 0.1;
                        if(el.personMoveLength<0){
                            el.personRightMove = !el.personRightMove;
                        }
                    }else{
                        if(!el.personFirstTimeRotate){
                            el.rotateY(Math.PI);
                            el.personFirstTimeRotate = true;
                        }
                        el.position.x -= 0.1;
                        el.personMoveLength += 0.1;
                        if(el.personMoveLength>el.personMoveLimit){
                            el.personRightMove = !el.personRightMove;
                        }
                    }
                });
            }
            if(this.object.models.jingmo1_tadiao){
                this.object.models.jingmo1_tadiao.rotation.y += 0.01;
            }
            if(this.object.models.jingmo1_cars && this.object.models.jingmo1_cars.length){
                if(!this.object.models.jingmo1_cars[0].getPause()){
                    this.object.models.jingmo1_cars[0].moving();
                }else{
                    if(!this.object.models.jingmo1_cars[1].getPause()){
                        this.object.models.jingmo1_cars[1].moving();
                    }else{
                        this.object.models.jingmo1_cars[0].pause = false;
                        this.object.models.jingmo1_cars[1].pause = false;
                    }
                }
            }
            if(this.object.models.jingmo1_zhaopai){
                this.object.models.jingmo1_zhaopai.offset.x += 0.001;
            }
        }
        if(this.object.models.jingmo2 && this.object.models.jingmo2.visible) {
            if (this.object.models.jingmo2_person && this.object.models.jingmo2_person.length) {
                this.object.models.jingmo2_person.forEach(el => {
                    if (!el.personRightMove) {
                        if (el.personFirstTimeRotate) {
                            el.rotateY(Math.PI);
                            el.personFirstTimeRotate = false;
                        }
                        el.position.x += 2;
                        el.personMoveLength -= 2;
                        if (el.personMoveLength < 0) {
                            el.personRightMove = !el.personRightMove;
                        }
                    } else {
                        if (!el.personFirstTimeRotate) {
                            el.rotateY(Math.PI);
                            el.personFirstTimeRotate = true;
                        }
                        el.position.x -= 2;
                        el.personMoveLength += 2;
                        if (el.personMoveLength > el.personMoveLimit) {
                            el.personRightMove = !el.personRightMove;
                        }
                    }
                });
            }
        }
        if(this.object.models.jingmo3 && this.object.models.jingmo3.visible){
            if(this.object.models.jingmo3_doors && this.object.models.jingmo3_doors.length){
                if(this.glassDistance1<=0){
                    this.glassMovingFlag = false;
                }else if(this.glassDistance1>=this.glassMovingLimit){
                    this.glassMovingFlag = true;
                }
                if(this.glassMovingFlag){
                    this.glassDistance1 -= 0.1;
                    this.object.models.jingmo3_doors[0].position.x -= 0.1;
                    this.glassDistance2 += 0.1;
                    this.object.models.jingmo3_doors[1].position.x += 0.1;
                }else{
                    this.glassDistance1 += 0.1;
                    this.object.models.jingmo3_doors[0].position.x += 0.1;
                    this.glassDistance2 -= 0.1;
                    this.object.models.jingmo3_doors[1].position.x -= 0.1;
                }
            }
            if(this.object.models.jingmo3_buildText){
                this.object.models.jingmo3_buildText.offset.x += 0.0002;
            }
            if(this.object.models.jingmo3_cars && this.object.models.jingmo3_cars.length){
                if(!this.object.models.jingmo3_cars[0].getPause()){
                    this.object.models.jingmo3_cars[0].moving();
                }else{
                    if(!this.object.models.jingmo3_cars[1].getPause()){
                        this.object.models.jingmo3_cars[1].moving();
                    }else{
                        this.object.models.jingmo3_cars[0].pause = false;
                        this.object.models.jingmo3_cars[1].pause = false;
                    }
                }
            }
            if(this.object.models.jingmo3_person && this.object.models.jingmo3_person.length){
                this.object.models.jingmo3_person.forEach(el=>{
                    if(!el.personRightMove){
                        if(el.personFirstTimeRotate){
                            el.rotateY(Math.PI);
                            el.personFirstTimeRotate = false;
                        }
                        el.position.x += 0.1;
                        el.personMoveLength -= 0.1;
                        if(el.personMoveLength<0){
                            el.personRightMove = !el.personRightMove;
                        }
                    }else{
                        if(!el.personFirstTimeRotate){
                            el.rotateY(Math.PI);
                            el.personFirstTimeRotate = true;
                        }
                        el.position.x -= 0.1;
                        el.personMoveLength += 0.1;
                        if(el.personMoveLength>el.personMoveLimit){
                            el.personRightMove = !el.personRightMove;
                        }
                    }
                });
            }
        }
        if(this.object.models.jingmo4 && this.object.models.jingmo4.visible){
            if(this.object.models.jingmo4_cars && this.object.models.jingmo4_cars.length){
                if(!this.object.models.jingmo4_cars[0].getPause()){
                    this.object.models.jingmo4_cars[0].moving();
                }else{
                    if(!this.object.models.jingmo4_cars[1].getPause()){
                        this.object.models.jingmo4_cars[1].moving();
                    }else{
                        this.object.models.jingmo4_cars[0].pause = false;
                        this.object.models.jingmo4_cars[1].pause = false;
                    }
                }
            }
            if(this.object.models.jingmo4_person && this.object.models.jingmo4_person.length){
                this.object.models.jingmo4_person.forEach(el=>{
                    el.moving();
                });
            }
        }

        this.renderer.render(this.scene,this.camera);
    }

    showJingMoOrNot(num,flag){
        switch (num) {
            case 1:
                if(this.object.models.jingmo1) this.object.models.jingmo1.visible = flag;
                break;
            case 2:
                if(this.object.models.jingmo2) this.object.models.jingmo2.visible = flag;
                break;
            case 3:
                if(this.object.models.jingmo3) this.object.models.jingmo3.visible = flag;
                break;
            case 4:
                if(this.object.models.jingmo4) this.object.models.jingmo4.visible = flag;
                break;
            default:
                break;
        }
    }

}