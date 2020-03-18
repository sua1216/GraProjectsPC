import * as THREE from 'three-full'
import XBLngLatXYConvert from './XBLngLatXYConvert'

export default class MovingObject{
    constructor(model){
        this.model = model;
        this.zPos = 0;
        this.currentPos = [];
        this.currentPosCopy = []; // for loop
        this.destinationPos = [];
        this.destinationPosCopy = []; // for loop
        this.movingLoop = false;
        this.stepLimit = 0.0002;
        this.mapOrigin = [118.66914190809405,33.727482000827635];
        this.posNumber = 0;
        this.checkPauseOrNot = true;
    }
    setPos(currentCoordinate,destinationCoordinates){
        if(currentCoordinate instanceof Array && destinationCoordinates instanceof Array){
            let convert = new XBLngLatXYConvert();
            let xy = convert.getXY(currentCoordinate,this.mapOrigin);
            this.currentPos = [xy.x,xy.y];
            for(let i=0;i<destinationCoordinates.length;i++){
                let destinationX = destinationCoordinates[i][0];
                let destinationY = destinationCoordinates[i][1];
                if(i===0){
                    let currentX = currentCoordinate[0];
                    let currentY = currentCoordinate[1];
                    let distance = Math.sqrt(Math.pow(destinationX-currentX,2)+ Math.pow(destinationY-currentY,2));
                    //alert(distance); 2883;
                    if(distance > this.stepLimit){
                        let num = Math.ceil(distance/this.stepLimit);
                        let x = (destinationX-currentX)/num;
                        let y = (destinationY-currentY)/num;
                        for(let j=1;j<=num;j++){
                            let destinationCoordinate = [currentX+j*x,currentY+j*y];
                            let destinationPosXY = convert.getXY(destinationCoordinate,this.mapOrigin);
                            let destinationPos = [destinationPosXY.x,destinationPosXY.y];
                            this.destinationPos.push(destinationPos);
                        }
                    }else{
                        let destinationCoordinate = [destinationX,destinationY];
                        let destinationPosXY = convert.getXY(destinationCoordinate,this.mapOrigin);
                        let destinationPos = [destinationPosXY.x,destinationPosXY.y];
                        this.destinationPos.push(destinationPos);
                    }
                }else{
                    let beforeDestinationX = destinationCoordinates[i-1][0];
                    let beforeDestinationY = destinationCoordinates[i-1][1];
                    let distance = Math.sqrt(Math.pow(destinationX-beforeDestinationX,2) + Math.pow(destinationY-beforeDestinationY,2));
                    if(distance > this.stepLimit){
                        let num = Math.ceil(distance/this.stepLimit);
                        let x = (destinationX-beforeDestinationX)/num;
                        let y = (destinationY-beforeDestinationY)/num;
                        for(let j=1;j<=num;j++){
                            let destinationCoordinate = [beforeDestinationX+j*x,beforeDestinationY+j*y];
                            let destinationPosXY = convert.getXY(destinationCoordinate,this.mapOrigin);
                            let destinationPos = [destinationPosXY.x,destinationPosXY.y];
                            this.destinationPos.push(destinationPos);
                        }
                    }else{
                        let destinationCoordinate = [destinationX,destinationY];
                        let destinationPosXY = convert.getXY(destinationCoordinate,this.mapOrigin);
                        let destinationPos = [destinationPosXY.x,destinationPosXY.y];
                        this.destinationPos.push(destinationPos);
                    }
                }
            }
            this.currentPosCopy = this.currentPos.slice();
            this.destinationPosCopy = this.destinationPos.slice();
            this.posNumber = this.destinationPosCopy.length;
        }else{
            throw new Error("MovingObject setPos error");
        }
    }
    setPosToCurrent(moving){
        this.model.position.set(this.currentPos[0],this.currentPos[1],this.zPos);
        if(this.destinationPos.length){
            let nextVector = new THREE.Vector3(this.destinationPos[0][0],this.destinationPos[0][1],this.zPos);
            this.model.lookAt(nextVector);
        }
        if(!moving){
            this.model.rotation.y = Math.PI/2;
        }
    }
    moving(){
        if(this.currentPos.length && this.destinationPos.length){
            if(this.currentPos !== this.destinationPos[0]){
                this.currentPos = this.destinationPos[0];
                this.destinationPos.shift();
                this.setPosToCurrent(true);
                if(this.checkPauseOrNot){
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
    resetAll(){
        this.currentPos = this.currentPosCopy.slice();
        this.destinationPos = this.destinationPosCopy.slice();
        this.setPosToCurrent(false);
    }
    getTotalPosNumber(){
        return this.posNumber;
    }
    setObjPosToSomeWhere(num){
        if(num===undefined || num===null){
            return;
        }
        let disPosArrTmp = this.destinationPosCopy.slice();
        let cPosArrTmp = this.currentPosCopy.slice();
        disPosArrTmp.splice(0,0,cPosArrTmp);
        this.currentPos = disPosArrTmp[num];
        disPosArrTmp.splice(0, num+1);
        this.destinationPos = disPosArrTmp;
        this.setPosToCurrent(true);
    }
    getObjectCurrentPosNumber(){
        return this.destinationPos.length;
    }
}