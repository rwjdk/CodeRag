import { Settings } from '../../../builders/settings';
import { PurchasedWithMultipleProductsRequest, ProductAndVariantId } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class PurchasedWithMultipleProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithMultipleProductsRequest> {
    private products: ProductAndVariantId[] = [];

    constructor(
        settings: Settings) {
        super(settings);
    }

    public addProduct(product: { productId: string; variantId?: string; }): this {
        this.products.push(product);

        return this;
    }

    public addProducts(products: { productId: string; variantId?: string; }[]): this {
        products.forEach(x => this.products.push(x));

        return this;
    }

    public build() {
        const request: PurchasedWithMultipleProductsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PurchasedWithMultipleProductsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantIds: this.products,
        };

        return request;
    }
}
