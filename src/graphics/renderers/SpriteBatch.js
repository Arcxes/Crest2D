//SpriteBatch.js
//Author - Arcxes

/*
    SpriteBatch is designed to render graphics to the Display
*/

//SpriteBatch Class
export class SpriteBatch{

    constructor(){
        this.ctx = window.ctx;
    }

    //disable the pixel blending
    disablePixelBlending(){
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }

    //set the draw color of the drawing context
    setColor(color){
        this.ctx.fillStyle = color;
    }

    //set the alpha value for the drawing context
    setAlpha(alpha){
        this.ctx.globalAlpha = alpha;
    }

    //set the font for the drawing context
    setFont(font){
        this.ctx.font = font;
    }

    //set the line width of the drawing context
    setLineWidth(width){
        this.ctx.lineWidth = width;
    }

    //draw an image to the screen
    drawImage(image,x,y,width,height){
        this.ctx.drawImage(image,x,y,width,height);
    }

    //draw text to the screen
    drawText(text,x,y){
        this.ctx.fillText(text,x,y);
    }

    //draw a rect to the screen
    drawRect(x,y,width,height){
        this.ctx.fillRect(x,y,width,height);
    }

    //draw a circle to the screen
    drawCircle(x,y,radius){
        ctx.beginPath();
        ctx.arc(x,y,radius,2*Math.PI,false);
        ctx.fill();
    }

    //draw an outlined rect to the screen
    drawStroke(x,y,width,height){
        core.ctx.strokeRect(x,y,width,height);
    }
}