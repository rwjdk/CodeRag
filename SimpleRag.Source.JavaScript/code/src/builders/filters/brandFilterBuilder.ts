import { BrandAssortmentFilter, BrandDataFilter, BrandDataHasKeyFilter, BrandDisabledFilter, BrandIdFilter } from '../../models/data-contracts';

import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';

export class BrandFilterBuilder extends FilterBuilderBase<BrandFilterBuilder> {
    constructor() { super(BrandFilterBuilder); }

    /**
     * Adds a brand assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    public addBrandAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: BrandAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.BrandAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return the specified brands.
     * @param brandIds - Array of brand IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    public addBrandIdFilter(brandIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(brandIds)
            ? brandIds
            : [brandIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: BrandIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.BrandIdFilter, Relewise.Client',
            brandIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

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
    public addBrandDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: BrandDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.BrandDataFilter, Relewise.Client',
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
     * Adds a brand has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    public addBrandDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: BrandDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.BrandDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a brand is disabled filter to the request. Only works for brand queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    public addBrandDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: BrandDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.BrandDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }
}
