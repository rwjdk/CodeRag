import { UserFactory } from '../../../../src/factory';
import { SearchTermPredictionBuilder } from '../../../../src/builders/search';
import { test, expect } from '@jest/globals'
import { SearchTermPredictionRequest } from '../../../../src/models/data-contracts';

function baseBuilder() {
    return new SearchTermPredictionBuilder({
        language: 'da-DK',
        currency: 'DKK',
        displayedAtLocation: 'search page',
        user: UserFactory.anonymous(),
    });
};

test('take', () => {
    const expected = 20;

    const subject: SearchTermPredictionRequest = baseBuilder()
        .take(expected)
        .build();

    expect(subject.take).toBe(expected);
});

test('setTerm', () => {
    const expectedTerm = 'shoe';

    const subject: SearchTermPredictionRequest = baseBuilder()
        .setTerm(expectedTerm)
        .build();

    expect(subject.term).toBe(expectedTerm);
});

test('entityType', () => {
    const subject: SearchTermPredictionRequest = baseBuilder()
        .addEntityType('Brand')
        .build();

    expect(subject.settings?.targetEntityTypes).toContain('Brand');
    expect(subject.settings?.targetEntityTypes).toHaveLength(1);
});

test('entityTypes', () => {
    const subject: SearchTermPredictionRequest = baseBuilder()
        .addEntityType('Brand', 'Product')
        .build();

    expect(subject.settings?.targetEntityTypes).toContain('Brand');
    expect(subject.settings?.targetEntityTypes).toContain('Product');
    expect(subject.settings?.targetEntityTypes).toHaveLength(2);
});

