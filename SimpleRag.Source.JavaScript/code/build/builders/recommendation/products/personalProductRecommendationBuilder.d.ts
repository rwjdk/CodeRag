import { Settings } from '../../../builders/settings';
import { PersonalProductRecommendationRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class PersonalProductRecommendationBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PersonalProductRecommendationRequest> {
    constructor(settings: Settings);
    build(): import("../../../models/data-contracts").ProductRecommendationRequest;
}
