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
    constructor(width, height) {
        /** canvas to draw onto */
        this.canvas = document.createElement("canvas");
        /** id of the canvas */
        this.canvas.id = "C2DC"
        /** width of the canvas */
        this.canvas.width = width;
        /** height of the canvas */
        this.canvas.height = height;
    }

    /** add the canvas to the DOM and create the graphics context */
    create() {
        document.body.appendChild(this.canvas);
        window.canvas = this.canvas;
        /** the rendering context */
        window.ctx = this.canvas.getContext("2d");
    }

    /**
     * clear the canvas
     */
    clear() {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * resize the display
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
}