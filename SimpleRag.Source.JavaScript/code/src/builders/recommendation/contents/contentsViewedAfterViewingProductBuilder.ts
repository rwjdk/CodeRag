import { Settings } from '../../../builders/settings';
import { ContentsViewedAfterViewingProductRequest, ProductAndVariantId } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';

export class ContentsViewedAfterViewingProductBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingProductRequest> {
    private productAndVariantId: ProductAndVariantId = {
        productId: '',
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public product(product: { productId: string; variantId?: string; }): this {
        this.productAndVariantId = product;

        return this;
    }

    public build() {
        const request: ContentsViewedAfterViewingProductRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.ContentsViewedAfterViewingProductRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantId: this.productAndVariantId,
        };

        return request;
    }
}
