//Application.js
//Author - Arcxes

/*
    Application is designed to give a cleaner structure to using Crest2D and handle things behind the scenes
*/

//Application Class
export class Application{

    constructor(){
        /** Prepares any information to be loaded. */
        this.preload = null;
        
        
        /** Any code in here will be created. */
        this.create = null;
        
        /** Renders any created and loaded code from create. */
        this.render = null;
    }

    /** Starts the base of your game. @param {Loader} loader loader used in application*/
    start(loader){
        loader.setCallback(this.internalCreate());
        this.preload();
    }

    /** Changes preload into the function provided through the params. @param {Function} preload input function that you use to prepare data for loading. */
    registerPreLoad(preload){
        this.preload = preload;
    }

    /** Changes create into the function provided through the params. @param {Function} start called when you do this.start(). */
    registerCreate(start){
        this.start = start;
    }

    /** Changes render into the function provided through the params. @param {Function} render anything generated to the screen in an infinite loop. */
    registerRender(render){
        this.render = render;
    }

    /** Runs the create program built into the engine. */
    internalCreate(){
        this.create();
        requestAnimationFrame(internalRender);
    }

    /** Runs the built in render function that is created. */
    internalRender(){
        this.render();
        requestAnimationFrame(this.render);
    }
}