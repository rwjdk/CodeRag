import { Settings } from '../../../builders/settings';
import { ProductAndVariantId } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
export declare class BySingleProductRecommendationBuilder extends ProductSettingsRecommendationBuilder {
    protected productAndVariantId: ProductAndVariantId | null;
    constructor(settings: Settings);
    product(product: {
        productId: string;
        variantId?: string;
    }): this;
}
