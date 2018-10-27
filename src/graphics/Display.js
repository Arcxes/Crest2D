//Display.js
//Author - Arcxes

/*
    Display is used to create the canvas element, and initialize a graphics context
*/

//Display Class
export class Display{

    constructor(width,height){
        this.canvas = document.createElement("canvas");
        this.canvas.id = "C2DC"
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        this.audioContext = new window.AudioContext() || new window.webkitAudioContext();
        window.audioContext = this.audioContext;
        window.activeSounds = {};
    }

    //add the canvas to the DOM and create the graphics context
    create(){
        document.body.appendChild(this.canvas);
        window.canvas = this.canvas;
        window.ctx = this.ctx
    }

    //clear the canvas
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    //resize the canvas
    resize(width,height){
        this.canvas.width = width;
        this.canvas.height = height;
    }
}