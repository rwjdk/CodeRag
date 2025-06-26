import { ContentsViewedAfterViewingContentRequest, ContentsViewedAfterViewingMultipleContentsRequest, ContentsViewedAfterViewingMultipleProductsRequest, ContentsViewedAfterViewingProductRequest, PersonalContentRecommendationRequest, PopularContentsRequest, ContentRecommendationRequestCollection } from '../../../models/data-contracts';

export class ContentsRecommendationCollectionBuilder {
    private requests: (ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest)[] = [];

    private distinctContentsAcrossResults: boolean = true;

    public addRequest(request: ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctContentsAcrossResults(distinctContentsAcrossResults: boolean = true): this {
        this.distinctContentsAcrossResults = distinctContentsAcrossResults;

        return this;
    }

    public build(): ContentRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ContentRecommendationRequestCollection, Relewise.Client',
            requireDistinctContentsAcrossResults: this.distinctContentsAcrossResults,
            requests: this.requests,
        };
    }
}