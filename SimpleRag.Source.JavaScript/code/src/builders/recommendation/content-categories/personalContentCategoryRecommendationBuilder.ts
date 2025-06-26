import { Settings } from '../../../builders/settings';
import { PersonalContentCategoryRecommendationRequest, ContentCategoryRecommendationWeights } from '../../../models/data-contracts';
import { DefaultSinceMinutesAgo } from '../DefaultSinceMinutesAgo';
import { ContentCategoriesRecommendationBuilder } from './contentCategoriesRecommendationBuilder';
import { ContentCategorySettingsRecommendationBuilder } from './contentCategorySettingsRecommendationBuilder';

export class PersonalContentCategoryRecommendationBuilder extends ContentCategorySettingsRecommendationBuilder implements ContentCategoriesRecommendationBuilder<PersonalContentCategoryRecommendationRequest> {
    private since: number = DefaultSinceMinutesAgo
    private weights: ContentCategoryRecommendationWeights = { categoryViews: 1.0, contentViews: 1.0 };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public setWeights(weights: ContentCategoryRecommendationWeights): this {
        this.weights = weights;

        return this;
    }

    public build() {
        const request: PersonalContentCategoryRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PersonalContentCategoryRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),
            sinceMinutesAgo: this.since,
            weights: this.weights,

            settings: this.recommendationSettings,
        };

        return request;
    }
}