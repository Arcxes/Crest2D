//SpriteSheet.js
//Author - Arcxes

/*
    SpriteSheet is designed to be a representive of the settings of a spritesheet image
*/

//SpriteSheet Class
export class SpriteSheet{

    /**
     * @param {HTMLImageElement} image spritesheet image
     * @param {number} cols columns in the spritesheet image
     * @param {number} rows rows in the spritesheet image
     */
    constructor(image,cols,rows){
        /** @type {HTMLImageElement} */
        this.image = image;
        /** @type {number} */
        this.cols = cols;
        /** @type {number} */
        this.rows = rows;
    }
}