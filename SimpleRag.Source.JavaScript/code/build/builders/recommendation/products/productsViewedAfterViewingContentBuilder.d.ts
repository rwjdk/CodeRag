import { Settings } from '../../../builders/settings';
import { ProductsViewedAfterViewingContentRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class ProductsViewedAfterViewingContentBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<ProductsViewedAfterViewingContentRequest> {
    private id;
    constructor(settings: Settings);
    setContentId(contentId: string): this;
    build(): ProductsViewedAfterViewingContentRequest;
}
