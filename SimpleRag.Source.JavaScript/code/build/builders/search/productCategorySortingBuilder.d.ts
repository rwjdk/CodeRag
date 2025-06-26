import { ProductCategorySortBySpecification } from '../../models/data-contracts';
export declare class ProductCategorySortingBuilder {
    private value;
    sortByProductCategoryData(key: string, order?: 'Ascending' | 'Descending', mode?: 'Auto' | 'Alphabetical' | 'Numerical', thenBy?: (thenBy: ProductCategorySortingBuilder) => void): void;
    sortByProductCategoryRelevance(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductCategorySortingBuilder) => void): void;
    sortByProductCategoryPopularity(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductCategorySortingBuilder) => void): void;
    sortByProductCategoryAttribute(attribute: 'Id' | 'DisplayName', order: 'Ascending' | 'Descending', mode?: 'Auto' | 'Alphabetical' | 'Numerical', thenBy?: (thenBy: ProductCategorySortingBuilder) => void): void;
    private thenBy;
    build(): ProductCategorySortBySpecification | null;
}
