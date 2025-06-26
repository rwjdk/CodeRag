import { CustomProductRecommendationRequest, PersonalProductRecommendationRequest, PopularProductsRequest, ProductsViewedAfterViewingContentRequest, ProductsViewedAfterViewingProductRequest, PurchasedWithCurrentCartRequest, PurchasedWithMultipleProductsRequest, PurchasedWithProductRequest, RecentlyViewedProductsRequest, SearchTermBasedProductRecommendationRequest, SimilarProductsRequest, SortProductsRequest, SortVariantsRequest, ProductRecommendationRequestCollection } from '../../../models/data-contracts';
export declare class ProductsRecommendationCollectionBuilder {
    private requests;
    private distinctProductsAcrossResults;
    addRequest(request: CustomProductRecommendationRequest | PersonalProductRecommendationRequest | PopularProductsRequest | ProductsViewedAfterViewingContentRequest | ProductsViewedAfterViewingProductRequest | PurchasedWithCurrentCartRequest | PurchasedWithMultipleProductsRequest | PurchasedWithProductRequest | RecentlyViewedProductsRequest | SearchTermBasedProductRecommendationRequest | SimilarProductsRequest | SortProductsRequest | SortVariantsRequest): this;
    requireDistinctProductsAcrossResults(distinctProductsAcrossResults?: boolean): this;
    build(): ProductRecommendationRequestCollection;
}
