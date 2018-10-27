//Camera.js
//Author - Arcxes

/*
    Camera is designed to manage the aspect ratio and scale of the canvas along with translating the
    coordinates.
*/

//imports
import {Viewport} from "./Viewport";

//Camera Class
export class Camera{

    constructor(x=0,y=0){
        this.position = {x: x, y: y};
        this.distance = 1000;
        this.fov = Math.PI / 4;
        this.viewport = new Viewport();
        this.canvas = window.canvas;
        this.ctx = window.ctx;
        this.update();
    }

    //start camera calculations
    begin(){
        this.ctx.save();
        this.applyScale();
        this.applyTranslation();
    }

    //stop the camera calculations
    end(){
        this.ctx.restore();
    }

    //apply the scale to the drawing context
    applyScale(){
        this.ctx.scale(this.viewport.scale.x, this.viewport.scale.y);
    }

    //apply the translation to the drawing context
    applyTranslation(){
        this.ctx.translate(-this.viewport.left,-this.viewport.top);
    }

    //update the viewport
    update(){
        this.aspectRatio = this.canvas.width / this.canvas.height;
        this.viewport.width = this.distance * Math.tan(this.fov);
        this.viewport.height = this.viewport.width / this.aspectRatio;
        this.viewport.left = this.position.x - (this.viewport.width / 2.0);
        this.viewport.top = this.position.y - (this.viewport.height / 2.0);
        this.viewport.right = this.viewport.left + this.viewport.width;
        this.viewport.bottom = this.viewport.top + this.viewport.height;
        this.viewport.scale.x = this.canvas.width / this.viewport.width;
        this.viewport.scale.y = this.canvas.height / this.viewport.height;
    }

    //set the zoom distance
    setZoom(distance){
        this.distance = distance;
        this.update();
    }

    //set the frustum culling buffer
    setViewBuffer(buffer){
        this.viewport.viewBuffer = buffer;
    }

    //set the camera position
    setPosition(x,y){
        this.position.x = x;
        this.position.y = y;
        this.update();
    }

    //convert screen coordinates to world coordinates
    screenToWorld(x,y){
        let coords = {};
        coords.x = (x / this.viewport.scale.x) + this.viewport.left;
        coords.y = (y / this.viewport.scale.y) + this.viewport.top;
        return coords;
    }

    //convery world coordinates to screen coordinates
    worldToScreen(x,y){
        let coords = {};
        coords.x  = (x - this.viewport.left) * (this.viewport.scale.x);
        coords.y = (y - this.viewport.top) * (this.viewport.scale.y);
        return coords;
    }

    //check if a position is in the camera viewport
    inView(x,y){
        return (x >= this.position.x - this.viewport.viewBuffer &&
            x <= (this.position.x + this.viewport.width + this.viewport.viewBuffer) &&
            y >= this.position.y - this.viewport.viewBuffer &&
            y <= (this.position.y + this.viewport.height + this.viewBuffer));
    }
}