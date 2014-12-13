module mirana.providers {
    export interface IProviderStorage {
        store: ReactiveStore;
        facet: Facet;
        precedence: PropertyPrecedence;
        //Animations: Media.Animation.IAnimationStorage[];
        local: any;
        fallback: any;
        //PropListeners: IPropertyChangedListener[];
    }

    export interface IProvider<T extends IProviderStorage> {
        create(store: ReactiveStore, facet: Facet): T;
        get(storagee: T): any;
    }

    export var NOVAL = {};

    export class Provider<T extends IProviderStorage> implements IProvider<T> {
        static instance = new Provider();

        create (store: ReactiveStore, facet: Facet): T {
            return <T>{
                store: store,
                facet: facet,
                precedence: PropertyPrecedence.Fallback,
                local: NOVAL,
                fallback: NOVAL
            };
        }

        get (storage: IProviderStorage): any {
            var val: any;
            if ((val = storage.local) !== NOVAL)
                return val;
            if ((val = storage.fallback) !== NOVAL)
                return val;
            return NOVAL;
        }

        onChanged (storage: IProviderStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any) {
            var facet = storage.facet;
            if (newValue === undefined) {
                effectivePrecedence = this.GetValuePrecedence(storage);
                newValue = this.GetValue(storage);
            }

            storage.precedence = effectivePrecedence;
            if (!facet.AlwaysChange && oldValue === newValue)
                return undefined;

            if (!storage.facet.IsCustom) {
                if (oldValue instanceof XamlObject)
                    (<XamlObject>oldValue).XamlNode.Detach();
                if (newValue instanceof XamlObject) {
                    var error = new BError();
                    if (!(<XamlObject>newValue).XamlNode.AttachTo(storage.OwnerNode, error))
                        error.ThrowException();
                }
            }

            var args = {
                Property: propd,
                OldValue: oldValue,
                NewValue: newValue
            };
            var sender = storage.OwnerNode.XObject;
            if (propd.ChangedCallback)
                propd.ChangedCallback(sender, args);
            var listeners = storage.PropListeners;
            if (listeners) {
                var len = listeners.length;
                for (var i = 0; i < len; i++) {
                    listeners[i].OnPropertyChanged(sender, args);
                }
            }
            return args;
        }
    }
}