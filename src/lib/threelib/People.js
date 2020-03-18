
import * as THREE from 'three-full'
import MovingObject from './MovingObject.js'

export default class People extends MovingObject{
    constructor(model) {
        super(model);
        this.mixer = null;
        this.initMixer();
    }
    initMixer(){
        if(this.model.animations && this.model.animations.length){
            this.mixer = new THREE.AnimationMixer(this.model);
            this.mixer.clipAction(this.model.animations[0]).play();
        }
    }
    walk(time) {
        if(this.mixer) this.mixer.update(time);
    }
}