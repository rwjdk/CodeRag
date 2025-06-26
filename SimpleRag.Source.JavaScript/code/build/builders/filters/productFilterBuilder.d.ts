import { ProductAndVariantId } from '../../models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterBuilderBase } from './filterBuilderBase';
export declare class ProductFilterBuilder extends FilterBuilderBase<ProductFilterBuilder> {
    constructor();
    /**
     * Adds a product assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out categories without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Filters the request to only return the specified products.
     * @param productIds - Array of product IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductIdFilter(productIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a range filter to the request ensuring the product has a certain range of variants.
     * @param lowerBound - Lower bound of the range (inclusive).
     * @param upperBound - Upper bound of the range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions & {
        includeDisabled?: boolean;
    }): this;
    /**
     * Filters the request to only return products purchased since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products viewed since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true

, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserFilter(sinceUtc: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product display name filter to the request.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductDisplayNameFilter(conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product and variant ID filter to the request.
     * @param products - Array of product and variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductAndVariantIdFilter(products: ProductAndVariantId | ProductAndVariantId[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryLevelFilter(levels: number | number[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryHasParentFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryHasChildFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryHasAncestorFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has products filter to the request ensuring that only categories with products in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryHasProductsFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out products without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a product category has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductHasCategoriesFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by a company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserParentCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by a company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserParentCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products in the user's cart.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductInCartFilter(negated?: boolean, options?: FilterOptions): this;
}
