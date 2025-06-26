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

test('constructor', () => {
    const subject = baseBuilder().build();

    expect(subject.language?.value).toBe('da-DK');
    expect(subject.currency?.value).toBe('DKK');
    expect(subject.displayedAtLocation).toBe('search page');
    expect(subject.user).toBeDefined();
});

test('Index', () => {
    const expectedIndexId = 'content';
    const subject: SearchTermPredictionRequest = baseBuilder()
        .setIndex(expectedIndexId)
        .build();

    expect(subject.indexSelector?.id).toBe(expectedIndexId);
});
