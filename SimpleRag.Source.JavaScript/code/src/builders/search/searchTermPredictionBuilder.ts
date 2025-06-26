import { SearchTermPredictionRequest } from '../../models/data-contracts';
import { Settings } from '../settings';
import { SearchRequestBuilder } from './searchRequestBuilder';

export class SearchTermPredictionBuilder extends SearchRequestBuilder {
    private count: number = 0;
    private term: string = '';
    private targetEntityTypes: ('Product' | 'Variant' | 'ProductCategory' | 'Brand' | 'Content' | 'ContentCategory')[] | null = null;

    constructor(settings: Settings) {
        super(settings)
    }

    public take(count: number): this {
        this.count = count;

        return this;
    }

    public setTerm(term: string): this {
        this.term = term;

        return this;
    }

    public addEntityType(...types: ('Product' | 'Variant' | 'ProductCategory' | 'Brand' | 'Content' | 'ContentCategory')[]): this {
        this.targetEntityTypes = types;

        return this;
    }

    public build(): SearchTermPredictionRequest {
        return {
            $type: 'Relewise.Client.Requests.Search.SearchTermPredictionRequest, Relewise.Client',
            ...this.baseBuild(),

            term: this.term,
            take: this.count,
            settings: {
                $type: 'Relewise.Client.Requests.Search.Settings.SearchTermPredictionSettings, Relewise.Client',
                targetEntityTypes: this.targetEntityTypes,
            },
        } as SearchTermPredictionRequest;
    }
}