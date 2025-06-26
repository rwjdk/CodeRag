import { DataValue } from '../models/data-contracts';
import { StringDataValue, StringCollectionDataValue, NumberDataValue, DoubleCollectionDataValue, BooleanDataValue, BooleanCollectionDataValue, MultiCurrencyDataValue, MultilingualDataValue, MultilingualCollectionDataValue, ObjectDataValue, ObjectCollectionDataValue } from '../models/dataValue';
export declare class DataValueFactory {
    static string(value: string): StringDataValue;
    static stringCollection(collection: string[]): StringCollectionDataValue;
    static number(value: number): NumberDataValue;
    static doubleCollection(collection: number[]): DoubleCollectionDataValue;
    static boolean(value: boolean): BooleanDataValue;
    static booleanCollection(collection: boolean[]): BooleanCollectionDataValue;
    static multiCurrency(values: {
        amount: number;
        currency: string;
    }[]): MultiCurrencyDataValue;
    static multilingual(values: {
        value: string;
        language: string;
    }[]): MultilingualDataValue;
    static multilingualCollection(values: {
        values: string[];
        language: string;
    }[]): MultilingualCollectionDataValue;
    static object(data: {
        [key: string]: DataValue;
    }): ObjectDataValue;
    static objectCollection(objects: {
        [key: string]: DataValue;
    }[]): ObjectCollectionDataValue;
}
