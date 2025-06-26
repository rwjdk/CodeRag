import { ContentUpdateBuilder, Integrator } from '@relewise/integrations';
import { Searcher, GetContentFacet, UserFactory, CategoryFacetResult, ContentSearchBuilder, ContentSearchRequest, ContentAssortmentFacet, ContentDataStringValueFacetResult, DataValueFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });
const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseContentBuilder() {
    return new ContentSearchBuilder({
        language: 'da',
        currency: 'DKK',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('Facet result', async() => {
    const content = new ContentUpdateBuilder({
        id: 'GetContentFacet test content',
        updateKind: 'ReplaceProvidedProperties'
    })
        .data({
            'SomeString': DataValueFactory.string('Really nice product'),
            'SomeDouble': DataValueFactory.number(1),   
            'SomeBoolean': DataValueFactory.boolean(true),
            'SomeObject': DataValueFactory.object({ })   
        })
        .assortments([1, 2, 3]);

    await integrator.updateContent(content.build());
    
    const request: ContentSearchRequest = baseContentBuilder()
        .facets(f => f
            .addContentAssortmentFacet()
            .addContentDataStringValueFacet('SomeString')
            .addContentDataBooleanValueFacet('SomeBoolean')
            .addContentDataDoubleValueFacet('SomeDouble')
            .addCategoryFacet('ImmediateParent')
            .addContentCategoryHierarchyFacet('Ancestors')
            .addContentDataDoubleRangeFacet('SomeDouble')
            .addContentDataDoubleRangesFacet('SomeDouble')
            .addContentDataObjectFacet('SomeObject'))
        .build();

    const result = await searcher.searchContents(request);

    if (result?.facets) {
        const assortmentFacet = GetContentFacet.assortment(result.facets);
        expect(assortmentFacet).not.toBeNull();

        const dataStringFacet = GetContentFacet.dataString(result.facets, 'SomeString');
        expect(dataStringFacet).not.toBeNull();

        const dataBooleanFacet = GetContentFacet.dataBoolean(result.facets, 'SomeBoolean');
        expect(dataBooleanFacet).not.toBeNull();

        const dataNumberFacet = GetContentFacet.dataNumber(result.facets, 'SomeDouble');
        expect(dataNumberFacet).not.toBeNull();

        const categoryFacet = GetContentFacet.category(result.facets, 'ImmediateParent');
        expect(categoryFacet).not.toBeNull();

        const categoryHierarchyFacet = GetContentFacet.categoryHierarchy(result.facets, 'Ancestors');
        expect(categoryHierarchyFacet).not.toBeNull();

        const dataDoubleRangeFacet = GetContentFacet.dataDoubleRange(result.facets, 'SomeDouble');
        expect(dataDoubleRangeFacet).not.toBeNull();

        const dataDoubleRangesFacet = GetContentFacet.dataDoubleRanges(result.facets, 'SomeDouble');
        expect(dataDoubleRangesFacet).not.toBeNull();

        const dataObjectFacet = GetContentFacet.dataObject(result.facets, 'SomeObject');
        expect(dataObjectFacet).not.toBeNull();
    }

    expect(result?.hits).toBeGreaterThan(0);
});

test('Highlighting', async() => {
    const request: ContentSearchRequest = baseContentBuilder()
        .setTerm('highlighted')    
        .highlighting(h => {
            h.setHighlightable({ dataKeys: ['Description'] })
            h.setLimit({ maxWordsBeforeMatch: 3 })
            // You have to specify to include the offset.
            // Currently offset is the only way to get a result, so if not set, you won't get a result.
            h.setShape({  
                offsets: { include: true },
                snippets: { include: true, includeMatchedWords: true, useEllipses: true } 
            })
        }).build();
    
    const result = await searcher.searchContents(request);

    expect(result?.results![0].highlight?.offsets?.data[0].value.length).toBeGreaterThan(0);
    expect(result?.results![0].highlight?.snippets?.data[0].value[0].text).toBe("...word should be highlighted");
})