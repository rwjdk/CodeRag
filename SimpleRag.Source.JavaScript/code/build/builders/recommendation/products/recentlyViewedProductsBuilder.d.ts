import { Settings } from '../../../builders/settings';
import { RecentlyViewedProductsRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class RecentlyViewedProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<RecentlyViewedProductsRequest> {
    constructor(settings: Settings);
    build(): import("../../../models/data-contracts").ProductRecommendationRequest;
}
