//Rectangle.js
//Author - Arcxes

/*
    Rectangle is designed to handle rect collistion detection
*/

//Rectangle Class
export class Rectangle{

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(x,y,width,height){
        /**
         * @type {number}
         */
        this.x = x;
        /**
         * @type {number}
         */
        this.y = y;
        /**
         * @type {number}
         */
        this.width = width;
        /**
         * @type {number}
         */
        this.height = height;
        /**
         * @type {number}
         */
        this.right = this.x + this.width;
        /**
         * @type {number}
         */
        this.bottom = this.y + this.height;
    }

    /**
     * check if the rectangle overlaps another rectangle
     * @param {Rectangle} rectangle rectangle to compare with
     * @return {boolean} are the rectangles overlapping
     */
    overlaps(rectangle){
        return (this.x < rectangle.x + rectangle.width &&
            this.x + this.width > rectangle.x &&
            this.y < rectangle.y + rectangle.height &&
            this.y + this.height > rectangle.y);
    }

    /**
     * check if the rectangle is inside another rectangle
     * @param {Rectangle} rectangle rectangle to compare with
     * @return {boolean} is the rectangle inside the other rectangle
     */
    within(rectangle){
        return (rectangle.x <= this.x &&
            rectangle.right >= this.right &&
            rectangle.y <= this.y &&
            rectangle.bottom >= this.bottom);
    }

    /**
     * check if the coordinates are inside this rectangle
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @return {boolean} does the rectangle contain the coordinates
     */
    contains(x,y){
        return (x >= this.x &&
            x <= this.right &&
            y >= this.y &&
            y <= this.bottom);
    }

    /**
     * set the position of the rectangle
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    /**
     * set the size of the rectangle
     * @param {number} width new rectangle width
     * @param {number} height new rectangle height
     */
    setSize(width,height){
        this.width = width;
        this.height = height;
    }
}