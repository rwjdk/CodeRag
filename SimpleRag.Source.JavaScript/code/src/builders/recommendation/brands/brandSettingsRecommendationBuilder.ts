import { Settings } from '../../../builders/settings';
import { BrandRecommendationRequestSettings, SelectedBrandPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';

export class BrandSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: BrandRecommendationRequestSettings = {
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
     * Select the properties of the brand to be returned, by default only the brand id is returned.
     * @param brandProperties  
     */
    public setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings> | null): this {
        this.recommendationSettings.selectedBrandProperties = brandProperties as SelectedBrandPropertiesSettings | null;

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