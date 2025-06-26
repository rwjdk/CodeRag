import { ContentSearchRequest, ProductSearchRequest, ProductCategorySearchRequest, SearchRequestCollection, SearchTermPredictionRequest } from '../../models/data-contracts';
import { Settings } from '../settings';
import { SearchRequestBuilder } from './searchRequestBuilder';

export class SearchCollectionBuilder extends SearchRequestBuilder {
    private requests: (ProductSearchRequest | ContentSearchRequest | ProductCategorySearchRequest | SearchTermPredictionRequest)[] = [];

    constructor(settings?: Settings) {
        super(settings)
    }

    public addRequest(request: ProductSearchRequest | ContentSearchRequest | ProductCategorySearchRequest  | SearchTermPredictionRequest): this {
        this.requests.push(request);

        return this;
    }

    public build(): SearchRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Search.SearchRequestCollection, Relewise.Client',
            ...this.baseBuild(),
            requests: this.requests,
        };
    }
}