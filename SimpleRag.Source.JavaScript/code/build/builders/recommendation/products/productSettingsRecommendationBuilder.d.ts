import { Settings } from '../../../builders/settings';
import { ProductRecommendationRequestSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings, SelectedBrandPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';
export declare class ProductSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ProductRecommendationRequestSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the product to be returned, by default only the product id is returned.
     * @param productProperties
     */
    setSelectedProductProperties(productProperties: Partial<SelectedProductPropertiesSettings> | null): this;
    /**
    * Select the properties of the variant to be returned, by default only the variant id is returned.
    * @param variantProperties
    */
    setSelectedVariantProperties(variantProperties: Partial<SelectedVariantPropertiesSettings> | null): this;
    /**
     * Select the properties of the brand to be returned, by default only the brand id is returned.
     * @param brandProperties
     */
    setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings> | null): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    allowProductsCurrentlyInCart(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
    recommendVariant(recommend?: boolean): this;
}
