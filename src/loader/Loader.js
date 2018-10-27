//Loader.js
//Author - Arcxes

/*
    Loader is designed to load assets of all kinds of assets by passing the data to a specific loader and managing the results
*/

//imports
import {ImageLoader} from "./ImageLoader";
import {JSONLoader} from "./JSONLoader";
import {AudioLoader} from "./AudioLoader";

//Loader Class
export class Loader{

    constructor(){
        this.successCount = 0;
        this.errorCount = 0;
        this.totalAssets = 0;
        this.cache = {};
        this.queue = [];
        this.callback = null;
        this.imageLoader = new ImageLoader();
        this.jsonLoader = new JSONLoader();
        this.audioLoader = new AudioLoader();   
    }

    //set the Loader callback
    setCallback(callback){
        this.callback = callback;
    }

    //add an asset to be loaded
    add(url){
        this.totalAssets++;
        this.queue.push(url);
    }

    //load an asset
    load(url){
        this.totalAssets++;
        let type = url.split(".");
        this.loadIntoMemory(url,type[1]);
    }
    
    //load all the queued assets
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

    //return the asset requested by its url
    get(url){
        return this.cache[url];
    }

    //pass the url and type to a specific loader to be loaded into memory
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

    //check if all the assets are done loading
    isDone(){
        if(this.totalAssets == this.successCount + this.errorCount){
            this.totalAssets = 0;
            this.queue = [];
            return true;
        }
        return false;
    }
}