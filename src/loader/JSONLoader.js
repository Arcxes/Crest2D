import { TiledMap } from "../tiledmap/TiledMap";

//JSONLoader.js
//Author - Arcxes

/*
    JSONLoader is designed to load json data
*/

//JSONLoader Class
export class JSONLoader{

    //load JSON data and (OPTIONAL)load it into whatever format specified in the data
    load(url,loader){
        let request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open("GET",url,true);
        request.onload = function(){
            let data = JSON.parse(request.response);
            console.log(data);
            if(data.tiledversion != null){
                let map = new TiledMap(url,data);
                console.log(map);
                let success = function(){
                    loader.successCount++;
                    loader.cache[url] = map;
                    if(loader.isDone()){
                        loader.callback();
                    }
                };
                let error = function(){
                    loader.errorCount++;
                    console.error(`Failed to load asset: { url: ${url}}`);
                    if(loader.isDone()){
                        loader.callback();
                    }
                };
                map.setCallbacks(success,error);
            }else{
                loader.successCount++;
                loader.cache[url] = data;
                if(loader.isDone()){
                    loader.callback();
                }
            }
        };
        request.onerror = function(){
            loader.errorCount++;
            console.error(`Failed to load asset: { url: ${url}}`);
            if(loader.isDone()){
                loader.callback();
            }
        };
        request.send();
    }
}