//Viewport.js
//Author - Arcxes

/*
    Viewport is designed to be used with Camera for keeping track of the Camera view
*/

//Viewport Class
export class Viewport{

    constructor(){
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        this.width = 0;
        this.height = 0;
        this.scale = {x: 0, y: 0};
        this.viewBuffer = 100;
    }
}