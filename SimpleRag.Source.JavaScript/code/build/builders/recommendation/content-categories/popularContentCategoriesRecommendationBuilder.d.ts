import { Settings } from '../../../builders/settings';
import { PopularContentCategoriesRecommendationRequest, ContentCategoryRecommendationWeights } from '../../../models/data-contracts';
import { ContentCategoriesRecommendationBuilder } from './contentCategoriesRecommendationBuilder';
import { ContentCategorySettingsRecommendationBuilder } from './contentCategorySettingsRecommendationBuilder';
export declare class PopularContentCategoriesRecommendationBuilder extends ContentCategorySettingsRecommendationBuilder implements ContentCategoriesRecommendationBuilder<PopularContentCategoriesRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: ContentCategoryRecommendationWeights): this;
    build(): PopularContentCategoriesRecommendationRequest;
}
