import { Settings } from '../../../builders/settings';
import { SortProductsRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class SortProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SortProductsRequest> {
    private ids: string[] = [];

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setProductIds(productIds: string[]): this {
        this.ids = productIds;

        return this;
    }

    public build() {
        const request: SortProductsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.SortProductsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productIds: this.ids,
        };

        return request;
    }
}
