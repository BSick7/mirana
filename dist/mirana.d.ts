declare module mirana {
    var version: string;
}
declare module mirana.providers {
    interface IProviderStorage {
        store: ReactiveStore;
        facet: Facet;
        precedence: PropertyPrecedence;
        local: any;
        styleValue: any;
        implicitStyleValue: any;
        fallback: any;
    }
    interface IProvider<T extends IProviderStorage> {
        create(store: ReactiveStore, facet: Facet): T;
        get(storagee: T): any;
    }
    var NOVAL: {};
    class Provider<T extends IProviderStorage> implements IProvider<T> {
        static instance: Provider<IProviderStorage>;
        public create(store: ReactiveStore, facet: Facet): T;
        public get(storage: IProviderStorage): any;
    }
}
declare module mirana {
    class Facet {
        private $$id;
        public name: string;
        public ownerType: any;
        public getTargetType: () => any;
        public initial: any;
        public isAttached: boolean;
        public isReadOnly: boolean;
        public collectionType: any;
        public autoCreator: () => any;
        public provider: providers.IProvider<providers.IProviderStorage>;
        constructor();
        static init(name: string, ownerType: any, getTargetType: () => any): IFaceter;
        public getFallbackValue(): void;
    }
}
declare module mirana {
    interface IFaceter {
        start(name: string, ownerType: any, getTargetType: () => any): IFaceter;
        initial(val: any): any;
        attached(): IFaceter;
        readOnly(): IFaceter;
        collection(objectType: any): IFaceter;
        auto(creator: () => any): IFaceter;
        provider<T extends providers.IProviderStorage>(provider: providers.IProvider<T>): IFaceter;
        finish(): Facet;
    }
    var Faceter: IFaceter;
}
declare module mirana {
    enum PropertyPrecedence {
        IsEnabled = 0,
        LocalValue = 1,
        LocalStyle = 2,
        ImplicitStyle = 3,
        Inherited = 4,
        InheritedDataContext = 5,
        Fallback = 6,
        Lowest = 6,
        Highest = 0,
        Count = 7,
    }
}
declare module mirana {
    class ReactiveStore {
        public get(facet: Facet): any;
        public set(facet: Facet, value: any): void;
        public clear(facet: Facet): void;
    }
}
