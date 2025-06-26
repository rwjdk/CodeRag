import { Settings } from '../../../builders/settings';
import { ContentRecommendationRequestSettings, SelectedContentPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';

export class ContentSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ContentRecommendationRequestSettings = {
        allowFillIfNecessaryToReachNumberOfRecommendations: true,
        allowReplacingOfRecentlyShownRecommendations: true,
        numberOfRecommendations: 10,
        prioritizeDiversityBetweenRequests: false,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    /**
     * Select the properties of the content to be returned, by default only the content id is returned.
     * @param contentProperties  
     */
    public setSelectedContentProperties(contentProperties: Partial<SelectedContentPropertiesSettings> | null): this {
        this.recommendationSettings.selectedContentProperties = contentProperties as SelectedContentPropertiesSettings | null;

        return this;
    }

    public setNumberOfRecommendations(count: number): this {
        this.recommendationSettings.numberOfRecommendations = count;

        return this;
    }

    public allowFillIfNecessaryToReachNumberOfRecommendations(allowed: boolean = true): this {
        this.recommendationSettings.allowFillIfNecessaryToReachNumberOfRecommendations = allowed;

        return this;
    }

    public allowReplacingOfRecentlyShownRecommendations(allowed: boolean = true): this {
        this.recommendationSettings.allowReplacingOfRecentlyShownRecommendations = allowed;

        return this;
    }

    public prioritizeDiversityBetweenRequests(prioritize: boolean = true): this {
        this.recommendationSettings.prioritizeDiversityBetweenRequests = prioritize;

        return this;
    }
}