//TiledMap.js
//Author - Arcxes

/*
    TiledMap is designed to load and render maps from the Tiled Map Editor
*/

//TiledMap class
export class TiledMap {

    /**
     * 
     * @param {string} url 
     * @param {Object} data 
     */
    constructor(url, data) {
        /** asset url */
        this.url = url;
        /** tiledmap data */
        this.data = data;
        /** tileset images */
        this.tilesets = [];
        /** tiles in the tilemap */
        this.tiles = [];

        this.tiles.push(null);
        /** tilemap image */
        this.image = null;
        /** x coord of the map */
        this.x = 0;
        /** y coord of the map */
        this.y = 0;
        /** amount of tiles loaded */
        this.totalTiles = 0;
        /** folder location of the tiledmap */
        this.folder = this.url.substring(0, this.url.lastIndexOf("/"));
        /** success callback */
        this.success = null;
        /** error callback */
        this.error = null;
    }

    /**
     * set the success and error callbacks of the tiled map
     * @param {Function} success callback if loading succeeds
     * @param {Function} error callback if loading fails
     */
    setCallbacks(success, error) {
        this.success = success;
        this.error = error;
        this.loadTilesets();
    }

    /**
     * load the tilesets
     */
    loadTilesets() {
        let self = this;
        let successCount = 0;
        let errorCount = 0;
        for (let ts = 0; ts < this.data.tilesets.length; ts++) {
            let image = new Image();
            image.addEventListener("load", function () {
                successCount++;
                self.tilesets.push(image);
                if (successCount + errorCount == self.data.tilesets.length) {
                    self.seperateTiles();
                }
            });
            image.addEventListener("error", function () {
                errorCount++;
                console.error("Failed to load: " + self.data.tilesets[ts].image);
                self.error();
            });
            if (this.folder.length >= 1) {
                this.folder += "/";
            }
            image.src = this.folder + this.data.tilesets[ts].image;
        }
    }

    /** split the tilesets into seperate tiles */
    seperateTiles() {
        let self = this;
        for (let ts = 0; ts < this.tilesets.length; ts++) {
            let nTilesX = this.tilesets[ts].width / this.data.tilewidth;
            let nTilesY = this.tilesets[ts].height / this.data.tileheight;
            this.totalTiles = nTilesX * nTilesY;

            for (let ty = 0; ty < nTilesY; ty++) {
                for (let tx = 0; tx < nTilesX; tx++) {
                    let tileCanvas = document.createElement("canvas");
                    let tileContext = tileCanvas.getContext("2d");

                    tileCanvas.width = this.data.tilewidth;
                    tileCanvas.height = this.data.tileheight;

                    let x = tx * this.data.tilewidth;
                    let y = ty * this.data.tileheight;
                    tileContext.drawImage(this.tilesets[ts], -x, -y);

                    this.tiles.push(tileCanvas);

                    if (this.totalTiles == (self.tiles.length - 1)) {
                        this.predraw();
                    }
                }
            }
        }
    }

    /** predraw the map and save it as an image */
    predraw() {
        let mapCanvas = document.createElement("canvas");
        mapCanvas.width = this.data.width * this.data.tilewidth;
        mapCanvas.height = this.data.height * this.data.tileheight;

        let mapContext = mapCanvas.getContext("2d");
        for (let l = 0; l < this.data.layers.length; l++) {
            let x = 0;
            let y = 0;
            if (this.data.layers[l].type == "tilelayer") {
                for (let d = 0; d < this.data.layers[l].data.length; d++) {
                    if (d % this.data.width == 0 && d != 0) {
                        y += this.data.tileheight;
                        x = 0;
                    }

                    if (this.data.layers[l].data[d] != 0) {
                        let tile = this.tiles[this.data.layers[l].data[d]];
                        mapContext.drawImage(tile, x, y);
                    }
                    x += this.data.tilewidth;
                }
            }
        }
        let self = this;
        this.image = new Image();
        this.image.addEventListener("load", function () {
            self.success();
        });
        this.image.addEventListener("error", function () {
            console.error("Failed to convert map canvas to image");
            self.error();
        });
        this.image.src = mapCanvas.toDataURL("image/png");
    }

    /** render the tiled map */
    render() {
        ctx.drawImage(this.image, this.x, this.y);
    }

    /**
     * set the map position
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}


