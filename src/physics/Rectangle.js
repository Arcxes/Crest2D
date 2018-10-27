//Rectangle.js
//Author - Arcxes

/*
    Rectangle is designed to handle rect collistion detection
*/

//Rectangle Class
export class Rectangle{

    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
    }

    //check if the rectangle overlaps another rectangle
    overlaps(rectangle){
        return (this.x < rectangle.x + rectangle.width &&
            this.x + this.width > rectangle.x &&
            this.y < rectangle.y + rectangle.height &&
            this.y + this.height > rectangle.y);
    }

    //check if the rectangle is inside another rectangle
    within(rectangle){
        return (rectangle.x <= this.x &&
            rectangle.right >= this.right &&
            rectangle.y <= this.y &&
            rectangle.bottom >= this.bottom);
    }

    //check if the coordinates are inside this rectangle
    contains(x,y){
        return (x >= this.x &&
            x <= this.right &&
            y >= this.y &&
            y <= this.bottom);
    }

    //set the position of the rectangle
    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    //set the size of the rectangle
    setSize(width,height){
        this.width = width;
        this.height = height;
    }
}