import { SearchRequest } from '../../models/data-contracts';
import { FilterBuilder } from '../filterBuilder';
import { RelevanceModifierBuilder } from '../relevanceModifierBuilder';
import { Settings } from '../settings';

export abstract class SearchRequestBuilder {
    private readonly filterBuilder: FilterBuilder = new FilterBuilder();
    private readonly postFilterBuilder: FilterBuilder = new FilterBuilder();
    private readonly relevanceModifiersBuilder: RelevanceModifierBuilder = new RelevanceModifierBuilder();
    private indexId: string | null | undefined;

    constructor(
        private readonly settings?: Settings) {
    }

    /**
     * Adds filters to the request
     * @param filterBuilder 
     * @returns 
     */
    public filters(filterBuilder: (builder: FilterBuilder) => void): this {
        filterBuilder(this.filterBuilder);

        return this;
    }

    /**
     * Adds post filters to the request
     * @param filterBuilder 
     * @returns 
     */
    public postFilters(filterBuilder: (builder: FilterBuilder) => void): this {
        filterBuilder(this.postFilterBuilder);

        return this;
    }

    public relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this {
        relevanceModifiersBuilder(this.relevanceModifiersBuilder);

        return this;
    }

    /**
     * Use only when a specific index different from the 'default'-index is needed
     * @param id 
     * @returns 
     */
    public setIndex(id?: string | null): this {
        this.indexId = id;

        return this;
    }

    protected baseBuild(): Omit<SearchRequest, '$type' | 'currency' |  'language' | 'displayedAtLocation'> {
        return {
            ...(this.settings && { 
                currency: { value: this.settings.currency },
                language: { value: this.settings.language },
                displayedAtLocation: this.settings.displayedAtLocation,
                user: this.settings.user,
            }),
            filters: this.filterBuilder.build(),
            postFilters: this.postFilterBuilder.build(),
            relevanceModifiers: this.relevanceModifiersBuilder.build(),
            ...(this.indexId && { indexSelector: { id: this.indexId } }),
        };
    }
}