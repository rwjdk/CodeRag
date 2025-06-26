import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterBuilderBase } from './filterBuilderBase';
export declare class ContentFilterBuilder extends FilterBuilderBase<ContentFilterBuilder> {
    constructor();
    /**
     * Adds a content assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return contents within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified contents.
     * @param contentIds - Array of content IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentIdFilter(contentIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryLevelFilter(levels: number | number[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryHasParentFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryHasChildFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryHasAncestorFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has contents filter to the request ensuring that only categories with content in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryHasContentsFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out categories without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
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
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a content category has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return content categories recently viewed by the user.
     * @param sinceMinutesAgo - Time in minutes since the category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return content recently viewed by the user.
     * @param sinceMinutesAgo - Time in minutes since the content was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentHasCategoriesFilter(negated?: boolean, options?: FilterOptions): this;
}
