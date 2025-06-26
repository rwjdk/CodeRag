import { Settings } from '../../../builders/settings';
import { ProductRecommendationRequestSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings, SelectedBrandPropertiesSettings } from '../../../models/data-contracts';
import { RecommendationRequestBuilder } from '../recommendationRequestBuilder';

export class ProductSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ProductRecommendationRequestSettings = {
        allowFillIfNecessaryToReachNumberOfRecommendations: true,
        allowReplacingOfRecentlyShownRecommendations: true,
        recommendVariant: true,
        numberOfRecommendations: 10,
        prioritizeDiversityBetweenRequests: false,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    /**
     * Select the properties of the product to be returned, by default only the product id is returned.
     * @param productProperties  
     */
    public setSelectedProductProperties(productProperties: Partial<SelectedProductPropertiesSettings> | null): this {
        this.recommendationSettings.selectedProductProperties = productProperties as SelectedProductPropertiesSettings | null;

        return this;
    }

    /**
    * Select the properties of the variant to be returned, by default only the variant id is returned.  
    * @param variantProperties  
    */
    public setSelectedVariantProperties(variantProperties: Partial<SelectedVariantPropertiesSettings> | null): this {
        this.recommendationSettings.selectedVariantProperties = variantProperties as SelectedVariantPropertiesSettings | null;

        return this;
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

    public allowProductsCurrentlyInCart(allowed: boolean = true): this {
        this.recommendationSettings.allowProductsCurrentlyInCart = allowed;

        return this;
    }

    public prioritizeDiversityBetweenRequests(prioritize: boolean = true): this {
        this.recommendationSettings.prioritizeDiversityBetweenRequests = prioritize;

        return this;
    }

    public recommendVariant(recommend: boolean = true): this {
        this.recommendationSettings.recommendVariant = recommend;

        return this;
    }
}