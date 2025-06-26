import { Settings } from '../../../builders/settings';
import { ContentsViewedAfterViewingMultipleProductsRequest } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';
export declare class ContentsViewedAfterViewingMultipleProductsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingMultipleProductsRequest> {
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
    build(): ContentsViewedAfterViewingMultipleProductsRequest;
}
