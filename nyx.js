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
        extend: function(obj, map){
            /*
                TODO add deep copy support
            */
            if(typeof map === "undefined") {
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop)) {
                        // Overwrite allowed
                        Chaos[prop] = obj[prop];
                    }
                }
            } else {
                map.forEach(function(prop){
                    if(typeof prop === "string") {
                        Chaos[prop] = obj[prop];
                    } else {
                        Chaos[prop[1]] = obj[prop[0]];
                    }
                });
            }
        },
        each: [].forEach,
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
                this.length = 1;
                return this;
            }
            // DOM Elements
            if(selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            }
            // CSS Selector
            if(typeof selector === "string") {
                context = context || window.document;
                if(typeof context.querySelectorAll === "function") {
                    this.push.apply(this, context.querySelectorAll(selector));
                } else {
                    var selectors = selector.split(",");
                        l = selectors.length;
                    for(var i=0; i<l; ++i) {
                        Selene.css.call(this, selectors[i], context);
                    }
                }
                return this;
            }
            // Invalid Selector
            throw new Error("Invalid Selector");
        },
        css: function(selector, context) {
            selector = this.selector = Selene.clean.call(this, selector);
            var items = selector.split(/\s+/),
                parents = [],
                cur = [];
            parents.push(context);
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
            return selector.substring(selector.lastIndexOf("#")).trim();
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

    // Dread - http://en.wikipedia.org/wiki/Deimos_(mythology)
    // DOM
    var Deimos = {
        hasClass: function(value){
            var has = false;
            value = value.trim();
            this.each(function(element){
                if ((" " + element.className + " ").indexOf(" " + value + " ") > -1) {
                    return (has = true);
                }
            });
            return has;
        },
        addClass: function(value){
            var tmp = value.split(/\s+/),
                l = tmp.length,
                set = {},
                classNames = [];
            for(var i=0; i<l; ++i) {
                if(!set[tmp[i]]) {
                    set[tmp[i]] = 1;
                    classNames.push(tmp[i]);
                }
            }
            l = classNames.length;
            this.each(function(element){
                var className = element.className;
                if(!className) {
                    className = value;
                } else {
                    var $element = Nyx(element);
                    for(var i=0; i<l; ++i) {
                        if(!$element.hasClass(classNames[i])) {
                            className += " " + classNames[i];
                        }
                    }
                }
                element.className = className.trim();
            });
            return this;
        },
        removeClass: function(value){
            var classNames = value.split(/\s+/),
                l = classNames.length,
                className;
            this.each(function(element){
                if(value) {
                    className = " " + element.className + " ";
                    for(var i=0; i<l; ++i) {
                        className = className.replace(" " + classNames[i] + " ", " ");
                    }
                } else {
                    className = "";
                }
                element.className = className.trim();
            });
            return this;
        },
        toggleClass: function(value){
            var classNames = value.split(/\s+/),
                l = classNames.length;
            this.each(function(element){
                var tmpElement = Nyx(element);
                for(var i=0; i<l; ++i) {
                    if(tmpElement.hasClass(classNames[i]) ? tmpElement.removeClass(classNames[i]) : tmpElement.addClass(classNames[i]));
                }
            });
            return this;
        }
    };
    Nyx.fn.extend(Deimos);

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
    // Other Polyfills removed, will be added later

    window.Nyx = window.$ = Nyx;
}(window));