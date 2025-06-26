import { Settings } from '../../../builders/settings';
import { SimilarProductsRequest, SimilarProductsEvaluationSettings } from '../../../models/data-contracts';
import { BySingleProductRecommendationBuilder } from './bySingleProductRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';
export declare class SimilarProductsProductBuilder extends BySingleProductRecommendationBuilder implements ProductsRecommendationBuilder<SimilarProductsRequest> {
    private evaluationSettings;
    private considerAlreadyKnownInformationAboutProduct;
    private productData;
    constructor(settings: Settings);
    /** @deprecated
     * Use setEvaluationSettings instead
     */
    setSimilarProductsEvaluationSettings(settings: SimilarProductsEvaluationSettings): this;
    setEvaluationSettings(builder: (settings: Partial<SimilarProductsEvaluationSettings>) => void): this;
    build(): SimilarProductsRequest;
}
