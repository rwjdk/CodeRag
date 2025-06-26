import { PersonalContentCategoryRecommendationRequest, PopularContentCategoriesRecommendationRequest, ContentCategoryRecommendationRequestCollection } from '../../../models/data-contracts';
export declare class ContentCategoriesRecommendationCollectionBuilder {
    private requests;
    private distinctCategoriesAcrossResults;
    addRequest(request: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)): this;
    requireDistinctCategoriesAcrossResults(distinctCategoriesAcrossResults?: boolean): this;
    build(): ContentCategoryRecommendationRequestCollection;
}
