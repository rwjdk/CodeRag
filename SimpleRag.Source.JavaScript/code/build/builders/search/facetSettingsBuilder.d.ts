import { FacetSettings } from '../../models/data-contracts';
export declare class FacetSettingsBuilder {
    private settings;
    alwaysIncludeSelectedInAvailable(include?: boolean): this;
    includeZeroHitsInAvailable(include?: boolean): this;
    take(take: number | null): this;
    /**
     * Sorts facet values in descending order by hit count, so that the values with the most hits appear first in the list.
    */
    sortByHits(): this;
    build(): FacetSettings;
}
