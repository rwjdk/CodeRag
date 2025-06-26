import { Settings } from '../../../builders/settings';
import { ContentRecommendationRequestSettings, SelectedContentPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';
export declare class ContentSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ContentRecommendationRequestSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the content to be returned, by default only the content id is returned.
     * @param contentProperties
     */
    setSelectedContentProperties(contentProperties: Partial<SelectedContentPropertiesSettings> | null): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
}
