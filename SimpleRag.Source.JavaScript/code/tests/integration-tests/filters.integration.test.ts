import { DataValueFactory, ProductSearchBuilder, ProductSearchRequest, Searcher, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseBuilder() {
    return new ProductSearchBuilder({
        language: 'en-US',
        currency: 'USD',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('Product Assortment filter', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .filters(f => f.addProductAssortmentFilter([10_000_000]))
        .pagination(p => p.setPageSize(20))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.results?.length).toBe(0);
});

test('Product Id filter', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .filters(f => f.addProductIdFilter(['1'])
            .addVariantDataFilter('avaliableMarkets', c => c.addGreaterThanCondition(1693526400 - 1)))
        .pagination(p => p.setPageSize(20))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.results?.length).toBe(1);
});

test('Product Variant Object Path filter', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .filters(f => f.addVariantDataFilter('avaliableMarkets', c => c.addGreaterThanCondition(1693526400 - 1), undefined, undefined, undefined,
            {
                objectPath: ['US', 'ValidFromDate'],
                filterSettings: s => s.scopes(sc => sc.fill({ apply: true }).default({ apply: false })),
            }))
        .pagination(p => p.setPageSize(3))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.results?.length).toBe(3);
});

test('Object value is subset of condition filter', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .filters(f => f.addProductDataFilter('objects', c => c.addDataObjectCondition(doc => 
            doc.addObjectValueIsSubsetOfCondition('list', DataValueFactory.stringCollection(['123', '456', '789'])))))
        .pagination(p => p.setPageSize(3))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.results?.length).toBe(3);
});