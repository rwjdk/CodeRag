import { ProductSortBySpecification } from '../../models/data-contracts';
import { DataObjectValueSelectorBuilder } from './dataObjectValueSelectorBuilder';
export declare class ProductSortingBuilder {
    private value;
    sortByProductData(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    sortByProductDataObject(selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', order: 'Ascending' | 'Descending', valueSelector: (valueSelector: DataObjectValueSelectorBuilder) => void, thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    sortByProductRelevance(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void): void;
    sortByProductPopularity(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void): void;
    sortByProductAttribute(attribute: 'Id' | 'DisplayName' | 'BrandId' | 'BrandName' | 'ListPrice' | 'SalesPrice', order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    sortByProductVariantAttribute(attribute: 'Id' | 'DisplayName' | 'ListPrice' | 'SalesPrice', order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    sortByProductVariantSpecification(key: string, order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    private thenBy;
    build(): ProductSortBySpecification | null;
}
