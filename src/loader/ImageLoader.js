//ImageLoader.js
//Author - Arcxes

/*
    ImageLoader is designed to load images
*/

//ImageLoader Class
export class ImageLoader {

    /**
     * load an image
     * @param {string} url the url to an image
     * @param {Loader} loader the main loader
     */
    load(url, loader) {
        let image = new Image();
        image.addEventListener("load", function () {
            loader.successCount++;
            loader.cache[url] = image;
            if (loader.isDone()) {
                loader.callback();
            }
        });
        image.addEventListener("error", function () {
            loader.errorCount++;
            console.error(`Failed to load asset: { url: ${url}}`);
            if (loader.isDone()) {
                loader.callback();
            }
        });
        image.src = url;
    }
}