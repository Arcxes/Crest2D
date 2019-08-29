//SpriteBatch.js
//Author - Arcxes

/*
    SpriteBatch is designed to render graphics to the Display
*/

//SpriteBatch Class
export class SpriteBatch{

    constructor(){
        /**
         * @private
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = window.ctx;
    }

    /**
     * disable the pixel blending
     */
    disablePixelBlending(){
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }

    /**
     * set the draw color of the drawing context
     * @param {string} color the css color code to render with
     */
    setColor(color){
        this.ctx.fillStyle = color;
    }

    /**
     * set the alpha value for the drawing context
     * @param {number} alpha transparency level
     */
    setAlpha(alpha){
        this.ctx.globalAlpha = alpha;
    }

    /**
     * set the font for the drawing context
     * @param {string} font the css font to render with
     */
    setFont(font){
        this.ctx.font = font;
    }

    /**
     * set the line width of the drawing context
     * @param {number} width the line width for drawStroke
     */
    setLineWidth(width){
        this.ctx.lineWidth = width;
    }

    /**
     * draw an image to the screen
     * @param {HTMLCanvasElement} image image to render
     * @param {number} x x coordinate to render at
     * @param {number} y y coordinate to render at
     * @param {number} width width to render at
     * @param {number} height height to render at
     */
    drawImage(image,x,y,width,height){
        this.ctx.drawImage(image,x,y,width,height);
    }

    /**
     * draw text to the screen
     * @param {string} text string to render
     * @param {number} x x coordinate to render at
     * @param {number} y y coordinate to render at
     */
    drawText(text,x,y){
        this.ctx.fillText(text,x,y);
    }

    /**
     * draw a rect to the screen
     * @param {number} x x coordinate to render at
     * @param {number} y y coordinate to render at
     * @param {number} width width to render at
     * @param {number} height height to render at
     */
    drawRect(x,y,width,height){
        this.ctx.fillRect(x,y,width,height);
    }

    /**
     * draw a circle to the screen
     * @param {number} x x coordinate to render at
     * @param {number} y y coordinate to render at
     * @param {number} radius radius to render at
     */
    drawCircle(x,y,radius){
        this.ctx.beginPath();
        this.ctx.arc(x,y,radius,2*Math.PI,false);
        this.ctx.fill();
    }

    /**
     * draw an outlined rect to the screen
     * @param {number} x x coordinate to render at
     * @param {number} y y coordniate to render at
     * @param {number} width width to render at
     * @param {number} height height to render at
     */
    drawStroke(x,y,width,height){
        this.ctx.strokeRect(x,y,width,height);
    }
}