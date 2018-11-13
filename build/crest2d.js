(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Crest = {})));
}(this, (function (exports) { 'use strict';

    //Display.js
    //Author - Arcxes

    /*
        Display is used to create the canvas element, and initialize a graphics context
    */
    //Display Class
    var Display =
    /*#__PURE__*/
    function () {
      function Display(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "C2DC";
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        this.audioContext = new window.AudioContext() || new window.webkitAudioContext();
        window.audioContext = this.audioContext;
        window.activeSounds = {};
      } //add the canvas to the DOM and create the graphics context


      var _proto = Display.prototype;

      _proto.create = function create() {
        document.body.appendChild(this.canvas);
        window.canvas = this.canvas;
        window.ctx = this.ctx;
      }; //clear the canvas


      _proto.clear = function clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }; //resize the canvas


      _proto.resize = function resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
      };

      return Display;
    }();

    //Application.js
    //Author - Arcxes

    /*
        Application is designed to give a cleaner structure to using Crest2D and handle things behind the scenes
    */
    //Application Class
    var Application =
    /*#__PURE__*/
    function () {
      function Application() {
        this.preload = null;
        this.create = null;
        this.render = null;
      } //start the application


      var _proto = Application.prototype;

      _proto.start = function start(loader) {
        loader.setCallback(this.internalCreate());
        this.preload();
      }; //set the preload function


      _proto.registerPreLoad = function registerPreLoad(preload) {
        this.preload = preload;
      }; //set the create function


      _proto.registerCreate = function registerCreate(start) {
        this.start = start;
      }; //set the render function


      _proto.registerRender = function registerRender(render) {
        this.render = render;
      }; //application's internal create function


      _proto.internalCreate = function internalCreate() {
        this.create();
        requestAnimationFrame(internalRender);
      }; //application's internal render function


      _proto.internalRender = function internalRender() {
        this.render();
        requestAnimationFrame(this.render);
      };

      return Application;
    }();

    //InputManager.js
    //Author - Arcxes

    /*
        InputManager is designed to unify click and touch events into a single click event
    */
    //InputManager Class
    var InputManager =
    /*#__PURE__*/
    function () {
      function InputManager() {}

      //add a click event to the element
      InputManager.addClickEvent = function addClickEvent(element, callback, options) {
        if (options === void 0) {
          options = false;
        }

        element.addEventListener("click", callback, options);
        element.addEventListener("touchstart", callback, options);
      }; //remover click event from the element


      InputManager.removeClickEvent = function removeClickEvent(element, callback, options) {
        if (options === void 0) {
          options = false;
        }

        element.removeEventListener("click", callback, options);
        element.removeEventListener("touchstart", callback, options);
      };

      return InputManager;
    }();

    //AudioDevice.js
    //Author - Arcxes

    /*
        AudioDevice is designed to handle unlocking access.
    */
    //AudioDevice Class
    var AudioDevice =
    /*#__PURE__*/
    function () {
      function AudioDevice() {}

      //enable audio access when the element is clicked
      AudioDevice.enableAudioAccess = function enableAudioAccess(element) {
        try {
          var context = window.audioContext;

          if (context.state == "suspended") {
            var unlock = function unlock() {
              context.resume().then(function () {
                element.removeEventListener("touchstart", unlock);
                element.removeEventListener("touchend", unlock);
                element.removeEventListener("click", unlock);
              });
            };

            element.addEventListener("touchstart", unlock);
            element.addEventListener("touchend", unlock);
            element.addEventListener("click", unlock);
          }
        } catch (error) {
          console.error(error);
        }
      }; //create an audio source based on audio data


      AudioDevice.makeSource = function makeSource(buffer, volume) {
        var context = window.audioContext;
        var source = context.createBufferSource();
        var gainNode = context.createGain();
        gainNode.gain.value = volume;
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(context.destination);
        return source;
      }; //return the volume in data or percentage format


      AudioDevice.translateVolume = function translateVolume(volume, inverse) {
        return inverse ? volime * 100 : volume / 100;
      }; //stop an audio source playback


      AudioDevice.stop = function stop(url) {
        if (window.activeSounds.hasOwnProperty(url)) {
          for (var i in window.activeSounds[url]) {
            if (window.activeSounds[url].hasOwnProperty(i)) {
              window.activeSounds[url][i].stop();
            }
          }
        }
      }; //register an audio source as playing


      AudioDevice.registerSound = function registerSound(url, source) {
        if (!window.activeSounds.hasOwnProperty(url)) {
          window.activeSounds[url] = [];
        }

        window.activeSounds[url].push(source);
      };

      return AudioDevice;
    }();

    //Audio.js

    var Audio =
    /*#__PURE__*/
    function () {
      function Audio(url, buffer) {
        this.url = url;
        this.buffer = buffer;
        this.looping = false;
        this.volume = 1;
      } //play the audio


      var _proto = Audio.prototype;

      _proto.play = function play() {
        var source = AudioDevice.makeSource(this.buffer, this.volume);
        source.loop = this.looping;
        source.start();
        AudioDevice.registerSound(this.url, source);
      }; //stop the audio


      _proto.stop = function stop() {
        AudioDevice.stop(this.url);
      }; //return the volume of the audio


      _proto.getVolume = function getVolume() {
        return AudioDevice.translateVolume(this.volume, true);
      }; //set the volume of the audio


      _proto.setVolume = function setVolume(volume) {
        this.volume = AudioDevice.translateVolume(volume);
      }; //set the looping property of the audio


      _proto.setLooping = function setLooping(looping) {
        this.looping = looping;
      }; //return the state of the audio's looping property


      _proto.isLooping = function isLooping() {
        return this.looping;
      };

      return Audio;
    }();

    //Time.js
    //Author - Arcxes

    /*
        Time is designed to hold classes for each time unit used
    */
    //DeltaTime Class
    var DeltaTime =
    /*#__PURE__*/
    function () {
      function DeltaTime() {
        this.now = 0;
        this.delta = 0;
        this.then = 0;
      } //update the delta time value


      var _proto = DeltaTime.prototype;

      _proto.tick = function tick() {
        this.now = performance.now();
        this.delta = (this.now - this.then) / 1000;
        this.then = this.now;
      }; //return the value of delta


      _proto.getDelta = function getDelta() {
        return this.delta;
      };

      return DeltaTime;
    }();

    //SpriteBatch.js
    //Author - Arcxes

    /*
        SpriteBatch is designed to render graphics to the Display
    */
    //SpriteBatch Class
    var SpriteBatch =
    /*#__PURE__*/
    function () {
      function SpriteBatch() {
        this.ctx = window.ctx;
      } //disable the pixel blending


      var _proto = SpriteBatch.prototype;

      _proto.disablePixelBlending = function disablePixelBlending() {
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
      }; //set the draw color of the drawing context


      _proto.setColor = function setColor(color) {
        this.ctx.fillStyle = color;
      }; //set the alpha value for the drawing context


      _proto.setAlpha = function setAlpha(alpha) {
        this.ctx.globalAlpha = alpha;
      }; //set the font for the drawing context


      _proto.setFont = function setFont(font) {
        this.ctx.font = font;
      }; //set the line width of the drawing context


      _proto.setLineWidth = function setLineWidth(width) {
        this.ctx.lineWidth = width;
      }; //draw an image to the screen


      _proto.drawImage = function drawImage(image, x, y, width, height) {
        this.ctx.drawImage(image, x, y, width, height);
      }; //draw text to the screen


      _proto.drawText = function drawText(text, x, y) {
        this.ctx.fillText(text, x, y);
      }; //draw a rect to the screen


      _proto.drawRect = function drawRect(x, y, width, height) {
        this.ctx.fillRect(x, y, width, height);
      }; //draw a circle to the screen


      _proto.drawCircle = function drawCircle(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 2 * Math.PI, false);
        ctx.fill();
      }; //draw an outlined rect to the screen


      _proto.drawStroke = function drawStroke(x, y, width, height) {
        core.ctx.strokeRect(x, y, width, height);
      };

      return SpriteBatch;
    }();

    //SpriteSheet.js
    //Author - Arcxes

    /*
        SpriteSheet is designed to be a representive of the settings of a spritesheet image
    */
    //SpriteSheet Class
    var SpriteSheet = function SpriteSheet(image, cols, rows) {
      this.image = image;
      this.cols = cols;
      this.rows = rows;
    };

    //Animation.js
    //Author - Arcxes

    /*
        Animation is designed to take in a spritesheet an animate it with each row being a seperate animation
    */
    //Animation Class
    var Animation =
    /*#__PURE__*/
    function () {
      function Animation(spritesheet, frameWidth, frameHeight) {
        this.image = spritesheet.image;
        this.cols = spritesheet.cols;
        this.rows = spritesheet.rows;
        this.frameWidth = frameWidth || this.image.width / this.cols;
        this.frameHeight = frameHeight || this.image.height / this.rows;
        this.colIndex = 0;
        this.rowIndex = 0;
        this.ctx = window.ctx;
      } //update the current frame


      var _proto = Animation.prototype;

      _proto.update = function update(speed) {
        this.colIndex += speed;
        this.resetModX = Math.floor(this.colIndex % this.cols);
      }; //render the current frame


      _proto.draw = function draw(x, y, width, height) {
        this.ctx.drawImage(this.image, this.resetModX * this.frameWidth, this.rowIndex * this.frameHeight, this.frameWidth, this.frameHeight, x, y, width, height);
      }; //set the row index


      _proto.setFrameRow = function setFrameRow(rowIndex) {
        this.rowIndex = rowIndex;
      }; //set the current frame


      _proto.setFrame = function setFrame(colIndex, rowIndex) {
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
        this.resetModX = Math.floor(this.colIndex % this.cols);
      };

      return Animation;
    }();

    //Rectangle.js
    //Author - Arcxes

    /*
        Rectangle is designed to handle rect collistion detection
    */
    //Rectangle Class
    var Rectangle =
    /*#__PURE__*/
    function () {
      function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
      } //check if the rectangle overlaps another rectangle


      var _proto = Rectangle.prototype;

      _proto.overlaps = function overlaps(rectangle) {
        return this.x < rectangle.x + rectangle.width && this.x + this.width > rectangle.x && this.y < rectangle.y + rectangle.height && this.y + this.height > rectangle.y;
      }; //check if the rectangle is inside another rectangle


      _proto.within = function within(rectangle) {
        return rectangle.x <= this.x && rectangle.right >= this.right && rectangle.y <= this.y && rectangle.bottom >= this.bottom;
      }; //check if the coordinates are inside this rectangle


      _proto.contains = function contains(x, y) {
        return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
      }; //set the position of the rectangle


      _proto.setPosition = function setPosition(x, y) {
        this.x = x;
        this.y = y;
      }; //set the size of the rectangle


      _proto.setSize = function setSize(width, height) {
        this.width = width;
        this.height = height;
      };

      return Rectangle;
    }();

    //Circle.js
    //Author - Arcxes

    /*
        Circle is designed to handle circle collistion detection
    */
    //Circle Class
    var Circle =
    /*#__PURE__*/
    function () {
      function Circle(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
      } //check if the circle overlaps another circle


      var _proto = Circle.prototype;

      _proto.overlaps = function overlaps(circle) {
        var distance = Math.sqrt((this.x - circle.x) * (this.x - circle.x + (this.y - circle.y)) * (this.y - circle.y));
        return distance < this.radius + circle.radius;
      };

      return Circle;
    }();

    //Viewport.js
    //Author - Arcxes

    /*
        Viewport is designed to be used with Camera for keeping track of the Camera view
    */
    //Viewport Class
    var Viewport = function Viewport() {
      this.left = 0;
      this.right = 0;
      this.top = 0;
      this.bottom = 0;
      this.width = 0;
      this.height = 0;
      this.scale = {
        x: 0,
        y: 0
      };
      this.viewBuffer = 100;
    };

    //Camera.js

    var Camera =
    /*#__PURE__*/
    function () {
      function Camera(x, y) {
        if (x === void 0) {
          x = 0;
        }

        if (y === void 0) {
          y = 0;
        }

        this.position = {
          x: x,
          y: y
        };
        this.distance = 1000;
        this.fov = Math.PI / 4;
        this.viewport = new Viewport();
        this.canvas = window.canvas;
        this.ctx = window.ctx;
        this.update();
      } //start camera calculations


      var _proto = Camera.prototype;

      _proto.begin = function begin() {
        this.ctx.save();
        this.applyScale();
        this.applyTranslation();
      }; //stop the camera calculations


      _proto.end = function end() {
        this.ctx.restore();
      }; //apply the scale to the drawing context


      _proto.applyScale = function applyScale() {
        this.ctx.scale(this.viewport.scale.x, this.viewport.scale.y);
      }; //apply the translation to the drawing context


      _proto.applyTranslation = function applyTranslation() {
        this.ctx.translate(-this.viewport.left, -this.viewport.top);
      }; //update the viewport


      _proto.update = function update() {
        this.aspectRatio = this.canvas.width / this.canvas.height;
        this.viewport.width = this.distance * Math.tan(this.fov);
        this.viewport.height = this.viewport.width / this.aspectRatio;
        this.viewport.left = this.position.x - this.viewport.width / 2.0;
        this.viewport.top = this.position.y - this.viewport.height / 2.0;
        this.viewport.right = this.viewport.left + this.viewport.width;
        this.viewport.bottom = this.viewport.top + this.viewport.height;
        this.viewport.scale.x = this.canvas.width / this.viewport.width;
        this.viewport.scale.y = this.canvas.height / this.viewport.height;
      }; //set the zoom distance


      _proto.setZoom = function setZoom(distance) {
        this.distance = distance;
        this.update();
      }; //set the frustum culling buffer


      _proto.setViewBuffer = function setViewBuffer(buffer) {
        this.viewport.viewBuffer = buffer;
      }; //set the camera position


      _proto.setPosition = function setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.update();
      }; //convert screen coordinates to world coordinates


      _proto.screenToWorld = function screenToWorld(x, y) {
        var coords = {};
        coords.x = x / this.viewport.scale.x + this.viewport.left;
        coords.y = y / this.viewport.scale.y + this.viewport.top;
        return coords;
      }; //convery world coordinates to screen coordinates


      _proto.worldToScreen = function worldToScreen(x, y) {
        var coords = {};
        coords.x = (x - this.viewport.left) * this.viewport.scale.x;
        coords.y = (y - this.viewport.top) * this.viewport.scale.y;
        return coords;
      }; //check if a position is in the camera viewport


      _proto.inView = function inView(x, y) {
        return x >= this.position.x - this.viewport.viewBuffer && x <= this.position.x + this.viewport.width + this.viewport.viewBuffer && y >= this.position.y - this.viewport.viewBuffer && y <= this.position.y + this.viewport.height + this.viewBuffer;
      };

      return Camera;
    }();

    //ImageLoader.js
    //Author - Arcxes

    /*
        ImageLoader is designed to load images
    */
    //ImageLoader Class
    var ImageLoader =
    /*#__PURE__*/
    function () {
      function ImageLoader() {}

      var _proto = ImageLoader.prototype;

      //load an image
      _proto.load = function load(url, loader) {
        var image = new Image();
        image.addEventListener("load", function () {
          loader.successCount++;
          loader.cache[url] = image;

          if (loader.isDone()) {
            loader.callback();
          }
        });
        image.addEventListener("error", function () {
          loader.errorCount++;
          console.error("Failed to load asset: { url: " + url + "}");

          if (loader.isDone()) {
            loader.callback();
          }
        });
        image.src = url;
      };

      return ImageLoader;
    }();

    //TiledMap.js
    //Author - Arcxes

    /*
        TiledMap is designed to load and render maps from the Tiled Map Editor
    */
    //TiledMap class
    var TiledMap =
    /*#__PURE__*/
    function () {
      function TiledMap(url, data) {
        this.url = url;
        this.data = data;
        this.tilesets = [];
        this.tiles = [];
        this.tiles.push(null);
        this.image = null;
        this.x = 0;
        this.y = 0;
        this.totalTiles = 0;
        this.folder = this.url.substring(0, this.url.lastIndexOf("/"));
        this.success = null;
        this.error = null;
        this.ctx = window.ctx;
      } //set the success and error callbacks of the tiled map


      var _proto = TiledMap.prototype;

      _proto.setCallbacks = function setCallbacks(success, error) {
        this.success = success;
        this.error = error;
        this.loadTilesets();
      }; //load the tilesets


      _proto.loadTilesets = function loadTilesets() {
        var _this = this;

        var self = this;
        var successCount = 0;
        var errorCount = 0;

        var _loop = function _loop(ts) {
          var image = new Image();
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

          if (_this.folder.length >= 1) {
            _this.folder += "/";
          }

          image.src = _this.folder + _this.data.tilesets[ts].image;
        };

        for (var ts = 0; ts < this.data.tilesets.length; ts++) {
          _loop(ts);
        }
      }; //split the tilesets into seperate tiles


      _proto.seperateTiles = function seperateTiles() {
        var self = this;

        for (var ts = 0; ts < this.tilesets.length; ts++) {
          var nTilesX = this.tilesets[ts].width / this.data.tilewidth;
          var nTilesY = this.tilesets[ts].height / this.data.tileheight;
          this.totalTiles = nTilesX * nTilesY;

          for (var ty = 0; ty < nTilesY; ty++) {
            for (var tx = 0; tx < nTilesX; tx++) {
              var tileCanvas = document.createElement("canvas");
              var tileContext = tileCanvas.getContext("2d");
              tileCanvas.width = this.data.tilewidth;
              tileCanvas.height = this.data.tileheight;
              var x = tx * this.data.tilewidth;
              var y = ty * this.data.tileheight;
              tileContext.drawImage(this.tilesets[ts], -x, -y);
              this.tiles.push(tileCanvas);

              if (this.totalTiles == self.tiles.length - 1) {
                this.predraw();
              }
            }
          }
        }
      }; //predraw the map and save it as an image


      _proto.predraw = function predraw() {
        var mapCanvas = document.createElement("canvas");
        mapCanvas.width = this.data.width * this.data.tilewidth;
        mapCanvas.height = this.data.height * this.data.tileheight;
        var mapContext = mapCanvas.getContext("2d");

        for (var l = 0; l < this.data.layers.length; l++) {
          var x = 0;
          var y = 0;

          if (this.data.layers[l].type == "tilelayer") {
            for (var d = 0; d < this.data.layers[l].data.length; d++) {
              if (d % this.data.width == 0 && d != 0) {
                y += this.data.tileheight;
                x = 0;
              }

              if (this.data.layers[l].data[d] != 0) {
                var tile = this.tiles[this.data.layers[l].data[d]];
                mapContext.drawImage(tile, x, y);
              }

              x += this.data.tilewidth;
            }
          }
        }

        var self = this;
        this.image = new Image();
        this.image.addEventListener("load", function () {
          self.success();
        });
        this.image.addEventListener("error", function () {
          console.error("Failed to convert map canvas to image");
          self.error();
        });
        this.image.src = mapCanvas.toDataURL("image/png");
      }; //render the tiled map


      _proto.render = function render() {
        this.ctx.drawImage(this.image, this.x, this.y);
      }; //set the map position


      _proto.setPosition = function setPosition(x, y) {
        this.x = x;
        this.y = y;
      };

      return TiledMap;
    }();

    //Author - Arcxes

    /*
        JSONLoader is designed to load json data
    */
    //JSONLoader Class

    var JSONLoader =
    /*#__PURE__*/
    function () {
      function JSONLoader() {}

      var _proto = JSONLoader.prototype;

      //load JSON data and (OPTIONAL)load it into whatever format specified in the data
      _proto.load = function load(url, loader) {
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open("GET", url, true);

        request.onload = function () {
          var data = JSON.parse(request.response);
          console.log(data);

          if (data.tiledversion != null) {
            var map = new TiledMap(url, data);
            console.log(map);

            var success = function success() {
              loader.successCount++;
              loader.cache[url] = map;

              if (loader.isDone()) {
                loader.callback();
              }
            };

            var error = function error() {
              loader.errorCount++;
              console.error("Failed to load asset: { url: " + url + "}");

              if (loader.isDone()) {
                loader.callback();
              }
            };

            map.setCallbacks(success, error);
          } else {
            loader.successCount++;
            loader.cache[url] = data;

            if (loader.isDone()) {
              loader.callback();
            }
          }
        };

        request.onerror = function () {
          loader.errorCount++;
          console.error("Failed to load asset: { url: " + url + "}");

          if (loader.isDone()) {
            loader.callback();
          }
        };

        request.send();
      };

      return JSONLoader;
    }();

    //AudioLoader.js

    var AudioLoader =
    /*#__PURE__*/
    function () {
      function AudioLoader() {
        this.context = window.audioContext;
      } //load the audio source as an Audio object


      var _proto = AudioLoader.prototype;

      _proto.load = function load(url, loader) {
        var request = new XMLHttpRequest();
        request.responseType = "arraybuffer";
        request.open("GET", url, true);
        var self = this;

        request.onload = function () {
          self.context.decodeAudioData(request.response, function (buffer) {
            if (!buffer) {
              console.error("Failed to load asset: { url: " + url + "}");
              return;
            }

            var audio = new Audio(url, buffer);
            loader.successCount++;
            loader.cache[url] = audio;

            if (loader.isDone()) {
              loader.callback();
            }
          });
        };

        request.onerror = function () {
          loader.errorCount++;
          console.error("Failed to load asset: { url: " + url + "}");

          if (loader.isDone()) {
            loader.callback();
          }
        };

        request.send();
      };

      return AudioLoader;
    }();

    //Loader.js

    var Loader =
    /*#__PURE__*/
    function () {
      function Loader() {
        this.successCount = 0;
        this.errorCount = 0;
        this.totalAssets = 0;
        this.cache = {};
        this.queue = [];
        this.callback = null;
        this.imageLoader = new ImageLoader();
        this.jsonLoader = new JSONLoader();
        this.audioLoader = new AudioLoader();
      } //set the Loader callback


      var _proto = Loader.prototype;

      _proto.setCallback = function setCallback(callback) {
        this.callback = callback;
      }; //add an asset to be loaded


      _proto.add = function add(url) {
        this.totalAssets++;
        this.queue.push(url);
      }; //load an asset


      _proto.load = function load(url) {
        this.totalAssets++;
        var type = url.split(".");
        this.loadIntoMemory(url, type[1]);
      }; //load all the queued assets


      _proto.loadAssets = function loadAssets(callback) {
        if (callback != undefined) {
          this.setCallback(callback);
        }

        if (this.isDone()) {
          this.callback();
        }

        for (var i in this.queue) {
          var url = this.queue[i];
          var type = url.split(".");
          this.loadIntoMemory(url, type[1]);
        }
      }; //return the asset requested by its url


      _proto.get = function get(url) {
        return this.cache[url];
      }; //pass the url and type to a specific loader to be loaded into memory


      _proto.loadIntoMemory = function loadIntoMemory(url, type) {
        if (type == "png" || type == "jpg" || type == "jpeg") {
          this.imageLoader.load(url, this);
        } else if (type == "mp3" || type == "wav" || type == "ogg") {
          this.audioLoader.load(url, this);
        } else if (type == "json") {
          this.jsonLoader.load(url, this);
        } else {
          console.error("Failed to load asset: { url: " + url + "}");
        }
      }; //check if all the assets are done loading


      _proto.isDone = function isDone() {
        if (this.totalAssets == this.successCount + this.errorCount) {
          this.totalAssets = 0;
          this.queue = [];
          return true;
        }

        return false;
      };

      return Loader;
    }();

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    //Client.js
    //Author - Arcxes

    /*
        Client is designed to connect to a server, and send and receive packets
    */
    //Client Class
    var Client =
    /*#__PURE__*/
    function () {
      function Client(parser) {
        this.socket = null;
        this.parser = parser;
      }

      var _proto = Client.prototype;

      _proto.connect = function connect(url) {
        this.socket = new WebSocket(url);
        this.parser.register(this.socket);
      };

      _proto.send = function send(json) {
        this.socket.send(this.parser.encode(json));
      };

      _proto.parse = function parse(data) {
        return this.parser.decode(data);
      };

      _createClass(Client, [{
        key: "onopen",
        set: function set(callback) {
          this.socket.onopen = callback;
        }
      }, {
        key: "onmessage",
        set: function set(callback) {
          this.socket.onmessage = callback;
        }
      }, {
        key: "onerror",
        set: function set(callback) {
          this.socket.onerror = callback;
        }
      }, {
        key: "onclose",
        set: function set(callback) {
          this.socket.onclose = callback;
        }
      }]);

      return Client;
    }();

    //StringParser.js
    //Author - Arcxes

    /*
        StringParser is designed to be the default parser for the websocket client, it handles normal string data
    */
    //StringParser Class
    var StringParser =
    /*#__PURE__*/
    function () {
      function StringParser() {}

      var _proto = StringParser.prototype;

      _proto.register = function register(socket) {
        console.log("WebSocket: " + socket + " has been registered with StringParser");
      };

      _proto.encode = function encode(data) {
        return data;
      };

      _proto.decode = function decode(data) {
        return data;
      };

      return StringParser;
    }();

    //JSONParser.js
    //Author - Arcxes

    /*
        JSONParser is designed to convert json data to a string, ready to be sent over the network
    */
    //JSONParser Class
    var JSONParser =
    /*#__PURE__*/
    function () {
      function JSONParser() {}

      var _proto = JSONParser.prototype;

      _proto.register = function register(socket) {
        console.log("WebSocket: " + socket + " has been registered with JSONParser");
      };

      _proto.encode = function encode(data) {
        return JSON.stringify(json);
      };

      _proto.decode = function decode(data) {
        return JSON.parse(data);
      };

      return JSONParser;
    }();

    //BinaryParser.js
    //Author - Arcxes

    /*
        BinaryParser is designed to convert json data to binary data and binary data to json data
    */
    //BinaryParser Class
    var BinaryParser =
    /*#__PURE__*/
    function () {
      function BinaryParser() {
        this.byteMultiplier = 2;
      }

      var _proto = BinaryParser.prototype;

      _proto.register = function register(socket) {
        socket.binaryType = "arraybuffer";
        console.log("WebSocket: " + socket + " has been registered with BinaryParser");
      };

      _proto.encode = function encode(data) {
        var string = JSON.stringify(data);
        var buffer = new ArrayBuffer(string.length * this.byteMultiplier);
        var bufferView = new Uint16Array(buffer);
        var length = string.length;

        for (var i = 0; i < length; i++) {
          bufferView[i] = string.charCodeAt(i);
        }

        return buffer;
      };

      _proto.decode = function decode(data) {
        var string = String.fromCharCode.apply(null, new Uint16Array(data));
        var json = JSON.parse(string);
        return json;
      };

      return BinaryParser;
    }();

    //Copyright 2018 Arcxes Games. Crest2D

    exports.Display = Display;
    exports.Application = Application;
    exports.InputManager = InputManager;
    exports.AudioDevice = AudioDevice;
    exports.Audio = Audio;
    exports.DeltaTime = DeltaTime;
    exports.SpriteBatch = SpriteBatch;
    exports.SpriteSheet = SpriteSheet;
    exports.Animation = Animation;
    exports.Rectangle = Rectangle;
    exports.Circle = Circle;
    exports.Viewport = Viewport;
    exports.Camera = Camera;
    exports.Loader = Loader;
    exports.Client = Client;
    exports.StringParser = StringParser;
    exports.JSONParser = JSONParser;
    exports.BinaryParser = BinaryParser;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
