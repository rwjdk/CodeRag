import { Settings } from '../../../builders/settings';
import { PopularBrandsRecommendationRequest, BrandRecommendationWeights } from '../../../models/data-contracts';
import { DefaultSinceMinutesAgo } from '../DefaultSinceMinutesAgo';
import { BrandSettingsRecommendationBuilder } from './brandSettingsRecommendationBuilder';
import { BrandsRecommendationBuilder } from './brandsRecommendationBuilder';

export class PopularBrandsRecommendationBuilder extends BrandSettingsRecommendationBuilder implements BrandsRecommendationBuilder<PopularBrandsRecommendationRequest> {
    private since: number = DefaultSinceMinutesAgo;
    private weights: BrandRecommendationWeights = { brandViews: 1.0, productViews: 1.0, productPurchases: 1.0 };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public setWeights(weights: BrandRecommendationWeights): this {
        this.weights = weights;

        return this;
    }

    public build() {
        const request: PopularBrandsRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PopularBrandsRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),
            sinceMinutesAgo: this.since,
            weights: this.weights,
            settings: this.recommendationSettings,
        };

        return request;
    }
}