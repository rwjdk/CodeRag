import { Settings } from '../../../builders/settings';
import { SortProductsRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class SortProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SortProductsRequest> {
    private ids;
    constructor(settings: Settings);
    setProductIds(productIds: string[]): this;
    build(): SortProductsRequest;
}
