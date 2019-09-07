//Viewport.js
//Author - Arcxes

/*
    Viewport is designed to be used with Camera for keeping track of the Camera view
*/

//Viewport Class
export class Viewport{

    constructor(){
        /** left side of the view */
        this.left = 0;
        /** right side of the view */
        this.right = 0;
        /** the top of the view */
        this.top = 0;
        /** the bottom of the view */
        this.bottom = 0;
        /** width of the view */
        this.width = 0;
        /** height of the view */
        this.height = 0;
        /** zoom of the view */
        this.scale = {x: 0, y: 0};
        /** frustrum of the view */
        this.viewBuffer = 100;
    }
}