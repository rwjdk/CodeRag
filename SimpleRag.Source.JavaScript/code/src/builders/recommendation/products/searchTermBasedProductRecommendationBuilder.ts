import { Settings } from '../../../builders/settings';
import { SearchTermBasedProductRecommendationRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class SearchTermBasedProductRecommendationBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SearchTermBasedProductRecommendationRequest> {
    private term: string = '';

    constructor(
        settings: Settings) {
        super(settings);
    }

    setTerm(term: string): this {
        this.term = term;

        return this;
    }

    public build() {
        const request: SearchTermBasedProductRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.SearchTermBasedProductRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            term: this.term,
        };

        return request;
    }
}
