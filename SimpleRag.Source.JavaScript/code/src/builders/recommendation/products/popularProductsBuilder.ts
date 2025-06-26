import { Settings } from '../../../builders/settings';
import { PopularProductsRequest } from '../../../models/data-contracts';
import { DefaultSinceMinutesAgo } from '../DefaultSinceMinutesAgo';
import { PopularityMultiplierBuilder } from './popularityMultiplierBuilder';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class PopularProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PopularProductsRequest> {
    private since: number = DefaultSinceMinutesAgo;
    private basedOnSelection: 'MostPurchased' | 'MostViewed' = 'MostPurchased';
    private popularityMultiplierBuilder: PopularityMultiplierBuilder = new PopularityMultiplierBuilder();

    constructor(
        settings: Settings) {
        super(settings);
    }

    public basedOn(basedOn: 'MostPurchased' | 'MostViewed'): this {
        this.basedOnSelection = basedOn;

        return this;
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public setPopularityMultiplier(popularityMultiplierBuilder: (popularityMultiplierBuilder: PopularityMultiplierBuilder) => void) {
        popularityMultiplierBuilder(this.popularityMultiplierBuilder);

        return this;
    }

    public build() {
        const request: PopularProductsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PopularProductsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            basedOn: this.basedOnSelection,
            sinceMinutesAgo: this.since,
            popularityMultiplier: this.popularityMultiplierBuilder.build(),
        };

        return request;
    }
}
