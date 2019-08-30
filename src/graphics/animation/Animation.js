//Animation.js
//Author - Arcxes

/*
    Animation is designed to take in a spritesheet an animate it with each row being a seperate animation
*/

//Animation Class
export class Animation{

    /**
     * 
     * @param {SpriteSheet} spritesheet 
     * @param {number} frameWidth 
     * @param {number} frameHeight 
     */
    constructor(spritesheet,frameWidth,frameHeight){
        /** @type {HTMLImageElement} */
        this.image = spritesheet.image;
        /** @type {number} */
        this.cols = spritesheet.cols;
        /** @type {number} */
        this.rows = spritesheet.rows;
        /** @type {number} */
        this.frameWidth = frameWidth || this.image.width/this.cols;
        /** @type {number} */
        this.frameHeight = frameHeight || this.image.height/this.rows;
        /** @type {number} */
        this.colIndex = 0;
        /** @type {number} */
        this.rowIndex = 0;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = window.ctx;

        /** @type {number} */
        this.resetModX = Math.floor(this.colIndex % this.cols);
    }

    /**
     * updates the current frame
     * @param {number} speed the animation playback speed
     */
    update(speed){
        this.colIndex+=speed;
        this.resetModX = Math.floor(this.colIndex % this.cols);
    }

    /**
     * render the current frame
     * @param {number} x the x coordinate to render at
     * @param {number} y the y coordinate to render at
     * @param {number} width the width to render at
     * @param {number} height the height to render at
     */
    draw(x,y,width,height){
        this.ctx.drawImage(this.image,
            this.resetModX*this.frameWidth,
            this.rowIndex*this.frameHeight,
            this.frameWidth, this.frameHeight,
            x, y,
            width, height
        );
    }

    /**
     * set the row index
     * @param {number} rowIndex the row to use
     */
    setFrameRow(rowIndex){
        this.rowIndex = rowIndex;
    }

    //set the current frame
    /**
     * set the current frame
     * @param {number} colIndex column of the desired frame
     * @param {number} rowIndex row of the desired frame
     */
    setFrame(colIndex,rowIndex){
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
        this.resetModX = Math.floor(this.colIndex % this.cols);
    }

    
}