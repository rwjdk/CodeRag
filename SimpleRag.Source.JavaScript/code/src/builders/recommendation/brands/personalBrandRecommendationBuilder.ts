import { Settings } from '../../../builders/settings';
import { PersonalBrandRecommendationRequest, BrandRecommendationWeights } from '../../../models/data-contracts';
import { DefaultSinceMinutesAgo } from '../DefaultSinceMinutesAgo';
import { BrandSettingsRecommendationBuilder } from './brandSettingsRecommendationBuilder';
import { BrandsRecommendationBuilder } from './brandsRecommendationBuilder';

export class PersonalBrandRecommendationBuilder extends BrandSettingsRecommendationBuilder implements BrandsRecommendationBuilder<PersonalBrandRecommendationRequest> {
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
        const request: PersonalBrandRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PersonalBrandRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),
            sinceMinutesAgo: this.since,
            weights: this.weights,
            settings: this.recommendationSettings,
        };

        return request;
    }
}