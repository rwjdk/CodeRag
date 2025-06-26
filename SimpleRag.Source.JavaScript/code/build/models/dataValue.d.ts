import { DataObject, DataValue, MultiCurrency, Multilingual, MultilingualCollectionValue } from './data-contracts';
export type DataValueTypes = 'String' | 'Double' | 'Boolean' | 'Multilingual' | 'Money' | 'MultiCurrency' | 'StringList' | 'DoubleList' | 'BooleanList' | 'MultilingualCollection' | 'Object' | 'ObjectList';
export declare abstract class DataValueBase<T> implements DataValue {
    constructor(type: DataValueTypes, value: T);
    type: DataValueTypes;
    value: T;
    readonly abstract isCollection: boolean;
}
export interface CollectionWithType<T> {
    $type: string;
    $values: T[];
}
export interface MultilingualCollectionWithType<T> {
    $type: string;
    values: T[];
}
export interface MultiCurrencyWithType extends MultiCurrency {
    $type: string;
}
export interface MultilingualWithType extends Multilingual {
    $type: string;
}
export interface DataObjectWithType extends DataObject {
    $type: string;
}
export declare class StringDataValue extends DataValueBase<string> {
    constructor(value: string);
    readonly isCollection = false;
}
export declare class StringCollectionDataValue extends DataValueBase<CollectionWithType<string>> {
    constructor(value: string[]);
    readonly isCollection = true;
}
export declare class MultilingualCollectionDataValue extends DataValueBase<MultilingualCollectionWithType<MultilingualCollectionValue>> {
    constructor(values: {
        values: string[];
        language: string;
    }[]);
    readonly isCollection = true;
}
export declare class NumberDataValue extends DataValueBase<number> {
    constructor(value: number);
    readonly isCollection = false;
}
export declare class DoubleCollectionDataValue extends DataValueBase<CollectionWithType<number>> {
    constructor(value: number[]);
    readonly isCollection = true;
}
export declare class BooleanDataValue extends DataValueBase<boolean> {
    constructor(value: boolean);
    readonly isCollection = false;
}
export declare class BooleanCollectionDataValue extends DataValueBase<CollectionWithType<boolean>> {
    constructor(value: boolean[]);
    readonly isCollection = true;
}
export declare class MultiCurrencyDataValue extends DataValueBase<MultiCurrencyWithType> {
    constructor(values: {
        amount: number;
        currency: string;
    }[]);
    readonly isCollection = false;
}
export declare class MultilingualDataValue extends DataValueBase<MultilingualWithType> {
    constructor(values: {
        value: string;
        language: string;
    }[]);
    readonly isCollection = false;
}
export declare class ObjectDataValue extends DataValueBase<DataObjectWithType> {
    constructor(dataObject: {
        [key: string]: DataValue;
    });
    readonly isCollection = false;
}
export declare class ObjectCollectionDataValue extends DataValueBase<CollectionWithType<DataObjectWithType>> {
    constructor(dataObjects: {
        [key: string]: DataValue;
    }[]);
    readonly isCollection = true;
}
