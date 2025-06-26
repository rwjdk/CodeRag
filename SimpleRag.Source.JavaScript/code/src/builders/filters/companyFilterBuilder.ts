import { CompanyDataFilter, CompanyDataHasKeyFilter, CompanyDisabledFilter, CompanyIdFilter } from '../../models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';

export class CompanyFilterBuilder extends FilterBuilderBase<CompanyFilterBuilder> {
    constructor() { super(CompanyFilterBuilder); }

    /**
     * Filters the request to only return the specified companies.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    public addCompanyIdFilter(companyIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(companyIds)
            ? companyIds
            : [companyIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: CompanyIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.CompanyIdFilter, Relewise.Client',
            companyIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

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
    public addCompanyDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: CompanyDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.CompanyDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            objectPath: options?.objectPath,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a company has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    public addCompanyDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: CompanyDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.CompanyDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a company is disabled filter to the request. Only works for company queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    public addCompanyDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: CompanyDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.CompanyDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }
}
