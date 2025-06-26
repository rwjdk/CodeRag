import { RecommendationRequest } from '../../models/data-contracts';
import { FilterBuilder } from '../filterBuilder';
import { RelevanceModifierBuilder } from '../relevanceModifierBuilder';
import { Settings } from '../settings';
export declare abstract class RecommendationRequestBuilder {
    private readonly settings;
    private readonly filterBuilder;
    private readonly relevanceModifiersBuilder;
    constructor(settings: Settings);
    /**
     * Adds filters to the request
     * @param filterBuilder
     * @returns
     */
    filters(filterBuilder: (builder: FilterBuilder) => void): this;
    relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this;
    protected baseBuild(): Omit<RecommendationRequest, '$type'>;
}
