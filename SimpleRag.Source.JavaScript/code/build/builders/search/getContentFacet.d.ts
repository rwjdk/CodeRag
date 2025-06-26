import { ContentAssortmentFacetResult, CategoryFacetResult, CategoryHierarchyFacetResult, ContentDataDoubleRangeFacetResult, ContentDataDoubleRangesFacetResult, ContentDataStringValueFacetResult, ContentDataBooleanValueFacetResult, ContentDataDoubleValueFacetResult, ContentDataObjectFacetResult, FacetResult, ContentFacetResult } from '../../models/data-contracts';
export declare class GetContentFacet {
    items: FacetResult[] | null;
    constructor(items: FacetResult[] | null);
    static category(facets: ContentFacetResult, selectionStrategy: string): CategoryFacetResult | null;
    static categoryHierarchy(facets: ContentFacetResult, selectionStrategy: string): CategoryHierarchyFacetResult | null;
    static assortment(facets: ContentFacetResult): ContentAssortmentFacetResult | null;
    static dataDoubleRange(facets: ContentFacetResult, key: string): ContentDataDoubleRangeFacetResult | null;
    static dataDoubleRanges(facets: ContentFacetResult, key: string): ContentDataDoubleRangesFacetResult | null;
    static dataString(facets: ContentFacetResult, key: string): ContentDataStringValueFacetResult | null;
    static dataBoolean(facets: ContentFacetResult, key: string): ContentDataBooleanValueFacetResult | null;
    static dataNumber(facets: ContentFacetResult, key: string): ContentDataDoubleValueFacetResult | null;
    static dataObject(facets: ContentFacetResult, key: string): ContentDataObjectFacetResult | null;
    private static data;
}
