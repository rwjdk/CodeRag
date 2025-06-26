import { Settings } from '../../../builders/settings';
import { ProductCategoryRecommendationRequestSettings, SelectedProductCategoryPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';
export declare class ProductCategorySettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ProductCategoryRecommendationRequestSettings;
    constructor(settings: Settings);
    setProductCategoryProperties(ProductCategoryProperties: Partial<SelectedProductCategoryPropertiesSettings>): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
}
