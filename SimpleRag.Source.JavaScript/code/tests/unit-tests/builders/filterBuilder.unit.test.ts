import { DataValueFactory } from './../../../src/factory/dataValue.factory';
import { test, expect } from '@jest/globals'
import { FilterBuilder } from '../../../src/builders/filterBuilder';
import { ContainsCondition, FilterCollection, ProductDataFilter } from '../../../src/models/data-contracts';

function baseBuilder() {
    return new FilterBuilder();
};

test('empty', () => {
    const subject: FilterCollection | null = baseBuilder()
        .build();
    expect(subject).toBe(null);
});

test('product id filter', () => {
    const subject: FilterCollection | null = baseBuilder()
        .addProductIdFilter('1')
        .build();
    expect(subject?.items?.length).toBe(1);
});

test('product object data filter', () => {
    const subject: FilterCollection | null = baseBuilder()
        .addProductDataFilter('Linkages', filter => {
            filter.addDataObjectCondition(cond => {
                cond.addEqualsCondition('VehicleTypeNumber', DataValueFactory.number(6203))
                cond.addEqualsCondition('Manufacturer', DataValueFactory.string('VOLVO'))
                cond.addContainsCondition('ProductionYears', DataValueFactory.stringCollection(['1959', '1972', '2020']), 'Any')
                cond.addInRangeCondition('Bhp', { lowerBoundInclusive: 50, upperBoundInclusive: 80 })
            })
        })
        .build();

    expect(((subject?.items?.[0] as ProductDataFilter).conditions?.items?.[0] as ContainsCondition).objectFilter?.conditions?.length).toBe(4);
});