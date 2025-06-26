import { UserFactory } from '../../../../src/factory';
import { ProductSearchBuilder } from '../../../../src/builders/search';
import { test, expect } from '@jest/globals'
import { ProductHasVariantsFilter, ProductSearchRequest } from '../../../../src/models/data-contracts';

function baseBuilder() {
    return new ProductSearchBuilder({
        language: 'da-DK',
        currency: 'DKK',
        displayedAtLocation: 'search page',
        user: UserFactory.anonymous(),
    });
};

test('setTerm', () => {
    const expectedTerm = 'shoe';

    const subject: ProductSearchRequest = baseBuilder()
        .setTerm(expectedTerm)
        .build();

    expect(subject.term).toBe(expectedTerm);
});

test('reset Term', () => {
    const expectedTerm = null;

    const subject: ProductSearchRequest = baseBuilder()
        .setTerm('test')
        .setTerm(expectedTerm)
        .build();

    expect(subject.term).toBe(expectedTerm);
});

test('explodedVariants', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setExplodedVariants(1)
        .build();

    expect(subject.settings?.explodedVariants).toBe(1);
});

test('productProperties', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setSelectedProductProperties({
            displayName: true,
            categoryPaths: true,
            assortments: true,
            pricing: true,
            allData: true,
            viewedByUserInfo: true,
            purchasedByUserInfo: true,
            brand: true,
            allVariants: true,
        })
        .build();

    expect(subject.settings?.selectedProductProperties?.allData).toBe(true);
});

test('variantProperties', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setSelectedVariantProperties({
            displayName: true,
            assortments: true,
            pricing: true,
            allData: true,
            allSpecifications: true,
        })
        .build();

    expect(subject.settings?.selectedVariantProperties?.allSpecifications).toBe(true);
});

test('brandProperties', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setSelectedBrandProperties({
            displayName: true,
            assortments: true,
            allData: true,
            viewedByUserInfo: true,
        })
        .build();

    expect(subject.settings?.selectedBrandProperties?.displayName).toBe(true);
});

test('variantSearchSettings', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .setVariantSearchSettings({
            excludeResultsWithoutVariant: true,
        })
        .build();

    expect(subject.settings?.variantSettings?.excludeResultsWithoutVariant).toBe(true);
});

test('resultMustHaveVariantConstraint', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .searchConstraints(s => s.setResultMustHaveVariantConstraint({
            exceptWhenProductHasNoVariants: true,
        }))
        .build();

    expect(subject.settings?.resultConstraint?.exceptWhenProductHasNoVariants).toBe(true);
});

test('searchHightlighting', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .highlighting(h => {
            h.enabled(false);
            h.setHighlightable({
                displayName: true,
                dataKeys: ['datakey-1', 'datakey-2']
            });
            h.setLimit({
                maxEntryLimit: 1,
                maxSnippetsPerEntry: 2,
                maxSnippetsPerField: 3
            });
            h.setShape({
                offsets: { include: true },
                snippets: { include: true, includeMatchedWords: true, useEllipses: true }
            });
        }).build();

    expect(subject.settings?.highlight?.enabled).toBe(false);
    expect(subject.settings?.highlight?.highlightable.displayName).toBe(true);
    expect(subject.settings?.highlight?.highlightable.dataKeys![0]).toBe('datakey-1');
    expect(subject.settings?.highlight?.highlightable.dataKeys![1]).toBe('datakey-2');
    expect(subject.settings?.highlight?.limit.maxEntryLimit).toBe(1);
    expect(subject.settings?.highlight?.limit.maxSnippetsPerEntry).toBe(2);
    expect(subject.settings?.highlight?.limit.maxSnippetsPerField).toBe(3);
    expect(subject.settings?.highlight?.shape.offsets?.include).toBe(true);
    expect(subject.settings?.highlight?.shape.snippets?.include).toBe(true);
});

test('includeDisabled in ProductHasVariantsFilter', () => {
    const subject: ProductSearchRequest = baseBuilder()
        .filters(f => f.addProductHasVariantsFilter(1, 9999, false, { includeDisabled: true }))
        .build();

    const filterFromRequest = (subject.filters?.items?.[0] as ProductHasVariantsFilter) ?? null;
    expect(filterFromRequest).not.toBeNull();
    expect(filterFromRequest!.includeDisabled).toBe(true);
});