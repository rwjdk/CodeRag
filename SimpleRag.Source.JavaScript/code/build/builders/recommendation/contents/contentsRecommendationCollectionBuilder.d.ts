import { ContentsViewedAfterViewingContentRequest, ContentsViewedAfterViewingMultipleContentsRequest, ContentsViewedAfterViewingMultipleProductsRequest, ContentsViewedAfterViewingProductRequest, PersonalContentRecommendationRequest, PopularContentsRequest, ContentRecommendationRequestCollection } from '../../../models/data-contracts';
export declare class ContentsRecommendationCollectionBuilder {
    private requests;
    private distinctContentsAcrossResults;
    addRequest(request: ContentsViewedAfterViewingContentRequest | ContentsViewedAfterViewingMultipleContentsRequest | ContentsViewedAfterViewingMultipleProductsRequest | ContentsViewedAfterViewingProductRequest | PersonalContentRecommendationRequest | PopularContentsRequest): this;
    requireDistinctContentsAcrossResults(distinctContentsAcrossResults?: boolean): this;
    build(): ContentRecommendationRequestCollection;
}
