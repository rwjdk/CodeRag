import { BrandFacetResult, CategoryFacetResult, CategoryHierarchyFacetResult, PriceRangeFacetResult, PriceRangesFacetResult, ProductAssortmentFacetResult, ProductDataBooleanValueFacetResult, ProductDataDoubleRangeFacetResult, ProductDataDoubleRangesFacetResult, ProductDataDoubleValueFacetResult, ProductDataObjectFacetResult, ProductDataStringValueFacetResult, ProductFacetResult, VariantSpecificationFacetResult } from '../../models/data-contracts';

export type DataSelectionStrategy = ProductDataDoubleRangeFacetResult['dataSelectionStrategy'];
export type PriceSelectionStrategy = PriceRangeFacetResult['priceSelectionStrategy'];

export class GetProductFacet {
    public static productAssortment(facets: ProductFacetResult, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant'): ProductAssortmentFacetResult | null {
        if (!facets?.items) return null;

        return facets
            .items
            .find((item): item is ProductAssortmentFacetResult =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.items.Result.ProductAssortmentFacetResult, Relewise.Client' &&
                'field' in item &&
                item.field === 'Assortment' &&
                'assortmentSelectionStrategy' in item &&
                item.assortmentSelectionStrategy === selectionStrategy) || null;
    }

    public static brand(facets: ProductFacetResult): BrandFacetResult | null {
        if (!facets?.items) return null;

        return facets
            .items
            .find((item): item is BrandFacetResult =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.BrandFacetResult, Relewise.Client' &&
                'field' in item &&
                item.field === 'Brand') || null;
    }

    public static category(facets: ProductFacetResult, selectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants'): CategoryFacetResult | null {
        if (!facets?.items) return null;

        return facets
            .items
            .find((item): item is CategoryFacetResult =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.CategoryFacetResult, Relewise.Client' &&
                'categorySelectionStrategy' in item
                && item.categorySelectionStrategy === selectionStrategy) || null;
    }

    public static categoryHierarchy(facets: ProductFacetResult, selectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants'): CategoryHierarchyFacetResult | null {
        if (!facets?.items) return null;

        return facets
            .items
            .find((item): item is CategoryHierarchyFacetResult =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.CategoryHierarchyFacetResult, Relewise.Client' &&
                'categorySelectionStrategy' in item &&
                item.categorySelectionStrategy === selectionStrategy) || null;
    }

