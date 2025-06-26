import { Settings } from '../../../builders/settings';
import { ProductsViewedAfterViewingProductRequest } from '../../../models/data-contracts';
import { BySingleProductRecommendationBuilder } from './bySingleProductRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class ProductsViewedAfterViewingProductBuilder extends BySingleProductRecommendationBuilder implements ProductsRecommendationBuilder<ProductsViewedAfterViewingProductRequest> {
    constructor(settings: Settings);
    build(): ProductsViewedAfterViewingProductRequest;
}
