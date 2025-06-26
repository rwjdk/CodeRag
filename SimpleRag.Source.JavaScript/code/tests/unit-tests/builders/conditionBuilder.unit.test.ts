import { test, expect } from '@jest/globals'
import { ConditionBuilder } from '../../../src/builders/conditionBuilder';
import { StringDataValue } from '../../../src/models/dataValue';

test('build', () => {
    const subject = new ConditionBuilder().addContainsCondition(new StringDataValue('X'), 'Any').build();

    expect(subject?.items?.length).toBe(1);
});

test('empty', () => {
    const subject = new ConditionBuilder().build();

    expect(subject).toBe(null);
});