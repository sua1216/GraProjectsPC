
import * as THREE from 'three-full'
import XBMLoader from './threelib/XBMLoader.js'
import MovingObject2 from './threelib/MovingObject2.js'
import Water from './threelib/Water.js'
let publicPath = process.env.BASE_URL;

export default class threeobj{

    constructor(three,vue) {
        this.three = three;
        this.vue = vue;
        this.models = {};
        this.objLoader = new THREE.OBJLoader();
        this.fileLoader = new THREE.FileLoader();
        this.fbxLoader = new THREE.FBXLoader();
        this.textureLoader = new THREE.TextureLoader();
        this.xbmLoader = new XBMLoader().setSplitChildren(false);

        this.isDayTime = false;

        this.dayMatTop = null;
        this.dayMatBottom = null;
        this.nightMatTop = null;
        this.nightMatBottom = null;

        //test
        this.change = true;

        this.showWeilan13 = true;
        this.showWeilan47 = false;
        this.alwaysShow47Inside = false;

        this.loadSum = 0
        this.loadAdd = 0;

        this.initLoad()
    }

    initLoad(){
        let that = this
        that.objLoader._load = that.objLoader.load
        that.objLoader.load = function(){
            that.loadSum ++
            that.objLoader._load(...arguments)
        }
        
        that.fileLoader._load = that.fileLoader.load
        that.fileLoader.load = function(){
            that.loadSum ++
            that.fileLoader._load(...arguments)
        }
        
        that.fbxLoader._load = that.fbxLoader.load
        that.fbxLoader.load = function(){
            that.loadSum ++
            that.fbxLoader._load(...arguments)
        }
        
        that.xbmLoader._load = that.xbmLoader.load
        that.xbmLoader.load = function(){
            that.loadSum ++
            that.xbmLoader._load(...arguments)
        }
    }

    initLoaded(){
        setTimeout(() => {
            this.loadAdd ++
            this.vue.$store.commit('setMapLoading', (this.loadAdd / this.loadSum * 100).toFixed(2))
            // console.log('>> loading: ', this.vue.$store.state.mapLoading + '%')
            // if(this.loadAdd == this.loadSum){
            //     console.log('>> loaded: ', this.loadAdd)
            // }
        }, 0)
    }

    init(){
        
        this.loadBuild();
        this.loadWeilan();
        this.loadJingMo();
        this.loadJingMo2();
        this.loadJingMo3();
        this.loadJingMo4();
        this.loadPerson();
        this.checkMapLevel();

    }

