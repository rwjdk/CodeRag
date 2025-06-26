import { ConditionBuilder } from '../conditionBuilder';
import { FilterBuilderBase } from './filterBuilderBase';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
export declare class CompanyFilterBuilder extends FilterBuilderBase<CompanyFilterBuilder> {
    constructor();
    /**
     * Filters the request to only return the specified companies.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    addCompanyIdFilter(companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a company data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out companies without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    addCompanyDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a company has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    addCompanyDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a company is disabled filter to the request. Only works for company queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    addCompanyDisabledFilter(negated?: boolean, options?: FilterOptions): this;
}
