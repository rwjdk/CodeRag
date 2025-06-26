import { PersonalContentCategoryRecommendationRequest, PopularContentCategoriesRecommendationRequest, ContentCategoryRecommendationRequestCollection } from '../../../models/data-contracts';

export class ContentCategoriesRecommendationCollectionBuilder {
    private requests: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)[] = [];
    private distinctCategoriesAcrossResults: boolean = true;

    public addRequest(request: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctCategoriesAcrossResults(distinctCategoriesAcrossResults: boolean = true): this {
        this.distinctCategoriesAcrossResults = distinctCategoriesAcrossResults;

        return this;
    }

    public build(): ContentCategoryRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ContentRecommendationRequestCollection, Relewise.Client',
            requireDistinctCategoriesAcrossResults: this.distinctCategoriesAcrossResults,
            requests: this.requests,
        }
    }
}