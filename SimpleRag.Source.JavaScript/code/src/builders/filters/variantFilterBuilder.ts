import { VariantAssortmentFilter, VariantDataFilter, VariantDataHasKeyFilter, VariantDisabledFilter, VariantIdFilter, VariantListPriceFilter, VariantSalesPriceFilter, VariantSpecificationFilter } from '../../models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';

export class VariantFilterBuilder extends FilterBuilderBase<VariantFilterBuilder> {
    constructor() { super(VariantFilterBuilder); }

    /**
     * Adds a variant assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    public addVariantAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return the specified variants.
     * @param variantIds - Array of variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    public addVariantIdFilter(variantIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(variantIds)
            ? variantIds
            : [variantIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantIdFilter, Relewise.Client',
            variantIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return variants within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    public addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantListPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantListPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return variants within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    public addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantSalesPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantSalesPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return variants with a certain specification.
     * @param key - Specification key.
     * @param equalTo - Specification value to match.
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    public addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantSpecificationFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantSpecificationFilter, Relewise.Client',
            key: key,
            equalTo: equalTo,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

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
    public addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantDataFilter, Relewise.Client',
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
     * Adds a variant has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    public addVariantDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a variant is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    public addVariantDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }
}