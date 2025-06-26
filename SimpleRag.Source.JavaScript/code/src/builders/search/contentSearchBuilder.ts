import { ContentSearchRequest, ContentSearchSettings, RecommendationSettings, SelectedContentPropertiesSettings } from '../../models/data-contracts';
import { PaginationBuilder } from '../paginationBuilder';
import { Settings } from '../settings';
import { ContentHighlightingBuilder } from './contentHighlightingBuilder';
import { ContentSortingBuilder } from './contentSortingBuilder';
import { FacetBuilder } from './facetBuilder';
import { SearchBuilder } from './searchBuilder';
import { SearchRequestBuilder } from './searchRequestBuilder';

export class ContentSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder: FacetBuilder = new FacetBuilder();
    private paginationBuilder: PaginationBuilder = new PaginationBuilder();
    private sortingBuilder: ContentSortingBuilder = new ContentSortingBuilder();
    private term: string | null | undefined;
    private highlightingBuilder = new ContentHighlightingBuilder();

    private searchSettings: ContentSearchSettings = {
        $type: 'Relewise.Client.Requests.Search.Settings.ContentSearchSettings, Relewise.Client',
        recommendations: {},
    };

    constructor(settings: Settings) {
        super(settings)
    }

    public setContentProperties(contentProperties: Partial<SelectedContentPropertiesSettings>): this {
        this.searchSettings.selectedContentProperties = contentProperties as SelectedContentPropertiesSettings;

        return this;
    }

    public setRecommendationSettings(settings: RecommendationSettings): this {
        this.searchSettings.recommendations = settings;

        return this;
    }

    public setTerm(term: string | null | undefined): this {
        this.term = term;

        return this;
    }

    public pagination(paginate: (pagination: PaginationBuilder) => void): this {
        paginate(this.paginationBuilder);

        return this;
    }

    public facets(facets: (pagination: FacetBuilder) => void): this {
        facets(this.facetBuilder);

        return this;
    }

    public sorting(sorting: (sortingBuilder: ContentSortingBuilder) => void): this {
        sorting(this.sortingBuilder);

        return this;
    }

    public highlighting(highlightingBuilder: (highlightingBuilder: ContentHighlightingBuilder) => void): this {
        highlightingBuilder(this.highlightingBuilder);

        this.searchSettings.highlight = this.highlightingBuilder.build();

        return this;
    }

    public build(): ContentSearchRequest {
        const { take, skip } = this.paginationBuilder.build();
        return {
            $type: 'Relewise.Client.Requests.Search.ContentSearchRequest, Relewise.Client', 
            ...this.baseBuild(),
            
            settings: this.searchSettings,
            take,
            skip,

            term: this.term,

            facets: this.facetBuilder.build(),
            sorting: this.sortingBuilder.build(),
        } as ContentSearchRequest;
    }
}