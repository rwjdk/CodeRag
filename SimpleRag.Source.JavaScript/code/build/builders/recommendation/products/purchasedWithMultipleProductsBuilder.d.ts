import { Settings } from '../../../builders/settings';
import { PurchasedWithMultipleProductsRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class PurchasedWithMultipleProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithMultipleProductsRequest> {
    private products;
    constructor(settings: Settings);
    addProduct(product: {
        productId: string;
        variantId?: string;
    }): this;
    addProducts(products: {
        productId: string;
        variantId?: string;
    }[]): this;
    build(): PurchasedWithMultipleProductsRequest;
}
