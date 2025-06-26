import { UserFactory } from '../../../../src/factory';
import { SearchCollectionBuilder, SearchTermPredictionBuilder } from '../../../../src/builders/search';
import { test, expect } from '@jest/globals'
import { SearchRequestCollection } from '../../../../src/models/data-contracts';

function getSearchCollectionBuilder() {
    return new SearchCollectionBuilder({
        language: 'da-DK',
        currency: 'DKK',
        displayedAtLocation: 'search page',
        user: UserFactory.anonymous(),
    });
};

function getSearchTermPredictionBuilder() {
    return new SearchTermPredictionBuilder({
        language: 'da-DK',
        currency: 'DKK',
        displayedAtLocation: 'search page',
        user: UserFactory.anonymous(),
    });
};

test('addRequest', () => {
    const subject: SearchRequestCollection = getSearchCollectionBuilder()
        .addRequest(getSearchTermPredictionBuilder().build())
        .build();

    expect(subject.requests).toHaveLength(1);
});