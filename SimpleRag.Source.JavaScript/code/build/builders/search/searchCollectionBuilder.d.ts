import { ContentSearchRequest, ProductSearchRequest, ProductCategorySearchRequest, SearchRequestCollection, SearchTermPredictionRequest } from '../../models/data-contracts';
import { Settings } from '../settings';
import { SearchRequestBuilder } from './searchRequestBuilder';
export declare class SearchCollectionBuilder extends SearchRequestBuilder {
    private requests;
    constructor(settings?: Settings);
    addRequest(request: ProductSearchRequest | ContentSearchRequest | ProductCategorySearchRequest | SearchTermPredictionRequest): this;
    build(): SearchRequestCollection;
}
