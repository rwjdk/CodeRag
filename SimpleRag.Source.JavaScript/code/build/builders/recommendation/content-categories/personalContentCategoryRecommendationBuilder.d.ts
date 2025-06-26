import { Settings } from '../../../builders/settings';
import { PersonalContentCategoryRecommendationRequest, ContentCategoryRecommendationWeights } from '../../../models/data-contracts';
import { ContentCategoriesRecommendationBuilder } from './contentCategoriesRecommendationBuilder';
import { ContentCategorySettingsRecommendationBuilder } from './contentCategorySettingsRecommendationBuilder';
export declare class PersonalContentCategoryRecommendationBuilder extends ContentCategorySettingsRecommendationBuilder implements ContentCategoriesRecommendationBuilder<PersonalContentCategoryRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: ContentCategoryRecommendationWeights): this;
    build(): PersonalContentCategoryRecommendationRequest;
}
