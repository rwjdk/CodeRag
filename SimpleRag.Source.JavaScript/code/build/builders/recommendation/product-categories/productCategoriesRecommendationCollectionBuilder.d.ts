import { PersonalProductCategoryRecommendationRequest, PopularProductCategoriesRecommendationRequest, ProductCategoryRecommendationRequestCollection } from '../../../models/data-contracts';
export declare class ProductCategoriesRecommendationCollectionBuilder {
    private requests;
    private distinctCategoriesAcrossResults;
    addRequest(request: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)): this;
    requireDistinctCategoriesAcrossResults(distinctCategoriesAcrossResults?: boolean): this;
    build(): ProductCategoryRecommendationRequestCollection;
}
