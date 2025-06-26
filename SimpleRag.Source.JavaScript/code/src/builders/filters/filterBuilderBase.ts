import { AndFilter, FilterCollection, OrFilter } from '../../models/data-contracts';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { AllFilters, FilterOptions } from './filters.types.shared';

export type Constructor<T> = new () => T;

export abstract class FilterBuilderBase<TFilterBuilder extends FilterBuilderBase<any>> {
    constructor(private TFilterBuilderCtor: Constructor<TFilterBuilder>) { }

    protected filters: AllFilters[] = [];

    /**
     * Adds an AND filter to the request.
     * @param filterBuilder - Function to build the AND filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilderBase instance for chaining.
     */
    public and(filterBuilder: (builder: TFilterBuilder) => void, negated: boolean = false, options?: FilterOptions): this {
        const builder = new this.TFilterBuilderCtor();
        filterBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filters = builder.build();
        if (filters === null || !filters.items || filters.items.length <= 0) {
            throw new Error('And-filters must contain at least 1 filter');
        }

        const filter: AndFilter = {
            $type: 'Relewise.Client.Requests.Filters.AndFilter, Relewise.Client',
            filters: filters.items,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds an OR filter to the request.
     * @param filterBuilder - Function to build the OR filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilderBase instance for chaining.
     */
    public or(filterBuilder: (builder: TFilterBuilder) => void, negated: boolean = false, options?: FilterOptions): this {
        const builder = new this.TFilterBuilderCtor();
        filterBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filters = builder.build();
        if (filters === null || !filters.items || filters.items.length <= 0) {
            throw new Error('Or-filters must contain at least 1 filter');
        }

        const filter: OrFilter = {
            $type: 'Relewise.Client.Requests.Filters.OrFilter, Relewise.Client',
            filters: filters.items,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Resets the filters.
     * @returns The FilterBuilderBase instance for chaining.
     */
    public reset(): this {
        this.filters = [];
        return this;
    }

    /**
     * Builds the filter collection.
     * @returns The FilterCollection or null if no filters are added.
     */
    public build(): FilterCollection | null {
        return this.filters.length === 0 ? null : { items: this.filters };
    }
}
