import { ProductCategoryAssortmentFacet, BrandFacet, CategoryFacet, CategoryPath, CategoryHierarchyFacet, SelectedProductCategoryPropertiesSettings, SelectedContentCategoryPropertiesSettings, ContentAssortmentFacet, ContentDataBooleanValueFacet, ContentDataDoubleRangeFacet, ContentDataDoubleRangesFacet, ContentDataDoubleValueFacet, ContentDataStringValueFacet, FacetSettings, PriceRangeFacet, PriceRangesFacet, ProductAssortmentFacet, ProductCategoryDataBooleanValueFacet, ProductCategoryDataDoubleRangeFacet, ProductCategoryDataDoubleRangesFacet, ProductCategoryDataDoubleValueFacet, ProductCategoryDataStringValueFacet, ProductDataBooleanValueFacet, ProductDataDoubleRangeFacet, ProductDataDoubleRangesFacet, ProductDataDoubleValueFacet, ProductDataStringValueFacet, ProductFacetQuery, VariantSpecificationFacet, ProductDataObjectFacet, DoubleNullableRange, ContentDataObjectFacet, ProductCategoryDataObjectFacet, RecentlyPurchasedFacet, PurchaseQualifiers } from '../../models/data-contracts';
import { DataObjectFilterConditionBuilder } from '../dataObjectFilterConditionBuilder';
import { DataObjectFacetBuilder } from './dataObjectFacetBuilder';
import { FacetSettingsBuilder } from './facetSettingsBuilder';
import { handleFacetSettings } from './handleFacetSettings';

export class FacetBuilder {
    private facets: (
        | ContentAssortmentFacet
        | ProductAssortmentFacet
        | ProductCategoryAssortmentFacet
        | BrandFacet
        | CategoryFacet
        | CategoryHierarchyFacet
        | ContentDataObjectFacet
        | ContentDataDoubleRangeFacet
        | ContentDataDoubleRangesFacet
        | ContentDataStringValueFacet
        | ContentDataBooleanValueFacet
        | ContentDataDoubleValueFacet
        | PriceRangeFacet
        | PriceRangesFacet
        | ProductCategoryDataObjectFacet
        | ProductCategoryDataDoubleRangeFacet
        | ProductCategoryDataDoubleRangesFacet
        | ProductCategoryDataStringValueFacet
        | ProductCategoryDataBooleanValueFacet
        | ProductCategoryDataDoubleValueFacet
        | ProductDataObjectFacet
        | ProductDataDoubleRangeFacet
        | ProductDataDoubleRangesFacet
        | ProductDataStringValueFacet
        | ProductDataBooleanValueFacet
        | ProductDataDoubleValueFacet
        | VariantSpecificationFacet
        | RecentlyPurchasedFacet)[] = [];

