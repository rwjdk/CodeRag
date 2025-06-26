import { RecommendationRequest } from '../../models/data-contracts';
import { FilterBuilder } from '../filterBuilder';
import { RelevanceModifierBuilder } from '../relevanceModifierBuilder';
import { Settings } from '../settings';

export abstract class RecommendationRequestBuilder {
    private readonly filterBuilder: FilterBuilder = new FilterBuilder();
    private readonly relevanceModifiersBuilder: RelevanceModifierBuilder = new RelevanceModifierBuilder();

    constructor(
        private readonly settings: Settings) {
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

    public relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this {
        relevanceModifiersBuilder(this.relevanceModifiersBuilder);

        return this;
    }

    protected baseBuild(): Omit<RecommendationRequest, '$type'> {
        return {
            currency: { value: this.settings.currency },
            user: this.settings.user,
            language: { value: this.settings.language },
            displayedAtLocationType: this.settings.displayedAtLocation,
            filters: this.filterBuilder.build() ?? {},
            relevanceModifiers: this.relevanceModifiersBuilder.build() ?? {},
        };
    }
}