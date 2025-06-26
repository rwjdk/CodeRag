import { Settings } from '../../../builders/settings';
import { PopularProductCategoriesRecommendationRequest, ProductCategoryRecommendationWeights } from '../../../models/data-contracts';
import { ProductCategoriesRecommendationBuilder } from './productCategoriesRecommendationBuilder';
import { ProductCategorySettingsRecommendationBuilder } from './productCategorySettingsRecommendationBuilder';
export declare class PopularProductCategoriesRecommendationBuilder extends ProductCategorySettingsRecommendationBuilder implements ProductCategoriesRecommendationBuilder<PopularProductCategoriesRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: ProductCategoryRecommendationWeights): this;
    build(): PopularProductCategoriesRecommendationRequest;
}
