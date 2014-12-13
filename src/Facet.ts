/// <reference path="providers/Provider" />

module mirana {
    var lastid = 0;
    export class Facet {
        private $$id: number;
        name: string;
        ownerType: any;
        getTargetType: () => any;
        initial: any = providers.NOVAL;

        isAttached = false;
        isReadOnly = false;

        collectionType: any;
        autoCreator: () => any;

        provider: providers.IProvider<providers.IProviderStorage> = providers.Provider.instance;

        constructor () {
            this.$$id = lastid++;
        }

        static init (name: string, ownerType: any, getTargetType: () => any): IFaceter {
            return Faceter.start(name, ownerType, getTargetType);
        }

        getFallbackValue () {

        }
    }
}