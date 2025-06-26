import { Settings } from '../../../builders/settings';
import { PersonalBrandRecommendationRequest, BrandRecommendationWeights } from '../../../models/data-contracts';
import { BrandSettingsRecommendationBuilder } from './brandSettingsRecommendationBuilder';
import { BrandsRecommendationBuilder } from './brandsRecommendationBuilder';
export declare class PersonalBrandRecommendationBuilder extends BrandSettingsRecommendationBuilder implements BrandsRecommendationBuilder<PersonalBrandRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: BrandRecommendationWeights): this;
    build(): PersonalBrandRecommendationRequest;
}
