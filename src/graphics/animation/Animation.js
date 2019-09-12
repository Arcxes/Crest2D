//Animation.js
//Author - Arcxes

/*
    Animation is designed to take in a spritesheet an animate it with each row being a seperate animation
*/

//Animation Class
export class Animation {

    /**
     * 
     * @param {SpriteSheet} spritesheet 
     * @param {number} frameWidth 
     * @param {number} frameHeight 
     */
    constructor(spritesheet, frameWidth, frameHeight) {
        /** Spritesheet Image */
        this.image = spritesheet.image;
        /** Amount of columns in the spritesheet */
        this.cols = spritesheet.cols;
        /** Amount of rows in the spritesheet */
        this.rows = spritesheet.rows;
        /** width of the animation frame */
        this.frameWidth = frameWidth || this.image.width / this.cols;
        /** height of the animation frame */
        this.frameHeight = frameHeight || this.image.height / this.rows;
        /** Index of columns */
        this.colIndex = 0;
        /** Index of rows */
        this.rowIndex = 0;
        this.resetModX = Math.floor(this.colIndex % this.cols);
    }

    /**
     * updates the current frame
     * @param {number} speed the animation playback speed
     */
    update(speed) {
        this.colIndex += speed;
        this.resetModX = Math.floor(this.colIndex % this.cols);
    }

    /**
     * render the current frame
     * @param {number} x the x coordinate to render at
     * @param {number} y the y coordinate to render at
     * @param {number} width the width to render at
     * @param {number} height the height to render at
     */
    draw(x, y, width, height) {
        ctx.drawImage(this.image,
            this.resetModX * this.frameWidth,
            this.rowIndex * this.frameHeight,
            this.frameWidth, this.frameHeight,
            x, y,
            width, height
        );
    }

    /**
     * set the row index
     * @param {number} rowIndex the row to use
     */
    setFrameRow(rowIndex) {
        this.rowIndex = rowIndex;
    }

    //set the current frame
    /**
     * set the current frame
     * @param {number} colIndex column of the desired frame
     * @param {number} rowIndex row of the desired frame
     */
    setFrame(colIndex, rowIndex) {
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
        this.resetModX = Math.floor(this.colIndex % this.cols);
    }


}