import { Settings } from '../../../builders/settings';
import { PurchasedWithProductRequest } from '../../../models/data-contracts';
import { BySingleProductRecommendationBuilder } from './bySingleProductRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class PurchasedWithProductBuilder extends BySingleProductRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithProductRequest> {
    constructor(settings: Settings);
    build(): PurchasedWithProductRequest;
}
