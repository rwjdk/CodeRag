
import { Integrator, ProductCategoryUpdateBuilder } from '@relewise/integrations';
import { Searcher, ProductCategorySearchBuilder, ProductCategorySearchRequest, UserFactory, GetProductCategoryFacet, DataValueFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });
const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseProductCategoryBuilder() {
    return new ProductCategorySearchBuilder({
        language: 'da',
        currency: 'DKK',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('ProductCategorySearch', async() => {

    const request: ProductCategorySearchRequest = baseProductCategoryBuilder()
        .build();

    const result = await searcher.searchProductCategories(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Facet result', async() => {
    const category = new ProductCategoryUpdateBuilder({
        id: 'GetProductCategoryFacet test category',
        kind: 'ReplaceProvidedProperties'
    })
    .data({
        'SomeString': DataValueFactory.string('Test String'),
        'SomeBoolean': DataValueFactory.boolean(true),
        'SomeDouble': DataValueFactory.number(100),
        'SomeObject': DataValueFactory.object({})
    });

    await integrator.updateProductCategory(category.build());

    const request: ProductCategorySearchRequest = baseProductCategoryBuilder()
        .facets(f => f
            .addProductCategoryAssortmentFacet()
            .addProductCategoryDataStringValueFacet('SomeString')
            .addProductCategoryDataBooleanValueFacet('SomeBoolean')
            .addProductCategoryDataDoubleValueFacet('SomeDouble')
            .addProductCategoryDataDoubleRangeFacet('SomeDouble')
            .addProductCategoryDataDoubleRangesFacet('SomeDouble', null, 10)
            .addProductCategoryDataObjectFacet('SomeObject'))
        .build();

    const result = await searcher.searchProductCategories(request);

    if (result?.facets) {
        const assortmentFacet = GetProductCategoryFacet.assortment(result.facets);
        expect(assortmentFacet).not.toBeNull();

        const dataStringFacet = GetProductCategoryFacet.dataString(result.facets, 'SomeString');
        expect(dataStringFacet).not.toBeNull();

        const dataBooleanFacet = GetProductCategoryFacet.dataBoolean(result.facets, 'SomeBoolean');
        expect(dataBooleanFacet).not.toBeNull();

        const dataNumberFacet = GetProductCategoryFacet.dataNumber(result.facets, 'SomeDouble');
        expect(dataNumberFacet).not.toBeNull();

        const dataDoubleRangeFacet = GetProductCategoryFacet.dataDoubleRange(result.facets, 'SomeDouble');
        expect(dataDoubleRangeFacet).not.toBeNull();

        const dataDoubleRangesFacet = GetProductCategoryFacet.dataDoubleRanges(result.facets, 'SomeDouble');
        expect(dataDoubleRangesFacet).not.toBeNull();

        const dataObjectFacet = GetProductCategoryFacet.dataObject(result.facets, 'SomeObject');
        expect(dataObjectFacet).not.toBeNull();
    }

    expect(result?.hits).toBeGreaterThan(0);
});