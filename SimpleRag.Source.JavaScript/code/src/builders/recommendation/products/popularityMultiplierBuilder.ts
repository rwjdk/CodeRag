import { DataKeyPopularityMultiplierSelector, PopularityMultiplierSelector } from '../../../models/data-contracts';

export class PopularityMultiplierBuilder {
    private popularityMultiplierSelector: PopularityMultiplierSelector | null = null;

    public setDataKeyPopularityMultiplierSelector(selector: { key?: string | null }): this {
        const dataKeyPopularityMultiplierSelector: DataKeyPopularityMultiplierSelector = {
            $type: 'Relewise.Client.Requests.PopularityMultiplierSelectors.DataKeyPopularityMultiplierSelector, Relewise.Client',
            ...selector,
        }

        this.popularityMultiplierSelector = dataKeyPopularityMultiplierSelector;
        return this;
    }

    build(): PopularityMultiplierSelector | null {
        return this.popularityMultiplierSelector;
    }
}