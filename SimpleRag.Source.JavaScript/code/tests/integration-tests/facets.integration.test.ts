import { ProductCategorySearchBuilder, ProductCategorySearchRequest, ProductSearchBuilder, ProductSearchRequest, Searcher, UserFactory } from '../../src';
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

test('RecentlyPurchased facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addRecentlyPurchasedFacet({ 
            byUser: true,
            byUserCompany: false,
            byUserParentCompany: false,
            sinceMinutesAgo: 1140, 
        }, [true]))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('User');
});

test('SalesPrice facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addSalesPriceRangeFacet('Product'))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('SalesPrice');
});

test('Brand facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addBrandFacet())
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('Brand');
});

test('ProductData facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addProductDataStringValueFacet('ShortDescription', 'Product'))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('Data');
});

test('Category facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addCategoryFacet('ImmediateParent'))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('Category');
});

test('Product Category Hierarchy facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addProductCategoryHierarchyFacet('ImmediateParent'))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('Category');
});

test('Content Category Hierarchy facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addContentCategoryHierarchyFacet('ImmediateParent'))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('Category');
});


test('Product Category facet', async() => {

    const builder = new ProductCategorySearchBuilder({
        language: 'en-US',
        currency: 'USD',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });

    const request: ProductCategorySearchRequest = builder
        .facets(f => f.addProductCategoryDataStringValueFacet('Key'))
        .build();

    const result = await searcher.searchProductCategories(request);

    expect(result).toBeDefined();
});