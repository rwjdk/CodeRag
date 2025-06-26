import { ContentSearchRequest, ProductSearchRequest, SearchTermPredictionRequest, ProductCategorySearchRequest } from '../../models/data-contracts';

export interface SearchBuilder<T = ProductSearchRequest | ContentSearchRequest | ProductCategorySearchRequest | SearchTermPredictionRequest> {
    build(): T;
}
