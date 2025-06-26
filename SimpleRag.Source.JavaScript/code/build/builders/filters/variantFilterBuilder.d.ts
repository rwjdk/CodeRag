import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterBuilderBase } from './filterBuilderBase';
export declare class VariantFilterBuilder extends FilterBuilderBase<VariantFilterBuilder> {
    constructor();
    /**
     * Adds a variant assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified variants.
     * @param variantIds - Array of variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantIdFilter(variantIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants with a certain specification.
     * @param key - Specification key.
     * @param equalTo - Specification value to match.
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a variant has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantDisabledFilter(negated?: boolean, options?: FilterOptions): this;
}
