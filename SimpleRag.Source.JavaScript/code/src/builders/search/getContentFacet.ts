import { 
    ContentAssortmentFacetResult, 
    CategoryFacetResult, 
    CategoryHierarchyFacetResult, 
    ContentDataDoubleRangeFacetResult, 
    ContentDataDoubleRangesFacetResult, 
    ContentDataStringValueFacetResult, 
    ContentDataBooleanValueFacetResult, 
    ContentDataDoubleValueFacetResult, 
    ContentDataObjectFacetResult, 
    FacetResult,
    ContentFacetResult, 
} from '../../models/data-contracts';

export class GetContentFacet {
    items: FacetResult[] | null;

    constructor(items: FacetResult[] | null) {
        this.items = items;
    }

    public static category(
        facets: ContentFacetResult, 
        selectionStrategy: string,
    ): CategoryFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is CategoryFacetResult =>
            item.field === 'Category' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.CategoryFacetResult, Relewise.Client' && 
            'categorySelectionStrategy' in item &&
            item.categorySelectionStrategy === selectionStrategy,
        ) || null;
    }

    public static categoryHierarchy(
        facets: ContentFacetResult, 
        selectionStrategy: string,
    ): CategoryHierarchyFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is CategoryHierarchyFacetResult =>
            item.field === 'Category' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.CategoryHierarchyFacetResult, Relewise.Client' && 
            'categorySelectionStrategy' in item &&
            item.categorySelectionStrategy === selectionStrategy,
        ) || null;
    }

    public static assortment(
        facets: ContentFacetResult,
    ): ContentAssortmentFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ContentAssortmentFacetResult =>
            item.field === 'Assortment' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ContentAssortmentFacetResult, Relewise.Client',
        ) || null;
    }

    public static dataDoubleRange(
        facets: ContentFacetResult, 
        key: string,
    ): ContentDataDoubleRangeFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ContentDataDoubleRangeFacetResult =>
            item.field === 'Data' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ContentDataDoubleRangeFacetResult, Relewise.Client' && 
            'key' in item &&
            item.key === key,
        ) || null;
    }

    public static dataDoubleRanges(
        facets: ContentFacetResult, 
        key: string,
    ): ContentDataDoubleRangesFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ContentDataDoubleRangesFacetResult =>
            item.field === 'Data' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductDataDoubleRangesFacetResult, Relewise.Client' && 
            'key' in item &&
            item.key === key,
        ) || null;
    }

    public static dataString(
        facets: ContentFacetResult, 
        key: string,
    ): ContentDataStringValueFacetResult | null {
        return this.data(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ContentDataStringValueFacetResult, Relewise.Client', key);
    }

    public static dataBoolean(
        facets: ContentFacetResult, 
        key: string,
    ): ContentDataBooleanValueFacetResult | null {
        return this.data(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ContentDataBooleanValueFacetResult, Relewise.Client', key);
    }

    public static dataNumber(
        facets: ContentFacetResult, 
        key: string,
    ): ContentDataDoubleValueFacetResult | null {
        return this.data(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ContentDataDoubleValueFacetResult, Relewise.Client', key);
    }

    public static dataObject(
        facets: ContentFacetResult, 
        key: string,
    ): ContentDataObjectFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ContentDataObjectFacetResult =>
            item.field === 'Data' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ContentDataObjectFacetResult, Relewise.Client' && 
            'key' in item &&
            item.key === key,
        ) || null;
    }

    private static data<TFacetResult>(
        facets: ContentFacetResult,
        $type: string,
        key: string,
    ): TFacetResult | null {
        if (!facets?.items) return null;

        return (facets.items.find((a: any) =>
            a.$type === $type &&
            a.field === 'Data' &&
            'key' in a && a.key === key,
        ) || null) as TFacetResult | null;
    }
};
