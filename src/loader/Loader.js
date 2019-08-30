//Loader.js
//Author - Arcxes

/*
    Loader is designed to load assets of all kinds of assets by passing the data to a specific loader and managing the results
*/

//imports
import {ImageLoader} from "./ImageLoader";
import {JSONLoader} from "./JSONLoader";

//Loader Class
export class Loader{

    constructor(){
        /** @type {number} */
        this.successCount = 0;
        /** @type {number} */
        this.errorCount = 0;
        /** @type {number} */
        this.totalAssets = 0;
        /** @type {Object} */
        this.cache = {};
        /** @type {string[]} */
        this.queue = [];
        /** @type {Function} */
        this.callback = null;
        /** @type {ImageLoader} */
        this.imageLoader = new ImageLoader();
        /** @type {JSONLoader} */
        this.jsonLoader = new JSONLoader(); 
    }

    /**
     * set the Loader callback
     * @param {Function} callback 
     */
    setCallback(callback){
        this.callback = callback;
    }

    /**
     * add an asset to be loaded
     * @param {string} url url to be queued
     */
    add(url){
        this.totalAssets++;
        this.queue.push(url);
    }

    /**
     * load an asset
     * @param {string} url url to be loaded
     */
    load(url){
        this.totalAssets++;
        let type = url.split(".");
        this.loadIntoMemory(url,type[1]);
    }
    
    /**
     * load all the queued assets
     * @param {Function} callback function to be called when assets are done loading
     */
    loadAssets(callback){
        if(callback != undefined){
            this.setCallback(callback);
        }
        if(this.isDone()){
            this.callback();
        }
        for(let i in this.queue){
            let url = this.queue[i];
            let type = url.split(".");
            this.loadIntoMemory(url,type[1]);
        }
    }

    /**
     * return the asset requested by its url
     * @param {string} url url of asset to retrieve
     * @return {*} asset that was retrieved
     */
    get(url){
        return this.cache[url];
    }

    /**
     * pass the url and type to a specific loader to be loaded into memory
     * @private
     * @param {string} url url to asset to load
     * @param {string} type type of asset to load
     */
    loadIntoMemory(url,type){
        if(type == "png" || type == "jpg" || type == "jpeg"){
            this.imageLoader.load(url,this);
        }else if(type == "mp3" || type == "wav" || type == "ogg"){
            this.audioLoader.load(url,this);
        }else if(type == "json"){
            this.jsonLoader.load(url,this);
        }else{
            console.error(`Failed to load asset: { url: ${url}}`);
        }
    }

    /**
     * check if all the assets are done loading
     * @private
     * @return {boolean} is the assets done loading
     */
    isDone(){
        if(this.totalAssets == this.successCount + this.errorCount){
            this.totalAssets = 0;
            this.queue = [];
            return true;
        }
        return false;
    }
}