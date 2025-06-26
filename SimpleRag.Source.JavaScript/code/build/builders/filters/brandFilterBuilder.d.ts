import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterBuilderBase } from './filterBuilderBase';
export declare class BrandFilterBuilder extends FilterBuilderBase<BrandFilterBuilder> {
    constructor();
    /**
     * Adds a brand assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified brands.
     * @param brandIds - Array of brand IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandIdFilter(brandIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out brands without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a brand has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand is disabled filter to the request. Only works for brand queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandDisabledFilter(negated?: boolean, options?: FilterOptions): this;
}
