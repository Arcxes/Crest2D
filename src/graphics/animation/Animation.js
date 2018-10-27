//Animation.js
//Author - Arcxes

/*
    Animation is designed to take in a spritesheet an animate it with each row being a seperate animation
*/

//Animation Class
export class Animation{

    constructor(spritesheet,frameWidth,frameHeight){
        this.image = spritesheet.image;
        this.cols = spritesheet.cols;
        this.rows = spritesheet.rows;
        this.frameWidth = frameWidth || this.image.width/this.cols;
        this.frameHeight = frameHeight || this.image.height/this.rows;
        this.colIndex = 0;
        this.rowIndex = 0;
        this.ctx = window.ctx;
    }

    //update the current frame
    update(speed){
        this.colIndex+=speed;
        this.resetModX = Math.floor(this.colIndex % this.cols);
    }

    //render the current frame
    draw(x,y,width,height){
        this.ctx.drawImage(this.image,
            this.resetModX*this.frameWidth,
            this.rowIndex*this.frameHeight,
            this.frameWidth, this.frameHeight,
            x, y,
            width, height
        );
    }

    //set the row index
    setFrameRow(rowIndex){
        this.rowIndex = rowIndex;
    }

    //set the current frame
    setFrame(colIndex,rowIndex){
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
        this.resetModX = Math.floor(this.colIndex % this.cols);
    }

    
}