import { FilterCollection } from '../../models/data-contracts';
import { AllFilters, FilterOptions } from './filters.types.shared';
export type Constructor<T> = new () => T;
export declare abstract class FilterBuilderBase<TFilterBuilder extends FilterBuilderBase<any>> {
    private TFilterBuilderCtor;
    constructor(TFilterBuilderCtor: Constructor<TFilterBuilder>);
    protected filters: AllFilters[];
    /**
     * Adds an AND filter to the request.
     * @param filterBuilder - Function to build the AND filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilderBase instance for chaining.
     */
    and(filterBuilder: (builder: TFilterBuilder) => void, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds an OR filter to the request.
     * @param filterBuilder - Function to build the OR filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilderBase instance for chaining.
     */
    or(filterBuilder: (builder: TFilterBuilder) => void, negated?: boolean, options?: FilterOptions): this;
    /**
     * Resets the filters.
     * @returns The FilterBuilderBase instance for chaining.
     */
    reset(): this;
    /**
     * Builds the filter collection.
     * @returns The FilterCollection or null if no filters are added.
     */
    build(): FilterCollection | null;
}
