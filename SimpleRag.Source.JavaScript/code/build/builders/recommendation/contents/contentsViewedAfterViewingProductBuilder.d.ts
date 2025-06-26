import { Settings } from '../../../builders/settings';
import { ContentsViewedAfterViewingProductRequest } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';
export declare class ContentsViewedAfterViewingProductBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingProductRequest> {
    private productAndVariantId;
    constructor(settings: Settings);
    product(product: {
        productId: string;
        variantId?: string;
    }): this;
    build(): ContentsViewedAfterViewingProductRequest;
}
