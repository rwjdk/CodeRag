import { DataDoubleSelector, FixedDoubleValueSelector } from '..';
export declare class ValueSelectorFactory {
    static dataDoubleSelector(key: string): DataDoubleSelector;
    static fixedDoubleValueSelector(value: number): FixedDoubleValueSelector;
}
