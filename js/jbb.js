var jBB;
(function (jBB) {
    var jColor = /** @class */ (function () {
        function jColor(red, green, blue, alpha) {
            if (red === void 0) { red = 0; }
            if (green === void 0) { green = 0; }
            if (blue === void 0) { blue = 0; }
            if (alpha === void 0) { alpha = 1.0; }
            var _this = this;
            this.red = 0;
            this.green = 0;
            this.blue = 0;
            this.alpha = 1.0;
            this.rgba = function () {
                return "rgba(" + _this.red + ", " + _this.green + ", " + _this.blue + ", " + _this.alpha + ")";
            };
            this.set = function (r, g, b, a) {
                if (r === void 0) { r = 0; }
                if (g === void 0) { g = 0; }
                if (b === void 0) { b = 0; }
                if (a === void 0) { a = 1.0; }
                _this.red = r;
                _this.green = g;
                _this.blue = b;
                _this.alpha = a;
            };
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = alpha;
        }
        return jColor;
    }());
    jBB.jColor = jColor;
})(jBB || (jBB = {}));
var jBB;
(function (jBB) {
    var jImage = /** @class */ (function () {
        function jImage(arg01, arg02, arg03) {
            var _this = this;
            this.img = new Image();
            this.loaded = false;
            this.frames = 1;
            if (arg01 instanceof jBB.Core) {
                this.context = arg01;
            }
            else if (typeof (arg01) === "string") {
                // load image
                this.img.src = arg01;
                this.context = arg02;
                this.img.onload = function (data) {
                    _this.loaded = true;
                };
            }
            else if (typeof (arg01) === "number") {
                // create a new image
                this.img.width = arg01;
                this.img.height = arg01;
                this.context = arg03;
            }
        }
        return jImage;
    }());
    jBB.jImage = jImage;
})(jBB || (jBB = {}));
var jBB;
(function (jBB) {
    var Core = /** @class */ (function () {
        function Core(arg01, arg02, arg03) {
            var _this = this;
            this.data = {
                lastID: 0,
                canvas: {
                    element: null,
                    ctx: null,
                    id: "",
                    x: 0,
                    y: 0,
                    width: 640,
                    height: 480
                },
                mainLoop: "main",
                color: {
                    cls: new jBB.jColor(),
                    draw: new jBB.jColor(255, 255, 255, 1.0)
                },
                global: {
                    autoMidHandle: false,
                    globalAlpha: 1.0
                }
            };
            this.getCanvasElement = function () {
                _this.data.canvas.element = document.getElementById(_this.data.canvas.id);
            };
            this.createCanvasElement = function () {
                _this.data.canvas.element = document.createElement("canvas");
                _this.data.canvas.element.id = _this.data.canvas.id;
                _this.data.canvas.element.width = _this.data.canvas.width;
                _this.data.canvas.element.height = _this.data.canvas.height;
                _this.data.canvas.element.appendChild(document.createTextNode("your browser doesn't support the canvas element"));
                document.body.appendChild(_this.data.canvas.element);
            };
            this.preRender = function () {
                _this.data.canvas.ctx.save();
            };
            this.postRender = function () {
                _this.data.canvas.ctx.restore();
            };
            this.render = function () {
                window.requestAnimationFrame(_this.render);
                _this.preRender();
                window[_this.data.mainLoop]();
                _this.postRender();
            };
            /**
             * Löscht das Canvas in der eingestellten Farbe
             */
            this.cls = function () {
                _this.data.canvas.ctx.fillStyle = _this.data.color.cls.rgba();
                _this.data.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
                _this.data.canvas.ctx.fillRect(0, 0, _this.data.canvas.width, _this.data.canvas.height);
            };
            /**
             * Setzt die Löschfarbe für @cls()
             *
             * @param r - die Rotkomponente der Farbe
             * @param g - die Grünkomponente der Farbe
             * @param b - die Blaukomponente der Farbe
             */
            this.clsColor = function (r, g, b) {
                _this.data.color.cls.set(r, g, b);
            };
            this.color = function (r, g, b, a) {
                if (r === void 0) { r = 255; }
                if (g === void 0) { g = 255; }
                if (b === void 0) { b = 255; }
                if (a === void 0) { a = 1.0; }
                _this.data.color.draw.set(r, g, b, a);
            };
            this.graphicsWidth = function () {
                return _this.data.canvas.width;
            };
            this.graphicsHeight = function () {
                return _this.data.canvas.height;
            };
            this.rect = function (x, y, width, height, filled) {
                if (filled === void 0) { filled = true; }
                if (filled) {
                    _this.data.canvas.ctx.fillStyle = _this.data.color.draw.rgba();
                    _this.data.canvas.ctx.fillRect(x, y, width, height);
                }
                else {
                    _this.data.canvas.ctx.strokeStyle = _this.data.color.draw.rgba();
                    _this.data.canvas.ctx.strokeRect(x, y, width, height);
                }
            };
            this.line = function (startX, startY, endX, endY) {
                _this.data.canvas.ctx.strokeStyle = _this.data.color.draw.rgba();
                _this.data.canvas.ctx.beginPath();
                _this.data.canvas.ctx.moveTo(startX, startY);
                _this.data.canvas.ctx.lineTo(endX, endY);
                _this.data.canvas.ctx.stroke();
            };
            this.loadImage = function (path) {
                var img = new jBB.jImage(path, _this);
            };
            if (typeof (arg01) == "number") {
                // (width, height, [mainloop])
                this.data.lastID++;
                this.data.canvas.id = "jbbCanvas" + this.data.lastID;
                this.data.canvas.width = arg01;
                if (typeof (arg02) == "number")
                    this.data.canvas.height = arg02;
                if (typeof (arg03) == "string")
                    this.data.mainLoop = arg03;
                this.createCanvasElement();
            }
            else if (typeof (arg01) == "string") {
                // (canvasID, [mainLoop])
                this.data.canvas.id = arg01;
                if (typeof (arg02) == "string")
                    this.data.mainLoop = arg02;
                this.getCanvasElement();
            }
            this.data.canvas.ctx = this.data.canvas.element.getContext('2d');
            this.data.canvas.ctx.lineWidth = 1;
            window.requestAnimationFrame(this.render);
        }
        return Core;
    }());
    jBB.Core = Core;
})(jBB || (jBB = {}));
var jBBContext = {
    context: undefined
};
function Graphics(width, height) {
    if (width === void 0) { width = 640; }
    if (height === void 0) { height = 480; }
    jBBContext.context = new jBB.Core(width, height, 0);
}
function Cls() {
    jBBContext.context.cls();
}
function ClsColor(red, green, blue) {
    if (red === void 0) { red = 0; }
    if (green === void 0) { green = 0; }
    if (blue === void 0) { blue = 0; }
    jBBContext.context.clsColor(red, green, blue);
}
function Color(red, green, blue, alpha) {
    if (red === void 0) { red = 255; }
    if (green === void 0) { green = 255; }
    if (blue === void 0) { blue = 255; }
    if (alpha === void 0) { alpha = 1.0; }
    jBBContext.context.color(red, green, blue, alpha);
}
function GraphicsWidth() {
    return jBBContext.context.graphicsWidth();
}
function GraphicsHeight() {
    return jBBContext.context.graphicsHeight();
}
function Rect(x, y, width, height, filled) {
    if (filled === void 0) { filled = 1; }
    var f = true;
    if (filled !== 1)
        f = false;
    jBBContext.context.rect(x, y, width, height, filled);
}
function Line(startX, startY, endX, endY) {
    jBBContext.context.line(startX, startY, endX, endY);
}
function LoadImage(path) {
    return jBBContext.context.loadImage(path);
}