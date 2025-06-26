import { Settings } from '../../../builders/settings';
import { PurchasedWithCurrentCartRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class PurchasedWithCurrentCartBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithCurrentCartRequest> {
    constructor(settings: Settings);
    build(): import("../../../models/data-contracts").ProductRecommendationRequest;
}
