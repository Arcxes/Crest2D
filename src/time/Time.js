//Time.js
//Author - Arcxes

/*
    Time is designed to hold classes for each time unit used
*/

//DeltaTime Class
export class DeltaTime {

    constructor(){
        /** current time */
        this.now = 0;
        /** delta time */
        this.delta = 0;
        /** last time */
        this.then = 0;
    }

    /** update the delta time value */
    tick(){
        this.now = performance.now();
        this.delta = (this.now - this.then)/1000;
        this.then = this.now;
    }

    /**
     * return the value of delta
     * @return {number} delta time
     */
    getDelta(){
        return this.delta;
    }
}