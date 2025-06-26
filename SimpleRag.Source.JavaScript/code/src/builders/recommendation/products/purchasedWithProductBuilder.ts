import { Settings } from '../../../builders/settings';
import { PurchasedWithProductRequest } from '../../../models/data-contracts';
import { BySingleProductRecommendationBuilder } from './bySingleProductRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class PurchasedWithProductBuilder extends BySingleProductRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithProductRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        if (this.productAndVariantId === null) {
            throw new Error('Must specificy a product');
        }

        const request: PurchasedWithProductRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PurchasedWithProductRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantId: this.productAndVariantId!,
        };

        return request;
    }
}
