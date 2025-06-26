import { Settings } from '../../../builders/settings';
import { PopularProductCategoriesRecommendationRequest, ProductCategoryRecommendationWeights } from '../../../models/data-contracts';
import { DefaultSinceMinutesAgo } from '../DefaultSinceMinutesAgo';
import { ProductCategoriesRecommendationBuilder } from './productCategoriesRecommendationBuilder';
import { ProductCategorySettingsRecommendationBuilder } from './productCategorySettingsRecommendationBuilder';

export class PopularProductCategoriesRecommendationBuilder extends ProductCategorySettingsRecommendationBuilder implements ProductCategoriesRecommendationBuilder<PopularProductCategoriesRecommendationRequest> {
    private since: number = DefaultSinceMinutesAgo;
    private weights: ProductCategoryRecommendationWeights = { categoryViews: 1.0, productViews: 1.0, productPurchases: 1.0 };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public setWeights(weights: ProductCategoryRecommendationWeights): this {
        this.weights = weights;

        return this;
    }

    public build() {
        const request: PopularProductCategoriesRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PopularProductCategoriesRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),         
            sinceMinutesAgo: this.since,
            weights: this.weights,
            settings: this.recommendationSettings,
        };

        return request;
    }
}