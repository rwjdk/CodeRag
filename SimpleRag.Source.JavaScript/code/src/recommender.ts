import { RelewiseClient, RelewiseClientOptions, RelewiseRequestOptions } from './relewise.client';
import {
    ProductRecommendationResponse,
    ContentRecommendationResponse,
    ProductRecommendationResponseCollection,
    ProductRecommendationRequestCollection,
    ContentRecommendationResponseCollection,
    ContentRecommendationRequestCollection,
    PopularSearchTermsRecommendationRequest,
    SearchTermRecommendationResponse,
    ContentCategoryRecommendationRequestCollection,
    ContentCategoryRecommendationResponseCollection,
    ProductCategoryRecommendationRequestCollection,
    ProductCategoryRecommendationResponseCollection,
    PopularBrandsRecommendationRequest,
    BrandRecommendationResponse,
    PersonalBrandRecommendationRequest,
    PurchasedWithProductRequest,
    PersonalContentCategoryRecommendationRequest,
    PopularContentCategoriesRecommendationRequest,
    ContentCategoryRecommendationResponse,
    PersonalProductCategoryRecommendationRequest,
    PopularProductCategoriesRecommendationRequest,
    ProductCategoryRecommendationResponse,
    PopularContentsRequest,
    PersonalContentRecommendationRequest,
    ContentsViewedAfterViewingProductRequest,
    ContentsViewedAfterViewingMultipleProductsRequest,
    ContentsViewedAfterViewingMultipleContentsRequest,
    ContentsViewedAfterViewingContentRequest,
    SortVariantsRequest,
    SortProductsRequest,
    SimilarProductsRequest,
    SearchTermBasedProductRecommendationRequest,
    RecentlyViewedProductsRequest,
    PurchasedWithMultipleProductsRequest,
    PurchasedWithCurrentCartRequest,
    ProductsViewedAfterViewingProductRequest,
    ProductsViewedAfterViewingContentRequest,
    PopularProductsRequest,
    PersonalProductRecommendationRequest,
} from './models/data-contracts';

