//Application.js
//Author - Arcxes

/*
    Application is designed to give a cleaner structure to using Crest2D and handle things behind the scenes
*/

//Application Class
export class Application{

    constructor(){
        /**
         * @ignore
         * @type {Function}
         */
        this.preload = null;
        /**
         * @ignore
         * @type {Function}
         */
        this.create = null;
        /**
         * @ignore
         * @type {Function}
         */
        this.render = null;
    }

    /**
     * start the application
     * @param {Loader} loader asset loader to use in application
     */
    start(loader){
        loader.setCallback(this.internalCreate());
        this.preload();
    }

    /**
     * set the preload function
     * @param {Function} preload function called before the start of the application
     */
    registerPreLoad(preload){
        this.preload = preload;
    }

    /**
     * set the create function
     * @param {Function} start function called at the start of the application
     */
    registerCreate(start){
        this.start = start;
    }

    /**
     * set the render function
     * @param {Function} render function called as the game loop
     */
    registerRender(render){
        this.render = render;
    }

    /**
     * application's internal create function
     * @ignore
     */
    internalCreate(){
        this.create();
        requestAnimationFrame(internalRender);
    }

    /**
     * application's internal render function
     * @ignore
     */
    internalRender(){
        this.render();
        requestAnimationFrame(this.render);
    }
}