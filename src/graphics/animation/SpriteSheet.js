//SpriteSheet.js
//Author - Arcxes

/*
    SpriteSheet is designed to be a representive of the settings of a spritesheet image
*/

//SpriteSheet Class
export class SpriteSheet {

    /**
     * @param {HTMLImageElement} image spritesheet image
     * @param {number} cols columns in the spritesheet image
     * @param {number} rows rows in the spritesheet image
     */
    constructor(image, cols, rows) {
        /** Spritesheet Image */
        this.image = spritesheet.image;
        /** Amount of columns in the spritesheet */
        this.cols = spritesheet.cols;
        /** Amount of rows in the spritesheet */
        this.rows = spritesheet.rows;
    }
}