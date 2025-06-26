import { Searcher, ProductSearchBuilder, ProductSearchRequest, UserFactory, ValueSelectorFactory, DataValueFactory, GetProductFacet, ProductAssortmentFacet, ProductDataStringValueFacetResult, CategoryFacetResult, BrandFacetResult, Tracker } from '../../src';
import { Integrator, ProductUpdateBuilder, ProductVariantBuilder } from '@relewise/integrations';
import { test, expect } from '@jest/globals'
import { fail } from 'assert';

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });
const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseProductBuilder() {
    return new ProductSearchBuilder({
        language: 'da',
        currency: 'DKK',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('ProductSearch: Relevance modifier without conditions', async () => {

    const request: ProductSearchRequest = baseProductBuilder()
        .relevanceModifiers(b => b.addProductDataRelevanceModifier('NoveltyBoostModifier', conditions => conditions, ValueSelectorFactory.dataDoubleSelector('NoveltyBoostModifier')))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Product search - data object facets', async () => {
    const request: ProductSearchRequest = baseProductBuilder()
        .facets(f => f.addProductDataObjectFacet(
            't',
            'Product',
            f => f
                .addStringFacet('d', ['values'])
                .addBooleanFacet('b', [true]),
            {
                conditions: c => c.addContainsCondition('d', DataValueFactory.boolean(true)),
                take: 1,
                skip: 2,
            },
            { alwaysIncludeSelectedInAvailable: true, includeZeroHitsInAvailable: false }))

        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Product search - with cleared facets', async () => {
    const request = baseProductBuilder()
        .facets(f => f.addBrandFacet());

    request.facets(builder => builder.clear());

    const result = await searcher.searchProducts(request.build());

    expect(result?.facets).toBeUndefined();
});

test('Retail Media search', async () => {
    const request: ProductSearchRequest = baseProductBuilder()
        .setRetailMedia({
            location: {
                key: 'SEARCH_RESULTS_PAGE', placements: [{ key: 'TOP' }], variation: { key: 'DESKTOP' },
            },
        })
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Facet result', async () => {
    const variant = new ProductVariantBuilder({ id: 'GetProductFacet test variant' })
        .specifications({ SomeSpecification: 'S' })
        .build();

    const product = new ProductUpdateBuilder({
        id: 'GetProductFacet test product',
        productUpdateKind: 'ReplaceProvidedProperties',
    })
        .data({
            'SomeString': DataValueFactory.string('Really nice product'),
            'SomeDouble': DataValueFactory.number(1),
            'SomeBoolean': DataValueFactory.boolean(true),
            'SomeObject': DataValueFactory.object({})
        })
        .variants([variant]);

    await integrator.updateProduct(product.build());

    const request: ProductSearchRequest = baseProductBuilder()
        .setSelectedProductProperties({ allData: true })
        .facets(f => f
            .addProductAssortmentFacet('Product')
            .addBrandFacet()
            .addCategoryFacet('ImmediateParent')
            .addProductCategoryHierarchyFacet('Ancestors')
            .addListPriceRangesFacet('Product')
            .addListPriceRangesFacet('Product', null, 10)
            .addListPriceRangeFacet('Product')
            .addSalesPriceRangeFacet('Product')
            .addSalesPriceRangesFacet('Product', null, 10)
            .addProductDataStringValueFacet('SomeString', 'Product')
            .addProductDataDoubleRangeFacet('SomeDouble', 'Product')
            .addProductDataDoubleRangesFacet('SomeDouble', 'Product')
            .addVariantSpecificationFacet('SomeSpecification')
            .addProductDataBooleanValueFacet('SomeBoolean', 'Product')
            .addProductDataDoubleValueFacet('SomeDouble', 'Product')
            .addProductDataObjectFacet('SomeObject', 'Product'))
        .build();

    const result = await searcher.searchProducts(request);

    if (result && result.facets) {
        const assortmentFacet = GetProductFacet.productAssortment(result.facets, 'Product');
        expect(assortmentFacet).toBeDefined();

        const brandFacet = GetProductFacet.brand(result.facets);
        expect(brandFacet).not.toBeNull();

        const categoryFacet = GetProductFacet.category(result.facets, 'ImmediateParent');
        expect(categoryFacet).not.toBeNull();

        const categoryHierarchyFacet = GetProductFacet.categoryHierarchy(result.facets, 'Ancestors');
        expect(categoryHierarchyFacet).not.toBeNull();

        const listPriceRangeFacet = GetProductFacet.listPriceRange(result.facets, 'Product');
        expect(listPriceRangeFacet).not.toBeNull();

        const salesPriceRangeFacet = GetProductFacet.salesPriceRange(result.facets, 'Product');
        expect(salesPriceRangeFacet).not.toBeNull();

        const listPriceRangesFacet = GetProductFacet.listPriceRanges(result.facets, 'Product');
        expect(listPriceRangesFacet).not.toBeNull();

        const listPriceRangesWithRangeFacet = GetProductFacet.listPriceRangesWithRange(result.facets, 'Product', 10);
        expect(listPriceRangesWithRangeFacet).not.toBeNull();

        const salesPriceRangesFacet = GetProductFacet.salesPriceRanges(result.facets, 'Product');
        expect(salesPriceRangesFacet).not.toBeNull();

        const salesPriceRangesWithRangeFacet = GetProductFacet.salesPriceRangesWithRange(result.facets, 'Product', 10);
        expect(salesPriceRangesWithRangeFacet).not.toBeNull();

        const dataDoubleRangeFacet = GetProductFacet.dataDoubleRange(result.facets, 'Product', 'SomeDouble');
        expect(dataDoubleRangeFacet).not.toBeNull();

        const dataDoubleRangesFacet = GetProductFacet.dataDoubleRanges(result.facets, 'Product', 'SomeDouble');
        expect(dataDoubleRangesFacet).not.toBeNull();

        const variantSpecificationFacet = GetProductFacet.variantSpecification(result.facets, 'SomeSpecification');
        expect(variantSpecificationFacet).not.toBeNull();

        const dataStringFacet = GetProductFacet.dataString(result.facets, 'SomeString', 'Product');
        expect(dataStringFacet).not.toBeNull();

        const dataBooleanFacet = GetProductFacet.dataBoolean(result.facets, 'SomeBoolean', 'Product');
        expect(dataBooleanFacet).not.toBeNull();

        const dataNumberFacet = GetProductFacet.dataNumber(result.facets, 'SomeDouble', 'Product');
        expect(dataNumberFacet).not.toBeNull();

        const dataObjectFacet = GetProductFacet.dataObject(result.facets, 'Product', 'SomeObject');
        expect(dataObjectFacet).not.toBeNull();
    }

    expect(result?.hits).toBeGreaterThan(0);
});

test('ProductSearch with search constraint', async () => {

    const request: ProductSearchRequest = baseProductBuilder()
        .searchConstraints(constraints => constraints.setResultMustHaveVariantConstraint({ exceptWhenProductHasNoVariants: true }))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Highlighting', async () => {
    const request: ProductSearchRequest = baseProductBuilder()
        .setTerm('SomeValue')
        .highlighting(h => {
            h.setHighlightable({ dataKeys: ['SomeString'] })
            // You have to specify to include the offset.
            // Currently offset is the only way to get a result, so if not set, you won't get a result.
            h.setShape({
                offsets: { include: true },
                snippets: { include: true, includeMatchedWords: true, useEllipses: true }
            })
        }).build();
    const result = await searcher.searchProducts(request);

    expect(result?.results![0].highlight?.offsets?.data[0].value.length).toBeGreaterThan(0);
    expect(result?.results![0].highlight?.snippets?.data[0].value[0].text).toBe("SomeValue");
})

test('Aborting a search throws the expected error', async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const request: ProductSearchRequest = baseProductBuilder()
        .setTerm('SomeValue')
        .build();

    controller.abort()

    try {
        await searcher.searchProducts(request, { abortSignal: signal });
        fail('Expected an AbortError to be thrown');
    } catch (e) {
        expect(e).toBeDefined();
        expect(e instanceof DOMException).toBe(true);
        expect((e as DOMException).name).toBe('AbortError');
    }
});

test('ProductSearch with sorted facet', async () => {

    const product = new ProductUpdateBuilder({
        id: 'Cat Product #1',
        productUpdateKind: 'ReplaceProvidedProperties',
    }).categoryPaths(c => c.path(p => p.category({ id: "1", displayName: [{ language: 'da', value: "name" }] })));
    await integrator.updateProduct(product.build());

    const product2 = new ProductUpdateBuilder({
        id: 'Cat Product #2',
        productUpdateKind: 'ReplaceProvidedProperties',
    }).categoryPaths(c => c.path(p => p.category({ id: "1", displayName: [{ language: 'da', value: "name" }] })));
    await integrator.updateProduct(product2.build());

    const product3 = new ProductUpdateBuilder({
        id: 'Cat Product #3',
        productUpdateKind: 'ReplaceProvidedProperties',
    }).categoryPaths(c => c.path(p => p.category({ id: "2", displayName: [{ language: 'da', value: "name 2" }] })));
    await integrator.updateProduct(product3.build());

    const request: ProductSearchRequest = baseProductBuilder()
        .facets(f =>
            f.addCategoryFacet("ImmediateParent", null, b => b.take(2).sortByHits())
        )
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
    expect(result?.facets).not.toBeNull();

    const categoryFacet = GetProductFacet.category(result!.facets!, 'ImmediateParent');
    expect(categoryFacet).not.toBeNull();
    expect(categoryFacet?.available?.length).toBe(2)

    if (!categoryFacet?.available![0]) fail();

    expect(categoryFacet?.available![0]?.hits).toBeGreaterThan(categoryFacet?.available![1]!.hits!)
});