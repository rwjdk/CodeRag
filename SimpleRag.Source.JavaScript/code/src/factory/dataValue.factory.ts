import { DataValue } from '../models/data-contracts';
import { StringDataValue, StringCollectionDataValue, NumberDataValue, DoubleCollectionDataValue, BooleanDataValue, BooleanCollectionDataValue, MultiCurrencyDataValue, MultilingualDataValue, MultilingualCollectionDataValue, ObjectDataValue, ObjectCollectionDataValue } from '../models/dataValue';

export class DataValueFactory {
    static string(value: string): StringDataValue {
        return new StringDataValue(value);
    }

    static stringCollection(collection: string[]): StringCollectionDataValue {
        return new StringCollectionDataValue(collection);
    }

    static number(value: number): NumberDataValue {
        return new NumberDataValue(value);
    }

    static doubleCollection(collection: number[]): DoubleCollectionDataValue {
        return new DoubleCollectionDataValue(collection);
    }

    static boolean(value: boolean): BooleanDataValue {
        return new BooleanDataValue(value);
    }

    static booleanCollection(collection: boolean[]): BooleanCollectionDataValue {
        return new BooleanCollectionDataValue(collection);
    }

    static multiCurrency(values: { amount: number, currency: string }[]): MultiCurrencyDataValue {
        return new MultiCurrencyDataValue(values);
    }

    static multilingual(values: { value: string, language: string }[]): MultilingualDataValue {
        return new MultilingualDataValue(values);
    }

    static multilingualCollection(values: { values: string[], language: string }[]): MultilingualCollectionDataValue {
        return new MultilingualCollectionDataValue(values);
    }

    static object(data: { [key: string]: DataValue }): ObjectDataValue {
        return new ObjectDataValue(data);
    }

    static objectCollection(objects: { [key: string]: DataValue }[]): ObjectCollectionDataValue {
        return new ObjectCollectionDataValue(objects);
    }
}