import { Settings } from '../../../builders/settings';
import { PopularBrandsRecommendationRequest, BrandRecommendationWeights } from '../../../models/data-contracts';
import { BrandSettingsRecommendationBuilder } from './brandSettingsRecommendationBuilder';
import { BrandsRecommendationBuilder } from './brandsRecommendationBuilder';
export declare class PopularBrandsRecommendationBuilder extends BrandSettingsRecommendationBuilder implements BrandsRecommendationBuilder<PopularBrandsRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: BrandRecommendationWeights): this;
    build(): PopularBrandsRecommendationRequest;
}
