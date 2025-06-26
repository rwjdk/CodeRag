import { Settings } from '../../../builders/settings';
import { SimilarProductsRequest, SimilarProductsEvaluationSettings, Product } from '../../../models/data-contracts';
import { BySingleProductRecommendationBuilder } from './bySingleProductRecommendationBuilder';
import { ProductsRecommendationBuilder } from './productsRecommendationBuilder';

export class SimilarProductsProductBuilder extends BySingleProductRecommendationBuilder implements ProductsRecommendationBuilder<SimilarProductsRequest> {
    private evaluationSettings: SimilarProductsEvaluationSettings | null = null;
    private considerAlreadyKnownInformationAboutProduct: boolean = false;
    private productData: Product | null = null;

    constructor(
        settings: Settings) {
        super(settings);
    }

    /** @deprecated
     * Use setEvaluationSettings instead
     */
    public setSimilarProductsEvaluationSettings(settings: SimilarProductsEvaluationSettings): this {
        this.evaluationSettings = settings as SimilarProductsEvaluationSettings;

        return this;
    }

    public setEvaluationSettings(builder: (settings: Partial<SimilarProductsEvaluationSettings>) => void): this {
        const cleanSettings: SimilarProductsEvaluationSettings = {
            significanceOfSimilaritiesInDisplayName: 0,
            productDisplayNameTransformer: null,
            significanceOfSimilarListPrice: 0,
            significanceOfCommonImmediateParentCategories: 0,
            significanceOfCommonParentsParentCategories: 0,
            significanceOfCommonAncestorCategories: 0,
            significanceOfCommonProductDataKeys: 0,
            significanceOfIdenticalProductDataValues: 0,
            significantProductDataFields: null,
            significanceOfSimilarSalesPrice: 0,
            significanceOfSimilarBrand: 0,
            variantEvaluationSettings: null,
        };

        builder(cleanSettings);
        this.evaluationSettings = cleanSettings;

        return this;
    }

    public build() {
        const request: SimilarProductsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.SimilarProductsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            existingProductId: this.productAndVariantId,
            considerAlreadyKnownInformationAboutProduct: this.considerAlreadyKnownInformationAboutProduct,
            productData: this.productData,
            evaluationSettings: this.evaluationSettings,
        };

        return request;
    }
}
