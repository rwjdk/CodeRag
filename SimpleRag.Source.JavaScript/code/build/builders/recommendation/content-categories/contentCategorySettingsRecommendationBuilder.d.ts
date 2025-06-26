import { Settings } from '../../../builders/settings';
import { ContentCategoryRecommendationRequestSettings, SelectedContentCategoryPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';
export declare class ContentCategorySettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ContentCategoryRecommendationRequestSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the content category to be returned, by default only the content category id is returned.
     * @param contentCategoryProperties
     */
    setSelectedContentCategoryProperties(contentCategoryProperties: Partial<SelectedContentCategoryPropertiesSettings> | null): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
}
