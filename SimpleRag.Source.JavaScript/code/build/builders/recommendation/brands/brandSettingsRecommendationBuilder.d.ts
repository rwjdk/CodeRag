import { Settings } from '../../../builders/settings';
import { BrandRecommendationRequestSettings, SelectedBrandPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';
export declare class BrandSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: BrandRecommendationRequestSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the brand to be returned, by default only the brand id is returned.
     * @param brandProperties
     */
    setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings> | null): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
}
