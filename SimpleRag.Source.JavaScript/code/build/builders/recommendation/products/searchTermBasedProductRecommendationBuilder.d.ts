import { Settings } from '../../../builders/settings';
import { SearchTermBasedProductRecommendationRequest } from '../../../models/data-contracts';
import { ProductSettingsRecommendationBuilder } from './productSettingsRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class SearchTermBasedProductRecommendationBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SearchTermBasedProductRecommendationRequest> {
    private term;
    constructor(settings: Settings);
    setTerm(term: string): this;
    build(): SearchTermBasedProductRecommendationRequest;
}
