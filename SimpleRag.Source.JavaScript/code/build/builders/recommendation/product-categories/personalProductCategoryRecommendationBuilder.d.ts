import { Settings } from '../../../builders/settings';
import { PersonalProductCategoryRecommendationRequest, ProductCategoryRecommendationWeights } from '../../../models/data-contracts';
import { ProductCategoriesRecommendationBuilder } from './productCategoriesRecommendationBuilder';
import { ProductCategorySettingsRecommendationBuilder } from './productCategorySettingsRecommendationBuilder';
export declare class PersonalProductCategoryRecommendationBuilder extends ProductCategorySettingsRecommendationBuilder implements ProductCategoriesRecommendationBuilder<PersonalProductCategoryRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: ProductCategoryRecommendationWeights): this;
    build(): PersonalProductCategoryRecommendationRequest;
}
