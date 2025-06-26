import { DataObjectValueSelector } from '../..';
import { DataObjectFilterConditionBuilder } from '../dataObjectFilterConditionBuilder';
export declare class DataObjectValueSelectorBuilder {
    private key;
    private filter?;
    private childSelector?;
    private fallbackSelector?;
    select(key: string, settings?: {
        filter?: {
            conditions?: (builder: DataObjectFilterConditionBuilder) => void;
            skip?: number;
            take?: number;
        } | null;
        childSelector?: (childSelector: DataObjectValueSelectorBuilder) => void | null;
        fallbackSelector?: (childSelector: DataObjectValueSelectorBuilder) => void | null;
    }): void;
    build(): DataObjectValueSelector;
}
