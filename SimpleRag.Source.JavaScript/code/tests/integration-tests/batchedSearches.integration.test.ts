import { ProductCategorySearchBuilder, ProductSearchBuilder, SearchCollectionBuilder, Searcher, SearchTermPredictionBuilder, SearchTermPredictionRequest, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'integration test',
    user: UserFactory.anonymous(),
};

test('Batched search requests', async() => {

    const request = new SearchCollectionBuilder({
        language: 'en-US',
        currency: 'USD',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    })
        .addRequest(new SearchTermPredictionBuilder(settings).build())
        .addRequest(new ProductSearchBuilder(settings).setTerm('a').build())
        .addRequest(new ProductCategorySearchBuilder(settings).setTerm('c').build())
        .build();

    const result = await searcher.batch(request);

    expect(result?.responses?.length).toBe(3);
});