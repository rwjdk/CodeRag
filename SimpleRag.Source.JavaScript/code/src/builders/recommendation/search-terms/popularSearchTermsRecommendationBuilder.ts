import { Settings } from '../../../builders/settings';
import { RecommendPopularSearchTermSettings, PopularSearchTermsRecommendationRequest } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';

export class PopularSearchTermsRecommendationBuilder extends RecommendationRequestBuilder {
    term: string | null | undefined;

    recommendationSettings: RecommendPopularSearchTermSettings = {
        numberOfRecommendations: 10,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setTerm(term: string | null | undefined): this {
        this.term = term;

        return this;
    }

    public addEntityType(...types: ('Product' | 'Variant' | 'ProductCategory' | 'Brand' | 'Content' | 'ContentCategory')[]): this {
        this.recommendationSettings.targetEntityTypes = types;

        return this;
    }

    public build() {
        const request: PopularSearchTermsRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PopularSearchTermsRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),
            term: this.term,
            settings: this.recommendationSettings,
        };

        return request;
    }
}
