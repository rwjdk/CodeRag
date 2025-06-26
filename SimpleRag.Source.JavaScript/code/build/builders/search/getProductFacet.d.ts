import { BrandFacetResult, CategoryFacetResult, CategoryHierarchyFacetResult, PriceRangeFacetResult, PriceRangesFacetResult, ProductAssortmentFacetResult, ProductDataBooleanValueFacetResult, ProductDataDoubleRangeFacetResult, ProductDataDoubleRangesFacetResult, ProductDataDoubleValueFacetResult, ProductDataObjectFacetResult, ProductDataStringValueFacetResult, ProductFacetResult, VariantSpecificationFacetResult } from '../../models/data-contracts';
export type DataSelectionStrategy = ProductDataDoubleRangeFacetResult['dataSelectionStrategy'];
export type PriceSelectionStrategy = PriceRangeFacetResult['priceSelectionStrategy'];
export declare class GetProductFacet {
    static productAssortment(facets: ProductFacetResult, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant'): ProductAssortmentFacetResult | null;
    static brand(facets: ProductFacetResult): BrandFacetResult | null;
    static category(facets: ProductFacetResult, selectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants'): CategoryFacetResult | null;
    static categoryHierarchy(facets: ProductFacetResult, selectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants'): CategoryHierarchyFacetResult | null;
    static listPriceRange(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy): PriceRangeFacetResult | null;
    static salesPriceRange(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy): PriceRangeFacetResult | null;
    static listPriceRanges(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy): PriceRangesFacetResult | null;
    static listPriceRangesWithRange(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy, expandedRangeSize: number | null): PriceRangesFacetResult | null;
    static salesPriceRanges(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy): PriceRangesFacetResult | null;
    static salesPriceRangesWithRange(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy, expandedRangeSize: number | null): PriceRangesFacetResult | null;
    static dataDoubleRange(facets: ProductFacetResult, selectionStrategy: DataSelectionStrategy, key: string): ProductDataDoubleRangeFacetResult | null;
    static dataDoubleRanges(facets: ProductFacetResult, selectionStrategy: DataSelectionStrategy, key: string): ProductDataDoubleRangesFacetResult | null;
    static variantSpecification(facets: ProductFacetResult, key: string): VariantSpecificationFacetResult | null;
    static dataString(facets: ProductFacetResult, key: string, selectionStrategy: DataSelectionStrategy): ProductDataStringValueFacetResult | null;
    static dataBoolean(facets: ProductFacetResult, key: string, selectionStrategy: DataSelectionStrategy): ProductDataBooleanValueFacetResult | null;
    static dataNumber(facets: ProductFacetResult, key: string, selectionStrategy: DataSelectionStrategy): ProductDataDoubleValueFacetResult | null;
    static dataObject(facets: ProductFacetResult, selectionStrategy: DataSelectionStrategy, key: string): ProductDataObjectFacetResult | null;
    private static data;
}
