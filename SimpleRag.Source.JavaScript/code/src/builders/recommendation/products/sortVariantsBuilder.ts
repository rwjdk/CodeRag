
import { Settings } from '../../settings';
import { SortVariantsRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class SortVariantsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SortVariantsRequest> {
    private id: string = '';

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setProductId(productId: string): this {
        this.id = productId;

        return this;
    }

    public build() {
        const request: SortVariantsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.SortVariantsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productId: this.id,
        };

        return request;
    }
}
