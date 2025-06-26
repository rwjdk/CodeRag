import { CustomProductRecommendationRequest, PersonalProductRecommendationRequest, PopularProductsRequest, ProductsViewedAfterViewingContentRequest, ProductsViewedAfterViewingProductRequest, PurchasedWithCurrentCartRequest, PurchasedWithMultipleProductsRequest, PurchasedWithProductRequest, RecentlyViewedProductsRequest, SearchTermBasedProductRecommendationRequest, SimilarProductsRequest, SortProductsRequest, SortVariantsRequest, ProductRecommendationRequestCollection } from '../../../models/data-contracts';

export class ProductsRecommendationCollectionBuilder {
    private requests: (CustomProductRecommendationRequest
        | PersonalProductRecommendationRequest
        | PopularProductsRequest
        | ProductsViewedAfterViewingContentRequest
        | ProductsViewedAfterViewingProductRequest
        | PurchasedWithCurrentCartRequest
        | PurchasedWithMultipleProductsRequest
        | PurchasedWithProductRequest
        | RecentlyViewedProductsRequest
        | SearchTermBasedProductRecommendationRequest
        | SimilarProductsRequest
        | SortProductsRequest
        | SortVariantsRequest)[] = [];

    private distinctProductsAcrossResults: boolean = true;

    public addRequest(request: CustomProductRecommendationRequest
        | PersonalProductRecommendationRequest
        | PopularProductsRequest
        | ProductsViewedAfterViewingContentRequest
        | ProductsViewedAfterViewingProductRequest
        | PurchasedWithCurrentCartRequest
        | PurchasedWithMultipleProductsRequest
        | PurchasedWithProductRequest
        | RecentlyViewedProductsRequest
        | SearchTermBasedProductRecommendationRequest
        | SimilarProductsRequest
        | SortProductsRequest
        | SortVariantsRequest): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctProductsAcrossResults(distinctProductsAcrossResults: boolean = true): this {
        this.distinctProductsAcrossResults = distinctProductsAcrossResults;

        return this;
    }

    public build(): ProductRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ProductRecommendationRequestCollection, Relewise.Client',
            requireDistinctProductsAcrossResults: this.distinctProductsAcrossResults,
            requests: this.requests,
        };
    }
}