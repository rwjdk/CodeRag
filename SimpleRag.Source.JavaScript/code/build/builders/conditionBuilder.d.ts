import { ContainsCondition, DistinctCondition, EqualsCondition, GreaterThanCondition, LessThanCondition, HasValueCondition, RelativeDateTimeCondition, ValueConditionCollection } from '../models/data-contracts';
import { DataValueBase } from '../models/dataValue';
import { DataObjectFilterConditionBuilder } from './dataObjectFilterConditionBuilder';
export type Conditions = ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition | HasValueCondition | RelativeDateTimeCondition;
export declare class ConditionBuilder {
    conditions: Conditions[];
    addContainsCondition<T>(value: DataValueBase<T>, valueCollectionEvaluationMode?: 'All' | 'Any', negated?: boolean): this;
    addDistinctCondition(numberOfOccurrencesAllowedWithTheSameValue: number, negated?: boolean): this;
    addEqualsCondition<T>(value: DataValueBase<T>, negated?: boolean): this;
    addGreaterThanCondition(value: number, negated?: boolean): this;
    addLessThanCondition(value: number, negated?: boolean): this;
    addDataObjectCondition(conditions: (builder: DataObjectFilterConditionBuilder) => void, skip?: number, take?: number, negated?: boolean): this;
    addHasValueCondition(negated?: boolean): this;
    addRelativeDateTimeCondition(comparison: 'Before' | 'After', unit: 'UnixMilliseconds' | 'UnixSeconds' | 'UnixMinutes', currentTimeOffset?: number, negated?: boolean): this;
    build(): ValueConditionCollection | null;
}
