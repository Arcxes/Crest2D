//Display.js
//Author - Arcxes

/*
    Display is used to create the canvas element, and initialize a graphics context
*/

//Display Class
export class Display {

    /**
     *
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width,height){
        /**
         * @type {HTMLCanvasElement}
         */
        this.canvas = document.createElement("canvas");
        this.canvas.id = "C2DC"
        this.canvas.width = width;
        this.canvas.height = height;
        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = this.canvas.getContext("2d");
    }

   
    /**
     * add the canvas to the DOM and create the graphics context
     */
    create(){
        document.body.appendChild(this.canvas);
        window.canvas = this.canvas;
        window.ctx = this.ctx
    }

    /**
     * clear the canvas
     */
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    /**
     * resize the display
     * @param {number} width 
     * @param {number} height 
     */
    resize(width,height){
        this.canvas.width = width;
        this.canvas.height = height;
    }
}