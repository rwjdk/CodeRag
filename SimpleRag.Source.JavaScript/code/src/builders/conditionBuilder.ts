import { ContainsCondition, DistinctCondition, EqualsCondition, GreaterThanCondition, LessThanCondition, HasValueCondition, RelativeDateTimeCondition, ValueConditionCollection } from '../models/data-contracts';
import { DataValueBase } from '../models/dataValue';
import { DataObjectFilterConditionBuilder } from './dataObjectFilterConditionBuilder';

export type Conditions = ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition | HasValueCondition | RelativeDateTimeCondition;

export class ConditionBuilder {
    conditions: Conditions[] = [];

    public addContainsCondition<T>(value: DataValueBase<T>, valueCollectionEvaluationMode: 'All' | 'Any' = 'All', negated: boolean = false): this {
        const condition: ContainsCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ContainsCondition, Relewise.Client',
            value: value,
            valueCollectionEvaluationMode: valueCollectionEvaluationMode,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addDistinctCondition(numberOfOccurrencesAllowedWithTheSameValue: number, negated: boolean = false): this {
        const condition: DistinctCondition = {
            $type: 'Relewise.Client.Requests.Conditions.DistinctCondition, Relewise.Client',
            numberOfOccurrencesAllowedWithTheSameValue: numberOfOccurrencesAllowedWithTheSameValue,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addEqualsCondition<T>(value: DataValueBase<T>, negated: boolean = false): this {
        const condition: EqualsCondition = {
            $type: 'Relewise.Client.Requests.Conditions.EqualsCondition, Relewise.Client',
            value: value,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addGreaterThanCondition(value: number, negated: boolean = false): this {
        const condition: GreaterThanCondition = {
            $type: 'Relewise.Client.Requests.Conditions.GreaterThanCondition, Relewise.Client',
            value: value,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addLessThanCondition(value: number, negated: boolean = false): this {
        const condition: LessThanCondition = {
            $type: 'Relewise.Client.Requests.Conditions.LessThanCondition, Relewise.Client',
            value: value,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addDataObjectCondition(conditions: (builder: DataObjectFilterConditionBuilder) => void, skip?: number, take?: number, negated: boolean = false): this {
        const conditionsBuilder = new DataObjectFilterConditionBuilder();
        conditions(conditionsBuilder);

        const condition: ContainsCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ContainsCondition, Relewise.Client',
            objectFilter: {
                conditions: conditionsBuilder.build(),
                skip: skip,
                take: take,
            },
            valueCollectionEvaluationMode: 'All',
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addHasValueCondition(negated: boolean = false) {
        const condition: HasValueCondition = {
            $type: 'Relewise.Client.Requests.Conditions.HasValueCondition, Relewise.Client',
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addRelativeDateTimeCondition(comparison: 'Before' | 'After', unit: 'UnixMilliseconds' | 'UnixSeconds' | 'UnixMinutes', currentTimeOffset: number = 0, negated: boolean = false) {
        const condition: RelativeDateTimeCondition = {
            $type: 'Relewise.Client.Requests.Conditions.RelativeDateTimeCondition, Relewise.Client',
            comparison: comparison,
            currentTimeOffset: currentTimeOffset,
            unit: unit,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public build(): ValueConditionCollection | null {
        return this.conditions.length === 0
            ? null
            : { items: this.conditions }
    }
}