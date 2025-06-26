import { SearchTermPredictionRequest } from '../../models/data-contracts';
import { Settings } from '../settings';
import { SearchRequestBuilder } from './searchRequestBuilder';
export declare class SearchTermPredictionBuilder extends SearchRequestBuilder {
    private count;
    private term;
    private targetEntityTypes;
    constructor(settings: Settings);
    take(count: number): this;
    setTerm(term: string): this;
    addEntityType(...types: ('Product' | 'Variant' | 'ProductCategory' | 'Brand' | 'Content' | 'ContentCategory')[]): this;
    build(): SearchTermPredictionRequest;
}
