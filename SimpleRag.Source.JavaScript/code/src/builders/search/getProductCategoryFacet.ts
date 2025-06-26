import { 
    ProductCategoryAssortmentFacetResult, 
    ProductCategoryDataDoubleRangeFacetResult, 
    ProductCategoryDataDoubleRangesFacetResult, 
    ProductCategoryDataStringValueFacetResult, 
    ProductCategoryDataBooleanValueFacetResult, 
    ProductCategoryDataDoubleValueFacetResult, 
    ProductCategoryDataObjectFacetResult, 
    FacetResult,
    ProductCategoryFacetResult, 
} from '../../models/data-contracts';

export class GetProductCategoryFacet {
    items: FacetResult[] | null;

    constructor(items: FacetResult[] | null) {
        this.items = items;
    }

    public static assortment(
        facets: ProductCategoryFacetResult,
    ): ProductCategoryAssortmentFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ProductCategoryAssortmentFacetResult =>
            item.field === 'Assortment' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductCategoryAssortmentFacetResult, Relewise.Client',
        ) || null;
    }

    public static dataDoubleRange(
        facets: ProductCategoryFacetResult, 
        key: string,
    ): ProductCategoryDataDoubleRangeFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ProductCategoryDataDoubleRangeFacetResult =>
            item.field === 'Data' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductCategoryDataDoubleRangeFacetResult, Relewise.Client' && 
            'key' in item &&
            item.key === key,
        ) || null;
    }

    public static dataDoubleRanges(
        facets: ProductCategoryFacetResult, 
        key: string,
    ): ProductCategoryDataDoubleRangesFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ProductCategoryDataDoubleRangesFacetResult =>
            item.field === 'Data' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductDataDoubleRangesFacetResult, Relewise.Client' && 
            'key' in item &&
            item.key === key,
        ) || null;
    }

    public static dataString(
        facets: ProductCategoryFacetResult, 
        key: string,
    ): ProductCategoryDataStringValueFacetResult | null {
        return this.data(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ProductCategoryDataStringValueFacetResult, Relewise.Client', key);
    }

    public static dataBoolean(
        facets: ProductCategoryFacetResult, 
        key: string,
    ): ProductCategoryDataBooleanValueFacetResult | null {
        return this.data(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ProductCategoryDataBooleanValueFacetResult, Relewise.Client', key);
    }

    public static dataNumber(
        facets: ProductCategoryFacetResult, 
        key: string,
    ): ProductCategoryDataDoubleValueFacetResult | null {
        return this.data(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ProductCategoryDataDoubleValueFacetResult, Relewise.Client', key);
    }

    public static dataObject(
        facets: ProductCategoryFacetResult, 
        key: string,
    ): ProductCategoryDataObjectFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ProductCategoryDataObjectFacetResult =>
            item.field === 'Data' && 
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductCategoryDataObjectFacetResult, Relewise.Client' && 
            'key' in item &&
            item.key === key,
        ) || null;
    }

    private static data<TFacetResult>(
        facets: ProductCategoryFacetResult,
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
