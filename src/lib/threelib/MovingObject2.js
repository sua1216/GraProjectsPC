
import * as THREE from 'three-full'

export default class MovingObject2{
    constructor(model){
        this.model = model;
        this.yPos = 0;
        this.currentPos = [];
        this.currentPosCopy = []; // for loop
        this.destinationPos = [];
        this.destinationPosCopy = []; // for loop
        this.movingLoop = false;
        this.stepLimit = 10;
        this.pause = false;
        this.needPause = true;
        this.checkPause = true;
    }
    setPos(currentPosArr,destinationPosArr){
        if(currentPosArr instanceof Array && destinationPosArr instanceof Array){
            this.currentPos = currentPosArr;
            for(let i=0;i<destinationPosArr.length;i++){
                let destinationX = destinationPosArr[i][0];
                let destinationZ = destinationPosArr[i][1];
                if(i===0){
                    let currentX = this.currentPos[0];
                    let currentZ = this.currentPos[1];
                    let vector1 = new THREE.Vector2(currentX,currentZ);
                    let vector2 = new THREE.Vector2(destinationX,destinationZ);
                    let distance = vector2.distanceTo(vector1);
                    if(distance > this.stepLimit){
                        let num = Math.ceil(distance/this.stepLimit);
                        let x = (destinationX-currentX)/num;
                        let z = (destinationZ-currentZ)/num;
                        for(let j=1;j<=num;j++){
                            let destinationPos = [currentX+j*x,currentZ+j*z];
                            this.destinationPos.push(destinationPos);
                        }
                    }else{
                        let destinationPos = [destinationX,destinationZ];
                        this.destinationPos.push(destinationPos);
                    }
                }else{
                    let beforeDestinationX = destinationPosArr[i-1][0];
                    let beforeDestinationZ = destinationPosArr[i-1][1];
                    let vector1 = new THREE.Vector2(beforeDestinationX,beforeDestinationZ);
                    let vector2 = new THREE.Vector2(destinationX,destinationZ);
                    let distance = vector2.distanceTo(vector1);
                    if(distance > this.stepLimit){
                        let num = Math.ceil(distance/this.stepLimit);
                        let x = (destinationX-beforeDestinationX)/num;
                        let z = (destinationZ-beforeDestinationZ)/num;
                        for(let j=1;j<=num;j++){
                            let destinationPos = [beforeDestinationX+j*x,beforeDestinationZ+j*z];
                            this.destinationPos.push(destinationPos);
                        }
                    }else{
                        let destinationPos = [destinationX,destinationZ];
                        this.destinationPos.push(destinationPos);
                    }
                }
            }
            if(this.movingLoop){
                this.currentPosCopy = this.currentPos.slice();
                this.destinationPosCopy = this.destinationPos.slice();
            }
        }else{
            throw new Error("MovingObject setPos error");
        }
    }
    setPosToCurrent(){
        if(this.currentPos && this.currentPos.length){
            this.model.position.set(this.currentPos[0],this.currentPos[1],this.yPos);
        }
        if(this.destinationPos.length){
            let nextVector = new THREE.Vector3(this.destinationPos[0][0],this.destinationPos[0][1],this.yPos);
            this.model.lookAt(nextVector);
        }
    }
    moving(){
        if(this.currentPos !== this.destinationPos[0]){
            this.currentPos = this.destinationPos[0];
            this.destinationPos.shift();
            this.setPosToCurrent();
            if(this.movingLoop && this.destinationPos.length === 0){
                if(this.checkPause){
                    if(!this.pause && this.needPause) {
                        this.pause = true;
                        this.needPause = false;
                    }
                    if(!this.pause){
                        this.currentPos = this.currentPosCopy.slice();
                        this.destinationPos = this.destinationPosCopy.slice();
                        this.setPosToCurrent();
                        this.needPause = true;
                    }
                }else{
                    this.currentPos = this.currentPosCopy.slice();
                    this.destinationPos = this.destinationPosCopy.slice();
                    this.setPosToCurrent();
                }
            }
        }
    }
    getPause(){
        return this.pause;
    }
}