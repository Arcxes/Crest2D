//Camera.js
//Author - Arcxes

/*
    Camera is designed to manage the aspect ratio and scale of the canvas along with translating the
    coordinates.
*/

//imports
import { Viewport } from "./Viewport";

//Camera Class
export class Camera {

    /**
     * 
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    constructor(x = 0, y = 0) {
        /** position of Camera */
        this.position = { x: x, y: y };
        /** distance/Zoom of camera */
        this.distance = 1000;
        /** the field of view for the camera */
        this.fov = Math.PI / 4;
        /** the camera viewport */
        this.viewport = new Viewport();
        /** canvas to draw onto */
        this.canvas = window.canvas;
        /** the aspect ratio of the camera */
        this.aspectRatio = this.canvas.width / this.canvas.height;
        this.update();
    }

    /** start camera calculations */
    begin() {
        ctx.save();
        this.applyScale();
        this.applyTranslation();
    }

    /** stop the camera calculations */
    end() {
        ctx.restore();
    }

    /** apply the scale to the drawing context */
    applyScale() {
        ctx.scale(this.viewport.scale.x, this.viewport.scale.y);
    }

    /** apply the translation to the drawing context */
    applyTranslation() {
        ctx.translate(-this.viewport.left, -this.viewport.top);
    }

    /** update the camera viewport */
    update() {
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

    /**
     * set the zoom distance
     * @param {number} distance the camera's zoom distance
     */
    setZoom(distance) {
        this.distance = distance;
        this.update();
    }

    /**
     * set the frustum culling buffer
     * @param {number} buffer size of the frustum
     */
    setViewBuffer(buffer) {
        this.viewport.viewBuffer = buffer;
    }

    /**
     * set the frustum culling buffer
     * @param {number} x the camera's x coordinate
     * @param {number} y the camera's y coordinate
     */
    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.update();
    }

    /**
     * convert screen coordinates to world coordinates
     * @param {number} x screen x coordinate
     * @param {number} y screen y coordinate
     * @return {{x: number, y: number}} converted coordinates
     */
    screenToWorld(x, y) {
        let coords = {};
        coords.x = (x / this.viewport.scale.x) + this.viewport.left;
        coords.y = (y / this.viewport.scale.y) + this.viewport.top;
        return coords;
    }

    /**
     * convert world coordinates to screen coordinates
     * @param {number} x world x coordinate
     * @param {number} y world y coordinate
     * @return {{x: number, y: number}} converted coordinates
     */
    worldToScreen(x, y) {
        let coords = {};
        coords.x = (x - this.viewport.left) * (this.viewport.scale.x);
        coords.y = (y - this.viewport.top) * (this.viewport.scale.y);
        return coords;
    }

    /**
     * check if a position is in the camera viewport
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @return {boolean} are the coords in view
     */
    inView(x, y) {
        return (x >= this.position.x - this.viewport.viewBuffer &&
            x <= (this.position.x + this.viewport.width + this.viewport.viewBuffer) &&
            y >= this.position.y - this.viewport.viewBuffer &&
            y <= (this.position.y + this.viewport.height + this.viewBuffer));
    }
}