import { SearchRequest } from '../../models/data-contracts';
import { FilterBuilder } from '../filterBuilder';
import { RelevanceModifierBuilder } from '../relevanceModifierBuilder';
import { Settings } from '../settings';
export declare abstract class SearchRequestBuilder {
    private readonly settings?;
    private readonly filterBuilder;
    private readonly postFilterBuilder;
    private readonly relevanceModifiersBuilder;
    private indexId;
    constructor(settings?: Settings | undefined);
    /**
     * Adds filters to the request
     * @param filterBuilder
     * @returns
     */
    filters(filterBuilder: (builder: FilterBuilder) => void): this;
    /**
     * Adds post filters to the request
     * @param filterBuilder
     * @returns
     */
    postFilters(filterBuilder: (builder: FilterBuilder) => void): this;
    relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this;
    /**
     * Use only when a specific index different from the 'default'-index is needed
     * @param id
     * @returns
     */
    setIndex(id?: string | null): this;
    protected baseBuild(): Omit<SearchRequest, '$type' | 'currency' | 'language' | 'displayedAtLocation'>;
}
