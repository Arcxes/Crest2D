//Application.js
//Author - Arcxes

/*
    Application is designed to give a cleaner structure to using Crest2D and handle things behind the scenes
*/

//Application Class
export class Application{

    constructor(){
        this.preload = null;
        this.create = null;
        this.render = null;
    }

    //start the application
    start(loader){
        loader.setCallback(this.internalCreate());
        this.preload();
    }

    //set the preload function
    registerPreLoad(preload){
        this.preload = preload;
    }

    //set the create function
    registerCreate(start){
        this.start = start;
    }

    //set the render function
    registerRender(render){
        this.render = render;
    }

    //application's internal create function
    internalCreate(){
        this.create();
        requestAnimationFrame(internalRender);
    }

    //application's internal render function
    internalRender(){
        this.render();
        requestAnimationFrame(this.render);
    }
}