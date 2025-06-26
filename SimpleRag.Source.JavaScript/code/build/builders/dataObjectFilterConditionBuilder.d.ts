import { DoubleRange, DataValueBase, ObjectValueMinByCondition, ObjectValueMaxByCondition, ObjectValueContainsCondition, ObjectValueEqualsCondition, ObjectValueGreaterThanCondition, ObjectValueLessThanCondition, ObjectValueInRangeCondition } from '..';
export type DataObjectFilterConditions = ObjectValueContainsCondition | ObjectValueEqualsCondition | ObjectValueGreaterThanCondition | ObjectValueInRangeCondition | ObjectValueLessThanCondition | ObjectValueMaxByCondition | ObjectValueMinByCondition;
export declare class DataObjectFilterConditionBuilder {
    conditions: DataObjectFilterConditions[];
    addContainsCondition<T>(key: string, value: DataValueBase<T>, mode?: 'All' | 'Any', objectPath?: string[], negated?: boolean): this;
    addEqualsCondition<T>(key: string, value: DataValueBase<T>, objectPath?: string[], negated?: boolean): this;
    addInRangeCondition(key: string, range: DoubleRange, objectPath?: string[], negated?: boolean): this;
    addGreaterThanCondition(key: string, value: number, objectPath?: string[], negated?: boolean): this;
    addLessThanCondition(key: string, value: number, objectPath?: string[], negated?: boolean): this;
    addMinByCondition(key: string, objectPath?: string[], negated?: boolean): this;
    addMaxByCondition(key: string, objectPath?: string[], negated?: boolean): this;
    addObjectValueIsSubsetOfCondition<T>(key: string, value: DataValueBase<T>, objectPath?: string[], negated?: boolean): this;
    build(): DataObjectFilterConditions[] | null;
}
