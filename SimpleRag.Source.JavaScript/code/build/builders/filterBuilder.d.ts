import { FilterCollection, ProductAndVariantId } from '../models/data-contracts';
import { ConditionBuilder } from './conditionBuilder';
import { FilterOptions, EntityDataFilterOptions } from './filters/filters.types.shared';
export declare class FilterBuilder {
    private filters;
    private productFilterBuilder;
    private brandFilterBuilder;
    private contentFilterBuilder;
    private variantFilterBuilder;
    private companyFilterBuilder;
    /**
     * Adds a product assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return contents within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified products.
     * @param productIds - Array of product IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductIdFilter(productIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified variants.
     * @param variantIds - Array of variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantIdFilter(variantIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified brands.
     * @param brandIds - Array of brand IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandIdFilter(brandIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified contents.
     * @param contentIds - Array of content IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentIdFilter(contentIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified companies.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addCompanyIdFilter(companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a range filter to the request ensuring the product has a certain range of variants.
     * @param lowerBound - Lower bound of the range (inclusive).
     * @param upperBound - Upper bound of the range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions & {
        includeDisabled?: boolean;
    }): this;
    /**
     * Filters the request to only return products purchased since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products viewed since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserFilter(sinceUtc: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants with a certain specification.
     * @param key - Specification key.
     * @param equalTo - Specification value to match.
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Combines filters using logical AND.
     * @param filterBuilder - Function to build the AND filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     * @throws Error if no filters are provided.
     */
    and(filterBuilder: (builder: FilterBuilder) => void, negated?: boolean, options?: FilterOptions): this;
    /**
     * Combines filters using logical OR.
     * @param filterBuilder - Function to build the OR filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     * @throws Error if no filters are provided.
     */
    or(filterBuilder: (builder: FilterBuilder) => void, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out products without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a variant data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a brand data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out brands without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a cart data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out carts without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addCartDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out content categories without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a content data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out contents without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a product category data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out product categories without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a company data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out companies without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addCompanyDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a product display name filter to the request.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductDisplayNameFilter(conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product and variant ID filter to the request.
     * @param products - Array of product and variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductAndVariantIdFilter(products: ProductAndVariantId | ProductAndVariantId[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryLevelFilter(levels: number | number[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryHasParentFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryHasChildFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryHasAncestorFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryLevelFilter(levels: number | number[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryHasParentFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryHasChildFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryHasAncestorFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has products filter to the request ensuring that only categories with products in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryHasProductsFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has contents filter to the request ensuring that only categories with content in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryHasContentsFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand is disabled filter to the request. Only works for brand queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a company data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addCompanyDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a company is disabled filter to the request. Only works for company queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addCompanyDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the content category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the content was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentHasCategoriesFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductHasCategoriesFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by a company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserParentCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by a company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserParentCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products in the user's cart.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductInCartFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Resets all filters and filter builders.
     * @returns The FilterBuilder instance for chaining.
     */
    reset(): this;
    /**
     * Builds and combines all filters into a FilterCollection.
     * @returns The combined FilterCollection or null if no filters are set.
     */
    build(): FilterCollection | null;
}
