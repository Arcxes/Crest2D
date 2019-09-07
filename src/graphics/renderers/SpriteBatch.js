//SpriteBatch.js
//Author - Arcxes

/*
    SpriteBatch is designed to render graphics to the Display
*/

//SpriteBatch Class
export class SpriteBatch {
    /**
     * disable the pixel blending
     */
    disablePixelBlending() {
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
    }

    /**
     * set the draw color of the drawing context
     * @param {string} color the css color code to render with
     */
    setColor(color) {
        ctx.fillStyle = color;
    }

    /**
     * set the alpha value for the drawing context
     * @param {number} alpha transparency level
     */
    setAlpha(alpha) {
        ctx.globalAlpha = alpha;
    }

    /**
     * set the font for the drawing context
     * @param {string} font the css font to render with
     */
    setFont(font) {
        ctx.font = font;
    }

    /**
     * set the line width of the drawing context
     * @param {number} width the line width for drawStroke
     */
    setLineWidth(width) {
        ctx.lineWidth = width;
    }

    /**
     * draw an image to the screen
     * @param {HTMLCanvasElement} image image to render
     * @param {number} x x coordinate to render at
     * @param {number} y y coordinate to render at
     * @param {number} width width to render at
     * @param {number} height height to render at
     */
    drawImage(image, x, y, width, height) {
        ctx.drawImage(image, x, y, width, height);
    }

    /**
     * draw text to the screen
     * @param {string} text string to render
     * @param {number} x x coordinate to render at
     * @param {number} y y coordinate to render at
     */
    drawText(text, x, y) {
        ctx.fillText(text, x, y);
    }

    /**
     * draw a rect to the screen
     * @param {number} x x coordinate to render at
     * @param {number} y y coordinate to render at
     * @param {number} width width to render at
     * @param {number} height height to render at
     */
    drawRect(x, y, width, height) {
        ctx.fillRect(x, y, width, height);
    }

    /**
     * draw a circle to the screen
     * @param {number} x x coordinate to render at
     * @param {number} y y coordinate to render at
     * @param {number} radius radius to render at
     */
    drawCircle(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 2 * Math.PI, false);
        ctx.fill();
    }

    /**
     * draw an outlined rect to the screen
     * @param {number} x x coordinate to render at
     * @param {number} y y coordniate to render at
     * @param {number} width width to render at
     * @param {number} height height to render at
     */
    drawStroke(x, y, width, height) {
        ctx.strokeRect(x, y, width, height);
    }
}