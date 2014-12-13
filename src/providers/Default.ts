module mirana.providers {
    export interface IDefaultProviderStorage {
        store: ReactiveStore;
        facet: Facet;
        precedence: PropertyPrecedence;
        //Animations: Media.Animation.IAnimationStorage[];
        local: any;
        styleValue: any;
        implicitStyleValue: any;
        fallback: any;
        //PropListeners: IPropertyChangedListener[];
    }

    export class DefaultProvider<T extends IDefaultProviderStorage> extends Provider<T> {
        static instance = new Provider();

        create (store: ReactiveStore, facet: Facet): T {
            return <T>{
                store: store,
                facet: facet,
                precedence: PropertyPrecedence.Fallback,
                local: NOVAL,
                styleValue: NOVAL,
                implicitStyleValue: NOVAL,
                fallback: NOVAL
            };
        }

        get (storage: IProviderStorage): any {
            var val: any;
            if ((val = storage.local) !== NOVAL)
                return val;
            if ((val = storage.styleValue) !== NOVAL)
                return val;
            if ((val = storage.implicitStyleValue) !== NOVAL)
                return val;
            if ((val = storage.fallback) !== NOVAL)
                return val;
            var facet = storage.facet;
            if ((val = facet.initial) !== NOVAL)
                return storage.fallback = val;
            if (facet.autoCreator)
                return storage.fallback = facet.autoCreator();
            return NOVAL;
        }
    }
}