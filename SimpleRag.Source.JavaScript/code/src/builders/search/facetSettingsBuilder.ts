import { FacetSettings } from '../../models/data-contracts';

export class FacetSettingsBuilder {
    private settings: FacetSettings = {
        alwaysIncludeSelectedInAvailable: false,
        includeZeroHitsInAvailable: false,
    };

    public alwaysIncludeSelectedInAvailable(include: boolean = true): this {
        this.settings.alwaysIncludeSelectedInAvailable = include;

        return this;
    }

    public includeZeroHitsInAvailable(include: boolean = true): this {
        this.settings.includeZeroHitsInAvailable = include;

        return this;
    }

    public take(take: number | null): this {
        this.settings.take = take;

        return this;
    }

    /**
     * Sorts facet values in descending order by hit count, so that the values with the most hits appear first in the list.
    */
    public sortByHits(): this {
        this.settings.sorting = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Sorting.ByHitsFacetSorting, Relewise.Client'
        };

        return this;
    }

    public build(): FacetSettings {
        return this.settings;
    }
}