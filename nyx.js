// Fun - http://en.wikipedia.org/wiki/Family_tree_of_the_Greek_gods
(function(window, undefined){

    // The Night - http://en.wikipedia.org/wiki/Nyx
    // Constructor
    var Nyx = function(selector, context){
        return Object.create(Chaos).init(selector, context);
    };

    // Cow - http://en.wikipedia.org/wiki/Io_(mythology)
    // Instance Variable
    var io;

    // Void - http://en.wikipedia.org/wiki/Chaos_(cosmogony)
    // Core
    var Chaos = {
        version: "1.0",
        selector: "",
        context: window.document,
        length: 0,
        init: function(selector, context){
            io = this;
            return Selene.parse(selector, context);
        },
        splice: [].splice
    };

    // Moon - http://en.wikipedia.org/wiki/Selene
    // Selector Engine
    var Selene = {
        parse: function(selector, context){
            // Empty
            if(!selector) {
                return io;
            }
            // DOM Elements
            if(selector.nodeType) {
                io.context = io[0] = selector;
                return io;
            }
            // CSS Selector
            if(typeof selector === "string") {
                return this.css(selector, context);
            }
            // Invalid Selector
            throw new Error("Invalid Selector");
        },
        css: function(selector, context) {
            selector = io.selector = this.clean(selector);
            var items = selector.split(/\s+/),
                parent = context || window.document,
                tmp = [];
            // Id selector
            if (items[0][0] === "#") {
                var item = items.shift();
                parent = parent.getElementById(item.substring(1));
                if (!items.length) {
                    io[0] = parent;
                    io.length = 1;
                    return io;
                }
            }
            items.forEach(function(item) {
                var subItems = item.split(".");
                if (subItems[0] !== "") {
                    var subItem = subItems.shift();
                    tmp = parent.getElementsByTagName(subItem);
                    if(!subItems.length) {
                        [].push.apply(io, tmp);
                        return io;
                    }
                } else {}
            });
            return io;
        },
        clean: function(selector){
            return selector.substring(selector.lastIndexOf("#"));
        }
    };

    // Darkness - http://en.wikipedia.org/wiki/Erebus
    // Event Handler
    var Erebus = {
    };

    // Polyfill for Old Browsers
    if(typeof Object.create !== "function") {
        Object.create = function(o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }
    if(typeof Array.prototype.forEach !== "function") {
        Array.prototype.forEach = function(fun, thisp) {
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") {
                throw new TypeError();
            }
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    fun.call(thisp, t[i], i, t);
                }
            }
        };
    }
    if(typeof Array.prototype.lastIndexOf !== "function") {
        Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/ ) {
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = len;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n !== n) {
                    n = 0;
                } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);

            for (; k >= 0; k--) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
    }

    window.Nyx = window.$ = Nyx;
}((window === undefined) ? this : window));