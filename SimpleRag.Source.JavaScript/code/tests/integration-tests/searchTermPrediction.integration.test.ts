import { Searcher, SearchTermPredictionBuilder, SearchTermPredictionRequest, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseBuilder() {
    return new SearchTermPredictionBuilder({
        language: 'da',
        currency: 'USD',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('Getting Search Term Prediction', async() => {

    const request: SearchTermPredictionRequest = baseBuilder()
        .setTerm('1')
        .take(1)
        .addEntityType('Product', 'Content')
        .build();

    const result = await searcher.searchTermPrediction(request);

    expect(result?.predictions?.length).toBeGreaterThan(0);
});