    //#region Product
    public addCategoryFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors', selectedValues: string[] | null = null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {    
        const facet: CategoryFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.CategoryFacet, Relewise.Client',
            categorySelectionStrategy: categorySelectionStrategy,
            field: 'Category',
            selected: selectedValues,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryHierarchyFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants', selectedValues: CategoryPath[] | null = null, selectedPropertiesSettings?: Partial<SelectedProductCategoryPropertiesSettings>, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: CategoryHierarchyFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.CategoryHierarchyFacet, Relewise.Client',
            categorySelectionStrategy: categorySelectionStrategy,
            field: 'Category',
            selected: selectedValues,
            settings: handleFacetSettings(facetSettings),
            selectedPropertiesSettings: selectedPropertiesSettings ? ({
                $type: 'Relewise.Client.Requests.Shared.SelectedProductCategoryPropertiesSettings, Relewise.Client',
                ...selectedPropertiesSettings,
            } as SelectedProductCategoryPropertiesSettings) : undefined,
        };
        this.facets.push(facet);

        return this;
    }

    public addContentCategoryHierarchyFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants', selectedValues: CategoryPath[] | null = null, selectedPropertiesSettings?: Partial<SelectedContentCategoryPropertiesSettings>, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: CategoryHierarchyFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.CategoryHierarchyFacet, Relewise.Client',
            categorySelectionStrategy: categorySelectionStrategy,
            field: 'Category',
            selected: selectedValues,
            settings: handleFacetSettings(facetSettings),
            selectedPropertiesSettings: selectedPropertiesSettings ? ({
                $type: 'Relewise.Client.Requests.Shared.SelectedContentCategoryPropertiesSettings, Relewise.Client',
                ...selectedPropertiesSettings,
            } as SelectedContentCategoryPropertiesSettings) : undefined,
        };
        this.facets.push(facet);

        return this;
    }

    public addBrandFacet(selectedValues: string[] | null = null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: BrandFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.BrandFacet, Relewise.Client',
            field: 'Brand',
            selected: selectedValues,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addProductAssortmentFacet(selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues: number[] | null = null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ProductAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductAssortmentFacet, Relewise.Client',
            field: 'Assortment',
            assortmentFilterType: 'Or',
            assortmentSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addVariantSpecificationFacet(key: string, selectedValues: string[] | null = null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: VariantSpecificationFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.VariantSpecificationFacet, Relewise.Client',
            field: 'VariantSpecification',
            key: key,
            selected: selectedValues,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataDoubleRangeFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const selected: DoubleNullableRange | null = this.mapSelectedDoubleRange(lowerBound, upperBound);

        const facet: ProductDataDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selected,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataDoubleRangesFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: ProductDataDoubleRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangesFacet, Relewise.Client',
            field: 'Data',
            key: key,
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            dataSelectionStrategy: selectionStrategy,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataStringValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: string[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: ProductDataStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataStringValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataBooleanValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: boolean[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: ProductDataBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataBooleanValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataDoubleValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: number[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: ProductDataDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addSalesPriceRangeFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        lowerBound?: number,
        upperBound?: number,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const selected: DoubleNullableRange | null = this.mapSelectedDoubleRange(lowerBound, upperBound);
        const facet: PriceRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangeFacet, Relewise.Client',
            field: 'SalesPrice',
            selected: selected,
            priceSelectionStrategy,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addSalesPriceRangesFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: PriceRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangesFacet, Relewise.Client',
            field: 'SalesPrice',
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            priceSelectionStrategy,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addListPriceRangeFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        lowerBound?: number,
        upperBound?: number,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const selected: DoubleNullableRange | null = this.mapSelectedDoubleRange(lowerBound, upperBound);
        const facet: PriceRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangeFacet, Relewise.Client',
            field: 'ListPrice',
            selected: selected,
            priceSelectionStrategy,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addListPriceRangesFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: PriceRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangesFacet, Relewise.Client',
            field: 'ListPrice',
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            priceSelectionStrategy,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataObjectFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        builder?: (facets: DataObjectFacetBuilder) => void,
        filter?: {
            conditions?: (builder: DataObjectFilterConditionBuilder) => void,
            skip?: number,
            take?: number
        },
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facetBuilder = new DataObjectFacetBuilder();
        if (builder) {
            builder(facetBuilder);
        }

        const conditionsBuilder = new DataObjectFilterConditionBuilder();
        if (filter?.conditions) {
            filter.conditions(conditionsBuilder);
        }

        const facet: ProductDataObjectFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataObjectFacet, Relewise.Client',
            field: 'Data',
            items: facetBuilder.build() ?? [],
            filter: {
                conditions: conditionsBuilder.build() ?? [],
                take: filter?.take,
                skip: filter?.skip,
            },
            dataSelectionStrategy: selectionStrategy,
            settings: handleFacetSettings(facetSettings),
            key: key,
        };
        this.facets.push(facet);

        return this;
    }

    public addRecentlyPurchasedFacet(
        purchaseQualifiers: PurchaseQualifiers,
        selectedValues: boolean[] | null = null,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: RecentlyPurchasedFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.RecentlyPurchasedFacet, Relewise.Client',
            field: 'Data',
            settings: handleFacetSettings(facetSettings),
            selected: selectedValues,
            purchaseQualifiers: purchaseQualifiers,
        };

        this.facets.push(facet);

        return this;
    }
    //#endregion

    //#region Content
    public addContentAssortmentFacet(selectedValues: number[] | null = null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ContentAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentAssortmentFacet, Relewise.Client',
            field: 'Assortment',
            assortmentFilterType: 'Or',
            selected: selectedValues,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataDoubleRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const selected: DoubleNullableRange | null = this.mapSelectedDoubleRange(lowerBound, upperBound);

        const facet: ContentDataDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            selected: selected,
            key: key,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataDoubleRangesFacet(
        key: string,
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: ContentDataDoubleRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangesFacet, Relewise.Client',
            field: 'Data',
            key: key,
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataStringValueFacet(key: string, selectedValues: string[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ContentDataStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataStringValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataBooleanValueFacet(key: string, selectedValues: boolean[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ContentDataBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataBooleanValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataDoubleValueFacet(key: string, selectedValues: number[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ContentDataDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataDoubleValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataObjectFacet(
        key: string,
        builder?: (facets: DataObjectFacetBuilder) => void,
        filter?: {
            conditions?: (builder: DataObjectFilterConditionBuilder) => void,
            skip?: number,
            take?: number
        },
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facetBuilder = new DataObjectFacetBuilder();
        if (builder) {
            builder(facetBuilder);
        }

        const conditionsBuilder = new DataObjectFilterConditionBuilder();
        if (filter?.conditions) {
            filter.conditions(conditionsBuilder);
        }

        const facet: ContentDataObjectFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataObjectFacet, Relewise.Client',
            field: 'Data',
            items: facetBuilder.build() ?? [],
            filter: {
                conditions: conditionsBuilder.build() ?? [],
                take: filter?.take,
                skip: filter?.skip,
            },
            settings: handleFacetSettings(facetSettings),
            key: key,
        };
        this.facets.push(facet);

        return this;
    }
    //#endregion

    //#region ProductCategories
    public addProductCategoryAssortmentFacet(selectedValues: number[] | null = null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ProductCategoryAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryAssortmentFacet, Relewise.Client',
            field: 'Assortment',
            assortmentFilterType: 'Or',
            selected: selectedValues,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataDoubleRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const selected: DoubleNullableRange | null = this.mapSelectedDoubleRange(lowerBound, upperBound);
        const facet: ProductCategoryDataDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            selected: selected,
            key: key,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataDoubleRangesFacet(
        key: string,
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: ProductCategoryDataDoubleRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangesFacet, Relewise.Client',
            field: 'Data',
            key: key,
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataStringValueFacet(key: string, selectedValues: string[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ProductCategoryDataStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataStringValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataBooleanValueFacet(key: string, selectedValues: boolean[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ProductCategoryDataBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataBooleanValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataDoubleValueFacet(key: string, selectedValues: number[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {
        const facet: ProductCategoryDataDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataDoubleValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings),
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataObjectFacet(
        key: string,
        builder?: (facets: DataObjectFacetBuilder) => void,
        filter?: {
            conditions?: (builder: DataObjectFilterConditionBuilder) => void,
            skip?: number,
            take?: number
        },
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facetBuilder = new DataObjectFacetBuilder();
        if (builder) {
            builder(facetBuilder);
        }

        const conditionsBuilder = new DataObjectFilterConditionBuilder();
        if (filter?.conditions) {
            filter.conditions(conditionsBuilder);
        }

        const facet: ProductCategoryDataObjectFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataObjectFacet, Relewise.Client',
            field: 'Data',
            items: facetBuilder.build() ?? [],
            filter: {
                conditions: conditionsBuilder.build() ?? [],
                take: filter?.take,
                skip: filter?.skip,
            },
            settings: handleFacetSettings(facetSettings),
            key: key,
        };
        this.facets.push(facet);

        return this;
    }
    //#endregion

    public clear(): this {
        this.facets = [];

        return this;
    }

    build(): ProductFacetQuery | null {
        return this.facets.length === 0
            ? null
            : {
                items: this.facets,
                $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.FacetQuery, Relewise.Client',
            }
    }

    private mapSelectedDoubleRange(lowerBound: number | undefined | null, upperBound: number | undefined | null) {
        let selected: DoubleNullableRange | null = null;
        const lowerBoundHasValue = lowerBound !== null && lowerBound !== undefined;
        const upperBoundHasValue = upperBound !== null && upperBound !== undefined;
        if (lowerBoundHasValue || upperBoundHasValue) {
            selected = {};
            if (lowerBoundHasValue) selected.lowerBoundInclusive = lowerBound;
            if (upperBoundHasValue) selected.upperBoundInclusive = upperBound;
        }
        return selected;
    }
}