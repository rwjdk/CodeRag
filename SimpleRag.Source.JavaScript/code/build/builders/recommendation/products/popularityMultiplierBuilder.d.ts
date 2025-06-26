import { PopularityMultiplierSelector } from '../../../models/data-contracts';
export declare class PopularityMultiplierBuilder {
    private popularityMultiplierSelector;
    setDataKeyPopularityMultiplierSelector(selector: {
        key?: string | null;
    }): this;
    build(): PopularityMultiplierSelector | null;
}
