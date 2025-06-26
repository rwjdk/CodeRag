import { ContentSearchRequest, RecommendationSettings, SelectedContentPropertiesSettings } from '../../models/data-contracts';
import { PaginationBuilder } from '../paginationBuilder';
import { Settings } from '../settings';
import { ContentHighlightingBuilder } from './contentHighlightingBuilder';
import { ContentSortingBuilder } from './contentSortingBuilder';
import { FacetBuilder } from './facetBuilder';
import { SearchBuilder } from './searchBuilder';
import { SearchRequestBuilder } from './searchRequestBuilder';
export declare class ContentSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder;
    private paginationBuilder;
    private sortingBuilder;
    private term;
    private highlightingBuilder;
    private searchSettings;
    constructor(settings: Settings);
    setContentProperties(contentProperties: Partial<SelectedContentPropertiesSettings>): this;
    setRecommendationSettings(settings: RecommendationSettings): this;
    setTerm(term: string | null | undefined): this;
    pagination(paginate: (pagination: PaginationBuilder) => void): this;
    facets(facets: (pagination: FacetBuilder) => void): this;
    sorting(sorting: (sortingBuilder: ContentSortingBuilder) => void): this;
    highlighting(highlightingBuilder: (highlightingBuilder: ContentHighlightingBuilder) => void): this;
    build(): ContentSearchRequest;
}
