import { CategoryPath, SelectedProductCategoryPropertiesSettings, SelectedContentCategoryPropertiesSettings, FacetSettings, ProductFacetQuery, PurchaseQualifiers } from '../../models/data-contracts';
import { DataObjectFilterConditionBuilder } from '../dataObjectFilterConditionBuilder';
import { DataObjectFacetBuilder } from './dataObjectFacetBuilder';
import { FacetSettingsBuilder } from './facetSettingsBuilder';
export declare class FacetBuilder {
    private facets;
    addCategoryFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors', selectedValues?: string[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryHierarchyFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants', selectedValues?: CategoryPath[] | null, selectedPropertiesSettings?: Partial<SelectedProductCategoryPropertiesSettings>, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentCategoryHierarchyFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants', selectedValues?: CategoryPath[] | null, selectedPropertiesSettings?: Partial<SelectedContentCategoryPropertiesSettings>, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addBrandFacet(selectedValues?: string[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductAssortmentFacet(selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues?: number[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addVariantSpecificationFacet(key: string, selectedValues?: string[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataDoubleRangeFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataDoubleRangesFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataStringValueFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues?: string[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataBooleanValueFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues?: boolean[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataDoubleValueFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues?: number[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addSalesPriceRangeFacet(priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addSalesPriceRangesFacet(priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addListPriceRangeFacet(priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addListPriceRangesFacet(priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataObjectFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', builder?: (facets: DataObjectFacetBuilder) => void, filter?: {
        conditions?: (builder: DataObjectFilterConditionBuilder) => void;
        skip?: number;
        take?: number;
    }, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addRecentlyPurchasedFacet(purchaseQualifiers: PurchaseQualifiers, selectedValues?: boolean[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentAssortmentFacet(selectedValues?: number[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataDoubleRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataDoubleRangesFacet(key: string, predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataStringValueFacet(key: string, selectedValues?: string[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataBooleanValueFacet(key: string, selectedValues?: boolean[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataDoubleValueFacet(key: string, selectedValues?: number[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataObjectFacet(key: string, builder?: (facets: DataObjectFacetBuilder) => void, filter?: {
        conditions?: (builder: DataObjectFilterConditionBuilder) => void;
        skip?: number;
        take?: number;
    }, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryAssortmentFacet(selectedValues?: number[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataDoubleRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataDoubleRangesFacet(key: string, predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataStringValueFacet(key: string, selectedValues?: string[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataBooleanValueFacet(key: string, selectedValues?: boolean[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataDoubleValueFacet(key: string, selectedValues?: number[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataObjectFacet(key: string, builder?: (facets: DataObjectFacetBuilder) => void, filter?: {
        conditions?: (builder: DataObjectFilterConditionBuilder) => void;
        skip?: number;
        take?: number;
    }, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    build(): ProductFacetQuery | null;
    private mapSelectedDoubleRange;
}
