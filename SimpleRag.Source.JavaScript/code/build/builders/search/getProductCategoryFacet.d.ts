import { ProductCategoryAssortmentFacetResult, ProductCategoryDataDoubleRangeFacetResult, ProductCategoryDataDoubleRangesFacetResult, ProductCategoryDataStringValueFacetResult, ProductCategoryDataBooleanValueFacetResult, ProductCategoryDataDoubleValueFacetResult, ProductCategoryDataObjectFacetResult, FacetResult, ProductCategoryFacetResult } from '../../models/data-contracts';
export declare class GetProductCategoryFacet {
    items: FacetResult[] | null;
    constructor(items: FacetResult[] | null);
    static assortment(facets: ProductCategoryFacetResult): ProductCategoryAssortmentFacetResult | null;
    static dataDoubleRange(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataDoubleRangeFacetResult | null;
    static dataDoubleRanges(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataDoubleRangesFacetResult | null;
    static dataString(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataStringValueFacetResult | null;
    static dataBoolean(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataBooleanValueFacetResult | null;
    static dataNumber(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataDoubleValueFacetResult | null;
    static dataObject(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataObjectFacetResult | null;
    private static data;
}
