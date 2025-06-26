import { test, expect } from '@jest/globals'
import { FacetBuilder } from '../../../src/builders/search';
import { BrandFacet, ProductFacetQuery } from '../../../src/models/data-contracts';

function baseBuilder() {
    return new FacetBuilder();
};

test('empty', () => {
    const subject: ProductFacetQuery | null = baseBuilder()
        .build();

    expect(subject).toBe(null);
});

test('brand', () => {
    const subject: ProductFacetQuery | null = baseBuilder()
        .addBrandFacet()
        .build();

    expect(subject?.items).toHaveLength(1);
});

test('brand has selected value', () => {
    const subject: ProductFacetQuery | null = baseBuilder()
        .addBrandFacet(['HP'])
        .build();

    expect(subject?.items).toHaveLength(1);
    const brandFacet = subject!.items![0] as BrandFacet;
    expect(brandFacet.selected).toEqual(['HP'])
});

test('brand to be added as facet and to have its value set', () => {
    const builder: FacetBuilder = baseBuilder();
    builder.addBrandFacet();
    builder.addBrandFacet(['HP']);

    const subject: ProductFacetQuery | null = builder.build();

    expect(subject?.items).toHaveLength(2);
    const brandFacet = subject!.items![0] as BrandFacet;
    expect(brandFacet.selected).toBe(null);
});

test('clear', () => {
    const builder: FacetBuilder = baseBuilder();
    builder.addBrandFacet(['HP']);

    builder.clear();

    const subject: ProductFacetQuery | null = builder.build();

    expect(subject).toBe(null);
});