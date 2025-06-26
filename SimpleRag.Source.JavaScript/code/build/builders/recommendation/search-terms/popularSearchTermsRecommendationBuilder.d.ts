import { Settings } from '../../../builders/settings';
import { RecommendPopularSearchTermSettings, PopularSearchTermsRecommendationRequest } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';
export declare class PopularSearchTermsRecommendationBuilder extends RecommendationRequestBuilder {
    term: string | null | undefined;
    recommendationSettings: RecommendPopularSearchTermSettings;
    constructor(settings: Settings);
    setTerm(term: string | null | undefined): this;
    addEntityType(...types: ('Product' | 'Variant' | 'ProductCategory' | 'Brand' | 'Content' | 'ContentCategory')[]): this;
    build(): PopularSearchTermsRecommendationRequest;
}
