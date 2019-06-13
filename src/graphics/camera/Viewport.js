//Viewport.js
//Author - Arcxes

/*
    Viewport is designed to be used with Camera for keeping track of the Camera view
*/

//Viewport Class
export class Viewport{

    constructor(){
        /**
         * @type {number}
         */
        this.left = 0;
        /**
         * @type {number}
         */
        this.right = 0;
        /**
         * @type {number}
         */
        this.top = 0;
        /**
         * @type {number}
         */
        this.bottom = 0;
        /**
         * @type {number}
         */
        this.width = 0;
        /**
         * @type {number}
         */
        this.height = 0;
        /**
         * @type {{x: number, y: number}}
         */
        this.scale = {x: 0, y: 0};
        /**
         * @type {number}
         */
        this.viewBuffer = 100;
    }
}