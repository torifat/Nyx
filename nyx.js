// Fun - http://en.wikipedia.org/wiki/Family_tree_of_the_Greek_gods
(function(window, undefined){

    // The Night - http://en.wikipedia.org/wiki/Nyx
    // Constructor
    var Nyx = function(selector, context){
        return Object.create(Chaos).init(selector, context);
    };

    // Void - http://en.wikipedia.org/wiki/Chaos_(cosmogony)
    // Core
    var Chaos = {
        version: "1.0",
        selector: "",
        context: window.document,
        length: 0,
        init: function(selector, context){
            return Selene.parse.call(this, selector, context);
        },
        push: [].push,
        splice: [].splice
    };
    Nyx.fn = Chaos;

    // Moon - http://en.wikipedia.org/wiki/Selene
    // Selector Engine
    var Selene = {
        parse: function(selector, context){
            // Empty
            if(!selector) {
                return this;
            }
            // Optimize for Body
            if(selector === "body" && typeof context === "undefined") {
                this.context = this[0] = this.context.body;
                return this;
            }
            // DOM Elements
            if(selector.nodeType) {
                this.context = this[0] = selector;
                return this;
            }
            // CSS Selector
            if(typeof selector === "string") {
                return Selene.css.call(this, selector, context);
            }
            // Invalid Selector
            throw new Error("Invalid Selector");
        },
        css: function(selector, context) {
            selector = this.selector = Selene.clean.call(this, selector);
            var items = selector.split(/\s+/),
                parents = [],
                cur = [];
            parents.push(context || window.document);
            // Id Selector
            if (items[0][0] === "#") {
                var item = items.shift();
                parent = parents[0].getElementById(item.substring(1));
                if (!items.length) {
                    this[0] = parent;
                    this.length = 1;
                    return this;
                }
            }
            // Others Selector - Tag, Class
            items.forEach(function(item) {
                cur = [];
                parents.forEach(function(parent){
                    var subItems = item.split(".");
                    // Tag Selector
                    if (subItems[0] !== "") {
                        [].push.apply(cur, Selene.getBy("Tag", parent, subItems));
                    } else {
                    // Class Selector
                        subItems.shift(); // remove the extra "" from front
                        [].push.apply(cur, Selene.getBy("Class", parent, subItems));
                    }
                });
                parents = cur.slice(0);
            });
            if(cur.length) {
                [].push.apply(this, cur);
            }
            return this;
        },
        clean: function(selector){
            return selector.substring(selector.lastIndexOf("#"));
        },
        getBy: function(type, parent, subItems){
            var subItem = subItems.shift(),
                out = [],
                tmp = [].slice.call(parent["getElementsBy" + type + "Name"](subItem));
            if(!subItems.length) {
                [].push.apply(out, tmp);
            } else {
                tmp.forEach(function(element){
                    var flag = true;
                    var tmpName = " " + element.className + " ";
                    subItems.forEach(function(subItem){
                        // used lastIndexOf to reuse the previously used polyfill for old buddies
                        if(tmpName.lastIndexOf(" " + subItem + " ") < 0) {
                            flag = false;
                            return;
                        }
                    });
                    if(flag) {
                        out.push(element);
                    }
                });
            }
            return out;
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
}(window));