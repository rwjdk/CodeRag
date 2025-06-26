import { RelewiseClient, RelewiseClientOptions, RelewiseRequestOptions } from './relewise.client';
import { SearchRequestCollection, SearchResponseCollection, ProductSearchRequest, ProductSearchResponse, ProductCategorySearchRequest, ProductCategorySearchResponse, ContentSearchRequest, ContentSearchResponse, SearchTermPredictionRequest, SearchTermPredictionResponse } from './models/data-contracts';
export declare class Searcher extends RelewiseClient {
    protected readonly datasetId: string;
    protected readonly apiKey: string;
    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    searchProducts(request: ProductSearchRequest, options?: RelewiseRequestOptions): Promise<ProductSearchResponse | undefined>;
    searchProductCategories(request: ProductCategorySearchRequest, options?: RelewiseRequestOptions): Promise<ProductCategorySearchResponse | undefined>;
    searchContents(request: ContentSearchRequest, options?: RelewiseRequestOptions): Promise<ContentSearchResponse | undefined>;
    searchTermPrediction(request: SearchTermPredictionRequest, options?: RelewiseRequestOptions): Promise<SearchTermPredictionResponse | undefined>;
    batch(requestCollections: SearchRequestCollection, options?: RelewiseRequestOptions): Promise<SearchResponseCollection | undefined>;
}
