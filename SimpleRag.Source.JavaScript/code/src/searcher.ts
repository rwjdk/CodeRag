import { RelewiseClient, RelewiseClientOptions, RelewiseRequestOptions } from './relewise.client';
import { 
    SearchRequestCollection, 
    SearchResponseCollection, 
    ProductSearchRequest, 
    ProductSearchResponse,
    ProductCategorySearchRequest, 
    ProductCategorySearchResponse,
    ContentSearchRequest,
    ContentSearchResponse,
    SearchTermPredictionRequest,
    SearchTermPredictionResponse,
} from './models/data-contracts';

export class Searcher extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async searchProducts(request: ProductSearchRequest, options?: RelewiseRequestOptions): Promise<ProductSearchResponse | undefined> {
        return this.request<ProductSearchRequest, ProductSearchResponse>('ProductSearchRequest', request, options);
    }

    public async searchProductCategories(request: ProductCategorySearchRequest, options?: RelewiseRequestOptions): Promise<ProductCategorySearchResponse | undefined> {
        return this.request<ProductCategorySearchRequest, ProductCategorySearchResponse>('ProductCategorySearchRequest', request, options);
    }

    public async searchContents(request: ContentSearchRequest, options?: RelewiseRequestOptions): Promise<ContentSearchResponse | undefined> {
        return this.request<ContentSearchRequest, ContentSearchResponse>('ContentSearchRequest', request, options);
    }

    public async searchTermPrediction(request: SearchTermPredictionRequest, options?: RelewiseRequestOptions): Promise<SearchTermPredictionResponse | undefined> {
        return this.request<SearchTermPredictionRequest, SearchTermPredictionResponse>('SearchTermPredictionRequest', request, options);
    }

    public async batch(requestCollections: SearchRequestCollection, options?: RelewiseRequestOptions): Promise<SearchResponseCollection | undefined> {
        return this.request<SearchRequestCollection, SearchResponseCollection>('SearchRequestCollection', requestCollections, options);
    }
}