    public static listPriceRange(
        facets: ProductFacetResult,
        selectionStrategy: PriceSelectionStrategy,
    ): PriceRangeFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is PriceRangeFacetResult =>
            item.field === 'ListPrice' &&
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.PriceRangeFacetResult, Relewise.Client' &&
            'priceSelectionStrategy' in item &&
            item.priceSelectionStrategy === selectionStrategy,
        ) || null;
    }

    public static salesPriceRange(
        facets: ProductFacetResult,
        selectionStrategy: PriceSelectionStrategy,
    ): PriceRangeFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is PriceRangeFacetResult =>
            item.field === 'SalesPrice' &&
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.PriceRangeFacetResult, Relewise.Client' &&
            'priceSelectionStrategy' in item &&
            item.priceSelectionStrategy === selectionStrategy,
        ) || null;
    }

    public static listPriceRanges(
        facets: ProductFacetResult,
        selectionStrategy: PriceSelectionStrategy,
    ): PriceRangesFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is PriceRangesFacetResult =>
            item.field === 'ListPrice' &&
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.PriceRangesFacetResult, Relewise.Client' &&
            'priceSelectionStrategy' in item &&
            item.priceSelectionStrategy === selectionStrategy,
        ) || null;
    }

    public static listPriceRangesWithRange(
        facets: ProductFacetResult,
        selectionStrategy: PriceSelectionStrategy,
        expandedRangeSize: number | null,
    ): PriceRangesFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is PriceRangesFacetResult =>
            item.field === 'ListPrice' &&
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.PriceRangesFacetResult, Relewise.Client' &&
            'priceSelectionStrategy' in item &&
            item.priceSelectionStrategy === selectionStrategy &&
            'expandedRangeSize' in item &&
            item.expandedRangeSize === expandedRangeSize,
        ) || null;
    }

    public static salesPriceRanges(
        facets: ProductFacetResult,
        selectionStrategy: PriceSelectionStrategy,
    ): PriceRangesFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is PriceRangesFacetResult =>
            item.field === 'SalesPrice' &&
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.PriceRangesFacetResult, Relewise.Client' &&
            'priceSelectionStrategy' in item &&
            item.priceSelectionStrategy === selectionStrategy,
        ) || null;
    }

    public static salesPriceRangesWithRange(
        facets: ProductFacetResult,
        selectionStrategy: PriceSelectionStrategy,
        expandedRangeSize: number | null,
    ): PriceRangesFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is PriceRangesFacetResult =>
            item.field === 'SalesPrice' &&
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.PriceRangesFacetResult, Relewise.Client' &&
            'priceSelectionStrategy' in item &&
            item.priceSelectionStrategy === selectionStrategy &&
            'expandedRangeSize' in item &&
            item.expandedRangeSize === expandedRangeSize,
        ) || null;
    }

    public static dataDoubleRange(
        facets: ProductFacetResult,
        selectionStrategy: DataSelectionStrategy,
        key: string,
    ): ProductDataDoubleRangeFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ProductDataDoubleRangeFacetResult =>
            item.field === 'Data' &&
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductDataDoubleRangeFacetResult, Relewise.Client' &&
            'dataSelectionStrategy' in item &&
            item.dataSelectionStrategy === selectionStrategy &&
            'key' in item &&
            item.key === key,
        ) || null;
    }

    public static dataDoubleRanges(
        facets: ProductFacetResult,
        selectionStrategy: DataSelectionStrategy,
        key: string,
    ): ProductDataDoubleRangesFacetResult | null {
        if (!facets?.items) return null;

        return facets.items.find((item): item is ProductDataDoubleRangesFacetResult =>
            item.field === 'Data' &&
            item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductDataDoubleRangesFacetResult, Relewise.Client' &&
            'dataSelectionStrategy' in item &&
            item.dataSelectionStrategy === selectionStrategy &&
            'key' in item &&
            item.key === key,
        ) || null;
    }

    public static variantSpecification(facets: ProductFacetResult, key: string): VariantSpecificationFacetResult | null {
        if (!facets?.items) return null;

        return facets
            .items
            .find((item): item is VariantSpecificationFacetResult =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.VariantSpecificationFacetResult, Relewise.Client' &&
                'field' in item &&
                item.field === 'VariantSpecification' &&
                'key' in item && item.key === key) || null;
    }

    public static dataString(
        facets: ProductFacetResult,
        key: string,
        selectionStrategy: DataSelectionStrategy,
    ): ProductDataStringValueFacetResult | null {
        return this.data<ProductDataStringValueFacetResult>(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ProductDataStringValueFacetResult, Relewise.Client', selectionStrategy, key);
    }

    public static dataBoolean(
        facets: ProductFacetResult,
        key: string,
        selectionStrategy: DataSelectionStrategy,
    ): ProductDataBooleanValueFacetResult | null {
        return this.data<ProductDataBooleanValueFacetResult>(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ProductDataBooleanValueFacetResult, Relewise.Client', selectionStrategy, key);
    }

    public static dataNumber(
        facets: ProductFacetResult,
        key: string,
        selectionStrategy: DataSelectionStrategy,
    ): ProductDataDoubleValueFacetResult | null {
        return this.data<ProductDataDoubleValueFacetResult>(facets, 'Relewise.Client.DataTypes.Search.Facets.Result.ProductDataDoubleValueFacetResult, Relewise.Client', selectionStrategy, key);
    }

    public static dataObject(
        facets: ProductFacetResult,
        selectionStrategy: DataSelectionStrategy,
        key: string,
    ): ProductDataObjectFacetResult | null {
        if (!facets?.items) return null;

        return (facets.items.find((a): a is ProductDataObjectFacetResult =>
            a.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductDataObjectFacetResult, Relewise.Client' &&
            a.field === 'Data' &&
            (a as ProductDataObjectFacetResult).key === key &&
            (a as ProductDataObjectFacetResult).dataSelectionStrategy === selectionStrategy,
        ) || null) as ProductDataObjectFacetResult;
    }

    private static data<TFacetResult>(
        facets: ProductFacetResult,
        $type: string,
        selectionStrategy: DataSelectionStrategy,
        key: string,
    ): TFacetResult | null {
        if (!facets?.items) return null;

        return (facets.items.find((a: any) =>
            a.$type === $type &&
            a.field === 'Data' &&
            'dataSelectionStrategy' in a && a.dataSelectionStrategy === selectionStrategy &&
            'key' in a && a.key === key,
        ) || null) as TFacetResult | null;
    }
};