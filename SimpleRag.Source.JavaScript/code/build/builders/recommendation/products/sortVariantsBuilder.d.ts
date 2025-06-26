import { Settings } from '../../settings';
import { SortVariantsRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class SortVariantsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SortVariantsRequest> {
    private id;
    constructor(settings: Settings);
    setProductId(productId: string): this;
    build(): SortVariantsRequest;
}
