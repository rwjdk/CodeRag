import { Settings } from '../../../builders/settings';
import { ProductAndVariantId } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';

export class BySingleProductRecommendationBuilder extends ProductSettingsRecommendationBuilder {
    protected productAndVariantId: ProductAndVariantId | null = null;

    constructor(
        settings: Settings) {
        super(settings);
    }

    public product(product: { productId: string; variantId?: string; }): this {
        this.productAndVariantId = product;

        return this;
    }
}
