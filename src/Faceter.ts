module mirana {
    export interface IFaceter {
        start(name: string, ownerType: any, getTargetType: () => any): IFaceter;
        initial(val: any);
        attached(): IFaceter;
        readOnly(): IFaceter;
        collection (objectType: any): IFaceter;
        auto(creator: () => any): IFaceter;
        provider<T extends providers.IProviderStorage>(provider: providers.IProvider<T>): IFaceter;
        finish(): Facet;
    }

    var cur: Facet = null;
    export var Faceter: IFaceter = {
        start (name: string, ownerType: any, getTargetType: () => any): IFaceter {
            this.finish();
            cur = new Facet();
            cur.name = name;
            cur.ownerType = ownerType;
            cur.getTargetType = getTargetType;
            return this;
        },
        initial (val: any): IFaceter {
            cur.initial = val;
            return this;
        },
        attached (): IFaceter {
            cur.isAttached = true;
            return this;
        },
        readOnly (): IFaceter {
            cur.isReadOnly = true;
            return this;
        },
        collection (collType: any): IFaceter {
            cur.collectionType = collType;
            return this;
        },
        auto (creator: () => any): IFaceter {
            cur.autoCreator = creator;
            return this;
        },
        provider: function<T extends providers.IProviderStorage> (provider: providers.IProvider<T>): IFaceter {
            cur.provider = provider;
            return this;
        },
        finish (): Facet {
            var facet = cur;

            cur = null;
            return facet;
        }
    };
}