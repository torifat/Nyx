// Fun - http://en.wikipedia.org/wiki/Family_tree_of_the_Greek_gods
(function(window, undefined){

    // The Night - http://en.wikipedia.org/wiki/Nyx
    var Nyx = function(selector, context){
        return Object.create(Chaos).init(selector, context);
    };

    // Void - http://en.wikipedia.org/wiki/Chaos_(cosmogony)
    var Chaos = {
        // constructor: JQL,
        version: '1.0',
        length: 0,
        context: window.document,
        init: function(selector, context){
            return Selene.parse(selector, context);
        },
        splice: function(){}
    };

    // Moon - http://en.wikipedia.org/wiki/Selene
    var Selene = {
        parse: function(selector){
            // Empty
            if(!selector) {
                return Chaos;
            }
            // DOM Elements
            if(selector.nodeType) {
                Chaos.context = Chaos[0] = selector;
                return Chaos;
            }
        }
    };

    // Darkness - http://en.wikipedia.org/wiki/Erebus
    var Erebus = {
    };

    // Polyfill for Old Browsers
    if(typeof Object.create !== 'function') {
        Object.create = function(o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

    window.Nyx = window.$ = Nyx;
}((window === undefined) ? this : window));