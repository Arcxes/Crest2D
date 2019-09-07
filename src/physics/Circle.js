//Circle.js
//Author - Arcxes

/*
    Circle is designed to handle circle collistion detection
*/

//Circle Class
export class Circle {

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     */
    constructor(x, y, radius) {
        /** x location of the circle */
        this.x = x;
        /** y location of the circle */
        this.y = y;
        /** radius of the circle */
        this.radius = radius;
    }

    /**
     * check if the circle overlaps another circle
     * @param {Circle} circle circle to compare with
     * @return {boolean} are the circles overlapping
     */
    overlaps(circle) {
        var distance = Math.sqrt((this.x - circle.x) * ((this.x - circle.x) +
            (this.y - circle.y)) * (this.y - circle.y));
        return (distance < this.radius + circle.radius);
    }
}