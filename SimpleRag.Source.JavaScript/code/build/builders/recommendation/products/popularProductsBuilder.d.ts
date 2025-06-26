import { Settings } from '../../../builders/settings';
import { PopularProductsRequest } from '../../../models/data-contracts';
import { PopularityMultiplierBuilder } from './popularityMultiplierBuilder';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class PopularProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PopularProductsRequest> {
    private since;
    private basedOnSelection;
    private popularityMultiplierBuilder;
    constructor(settings: Settings);
    basedOn(basedOn: 'MostPurchased' | 'MostViewed'): this;
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setPopularityMultiplier(popularityMultiplierBuilder: (popularityMultiplierBuilder: PopularityMultiplierBuilder) => void): this;
    build(): PopularProductsRequest;
}
