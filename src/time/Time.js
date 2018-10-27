//Time.js
//Author - Arcxes

/*
    Time is designed to hold classes for each time unit used
*/

//DeltaTime Class
export class DeltaTime {

    constructor(){
        this.now = 0;
        this.delta = 0;
        this.then = 0;
    }

    //update the delta time value
    tick(){
        this.now = performance.now();
        this.delta = (this.now - this.then)/1000;
        this.then = this.now;
    }

    //return the value of delta
    getDelta(){
        return this.delta;
    }
}