import { Settings } from '../../../builders/settings';
import { ContentCategoryRecommendationRequestSettings, SelectedContentCategoryPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';

export class ContentCategorySettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ContentCategoryRecommendationRequestSettings = {
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
     * Select the properties of the content category to be returned, by default only the content category id is returned.
     * @param contentCategoryProperties  
     */
    public setSelectedContentCategoryProperties(contentCategoryProperties: Partial<SelectedContentCategoryPropertiesSettings> | null): this {
        this.recommendationSettings.selectedContentCategoryProperties = contentCategoryProperties as SelectedContentCategoryPropertiesSettings | null;

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