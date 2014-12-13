var mirana;
(function (mirana) {
    mirana.version = '0.0.0';
})(mirana || (mirana = {}));
var mirana;
(function (mirana) {
    (function (providers) {
        providers.NOVAL = {};

        var Provider = (function () {
            function Provider() {
            }
            Provider.prototype.create = function (store, facet) {
                return {
                    store: store,
                    facet: facet,
                    precedence: 6 /* Fallback */,
                    local: providers.NOVAL,
                    styleValue: providers.NOVAL,
                    implicitStyleValue: providers.NOVAL,
                    fallback: providers.NOVAL
                };
            };

            Provider.prototype.get = function (storage) {
                var val;
                if ((val = storage.local) !== providers.NOVAL)
                    return val;
                if ((val = storage.styleValue) !== providers.NOVAL)
                    return val;
                if ((val = storage.implicitStyleValue) !== providers.NOVAL)
                    return val;
                if ((val = storage.fallback) !== providers.NOVAL)
                    return val;
                var facet = storage.facet;
                if ((val = facet.initial) !== providers.NOVAL)
                    return storage.fallback = val;
                if (facet.autoCreator)
                    return storage.fallback = facet.autoCreator();
                return providers.NOVAL;
            };
            Provider.instance = new Provider();
            return Provider;
        })();
        providers.Provider = Provider;
    })(mirana.providers || (mirana.providers = {}));
    var providers = mirana.providers;
})(mirana || (mirana = {}));
var mirana;
(function (mirana) {
    var lastid = 0;
    var Facet = (function () {
        function Facet() {
            this.initial = mirana.providers.NOVAL;
            this.isAttached = false;
            this.isReadOnly = false;
            this.provider = mirana.providers.Provider.instance;
            this.$$id = lastid++;
        }
        Facet.init = function (name, ownerType, getTargetType) {
            return mirana.Faceter.start(name, ownerType, getTargetType);
        };

        Facet.prototype.getFallbackValue = function () {
        };
        return Facet;
    })();
    mirana.Facet = Facet;
})(mirana || (mirana = {}));
var mirana;
(function (mirana) {
    var cur = null;
    mirana.Faceter = {
        start: function (name, ownerType, getTargetType) {
            this.finish();
            cur = new mirana.Facet();
            cur.name = name;
            cur.ownerType = ownerType;
            cur.getTargetType = getTargetType;
            return this;
        },
        initial: function (val) {
            cur.initial = val;
            return this;
        },
        attached: function () {
            cur.isAttached = true;
            return this;
        },
        readOnly: function () {
            cur.isReadOnly = true;
            return this;
        },
        collection: function (collType) {
            cur.collectionType = collType;
            return this;
        },
        auto: function (creator) {
            cur.autoCreator = creator;
            return this;
        },
        provider: function (provider) {
            cur.provider = provider;
            return this;
        },
        finish: function () {
            var facet = cur;

            cur = null;
            return facet;
        }
    };
})(mirana || (mirana = {}));
var mirana;
(function (mirana) {
    (function (PropertyPrecedence) {
        PropertyPrecedence[PropertyPrecedence["IsEnabled"] = 0] = "IsEnabled";
        PropertyPrecedence[PropertyPrecedence["LocalValue"] = 1] = "LocalValue";
        PropertyPrecedence[PropertyPrecedence["LocalStyle"] = 2] = "LocalStyle";
        PropertyPrecedence[PropertyPrecedence["ImplicitStyle"] = 3] = "ImplicitStyle";
        PropertyPrecedence[PropertyPrecedence["Inherited"] = 4] = "Inherited";
        PropertyPrecedence[PropertyPrecedence["InheritedDataContext"] = 5] = "InheritedDataContext";
        PropertyPrecedence[PropertyPrecedence["Fallback"] = 6] = "Fallback";

        PropertyPrecedence[PropertyPrecedence["Lowest"] = 6] = "Lowest";
        PropertyPrecedence[PropertyPrecedence["Highest"] = 0] = "Highest";
        PropertyPrecedence[PropertyPrecedence["Count"] = 7] = "Count";
    })(mirana.PropertyPrecedence || (mirana.PropertyPrecedence = {}));
    var PropertyPrecedence = mirana.PropertyPrecedence;
})(mirana || (mirana = {}));
var mirana;
(function (mirana) {
    var ReactiveStore = (function () {
        function ReactiveStore() {
        }
        ReactiveStore.prototype.get = function (facet) {
        };

        ReactiveStore.prototype.set = function (facet, value) {
        };

        ReactiveStore.prototype.clear = function (facet) {
        };
        return ReactiveStore;
    })();
    mirana.ReactiveStore = ReactiveStore;
})(mirana || (mirana = {}));
//# sourceMappingURL=mirana.js.map