    loadWeilan(){

        this.objLoader.load(`${publicPath}obj/weilan13.obj`,obj=>{

            let mat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side:2,
            });
            let mat2 = new THREE.MeshBasicMaterial({
                color: 0x1B2631,
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name==="top"){
                        el.material = mat
                    }else{
                        el.material = mat2;
                    }
                }
            });
            obj.position.set(-10,-10,0);
            this.models.weilan = obj;
            this.three.scene.add(this.models.weilan);
            
            this.initLoaded()
        });

        this.objLoader.load(`${publicPath}obj/weilan13Inside.obj`,obj=>{

            let mat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side:2,
                depthTest: false,
                depthWrite: false,
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                }
            });
            obj.position.set(-10,-10,0);
            this.models.weilan13Inside = obj;
            this.three.scene.add(this.models.weilan13Inside);

            this.initLoaded()
        });

        this.objLoader.load(`${publicPath}obj/weilan47.obj`,obj=>{
            let mat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side:2,
                depthTest: false,
                depthWrite: false,
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                }
            });
            obj.position.set(-10,-10,0);
            this.models.weilan47Inside = obj;
            this.three.scene.add(this.models.weilan47Inside);

            this.initLoaded()
        });

        this.objLoader.load(`${publicPath}obj/weilanbig.obj`,obj=>{

            let mat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side:2,
            });
            let mat2 = new THREE.MeshBasicMaterial({
                color: 0x1B2631,
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name==="top"){
                        el.material = mat
                    }else{
                        el.material = mat2;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.rotateX(Math.PI);
            obj.scale.setScalar(15);
            obj.position.set(-14700,29500,0);
            this.models.weilanbig = obj;
            this.three.scene.add(this.models.weilanbig);

            this.initLoaded()
        });

    }

    loadBuild() {

        this.dayMatTop = new THREE.MeshLambertMaterial({ //ding
            color: 0xdbe1f4, //day
            shadowSide: 2,
            transparent: true,
        });
        this.dayMatBottom = new THREE.MeshLambertMaterial({
            color: 0x8093a7, //day
            shadowSide: 2,
            vertexColors: THREE.VertexColors,
            transparent: true,
        });
        this.nightMatTop = new THREE.MeshLambertMaterial({ //ding
            color: 0xaecadd,
            shadowSide: 2,
            transparent: true,
        });
        this.nightMatBottom = new THREE.MeshLambertMaterial({
            color: 0x506472,
            shadowSide: 2,
            vertexColors: THREE.VertexColors,
            transparent: true,
        });

        this.xbmLoader.load(`${publicPath}obj/90B.xbm`, geos => {
            console.log(geos);
            let mesh = new THREE.Mesh(geos[0], [this.nightMatTop, this.nightMatBottom]);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.models.buildings_90 = mesh;
            this.three.scene.add(this.models.buildings_90);

            this.initLoaded()
        });

        this.xbmLoader.load(`${publicPath}obj/75B.xbm`, geos => {
            let mesh = new THREE.Mesh(geos[0], [this.nightMatTop, this.nightMatBottom]);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.models.buildings_75 = mesh;
            this.three.scene.add(this.models.buildings_75);
            this.initLoaded()
        });

        this.xbmLoader.load(`${publicPath}obj/30B.xbm`, geos => {
            let mesh = new THREE.Mesh(geos[0], [this.nightMatTop, this.nightMatBottom]);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.models.buildings_30 = mesh;
            this.three.scene.add(this.models.buildings_30);
            this.initLoaded()
        });

        this.xbmLoader.load(`${publicPath}obj/15B.xbm`, geos => {
            let mesh = new THREE.Mesh(geos[0], [this.nightMatTop, this.nightMatBottom]);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.models.buildings_15 = mesh;
            this.three.scene.add(this.models.buildings_15);
            this.initLoaded()
        });

    }

    loadJingMo(){

        let groupForAll = new THREE.Group();
            groupForAll.rotateX(Math.PI/2);
            groupForAll.scale.setScalar(0.3);
            groupForAll.position.x += 939;
            groupForAll.position.y += -553;
            groupForAll.position.z += 0.5;
        let personArr = [];
        let carArr1 = [];
        this.models.jingmo1 = new THREE.LOD();
        for (let i = 0; i < 5; i++) {
            this.models.jingmo1.addLevel(groupForAll, i*5000);
        }
        this.three.scene.add(this.models.jingmo1);
        this.models.jingmo1_person = personArr;
        this.models.jingmo1_cars = carArr1;

        let env = this.textureLoader.load(`${publicPath}obj/jingmo/hdmi.jpg`);
            env.mapping = THREE.EquirectangularReflectionMapping;
            env.magFilter = THREE.LinearFilter;
            env.minFilter = THREE.LinearMipMapLinearFilter;
            env.encoding = THREE.sRGBEncoding;
        let color = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchang01_Base_Color.png`);
        let rough = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchang01_Roughness.png`);
        let metal = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchang01_Metallic.png`);
        let normal = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchang01_Normal.png`);
        let color2 = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchang02_Base_Color.png`);
        let rough2 = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchang02_Roughness.png`);
        let metal2 = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchang02_Metallic.png`);
        let normal2 = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchang02_Normal.png`);
        this.objLoader.load(`${publicPath}obj/jingmo/jingmo1_1.obj`,obj=>{
            let mat = new THREE.MeshStandardMaterial({
                map: color,
                roughnessMap: rough,
                metalnessMap: metal,
                normalMap: normal,
                envMap: env
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.castShadow = true;
                    el.receiveShadow = true;
                    el.material = mat;
                }
            });
            obj.scale.setScalar(0.1);
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/jingmo1_2.obj`,obj=>{
            let mat = new THREE.MeshStandardMaterial({
                map: color2,
                roughnessMap: rough2,
                metalnessMap: metal2,
                normalMap: normal2,
                envMap: env
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    // el.castShadow = true;
                    // el.receiveShadow = true;
                    el.material = mat;
                }
            });
            obj.scale.setScalar(0.1);
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/zhongyangshangchanglvdi.obj`,obj=>{
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/zhongyangshangchanglvdi_Base_Color.png`);
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = new THREE.MeshLambertMaterial({
                        map: texture
                    });
                }
            });
            obj.scale.setScalar(0.1);
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/zhongyangshangchangzhaopai.obj`,obj=>{
            let zhaopai = this.textureLoader.load(`${publicPath}obj/jingmo/zhaopai.png`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            this.models.jingmo1_zhaopai = zhaopai;
            let mat = new THREE.MeshLambertMaterial({
                map: zhaopai
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                }
            });
            obj.scale.setScalar(0.1);
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/zhongyangshangchangdimian.obj`,obj=>{
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/dimian.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            let mat = new THREE.MeshLambertMaterial({
                map: texture
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                    el.receiveShadow = true;
                }
            });
            obj.position.y -= 1;
            obj.scale.setScalar(0.1);
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/tree0821.obj`,obj=>{
            let mat = new THREE.MeshLambertMaterial({
                color: 0xaaaaaa
            });
            let mat2 = new THREE.MeshLambertMaterial({
                color: 0x00CC33
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name === "trees_lo-poly"){ //top
                        el.material = mat2;
                    }else{
                        el.material = mat;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(0.004);
            obj.position.x += 200;

            let arr = [
                {"x":-180,"y":0,"z":-230}, {"x":-190,"y":0,"z":-190}, {"x":-190,"y":0,"z":-150}, {"x":-210,"y":0,"z":-110}, {"x":-210,"y":0,"z":-70},
                {"x":-230,"y":0,"z":-10},{"x":-230,"y":0,"z":30},{"x":-230,"y":0,"z":70},{"x":-250,"y":0,"z":110},{"x":-260,"y":0,"z":150},{"x":-270,"y":0,"z":210},{"x":-270,"y":0,"z":270},{"x":-210,"y":0,"z":310},{"x":-190,"y":0,"z":350},{"x":-170,"y":0,"z":390},{"x":-130,"y":0,"z":450},{"x":-140,"y":0,"z":-290},{"x":-30,"y":0,"z":-350},
                {"x":450,"y":0,"z":-270},{"x":390,"y":0,"z":-230},{"x":330,"y":0,"z":-170},{"x":290,"y":0,"z":-90},{"x":270,"y":0,"z":10},{"x":250,"y":0,"z":110},{"x":210,"y":0,"z":90},{"x":150,"y":0,"z":110},{"x":130,"y":0,"z":70},{"x":150,"y":0,"z":-30},{"x":150,"y":0,"z":-150},{"x":110,"y":0,"z":-190},{"x":70,"y":0,"z":-250},{"x":30,"y":0,"z":-310}
            ];
            let arrForDeploy = [];
            let group = new THREE.Group();
            for (let i = 0; i < arr.length; i++) {
                let objTmp = obj.clone();
                objTmp.position.set(arr[i].x,arr[i].y,arr[i].z);
                // if(i!==5){
                //     console.log(objTmp.position.x);
                arrForDeploy.push(objTmp);
                // }
            }
            arrForDeploy.forEach(el=>{
                group.add(el);
            });
            groupForAll.add(group);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/person.obj`, obj=>{
            // mixer = new THREE.AnimationMixer(obj);
            // mixer.clipAction(obj.animations[0]).play();
            let mat = new THREE.MeshLambertMaterial({
                color: 0x000000
            });
            let mat2 = new THREE.MeshLambertMaterial({
                color: 0xCDCDCD
            });
            obj.scale.setScalar(300);
            obj.rotateY(Math.PI/2+Math.PI);
            obj.traverse(el => {
                if(el.type === "Mesh") {
                    el.material = mat.clone();
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.position.set(200,0,0);
            obj["personRightMove"] = false;
            obj["personFirstTimeRotate"] = true;
            obj["personMoveLength"] = 25;
            obj["personMoveLimit"] = 25;
            groupForAll.add(obj);
            personArr.push(obj);
            //
            let obj2 = obj.clone();
            obj2.traverse(el => {
                if(el.type === "Mesh") {
                    el.material = mat2.clone();
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj2.position.set(220,0,20);
            obj2["personRightMove"] = false;
            obj2["personFirstTimeRotate"] = true;
            obj2["personMoveLength"] = 10;
            obj2["personMoveLimit"] = 10;
            groupForAll.add(obj2);
            personArr.push(obj2);
            //
            let obj3 = obj.clone();
            obj3.position.set(-115,0,-300);
            obj3["personRightMove"] = false;
            obj3["personFirstTimeRotate"] = true;
            obj3["personMoveLength"] = 10;
            obj3["personMoveLimit"] = 10;
            groupForAll.add(obj3);
            personArr.push(obj3);
            let obj4 = obj2.clone();
            obj4.position.set(-120,0,-310);
            obj4["personRightMove"] = false;
            obj4["personFirstTimeRotate"] = true;
            obj4["personMoveLength"] = 20;
            obj4["personMoveLimit"] = 20;
            groupForAll.add(obj4);
            personArr.push(obj4);
            //
            let obj5 = obj.clone();
            obj5.position.set(-208,0,-12);
            obj5["personRightMove"] = false;
            obj5["personFirstTimeRotate"] = true;
            obj5["personMoveLength"] = 10;
            obj5["personMoveLimit"] = 10;
            groupForAll.add(obj5);
            personArr.push(obj5);
            let obj6 = obj2.clone();
            obj6.position.set(-218,0,-15);
            obj6["personRightMove"] = false;
            obj6["personFirstTimeRotate"] = true;
            obj6["personMoveLength"] = 20;
            obj6["personMoveLimit"] = 20;
            groupForAll.add(obj6);
            personArr.push(obj6);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/bandeng.obj`, obj=>{
            let mat = new THREE.MeshLambertMaterial({
                color: 0xF4D03F
            });
            let mat2 = new THREE.MeshLambertMaterial({
                color: 0xeeeeee
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name === "top"){
                        el.material = mat;
                    }else{
                        el.material = mat2;
                    }
                }
            });
            obj.scale.setScalar(2);

            let arrForDeploy = [];
            let group = new THREE.Group();

            let arr = [{"x":435,"y":0,"z":-265},{"x":405,"y":0,"z":-245},{"x":365,"y":0,"z":-205},{"x":345,"y":0,"z":-185}];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.rotateY(3*Math.PI/4-5*Math.PI/180);
                objTmp.position.set(el.x,el.y,el.z);
                arrForDeploy.push(objTmp);
            });

            let arr2 = [{"x":305,"y":0,"z":-125},{"x":285,"y":0,"z":-65},{"x":275,"y":0,"z":-25},{"x":255,"y":0,"z":55},{"x":250,"y":0,"z":90}];
            arr2.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.rotateY(-12*Math.PI/180);
                objTmp.position.set(el.x,el.y,el.z);
                arrForDeploy.push(objTmp);
            });

            let arr3 = [{"x":135,"y":0,"z":-165},{"x":105,"y":0,"z":-215},{"x":65,"y":0,"z":-275},{"x":155,"y":0,"z":-125},{"x":15,"y":0,"z":-325}];
            arr3.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.rotateY(32*Math.PI/180);
                objTmp.position.set(el.x,el.y,el.z);
                arrForDeploy.push(objTmp);
            });
            arrForDeploy.forEach(el=>{
                group.add(el);
            });
            groupForAll.add(group);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/ludeng.obj`,obj=>{
            let mat = new THREE.MeshLambertMaterial({
                color: 0x273746
            });
            let mat2 = new THREE.MeshLambertMaterial({
                color: 0xF4D03F
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name === "ludeng"){
                        el.material = mat
                    }else{
                        el.material = mat2
                    }
                }
            });
            obj.scale.setScalar(0.0025);

            let arrForDeploy = [];
            let group = new THREE.Group();

            let arr = [{"x":375,"y":0,"z":-225},{"x":465,"y":0,"z":-285},{"x":315,"y":0,"z":-155},{"x":285,"y":0,"z":-35}];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                arrForDeploy.push(objTmp);
            });

            let arr2 = [{"x":265,"y":0,"z":65},{"x":135,"y":0,"z":45},{"x":155,"y":0,"z":-55},{"x":115,"y":0,"z":-175},{"x":85,"y":0,"z":-235},{"x":45,"y":0,"z":-295}];
            arr2.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                arrForDeploy.push(objTmp);
            });

            arrForDeploy.forEach(el=>{
                group.add(el);
            });
            groupForAll.add(group);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/tingchechang.obj`, obj=>{

            let group = new THREE.Group();

            let mat = new THREE.MeshLambertMaterial({
                color: 0x444444
            });
            let mat2 = new THREE.MeshLambertMaterial({
                color: 0x222222
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name === "ccc"){
                        el.material = mat;
                    }else{
                        el.material = mat2;
                    }
                }
            });
            obj.scale.setScalar(15);
            obj.rotateY(-Math.PI/2);
            obj.position.set(170,0,-30);
            group.add(obj);

            let objTmp = obj.clone();
            objTmp.rotateY(Math.PI);
            objTmp.position.set(250,0,-30);
            group.add(objTmp);

            groupForAll.add(group);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/car1.obj`, obj=>{
            let group = new THREE.Group();
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car1.jpg`);
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = new THREE.MeshLambertMaterial({
                        map: texture
                    });
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.rotateY(Math.PI/2);
            obj.scale.setScalar(0.025);
            obj.position.set(240,-0.15,-28);
            group.add(obj);
            //
            let objTmp = obj.clone();
            objTmp.rotateY(Math.PI);
            objTmp.position.set(180,-0.15,-3);
            group.add(objTmp);
            //
            groupForAll.add(group);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/car2.obj`, obj=>{
            let group = new THREE.Group();
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car2.jpg`);
            let mat = new THREE.MeshLambertMaterial({
                map: texture
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.rotateY(Math.PI/2);
            obj.scale.setScalar(0.025);
            obj.position.set(240,-0.15,4);
            group.add(obj);
            //
            let objTmp = obj.clone();
            objTmp.rotateY(Math.PI);
            objTmp.position.set(180,-0.15,-41);
            group.add(objTmp);
            //
            groupForAll.add(group);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/car3.obj`, obj=>{

            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car3.jpg`);
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material =  new THREE.MeshLambertMaterial({
                        map: texture
                    });
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.up = new THREE.Vector3(0,0,1);
            obj.rotateX(Math.PI/2);
            obj.scale.setScalar(0.025*0.3);
            obj.position.set(0,0,-300);
            this.three.scene.add(obj);
            //
            let car = new MovingObject2(obj);
            car.movingLoop = true;
            car.stepLimit = 1;

            car.setPos(
                [939,-439],
                [
                    [972,-469],[988,-498],[1000,-516],[1001,-553],[994,-554],[993,-554]
                ]
            );
            car.setPosToCurrent();
            carArr1.push(car);
            //
            let obj2 = obj.clone();
            this.three.scene.add(obj2);
            let car2 = new MovingObject2(obj2);
            car2.movingLoop = true;
            car2.stepLimit = 1;
            car2.setPos(
                [1007,-435],
                [
                    [1044,-440],[1068,-450],[1059,-469],[1028,-500],[1018,-519],[1003,-535],[1008,-536],[1011,-536]
                ]
            );
            car2.setPosToCurrent();
            carArr1.push(car2);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/gongdibottom.obj`, obj=> {
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/gongdi.png`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            let mat = new THREE.MeshLambertMaterial({
                color: 0xffffff,
                map: texture
            });
            obj.traverse(el => {
                if (el.isMesh) {
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(70);
            obj.rotateY(-Math.PI/2);
            obj.position.set(233,0,-251);
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/gongditadiao.obj`, obj=>{
            let mat = new THREE.MeshStandardMaterial({
                color: 0xffff00,
                metalness: 0.5,
                roughness: 0.2,
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name === "zhuanpan"){
                        this.models.jingmo1_tadiao = el;
                    }
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(80);
            obj.position.set(235,0,-146);
            groupForAll.add(obj);

            this.initLoaded()
        });

    }

    loadJingMo2(){

        let groupForAll = new THREE.Group();
        groupForAll.rotateX(Math.PI/2);
        groupForAll.rotateY(-Math.PI/20);
        groupForAll.scale.setScalar(0.04);
        groupForAll.position.x += 3812;
        groupForAll.position.y += -1280;
        groupForAll.position.z += 1;
        let personArr = [];
        this.models.jingmo2 = new THREE.LOD();
        for (let i = 0; i < 5; i++) {
            this.models.jingmo2.addLevel(groupForAll, i*5000);
        }
        this.three.scene.add(this.models.jingmo2);
        this.models.jingmo2_person = personArr;

        let waAo = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_roof_01_AO_1k.jpg`,el=>{
            el.wrapS = el.wrapT = THREE.RepeatWrapping;
        });
        let waBump = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_roof_01_bump_1k.jpg`,el=>{
            el.wrapS = el.wrapT = THREE.RepeatWrapping;
        });
        let waColor = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_roof_01_diff_1k.jpg`,el=>{
            el.wrapS = el.wrapT = THREE.RepeatWrapping;
        });
        let waNor = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_roof_01_nor_1k.jpg`,el=>{
            el.wrapS = el.wrapT = THREE.RepeatWrapping;
        });
        let waRough = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_roof_01_rough_1k.jpg`,el=>{
            el.wrapS = el.wrapT = THREE.RepeatWrapping;
        });

        let stAo = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_plaster_02_AO_1k.jpg`);
        let stBump = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_plaster_02_bump_1k.jpg`);
        let stNor = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_plaster_02_nor_1k.jpg`);
        let stRough = this.textureLoader.load(`${publicPath}obj/jingmo2/grey_plaster_02_rough_1k.jpg`);

        this.objLoader.load(`${publicPath}obj/jingmo2/jingmo2_2.obj`,obj=>{
            let mat = new THREE.MeshStandardMaterial({
                transparent: true,
                opacity: 0.9,
                color: 0xaaaaaa,
                side: 2,
                depthWrite: true
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                }
            });
            obj.position.set(0,0,0);
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo2/jingmo2_1.obj`,obj=>{
            let dimian = this.textureLoader.load(`${publicPath}obj/jingmo2/dimian.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            let grass = this.textureLoader.load(`${publicPath}obj/jingmo2/caodi.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            grass.repeat.set(2,2);
            let grass2 = this.textureLoader.load(`${publicPath}obj/jingmo2/caodi.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            grass2.needsUpdate = true;
            grass2.repeat.set(0.6,1.37);
            let ding = this.textureLoader.load(`${publicPath}obj/jingmo2/ding.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            let dingMat = new THREE.MeshLambertMaterial({
                map: ding
            });
            let qiangColor = this.textureLoader.load(`${publicPath}obj/jingmo2/XB_dimian.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            qiangColor.repeat.set(0.2,0.2);
            let qiangNor = this.textureLoader.load(`${publicPath}obj/jingmo2/XB_dimian_normal.png`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            qiangNor.repeat.set(0.2,0.2);
            let shitou = new THREE.MeshStandardMaterial({
                color: 0xdddddd,
                aoMap: stAo,
                bumpMap: stBump,
                normal: stNor,
                roughnessMap: stRough,
                metalness: 0.1,
                roughness: 0.9
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    switch (el.name) {
                        case "jingmo2_1":
                            el.material = new THREE.MeshStandardMaterial({
                                map: qiangColor,
                                normalMap: qiangNor,
                                side: 2,
                                metalness: 0.1,
                                roughness: 0.9,
                            });
                            break;
                        case "powuding":
                            el.material = new THREE.MeshStandardMaterial({
                                aoMap: waAo,
                                bumpMap: waBump,
                                map: waColor,
                                normal: waNor,
                                roughnessMap: waRough,
                                metalness: 0.1,
                                roughness: 0.9
                            });
                            break;
                        case "pingwuding":
                            el.material = dingMat;
                            break;
                        case "dimian":
                            el.material = new THREE.MeshLambertMaterial({
                                map: dimian
                            });
                            el.position.y += 20;
                            break;
                        case "shitou":
                            el.material = shitou;
                            break;
                        case "word":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0xff0000
                            });
                            break;
                        case "aaa":
                            el.material = shitou;
                            break;
                        case "bbb":
                            el.material = shitou;
                            break;
                        case "boli":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0xaaaaaa,
                                transparent: true,
                                opacity: 0.7
                            });
                            break;
                        default:
                            break;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            groupForAll.add(obj);

            this.initLoaded()
        });

        this.objLoader.load(`${publicPath}obj/jingmo3/tree001.obj`,obj=> {
            let text1 = this.textureLoader.load(`${publicPath}obj/jingmo3/yezi.png`, el => {
                el.warpS = el.warpT = THREE.RepeatWrapping;
            });
            let text2 = this.textureLoader.load(`${publicPath}obj/jingmo3/shugan.jpg`, el => {
                el.warpS = el.warpT = THREE.RepeatWrapping;
            });
            text2.repeat.set(0.2, 0.2);
            let mat = new THREE.MeshPhongMaterial({
                transparent: true,
                map: text1,
            });
            let mat2 = new THREE.MeshLambertMaterial({
                map: text2
            });
            obj.traverse(el => {
                if (el.isMesh) {
                    if (el.name === "yezi") {
                        el.material = mat;
                    } else {
                        el.material = mat2;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(4000);
            let arr = [
                {"x":-2450,"y":0,"z":-2090},{"x":-2430,"y":0,"z":-1870},{"x":-2470,"y":0,"z":-1670},{"x":-2450,"y":0,"z":-1410},{"x":-2430,"y":0,"z":-1170},{"x":-2450,"y":0,"z":-950},{"x":-2450,"y":0,"z":-750},{"x":-2450,"y":0,"z":-530},{"x":-2470,"y":0,"z":850},{"x":-2470,"y":0,"z":1030},{"x":-2450,"y":0,"z":1210},{"x":-2490,"y":0,"z":1390},{"x":-2450,"y":0,"z":1570},{"x":-2470,"y":0,"z":1830},{"x":-2450,"y":0,"z":2150},{"x":-2430,"y":0,"z":2450},
                {"x":-470,"y":0,"z":-250},{"x":670,"y":0,"z":-170},{"x":-50,"y":0,"z":2530},{"x":-310,"y":0,"z":2930},{"x":1790,"y":0,"z":2370},{"x":1610,"y":0,"z":1230},{"x":1950,"y":0,"z":1090},{"x":1570,"y":0,"z":-290},{"x":1830,"y":0,"z":-50},{"x":2170,"y":0,"z":-650},{"x":2150,"y":0,"z":-1990},{"x":650,"y":0,"z":-2770},{"x":-610,"y":0,"z":-2730},{"x":-550,"y":0,"z":1050},{"x":-1830,"y":0,"z":2830},{"x":-1730,"y":0,"z":-2610},{"x":1950,"y":0,"z":2710},{"x":1950,"y":0,"z":-2710}
            ];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });

            this.initLoaded()
        });

        this.objLoader.load(`${publicPath}obj/jingmo2/roofClimbPlant.obj`,obj=>{
            let mat = new THREE.MeshLambertMaterial({
                color: 0x009933
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.castShadow = true;
                    el.receiveShadow = true;
                    el.material = mat;
                }
            });
            obj.rotateY(Math.PI/2);
            obj.scale.setScalar(6);
            let arr = [
                {x:-430,y:500,z:57-500},{x:-800,y:500,z:57-500},
                {x:800,y:500,z:57-500},{x:1200,y:500,z:57-500},
                {x:400,y:530,z:1550+300},{x:-900,y:530,z:1500+300}
            ];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });
            let obj2 = obj.clone();
            obj2.rotateY(-Math.PI);
            let arr2 = [
                {x:-700,y:530,z:920+300},{x:-1200,y:530,z:920+300},
                {x:800,y:530,z:970+300}
            ];
            arr2.forEach(el=>{
                let objTmp = obj2.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });
            let obj3 = obj.clone();
            obj3.rotateY(-Math.PI/2);
            let arr3 = [
                {x:415,y:530,z:1396},{x:1460,y:930,z:-1400},{x:-1690,y:930,z:-1410}
            ];
            arr3.forEach(el=>{
                let objTmp = obj3.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });

            this.initLoaded()
        });

        this.objLoader.load(`${publicPath}obj/jingmo3/plant01.obj`, obj=> {
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo3/plant01.png`);
            let mat = new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true,
                color: 0x00ff00,
            });
            obj.traverse(el => {
                if (el.isMesh) {
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(50);
            for (let i = 0; i < 16; i++) {
                let objTmp = obj.clone();
                objTmp.position.set(-2500+Math.random()*60,20,-2100+i*110+Math.random()*50);
                groupForAll.add(objTmp);
            }
            for (let i = 0; i < 16; i++) {
                let objTmp = obj.clone();
                objTmp.position.set(-2600+Math.random()*60,20,-2100+i*110+Math.random()*50);
                groupForAll.add(objTmp);
            }
            for (let i = 0; i < 16; i++) {
                let objTmp = obj.clone();
                objTmp.position.set(-2500+Math.random()*60,20,800+i*110+Math.random()*50);
                groupForAll.add(objTmp);
            }
            for (let i = 0; i < 16; i++) {
                let objTmp = obj.clone();
                objTmp.position.set(-2600+Math.random()*60,20,800+i*110+Math.random()*50);
                groupForAll.add(objTmp);
            }

            this.initLoaded()
        });

        this.objLoader.load(`${publicPath}obj/jingmo/person.obj`, obj=>{
            let mat = new THREE.MeshLambertMaterial({
                color: 0x000000
            });
            obj.scale.setScalar(5000);
            obj.rotateY(Math.PI/2+Math.PI);
            obj.traverse(el => {
                if(el.type === "Mesh") {
                    el.material = mat.clone();
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.position.set(900,0,800);
            obj["personRightMove"] = false;
            obj["personFirstTimeRotate"] = true;
            obj["personMoveLength"] = 250;
            obj["personMoveLimit"] = 250;
            groupForAll.add(obj);
            personArr.push(obj);
            //
            let obj2 = obj.clone();
            obj2.traverse(el => {
                if(el.type === "Mesh") {
                    el.material = mat.clone();
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj2.position.set(700,0,500);
            obj2["personRightMove"] = false;
            obj2["personFirstTimeRotate"] = true;
            obj2["personMoveLength"] = 200;
            obj2["personMoveLimit"] = 200;
            groupForAll.add(obj2);
            personArr.push(obj2);

            let obj3 = obj.clone();
            obj3.position.set(-500,0,100);
            obj3["personRightMove"] = false;
            obj3["personFirstTimeRotate"] = true;
            obj3["personMoveLength"] = 200;
            obj3["personMoveLimit"] = 200;
            groupForAll.add(obj3);
            personArr.push(obj3);
            let obj4 = obj2.clone();
            obj4.position.set(-800,0,500);
            obj4["personRightMove"] = false;
            obj4["personFirstTimeRotate"] = true;
            obj4["personMoveLength"] = 400;
            obj4["personMoveLimit"] = 400;
            groupForAll.add(obj4);
            personArr.push(obj4);
            //
            let obj5 = obj.clone();
            obj5.position.set(-2400,0,50);
            obj5["personRightMove"] = false;
            obj5["personFirstTimeRotate"] = true;
            obj5["personMoveLength"] = 200;
            obj5["personMoveLimit"] = 200;
            groupForAll.add(obj5);
            personArr.push(obj5);
            let obj6 = obj2.clone();
            obj6.position.set(-2400,0,400);
            obj6["personRightMove"] = false;
            obj6["personFirstTimeRotate"] = true;
            obj6["personMoveLength"] = 400;
            obj6["personMoveLimit"] = 400;
            groupForAll.add(obj6);
            personArr.push(obj6);

            this.initLoaded()
        });
    }

    loadJingMo3(){

        let groupForAll = new THREE.Group();
        groupForAll.rotateX(Math.PI/2);
        groupForAll.rotateY(-19*Math.PI/180);
        groupForAll.scale.setScalar(0.9);
        groupForAll.position.x += 2248;
        groupForAll.position.y += -2694;
        groupForAll.position.z += 0.5;
        let personArr = [];
        let carArr3 = [];
        let glassDoorArr = [];
        this.models.jingmo3 = new THREE.LOD();
        for (let i = 0; i < 5; i++) {
            this.models.jingmo3.addLevel(groupForAll, i*5000);
        }
        this.three.scene.add(this.models.jingmo3);
        this.models.jingmo3_doors = glassDoorArr;
        this.models.jingmo3_person = personArr;
        this.models.jingmo3_cars = carArr3;
        this.models.jingmo3_buildText = null;
        //`${publicPath}obj/
        let color = this.textureLoader.load(`${publicPath}obj/jingmo3/09 - Default_Base_Color.jpg`);
        let metal = this.textureLoader.load(`${publicPath}obj/jingmo3/09 - Default_Metallic.jpg`);
        let ao = this.textureLoader.load(`${publicPath}obj/jingmo3/09 - Default_Mixed_AO.jpg`);
        let normal = this.textureLoader.load(`${publicPath}obj/jingmo3/09 - Default_Normal_OpenGL.jpg`);
        let alpha = this.textureLoader.load(`${publicPath}obj/jingmo3/09 - Default_Opacity.jpg`);
        let rough = this.textureLoader.load(`${publicPath}obj/jingmo3/09 - Default_Roughness.jpg`);
        let roof = this.textureLoader.load(`${publicPath}obj/jingmo3/roof.jpg`,el=>{
            el.wrapS = el.wrapT = THREE.RepeatWrapping;
        });
            roof.repeat.set(15,15);
        this.objLoader.load(`${publicPath}obj/jingmo3/jingmo3_1.obj`,obj=>{

            obj.traverse(el=>{
                if(el.isMesh){
                    switch (el.name) {
                        case "aaa":
                            el.material = new THREE.MeshBasicMaterial({
                                map: color,
                                metalnessMap: metal,
                                aoMap: ao,
                                normalMap: normal,
                                alphaMap: alpha,
                                roughnessMap: rough
                            });
                            break;
                        case "bbb1":
                            el.material = new THREE.MeshLambertMaterial({
                                transparent: true,
                                opacity: 0.8,
                                color: 0x3498DB
                            });
                            glassDoorArr.push(el);
                            break;
                        case "bbb2":
                            el.material = new THREE.MeshLambertMaterial({
                                transparent: true,
                                opacity: 0.8,
                                color: 0x3498DB
                            });
                            glassDoorArr.push(el);
                            break;
                        case "ccc":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0x7F8C8D
                                // map: roof
                            });
                            break;
                        default:
                            break;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo3/jingmo3_2.obj`,obj=>{

            let yun = this.textureLoader.load(`${publicPath}obj/jingmo3/yun.png`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            yun.repeat.set(0.5,0.5);
            this.models.jingmo3_buildText = yun;
            let dimian = this.textureLoader.load(`${publicPath}obj/jingmo3/dimian.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            dimian.repeat.set(2,2);
            let grass = this.textureLoader.load(`${publicPath}obj/jingmo3/caodi.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            grass.repeat.set(2,2);
            let weiqiangColor = this.textureLoader.load(`${publicPath}obj/jingmo3/TilesLedgerTaupeSmooth001_COL_1K.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            weiqiangColor.repeat.set(2,4);
            let weiqiangNor = this.textureLoader.load(`${publicPath}obj/jingmo3/TilesLedgerTaupeSmooth001_NRM_1K.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            weiqiangNor.repeat.set(2,4);
            let glass = new THREE.MeshLambertMaterial({
                color: 0x2874A6,
                transparent: true,
                opacity: 0.9
            });
            let dimian2 = this.textureLoader.load(`${publicPath}obj/jingmo3/dimian2.jpeg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            dimian2.repeat.set(10,15);
            let wood = this.textureLoader.load(`${publicPath}obj/jingmo3/wood.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            wood.repeat.set(20,20);
            let wallRough = this.textureLoader.load(`${publicPath}obj/jingmo3/whiteRough.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            wallRough.repeat.set(4.0,1.8);
            let sideWall = this.textureLoader.load(`${publicPath}obj/jingmo3/sideWall.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            sideWall.repeat.set(10,10);

            obj.traverse(el=>{
                if(el.isMesh){
                    switch (el.name) {
                        case "aaa":
                            el.material = new THREE.MeshPhongMaterial({
                                map: yun
                            });
                            break;
                        case "bbb":
                            el.material = glass;
                            break;
                        case "ccc":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0x7F8C8D
                            });
                            break;
                        case "aa":
                            el.material = new THREE.MeshLambertMaterial({
                                transparent: true,
                                opacity: 0.8,
                                color: 0x3498DB
                            });
                            break;
                        case "bb":
                            el.material = new THREE.MeshLambertMaterial({
                                map: weiqiangColor,
                                normalMap: weiqiangNor,
                            });
                            break;
                        case "cc":
                            el.material = new THREE.MeshLambertMaterial({
                                map: wallRough
                            });
                            break;
                        case "dd":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0x7F8C8D
                            });
                            break;
                        case "ee":
                            el.material = glass;
                            break;
                        case "ff":
                            el.material = new THREE.MeshLambertMaterial({
                                map: dimian2
                            });
                            break;
                        case "gg":
                            el.material = new THREE.MeshLambertMaterial({
                                map: grass
                            });
                            break;
                        case "hh":
                            el.material = new THREE.MeshLambertMaterial({
                                map: dimian
                            });
                            break;
                        case "ii":
                            el.material = new THREE.MeshStandardMaterial({
                                map: wood,
                                metalness: 0.3,
                                roughness: 0.7,
                            });
                            break;
                        case "jj":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0xaaaaaa
                            });
                            break;
                        case "jj2":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0xffffff
                            });
                            break;
                        case "kk":
                            el.material = new THREE.MeshLambertMaterial({
                                side: 2,
                                map: sideWall
                            });
                            break;
                        case "ll":
                            el.material = new THREE.MeshLambertMaterial({
                                map: grass
                            });
                            break;
                        case "mm":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0x000000
                            });
                            break;
                        default:
                            break;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo3/tree001.obj`,obj=>{
            let text1 = this.textureLoader.load(`${publicPath}obj/jingmo3/yezi.png`,el=>{
                el.warpS = el.warpT = THREE.RepeatWrapping;
            });
            let text2 = this.textureLoader.load(`${publicPath}obj/jingmo3/shugan.jpg`,el=>{
                el.warpS = el.warpT = THREE.RepeatWrapping;
            });
            text2.repeat.set(0.2,0.2);
            let mat = new THREE.MeshPhongMaterial({
                transparent: true,
                map: text1,
            });
            let mat2 = new THREE.MeshLambertMaterial({
                map: text2
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name === "yezi"){
                        el.material = mat;
                    }else{
                        el.material = mat2;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(100);
            let arr = [
                {"x":-37.5,"y":0.5,"z":82.5},{"x":-67.5,"y":0.5,"z":82.5},{"x":-87.5,"y":0.5,"z":82.5},{"x":-102.5,"y":0.5,"z":82.5},{"x":-127.5,"y":0.5,"z":72.5},{"x":-147.5,"y":0.5,"z":47.5},
                {"x":32.5,"y":0.5,"z":82.5},{"x":52.5,"y":0.5,"z":82.5},{"x":67.5,"y":0.5,"z":82.5},{"x":82.5,"y":0.5,"z":82.5},{"x":97.5,"y":0.5,"z":82.5},{"x":112.5,"y":0.5,"z":77.5},{"x":127.5,"y":0.5,"z":67.5},{"x":137.5,"y":0.5,"z":52.5},{"x":142.5,"y":0.5,"z":32.5},
                {"x":142.5,"y":0.5,"z":7.5},{"x":142.5,"y":0.5,"z":-12.5},{"x":127.5,"y":0.5,"z":-47.5},{"x":112.5,"y":0.5,"z":-67.5},{"x":97.5,"y":0.5,"z":-82.5},{"x":72.5,"y":0.5,"z":-97.5},
                {"x":-152.5,"y":0.5,"z":22.5},{"x":-152.5,"y":0.5,"z":-7.5},{"x":-137.5,"y":0.5,"z":-42.5},{"x":-122.5,"y":0.5,"z":-62.5},{"x":-107.5,"y":0.5,"z":-77.5},{"x":-87.5,"y":0.5,"z":-92.5},{"x":-72.5,"y":0.5,"z":-102.5},
                {"x":-72.5,"y":0.5,"z":27.5},{"x":-82.5,"y":0.5,"z":22.5},{"x":-87.5,"y":0.5,"z":2.5},{"x":-77.5,"y":0.5,"z":-22.5},{"x":-77.5,"y":0.5,"z":2.5},{"x":-62.5,"y":0.5,"z":-2.5},{"x":-67.5,"y":0.5,"z":-22.5},{"x":-52.5,"y":0.5,"z":-37.5},{"x":-47.5,"y":0.5,"z":-22.5},{"x":-32.5,"y":0.5,"z":-47.5},{"x":-32.5,"y":0.5,"z":-32.5}
            ];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo3/plant01.obj`, obj=>{
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo3/plant01.png`);
            let mat = new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true,
                metalness: 0.1
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(2);
            obj.position.set(-38,0,83);
            let arr = [
                {"x":-77.5,"y":2.5,"z":39.5},{"x":-72.5,"y":2.5,"z":39.5},{"x":-67.5,"y":2.5,"z":39.5},{"x":-62.5,"y":2.5,"z":39.5},{"x":-57.5,"y":2.5,"z":39.5},{"x":-52.5,"y":2.5,"z":39.5},{"x":-47.5,"y":2.5,"z":39.5},{"x":-42.5,"y":2.5,"z":39.5},{"x":-37.5,"y":2.5,"z":39.5},{"x":-32.5,"y":2.5,"z":39.5},{"x":-27.5,"y":2.5,"z":39.5},{"x":-22.5,"y":2.5,"z":39.5},
                {"x":-77.5,"y":2.5,"z":72.5},{"x":-72.5,"y":2.5,"z":72.5},{"x":-67.5,"y":2.5,"z":72.5},{"x":-62.5,"y":2.5,"z":72.5},{"x":-57.5,"y":2.5,"z":72.5},{"x":-52.5,"y":2.5,"z":72.5},{"x":-47.5,"y":2.5,"z":72.5},{"x":-42.5,"y":2.5,"z":72.5},{"x":-37.5,"y":2.5,"z":72.5},{"x":-32.5,"y":2.5,"z":72.5},{"x":-27.5,"y":2.5,"z":72.5},{"x":-22.5,"y":2.5,"z":72.5},
                {"x":22.5,"y":2.5,"z":39.5},{"x":27.5,"y":2.5,"z":39.5},{"x":32.5,"y":2.5,"z":39.5},{"x":37.5,"y":2.5,"z":39.5},{"x":42.5,"y":2.5,"z":39.5},{"x":47.5,"y":2.5,"z":39.5},{"x":52.5,"y":2.5,"z":39.5},{"x":57.5,"y":2.5,"z":39.5},{"x":62.5,"y":2.5,"z":39.5},{"x":67.5,"y":2.5,"z":39.5},{"x":72.5,"y":2.5,"z":39.5},{"x":77.5,"y":2.5,"z":39.5},
                {"x":22.5,"y":2.5,"z":72.5},{"x":27.5,"y":2.5,"z":72.5},{"x":32.5,"y":2.5,"z":72.5},{"x":37.5,"y":2.5,"z":72.5},{"x":42.5,"y":2.5,"z":72.5},{"x":47.5,"y":2.5,"z":72.5},{"x":52.5,"y":2.5,"z":72.5},{"x":57.5,"y":2.5,"z":72.5},{"x":62.5,"y":2.5,"z":72.5},{"x":67.5,"y":2.5,"z":72.5},{"x":72.5,"y":2.5,"z":72.5},{"x":77.5,"y":2.5,"z":72.5}
            ];

            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo3/san.obj`,obj=>{
            obj.traverse(el=>{
                if(el.isMesh){
                    switch (el.name) {
                        case "san":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0xffffff,
                                side: 2
                            });
                            break;
                        case "ganzi":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0x515A5A
                            });
                            break;
                        case "Line385":
                            el.material = new THREE.MeshLambertMaterial({
                                color: 0xCDCDCD
                            });
                            break;
                        default:
                            break;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(0.003);
            let arr = [
                {"x":102.5,"y":0.3,"z":-2.5},{"x":72.5,"y":0.3,"z":-32.5},{"x":52.5,"y":0.3,"z":-47.5},{"x":32.5,"y":0.3,"z":-52.5}
            ];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });

            this.initLoaded()
        });
        let texture = this.textureLoader.load(`${publicPath}obj/jingmo3/pool-water.jpg`,el=>{
            el.warpS = el.warpT = THREE.RepeatWrapping;
        });
        texture.repeat.set(1,1);
        let planeGeometry = new THREE.PlaneBufferGeometry( 50, 50 );
        let planeMaterial = new THREE.MeshLambertMaterial( {
            map: texture
        } );
        let plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.rotateX(-Math.PI/2);
        plane.position.set(76,-1,0);
        plane.receiveShadow = true;
        groupForAll.add(plane);
        let waterGeometry = new THREE.PlaneBufferGeometry( 50, 50 );
        let water = new Water( waterGeometry, {
            color: 0xffffff,
            scale: 4,
            flowDirection: new THREE.Vector2( 5, 5 ),
            textureWidth: 1024,
            textureHeight: 1024
        } );
        water.rotateX(-Math.PI/2);
        water.position.set(76, 0,0);
        groupForAll.add(water);
        let chuangge = this.textureLoader.load(`${publicPath}obj/jingmo3/window.png`,el=>{
            el.warpT = el.warpS = THREE.RepeatWrapping;
        });
        let geo = new THREE.BoxBufferGeometry(30.5,100,30.5);
        let mat = new THREE.MeshBasicMaterial({
            map: chuangge,
            transparent: true,
            side: 2
        });
        let box = new THREE.Mesh(geo,mat);
        box.position.set(-115,50,39.7);
        groupForAll.add(box);
        let boxTmp = box.clone();
        boxTmp.position.set(108,50,39.7);
        groupForAll.add(boxTmp);

        this.objLoader.load(`${publicPath}obj/jingmo/car1.obj`, obj=>{
            let group = new THREE.Group();
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car1.jpg`);
            let mat = new THREE.MeshLambertMaterial({
                map: texture
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.rotateY(Math.PI);
            obj.scale.setScalar(0.018);
            obj.position.set(-66.7,0.2,48.4);
            group.add(obj);
            //
            let objTmp = obj.clone();
            objTmp.rotateY(Math.PI);
            objTmp.position.set(34.4,0.2,62.7);
            group.add(objTmp);
            //
            groupForAll.add(group);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/car2.obj`, obj=>{
            let group = new THREE.Group();
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car2.jpg`);
            let mat = new THREE.MeshLambertMaterial({
                map: texture
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.rotateY(Math.PI);
            obj.scale.setScalar(0.018);
            obj.position.set(-34.4,0.2,48.2);
            group.add(obj);
            //
            let objTmp = obj.clone();
            objTmp.rotateY(Math.PI);
            objTmp.position.set(-56.8,0.2,63.1);
            group.add(objTmp);
            //
            let objTmp2 = obj.clone();
            objTmp2.position.set(64.5,0.2,48.2);
            group.add(objTmp2);
            //
            groupForAll.add(group);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/car3.obj`, obj=>{

            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car3.jpg`);
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material =  new THREE.MeshLambertMaterial({
                        map: texture
                    });
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.up = new THREE.Vector3(0,0,1);
            obj.rotateX(Math.PI/2);
            obj.scale.setScalar(0.025*0.5);
            obj.position.set(0,0,-300);
            this.three.scene.add(obj);
            //
            let car = new MovingObject2(obj);
            car.movingLoop = true;
            car.stepLimit = 1;

            car.setPos(
                [2083,-2726],
                [
                    [2118,-2735],[2186,-2759],[2209,-2762],[2224,-2754],[2222,-2741],[2212,-2734],[2206,-2734],[2204,-2739]
                ]
            );
            car.setPosToCurrent();
            carArr3.push(car);
            //
            let obj2 = obj.clone();
            this.three.scene.add(obj2);
            let car2 = new MovingObject2(obj2);
            car2.movingLoop = false;
            car2.stepLimit = 1;
            car2.setPos(
                [2384,-2794],
                [
                    [2385,-2818],[2378,-2824],[2363,-2821],[2292,-2795],[2239,-2777],[2227,-2761],[2227,-2746],[2239,-2741],[2258,-2748],[2269,-2749],[2270,-2746]
                ]
            );
            car2.setPosToCurrent();
            carArr3.push(car2);

            this.initLoaded()
        });

        this.objLoader.load(`${publicPath}obj/jingmo/person.obj`, obj=>{
            let mat = new THREE.MeshLambertMaterial({
                color: 0x000000
            });
            let mat2 = new THREE.MeshLambertMaterial({
                color: 0xCDCDCD
            });
            obj.scale.setScalar(200);
            obj.rotateY(Math.PI/2+Math.PI);
            obj.traverse(el => {
                if(el.type === "Mesh") {
                    el.material = mat.clone();
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.position.set(-1,0,28);
            obj["personRightMove"] = false;
            obj["personFirstTimeRotate"] = true;
            obj["personMoveLength"] = 25;
            obj["personMoveLimit"] = 25;
            groupForAll.add(obj);
            personArr.push(obj);
            //
            let obj2 = obj.clone();
            obj2.traverse(el => {
                if(el.type === "Mesh") {
                    el.material = mat2.clone();
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj2.position.set(5,0,34);
            obj2["personRightMove"] = false;
            obj2["personFirstTimeRotate"] = true;
            obj2["personMoveLength"] = 10;
            obj2["personMoveLimit"] = 10;
            groupForAll.add(obj2);
            personArr.push(obj2);

            let obj3 = obj.clone();
            obj3.position.set(45,0,-35);
            obj3["personRightMove"] = false;
            obj3["personFirstTimeRotate"] = true;
            obj3["personMoveLength"] = 10;
            obj3["personMoveLimit"] = 10;
            groupForAll.add(obj3);
            personArr.push(obj3);
            let obj4 = obj2.clone();
            obj4.position.set(49,0,32);
            obj4["personRightMove"] = false;
            obj4["personFirstTimeRotate"] = true;
            obj4["personMoveLength"] = 20;
            obj4["personMoveLimit"] = 20;
            groupForAll.add(obj4);
            personArr.push(obj4);
            //
            let obj5 = obj.clone();
            obj5.position.set(-95,0,50);
            obj5["personRightMove"] = false;
            obj5["personFirstTimeRotate"] = true;
            obj5["personMoveLength"] = 10;
            obj5["personMoveLimit"] = 10;
            groupForAll.add(obj5);
            personArr.push(obj5);
            let obj6 = obj2.clone();
            obj6.position.set(-90,0,45);
            obj6["personRightMove"] = false;
            obj6["personFirstTimeRotate"] = true;
            obj6["personMoveLength"] = 20;
            obj6["personMoveLimit"] = 20;
            groupForAll.add(obj6);
            personArr.push(obj6);

            this.initLoaded()
        });
    }

    loadJingMo4(){
        let groupForAll = new THREE.Group();
        groupForAll.rotateX(Math.PI/2);
        groupForAll.rotateY(-3*Math.PI/180);
        groupForAll.scale.setScalar(0.013);
        groupForAll.position.x += 2688;
        groupForAll.position.y += -404;
        groupForAll.position.z += 0.5;
        let personArr = [];
        let carArr4 = [];
        this.models.jingmo4 = new THREE.LOD();
        for (let i = 0; i < 5; i++) {
            this.models.jingmo4.addLevel(groupForAll, i*5000);
        }
        this.three.scene.add(this.models.jingmo4);
        this.models.jingmo4_person = personArr;
        this.models.jingmo4_cars = carArr4;
        let env = this.textureLoader.load(`${publicPath}obj/jingmo/hdmi.jpg`);
        env.mapping = THREE.EquirectangularReflectionMapping;
        env.magFilter = THREE.LinearFilter;
        env.minFilter = THREE.LinearMipMapLinearFilter;
        env.encoding = THREE.sRGBEncoding;
        this.objLoader.load(`${publicPath}obj/jingmo4/xianzhengfu.obj`,obj=>{

            let color = this.textureLoader.load(`${publicPath}obj/jingmo4/xianzhengfu- Default_Base_Color.png`);
            let metal = this.textureLoader.load(`${publicPath}obj/jingmo4/xianzhengfu- Default_Metallic.png`);
            let nor = this.textureLoader.load(`${publicPath}obj/jingmo4/xianzhengfu- Default_Normal_.png`);
            let rough = this.textureLoader.load(`${publicPath}obj/jingmo4/xianzhengfu- Default_Roughness.png`);
            let mat = new THREE.MeshStandardMaterial({
                map: color,
                metalnessMap: metal,
                normalMap: nor,
                roughnessMap: rough,
                envMap: env
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.castShadow = true;
                    el.receiveShadow = true;
                    el.material = mat;
                }
            });
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo4/zhengfudixing.obj`,obj=>{
            let caodi = this.textureLoader.load(`${publicPath}obj/jingmo4/XB_caodi1.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            let dimian = this.textureLoader.load(`${publicPath}obj/jingmo4/XB_dimian.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            dimian.repeat.set(0.5,0.5);
            let dimian2 = this.textureLoader.load(`${publicPath}obj/jingmo4/marble_01_diff_1k.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            let dimian3 = this.textureLoader.load(`${publicPath}obj/jingmo4/grey_plaster_02_rough_1k.jpg`,el=>{
                el.wrapS = el.wrapT = THREE.RepeatWrapping;
            });
            dimian3.repeat.set(0.1,0.1);
            obj.traverse(el=>{
                if(el.isMesh){
                    switch (el.name) {
                        case "dimian":
                            el.material = new THREE.MeshLambertMaterial({
                                map: dimian
                            });
                            break;
                        case "caodi":
                            el.material = new THREE.MeshLambertMaterial({
                                map: caodi
                            });
                            break;
                        case "qitai":
                            el.material = new THREE.MeshLambertMaterial({
                                map: dimian3
                            });
                            break;
                        case "dadao":
                            el.material = new THREE.MeshLambertMaterial({
                                map: dimian2
                            });
                            break;
                        default:
                            break;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo4/xianzhengfuailou.obj`,obj=>{
            let color = this.textureLoader.load(`${publicPath}obj/jingmo4/xianzhengfuailou_Base_Color.png`);
            let metal = this.textureLoader.load(`${publicPath}obj/jingmo4/xianzhengfuailou_Metallic.png`);
            let nor = this.textureLoader.load(`${publicPath}obj/jingmo4/xianzhengfuailou_Normal.png`);
            let rough = this.textureLoader.load(`${publicPath}obj/jingmo4/xianzhengfuailou_Roughness.png`);

            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = new THREE.MeshStandardMaterial({
                        map: color,
                        metalnessMap: metal,
                        normalMap: nor,
                        roughnessMap: rough,
                        envMap: env
                    });
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/car1.obj`, obj=>{
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car1.jpg`);
            let mat = new THREE.MeshLambertMaterial({
                map: texture
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.rotateY(Math.PI);
            obj.scale.setScalar(1);
            obj.position.set(5000,0,5000);
            let arr = [{"x":5525,"y":0,"z":4625},{"x":4375,"y":0,"z":4575},{"x":2875,"y":0,"z":4575},{"x":2275,"y":0,"z":4575},{"x":-2125,"y":0,"z":4375},{"x":-2775,"y":0,"z":4375},{"x":-3425,"y":0,"z":4325},{"x":-4125,"y":0,"z":4275},{"x":-4925,"y":0,"z":4225}];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/car2.obj`, obj=>{
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car2.jpg`);
            let mat = new THREE.MeshLambertMaterial({
                map: texture
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.rotateY(Math.PI);
            obj.scale.setScalar(1);
            let arr = [{"x":5175,"y":0,"z":4575},{"x":3875,"y":0,"z":4575},{"x":-4525,"y":0,"z":4225},{"x":-3725,"y":0,"z":4275},{"x":-5275,"y":0,"z":4175},{"x":3325,"y":0,"z":4575}];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });
            let arr2 = [{"x":5750,"y":0,"z":2050},{"x":5750,"y":0,"z":3050}];
            arr2.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.rotateY(-Math.PI/2);
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/car3.obj`, obj=>{
            let texture = this.textureLoader.load(`${publicPath}obj/jingmo/car3.jpg`);
            let mat = new THREE.MeshLambertMaterial({
                map: texture
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    el.material = mat;
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.up = new THREE.Vector3(0,0,1);
            obj.rotateX(Math.PI/2);
            obj.rotateY(-Math.PI);
            obj.scale.setScalar(0.01);
            obj.position.set(0,0,0);
            this.three.scene.add(obj);

            let car = new MovingObject2(obj);
            car.movingLoop = true;
            car.stepLimit = 1;
            car.yPos = -0.2;
            car.setPos(
                [2663,-554],
            [
                    [2668,-429],[2643,-434],[2648,-449],[2653,-454],[2653,-458]
                ]
            );
            car.setPosToCurrent();
            carArr4.push(car);

            let obj2 = obj.clone();
            obj2.position.set(0,0,-300);
            this.three.scene.add(obj2);
            let car2 = new MovingObject2(obj2);
            car2.movingLoop = true;
            car2.stepLimit = 1;
            car2.yPos = -0.2;
            car2.setPos(
                [2698,-554],
                [
                    [2703,-469],[2713,-454],[2743,-439],[2758,-439],[2762,-439]
                ]
            );
            car2.setPosToCurrent();
            carArr4.push(car2);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo3/tree001.obj`,obj=>{
            let text1 = this.textureLoader.load(`${publicPath}obj/jingmo3/yezi.png`,el=>{
                el.warpS = el.warpT = THREE.RepeatWrapping;
            });
            let text2 = this.textureLoader.load(`${publicPath}obj/jingmo3/shugan.jpg`,el=>{
                el.warpS = el.warpT = THREE.RepeatWrapping;
            });
            text2.repeat.set(0.2,0.2);
            let mat = new THREE.MeshPhongMaterial({
                transparent: true,
                map: text1,
                color: 0x333333
            });
            let mat2 = new THREE.MeshLambertMaterial({
                map: text2
            });
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name === "yezi"){
                        el.material = mat;
                    }else{
                        el.material = mat2;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(7000);
            let arr = [
                {"x":2050,"y":0,"z":5250},{"x":2450,"y":0,"z":5250},{"x":2250,"y":0,"z":5750},{"x":2150,"y":0,"z":6250},{"x":2850,"y":0,"z":5250},{"x":2650,"y":0,"z":6250},{"x":2150,"y":0,"z":7250},
                {"x":3150,"y":0,"z":5850},{"x":3650,"y":0,"z":5350},{"x":2650,"y":0,"z":6950},{"x":3250,"y":0,"z":6550},{"x":3550,"y":0,"z":5850},{"x":2950,"y":0,"z":7850},{"x":2350,"y":0,"z":8650},
                {"x":2150,"y":0,"z":9550},{"x":3750,"y":0,"z":6850},{"x":4550,"y":0,"z":5750},{"x":4250,"y":0,"z":5550},{"x":3650,"y":0,"z":9650},{"x":4650,"y":0,"z":6750},{"x":2450,"y":0,"z":10950},
                {"x":3150,"y":0,"z":10950},{"x":4250,"y":0,"z":10950},{"x":3750,"y":0,"z":10850},{"x":4450,"y":0,"z":11050},{"x":5350,"y":0,"z":10950},{"x":6450,"y":0,"z":11150},{"x":6050,"y":0,"z":10750},
                {"x":6650,"y":0,"z":9350},{"x":6150,"y":0,"z":8950},{"x":5550,"y":0,"z":9050},{"x":5050,"y":0,"z":9650},{"x":6550,"y":0,"z":6650},{"x":5950,"y":0,"z":6650},{"x":4950,"y":0,"z":8550},{"x":6750,"y":0,"z":3650},{"x":6650,"y":0,"z":2450},{"x":6550,"y":0,"z":1350},
                {"x":6150,"y":0,"z":10250},{"x":6650,"y":0,"z":4050},{"x":6650,"y":0,"z":5150},{"x":6650,"y":0,"z":5850},{"x":6450,"y":0,"z":9850},{"x":2950,"y":0,"z":9850},{"x":3950,"y":0,"z":9950},
                {"x":-6150,"y":0,"z":1250},{"x":-6150,"y":0,"z":2150},{"x":-6050,"y":0,"z":3350},{"x":-5950,"y":0,"z":4150},{"x":-1750,"y":0,"z":5250},{"x":-2550,"y":0,"z":5150},{"x":-4750,"y":0,"z":5050},
                {"x":-3850,"y":0,"z":5150},{"x":-3150,"y":0,"z":5250},{"x":-2250,"y":0,"z":5650},{"x":-4150,"y":0,"z":5550},{"x":-3650,"y":0,"z":5850},{"x":-2950,"y":0,"z":5750},{"x":-1850,"y":0,"z":6450},
                {"x":-2550,"y":0,"z":6150},{"x":-1950,"y":0,"z":6950},{"x":-5450,"y":0,"z":5050},{"x":-2850,"y":0,"z":6850},{"x":-4750,"y":0,"z":5550},{"x":-6150,"y":0,"z":10850},{"x":-5350,"y":0,"z":11050},
                {"x":-4550,"y":0,"z":10950},{"x":-5950,"y":0,"z":9850},{"x":-5350,"y":0,"z":10050},{"x":-3850,"y":0,"z":10450},{"x":-3750,"y":0,"z":10850},{"x":-4750,"y":0,"z":9750},{"x":-5850,"y":0,"z":8450},
                {"x":-5750,"y":0,"z":8850},{"x":-3050,"y":0,"z":10850},{"x":-1950,"y":0,"z":10950},{"x":-2650,"y":0,"z":10150},{"x":-3850,"y":0,"z":9450},{"x":-5250,"y":0,"z":8550},{"x":-4550,"y":0,"z":8150}, {"x":-6250,"y":0,"z":4450},
                {"x":7750,"y":0,"z":1350},{"x":8350,"y":0,"z":1350},{"x":8150,"y":0,"z":1750},{"x":7950,"y":0,"z":2050},{"x":8950,"y":0,"z":1050},{"x":8650,"y":0,"z":1450},{"x":8150,"y":0,"z":2350},{"x":7750,"y":0,"z":2750},
                {"x":7950,"y":0,"z":4350},{"x":8950,"y":0,"z":3950},{"x":8650,"y":0,"z":4050},{"x":8050,"y":0,"z":4950},{"x":7750,"y":0,"z":4950},{"x":8450,"y":0,"z":4550},{"x":9650,"y":0,"z":3750},{"x":9350,"y":0,"z":4250},
                {"x":10050,"y":0,"z":4650},{"x":10450,"y":0,"z":3550},{"x":8750,"y":0,"z":4350},{"x":9150,"y":0,"z":4650},{"x":9550,"y":0,"z":1050},{"x":9150,"y":0,"z":1350},{"x":10250,"y":0,"z":1250},{"x":9150,"y":0,"z":1650},
                {"x":8650,"y":0,"z":5150},{"x":8150,"y":0,"z":5550},{"x":7950,"y":0,"z":6650},{"x":7650,"y":0,"z":5450},{"x":7650,"y":0,"z":7550},{"x":7650,"y":0,"z":8250},{"x":8350,"y":0,"z":7350},{"x":8550,"y":0,"z":5850},
                {"x":9350,"y":0,"z":5550},{"x":8350,"y":0,"z":6250},{"x":8850,"y":0,"z":6450},{"x":10950,"y":0,"z":11450},{"x":10350,"y":0,"z":11350},{"x":9550,"y":0,"z":11150},{"x":8550,"y":0,"z":11150},{"x":9250,"y":0,"z":11350},
                {"x":9250,"y":0,"z":10550},{"x":9850,"y":0,"z":10450},{"x":8850,"y":0,"z":11450},{"x":10850,"y":0,"z":10750},{"x":10550,"y":0,"z":10550},{"x":10750,"y":0,"z":9750},{"x":11050,"y":0,"z":9950},{"x":11250,"y":0,"z":9150},
                {"x":11250,"y":0,"z":8150},{"x":10250,"y":0,"z":9750},{"x":10750,"y":0,"z":8450},{"x":10450,"y":0,"z":8650},{"x":8050,"y":0,"z":11350},{"x":7550,"y":0,"z":11250},{"x":7750,"y":0,"z":10450},{"x":11150,"y":0,"z":6950},
                {"x":11050,"y":0,"z":5650},{"x":10550,"y":0,"z":6950},{"x":10350,"y":0,"z":7550},{"x":9550,"y":0,"z":9450},{"x":9850,"y":0,"z":8250},{"x":9250,"y":0,"z":9650},{"x":11050,"y":0,"z":3150},
                {"x":-11050,"y":0,"z":10950},{"x":-10650,"y":0,"z":10950},{"x":-10650,"y":0,"z":10350},{"x":-10350,"y":0,"z":10850},{"x":-10150,"y":0,"z":10950},{"x":-10150,"y":0,"z":10550},{"x":-9750,"y":0,"z":10750},
                {"x":-9950,"y":0,"z":10950},{"x":-9050,"y":0,"z":11050},{"x":-9550,"y":0,"z":10450},{"x":-11050,"y":0,"z":9450},{"x":-11250,"y":0,"z":9850},{"x":-7450,"y":0,"z":11050},{"x":-7150,"y":0,"z":10150},{"x":-7750,"y":0,"z":10850},
                {"x":-8250,"y":0,"z":11150},{"x":-8750,"y":0,"z":10150},{"x":-10350,"y":0,"z":9850},{"x":-8750,"y":0,"z":10350},{"x":-7950,"y":0,"z":9950},{"x":-10850,"y":0,"z":750},{"x":-10450,"y":0,"z":850},{"x":-9950,"y":0,"z":1450},
                {"x":-10250,"y":0,"z":2250},{"x":-10650,"y":0,"z":2150},{"x":-10750,"y":0,"z":3550},{"x":-10350,"y":0,"z":2750},{"x":-9350,"y":0,"z":2450},{"x":-9050,"y":0,"z":950},{"x":-8450,"y":0,"z":1550},{"x":-8550,"y":0,"z":2050},
                {"x":-7550,"y":0,"z":1150},{"x":-8750,"y":0,"z":2550},{"x":-10050,"y":0,"z":3550},{"x":-10850,"y":0,"z":4150},{"x":-9150,"y":0,"z":3250},{"x":-7850,"y":0,"z":2350},{"x":-8350,"y":0,"z":5250},{"x":-10750,"y":0,"z":6050},{"x":-8550,"y":0,"z":5950},{"x":-9950,"y":0,"z":6050},{"x":-8950,"y":0,"z":5850},{"x":-9650,"y":0,"z":6550},{"x":-10450,"y":0,"z":7150},{"x":-8650,"y":0,"z":7350},{"x":-8050,"y":0,"z":7250},{"x":-7750,"y":0,"z":6650},{"x":-7350,"y":0,"z":7650},{"x":-7350,"y":0,"z":8050},{"x":-7350,"y":0,"z":8350},{"x":-8150,"y":0,"z":7950},{"x":-9350,"y":0,"z":7250},{"x":-9650,"y":0,"z":6850},{"x":-10250,"y":0,"z":6550},{"x":-9650,"y":0,"z":5950},{"x":-9050,"y":0,"z":6050},{"x":-7650,"y":0,"z":8550},{"x":-10350,"y":0,"z":7450},{"x":-10450,"y":0,"z":7950},{"x":-10550,"y":0,"z":8650},{"x":-10450,"y":0,"z":9150},{"x":-7450,"y":0,"z":8850},{"x":-7250,"y":0,"z":8050},{"x":-7350,"y":0,"z":2150},{"x":-7250,"y":0,"z":3550},{"x":-7150,"y":0,"z":4050},{"x":-7350,"y":0,"z":5650},{"x":-7350,"y":0,"z":6450},{"x":-7450,"y":0,"z":10350},{"x":-7450,"y":0,"z":10650},
                {"x":-650,"y":0,"z":10950},{"x":650,"y":0,"z":11050},{"x":-550,"y":0,"z":8950},{"x":550,"y":0,"z":8950},{"x":-550,"y":0,"z":7250},{"x":650,"y":0,"z":7150},{"x":-550,"y":0,"z":5250},{"x":650,"y":0,"z":5150},
                {"x":-6550,"y":0,"z":-850},{"x":-6450,"y":0,"z":-2750},{"x":-6350,"y":0,"z":-4450},{"x":-7450,"y":0,"z":-4750},{"x":-8650,"y":0,"z":-4950},{"x":-10450,"y":0,"z":-4850},{"x":10650,"y":0,"z":-4550},
                {"x":9650,"y":0,"z":-4550},{"x":8550,"y":0,"z":-4650},{"x":7650,"y":0,"z":-4650},{"x":6750,"y":0,"z":-4550},{"x":6550,"y":0,"z":-3250},{"x":6650,"y":0,"z":-1550},{"x":6550,"y":0,"z":-2050}
            ];
            arr.forEach(el=>{
                let objTmp = obj.clone();
                objTmp.position.set(el.x,el.y,el.z);
                groupForAll.add(objTmp);
            });

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo4/qi.obj`,obj=>{
            obj.traverse(el=>{
                if(el.isMesh){
                    if(el.name === "aaa"){
                        el.material = new THREE.MeshStandardMaterial({
                            color: 0xCDCDCD,
                        });
                    }else{
                        el.material = new THREE.MeshStandardMaterial({
                            color: 0xff0000,
                            side: 2
                        });
                    }

                }
            });
            obj.scale.setScalar(8);
            obj.position.set(10,0,4250);
            groupForAll.add(obj);

            this.initLoaded()
        });
        this.objLoader.load(`${publicPath}obj/jingmo/person.obj`, obj=> {
            let mat = new THREE.MeshLambertMaterial({
                color: 0x000000
            });
            obj.up = new THREE.Vector3(0,0,1);
            obj.scale.setScalar(180);
            obj.rotateX(Math.PI/2);
            obj.rotateY(Math.PI / 2 + Math.PI);
            obj.traverse(el => {
                if (el.type === "Mesh") {
                    el.material = mat.clone();
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            this.three.scene.add(obj);
            let person =  new MovingObject2(obj);
            person.checkPause = false;
            person.stepLimit = 0.25;
            person.movingLoop = true;
            person.setPos(
                [2763,-379],
                [[2758,-419],[2743,-429],[2708,-429],[2693,-419]]
            );
            person.setPosToCurrent();
            personArr.push(person);

            let obj2 = obj.clone();
            this.three.scene.add(obj2);
            let person2 =  new MovingObject2(obj2);
            person2.checkPause = false;
            person2.stepLimit = 0.25;
            person2.movingLoop = true;
            person2.setPos(
                [2628,-429],
                [[2763,-429]]
            );
            person2.setPosToCurrent();
            personArr.push(person2);

            this.initLoaded()
        });

        //test
        let geo = new THREE.BoxBufferGeometry(2,2,2);
        let mat = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });
        let box = new THREE.Mesh(geo,mat);
        box.position.set(2663,-554,0);
        this.getKeyboard(box);
        this.three.scene.add(box);
    }

    loadPerson(){

        //可用
        // this.fbxLoader.load(`${publicPath}obj/person/person.FBX`, fbx => {
        //     fbx.scale.setScalar(20);
        //     fbx.up = new THREE.Vector3(0,0,1);
        //     fbx.traverse(el => {
        //         if(el.type === "Mesh") {
        //             el.castShadow = true;
        //             el.receiveShadow = true;
        //         }
        //     });
        //     this.models.person = fbx;
        // });

        //motuozhifa
        this.objLoader.load(`${publicPath}obj/person/motuozhifa.obj`,obj=>{
            let texture = this.textureLoader.load(`${publicPath}obj/person/zhifarenyuan.png`);
            let texture2 = this.textureLoader.load(`${publicPath}obj/person/cheshen.png`);
            let texture3 = this.textureLoader.load(`${publicPath}obj/person/chelun.png`);
            obj.traverse(el=>{
                if(el.isMesh){
                    switch (el.name) {
                        case "zhifarenyuan":
                            el.material = new THREE.MeshLambertMaterial({
                                map: texture
                            });
                            break;
                        case "chenshen":
                            el.material = new THREE.MeshLambertMaterial({
                                map: texture2
                            });
                            break;
                        case "luntai":
                            el.material = new THREE.MeshLambertMaterial({
                                map: texture3
                            });
                            break;
                        default:
                            break;
                    }
                    el.castShadow = true;
                    el.receiveShadow = true;
                }
            });
            obj.scale.setScalar(0.3);
            obj.up = new THREE.Vector3(0,0,1);
            this.models.person = obj;

            this.initLoaded()
        });

    }

    checkMapLevel(){
        this.three.map.on('zoom',()=>{
            let mapLevel = this.three.map.getZoom();
            if(this.models.weilan){
                this.models.weilan.visible = mapLevel <= 15;
            }
            if(this.models.weilan13Inside){
                if(!this.showWeilan13){
                    this.models.weilan13Inside.visible = false;
                }else{
                    this.models.weilan13Inside.visible = mapLevel <= 15;
                }
            }
            if(this.models.weilan47Inside && !this.alwaysShow47Inside){
                if(!this.showWeilan47){
                    this.models.weilan47Inside.visible = false;
                }else{
                    this.models.weilan47Inside.visible = mapLevel <= 15;
                }
            }
            if(mapLevel>14){
                if(this.isDayTime) return;
                this.isDayTime = true;
                if(this.models.buildings_90) this.models.buildings_90.material = [this.dayMatTop,this.dayMatBottom];
                if(this.models.buildings_75) this.models.buildings_75.material = [this.dayMatTop,this.dayMatBottom];
                if(this.models.buildings_30) this.models.buildings_30.material = [this.dayMatTop,this.dayMatBottom];
                if(this.models.buildings_15) this.models.buildings_15.material = [this.dayMatTop,this.dayMatBottom];
            }else{
                if(!this.isDayTime) return;
                this.isDayTime = false;
                if(this.models.buildings_90) this.models.buildings_90.material = [this.nightMatTop,this.nightMatBottom];
                if(this.models.buildings_75) this.models.buildings_75.material = [this.nightMatTop,this.nightMatBottom];
                if(this.models.buildings_30) this.models.buildings_30.material = [this.nightMatTop,this.nightMatBottom];
                if(this.models.buildings_15) this.models.buildings_15.material = [this.nightMatTop,this.nightMatBottom];
            }
        });
    }

    getKeyboard(obj){
        document.addEventListener( 'keydown', e => {
            switch (e.keyCode) {
                case 38:
                    obj.position.y += 5;
                    break;
                case 40:
                    obj.position.y -= 5;
                    break;
                case 37:
                    obj.position.x -= 5;
                    break;
                case 39:
                    obj.position.x += 5;
                    break;
                default:
                    break;
            }
            console.log(obj.position);
        }, false );
    }

}