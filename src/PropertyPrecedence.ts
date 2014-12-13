module mirana {
    export enum PropertyPrecedence {
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