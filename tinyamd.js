var modules = {}
var define = function(ns, deps, fun) {
    if (deps.apply) {
        fun = deps;
        deps = [];
    }
    
    modules[ns] = {
        definition: null,
        load: function() {
            
            if (this.definition) { return this.definition; }
            
            var args = [];
            for (i in deps) {
                args.push(modules[deps[i]].load());
            }
            
            this.definition = fun.apply(this, args);
            return this.definition;
        }
    };
};

var require = function(deps, callback) {
    var args = [];
    for (i in deps) {
        args.push(modules[deps[i]].load());
    }
    callback.apply(this, args);
};