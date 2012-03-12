// Fun - http://en.wikipedia.org/wiki/Family_tree_of_the_Greek_gods
(function(window, undefined){

    // The Night - http://en.wikipedia.org/wiki/Nyx
    var Nyx = function(selector, context){
        return Object.create(Chaos).init(selector, context);
    };

    // Cow - http://en.wikipedia.org/wiki/Io_(mythology)
    var io;

    // Void - http://en.wikipedia.org/wiki/Chaos_(cosmogony)
    var Chaos = {
        version: "1.0",
        selector: "",
        context: window.document,
        length: 0,
        init: function(selector, context){
            io = this;
            return Selene.parse(selector, context);
        },
        push: Array.prototype.push,
        splice: [].splice
    };

    // Moon - http://en.wikipedia.org/wiki/Selene
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
                if(typeof context === "undefined") {
                    context = io.context;
                } else {
                    io.context = context;
                }
                return this.css(selector, context);
            }
            // Invalid Selector
            throw new Error("Invalid Selector");
        },
        css: function(selector, context){
            selector = io.selector = this.clean(selector);
            var items = selector.split(/\s+/),
                cur = [];
            // Id selector
            if(items[0][0] === "#") {
                var item = items.shift();
                cur[0] = document.getElementById(item.substring(1));
                if(!items.length) {
                    io[0] = cur[0];
                    io.length = 1;
                    return io;
                }
            }
        },
        clean: function(selector){
            return selector.substring(selector.lastIndexOf("#"));
        }
    };

    // Darkness - http://en.wikipedia.org/wiki/Erebus
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

    window.Nyx = window.$ = Nyx;
}((window === undefined) ? this : window));