export class Recommender extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async recommendPopularSearchTerms(request: PopularSearchTermsRecommendationRequest, options?: RelewiseRequestOptions): Promise<SearchTermRecommendationResponse | undefined> {
        return this.request<PopularSearchTermsRecommendationRequest, SearchTermRecommendationResponse>('PopularSearchTermsRecommendationRequest', request, options);
    }

    //#region Brands

    public async recommendPersonalBrands(request: PersonalBrandRecommendationRequest, options?: RelewiseRequestOptions): Promise<BrandRecommendationResponse | undefined> {
        return this.request<PersonalBrandRecommendationRequest, BrandRecommendationResponse>('PersonalBrandRecommendationRequest', request, options);
    }

    public async recommendPopularBrands(request: PopularBrandsRecommendationRequest, options?: RelewiseRequestOptions): Promise<BrandRecommendationResponse | undefined> {
        return this.request<PopularBrandsRecommendationRequest, BrandRecommendationResponse>('PopularBrandsRecommendationRequest', request, options);
    }

    //#endregion

    //#region Content Categories
    public async recommendPersonalContentCategories(request: PersonalContentCategoryRecommendationRequest, options?: RelewiseRequestOptions): Promise<ContentCategoryRecommendationResponse | undefined> {
        return this.request<PersonalContentCategoryRecommendationRequest, ContentCategoryRecommendationResponse>('PersonalContentCategoryRecommendationRequest', request, options);
    }

    public async recommendPopularContentCategories(request: PopularContentCategoriesRecommendationRequest, options?: RelewiseRequestOptions): Promise<ContentCategoryRecommendationResponse | undefined> {
        return this.request<PopularContentCategoriesRecommendationRequest, ContentCategoryRecommendationResponse>('PopularContentCategoriesRecommendationRequest', request, options);
    }

    //#endregion

    //#region Product Categories
    public async recommendPersonalProductCategories(request: PersonalProductCategoryRecommendationRequest, options?: RelewiseRequestOptions): Promise<ProductCategoryRecommendationResponse | undefined> {
        return this.request<PersonalProductCategoryRecommendationRequest, ProductCategoryRecommendationResponse>('PersonalProductCategoryRecommendationRequest', request, options);
    }

    public async recommendPopularProductCategories(request: PopularProductCategoriesRecommendationRequest, options?: RelewiseRequestOptions): Promise<ProductCategoryRecommendationResponse | undefined> {
        return this.request<PopularProductCategoriesRecommendationRequest, ProductCategoryRecommendationResponse>('PopularProductCategoriesRecommendationRequest', request, options);
    }

    //#endregion

    //#region Products

    public async recommendPurchasedWithProduct(request: PurchasedWithProductRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithProductRequest, ProductRecommendationResponse>('PurchasedWithProductRequest', request, options);
    }

    public async recommendPurchasedWithMultipleProducts(request: PurchasedWithMultipleProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithMultipleProductsRequest, ProductRecommendationResponse>('PurchasedWithMultipleProductsRequest', request, options);
    }

    public async sortVariants(request: SortVariantsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SortVariantsRequest, ProductRecommendationResponse>('SortVariantsRequest', request, options);
    }

    public async sortProducts(request: SortProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SortProductsRequest, ProductRecommendationResponse>('SortProductsRequest', request, options);
    }

    public async recommendSimilarProducts(request: SimilarProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SimilarProductsRequest, ProductRecommendationResponse>('SimilarProductsRequest', request, options);
    }

    public async recommendSearchTermBasedProducts(request: SearchTermBasedProductRecommendationRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SearchTermBasedProductRecommendationRequest, ProductRecommendationResponse>('SearchTermBasedProductRecommendationRequest', request, options);
    }

    public async recentlyViewedProducts(request: RecentlyViewedProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<RecentlyViewedProductsRequest, ProductRecommendationResponse>('RecentlyViewedProductsRequest', request, options);
    }

    public async recommendPurchasedWithCurrentCart(request: PurchasedWithCurrentCartRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithCurrentCartRequest, ProductRecommendationResponse>('PurchasedWithCurrentCartRequest', request, options);
    }

    public async recommendProductsViewedAfterViewingProduct(request: ProductsViewedAfterViewingProductRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ProductsViewedAfterViewingProductRequest, ProductRecommendationResponse>('ProductsViewedAfterViewingProductRequest', request, options);
    }

    public async recommendProductsViewedAfterViewingContent(request: ProductsViewedAfterViewingContentRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ProductsViewedAfterViewingContentRequest, ProductRecommendationResponse>('ProductsViewedAfterViewingContentRequest', request, options);
    }

    public async recommendPopularProducts(request: PopularProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PopularProductsRequest, ProductRecommendationResponse>('PopularProductsRequest', request, options);
    }

    public async recommendPersonalProducts(request: PersonalProductRecommendationRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PersonalProductRecommendationRequest, ProductRecommendationResponse>('PersonalProductRecommendationRequest', request, options);
    }

    //#endregion

    //#region Content

    public async recommendPopularContents(request: PopularContentsRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined> {
        return this.request<PopularContentsRequest, ContentRecommendationResponse>('PopularContentsRequest', request, options);
    }

    public async recommendPersonalContents(request: PersonalContentRecommendationRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined> {
        return this.request<PersonalContentRecommendationRequest, ContentRecommendationResponse>('PersonalContentRecommendationRequest', request, options);
    }

    public async recommendContentsViewedAfterViewingProduct(request: ContentsViewedAfterViewingProductRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingProductRequest, ContentRecommendationResponse>('ContentsViewedAfterViewingProductRequest', request, options);
    }

    public async recommendContentsViewedAfterViewingMultipleProducts(request: ContentsViewedAfterViewingMultipleProductsRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingMultipleProductsRequest, ContentRecommendationResponse>('ContentsViewedAfterViewingProductRequest', request, options);
    }

    public async recommendContentsViewedAfterViewingMultipleContents(request: ContentsViewedAfterViewingMultipleContentsRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingMultipleContentsRequest, ContentRecommendationResponse>('ContentsViewedAfterViewingMultipleContentsRequest', request, options);
    }

    public async recommendContentsViewedAfterViewingContent(request: ContentsViewedAfterViewingContentRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingContentRequest, ContentRecommendationResponse>('ContentsViewedAfterViewingContentRequest', request, options);
    }

    //#endregion

    //#region Batching 
    public async batchProductRecommendations(request: ProductRecommendationRequestCollection, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponseCollection | undefined> {
        return this.request<ProductRecommendationRequestCollection, ProductRecommendationResponseCollection>('ProductRecommendationRequestCollection', request, options);
    }

    public async batchContentRecommendations(request: ContentRecommendationRequestCollection, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponseCollection | undefined> {
        return this.request<ContentRecommendationRequestCollection, ContentRecommendationResponseCollection>('ContentRecommendationRequestCollection', request, options);
    }

    public async batchContentCategoryRecommendations(request: ContentCategoryRecommendationRequestCollection, options?: RelewiseRequestOptions): Promise<ContentCategoryRecommendationResponseCollection | undefined> {
        return this.request<ContentCategoryRecommendationRequestCollection, ContentCategoryRecommendationResponseCollection>('ContentCategoryRecommendationRequestCollection', request, options);
    }

    public async batchProductCategoryRecommendations(request: ProductCategoryRecommendationRequestCollection, options?: RelewiseRequestOptions): Promise<ProductCategoryRecommendationResponseCollection | undefined> {
        return this.request<ProductCategoryRecommendationRequestCollection, ProductCategoryRecommendationResponseCollection>('ProductCategoryRecommendationRequestCollection', request, options);
    }

    //#endregion
}