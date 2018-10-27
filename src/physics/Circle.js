//Circle.js
//Author - Arcxes

/*
    Circle is designed to handle circle collistion detection
*/

//Circle Class
export class Circle{

    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    //check if the circle overlaps another circle
    overlaps(circle){
        var distance = Math.sqrt((this.x-circle.x) * ((this.x-circle.x) +
         (this.y-circle.y)) * (this.y-circle.y));
        return (distance < this.radius + circle.radius);
    }
}