import { ProductCategoryAttributeSorting, ProductCategoryDataSorting, ProductCategoryPopularitySorting, ProductCategoryRelevanceSorting, ProductCategorySortBySpecification } from '../../models/data-contracts';

export class ProductCategorySortingBuilder {
    private value:
        | ProductCategoryAttributeSorting
        | ProductCategoryDataSorting
        | ProductCategoryPopularitySorting
        | ProductCategoryRelevanceSorting
        | null = null;

    public sortByProductCategoryData(key: string, order: 'Ascending' | 'Descending' = 'Descending', mode: 'Auto' | 'Alphabetical' | 'Numerical' = 'Auto', thenBy?: (thenBy: ProductCategorySortingBuilder) => void) {
        const sort: ProductCategoryDataSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.ProductCategory.ProductCategoryDataSorting, Relewise.Client',
            mode,
            order,
            key,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByProductCategoryRelevance(order: 'Ascending' | 'Descending' = 'Descending', thenBy?: (thenBy: ProductCategorySortingBuilder) => void) {
        const sort: ProductCategoryRelevanceSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.ProductCategory.ProductCategoryRelevanceSorting, Relewise.Client',
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByProductCategoryPopularity(order: 'Ascending' | 'Descending' = 'Descending', thenBy?: (thenBy: ProductCategorySortingBuilder) => void) {
        const sort: ProductCategoryPopularitySorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.ProductCategory.ProductCategoryPopularitySorting, Relewise.Client',
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByProductCategoryAttribute(
        attribute: 'Id' | 'DisplayName',
        order: 'Ascending' | 'Descending',
        mode: 'Auto' | 'Alphabetical' | 'Numerical' = 'Auto',
        thenBy?: (thenBy: ProductCategorySortingBuilder) => void) {

        const sort: ProductCategoryAttributeSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.ProductCategory.ProductCategoryAttributeSorting, Relewise.Client',
            attribute,
            mode,
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    private thenBy(thenBy: ((thenBy: ProductCategorySortingBuilder) => void) | undefined) {
        const thenByBuilder = new ProductCategorySortingBuilder();
        
        if (thenBy) { thenBy(thenByBuilder); }
        
        return thenByBuilder;
    }

    public build(): ProductCategorySortBySpecification | null {
        return this.value == null
            ? null
            : { value: this.value };
    }
}
