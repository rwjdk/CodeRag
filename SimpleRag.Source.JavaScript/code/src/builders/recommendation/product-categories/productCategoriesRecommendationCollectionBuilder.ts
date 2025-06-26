import { PersonalProductCategoryRecommendationRequest, PopularProductCategoriesRecommendationRequest, ProductCategoryRecommendationRequestCollection } from '../../../models/data-contracts';

export class ProductCategoriesRecommendationCollectionBuilder {
    private requests: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)[] = [];
    private distinctCategoriesAcrossResults: boolean = true;

    public addRequest(request: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctCategoriesAcrossResults(distinctCategoriesAcrossResults: boolean = true): this {
        this.distinctCategoriesAcrossResults = distinctCategoriesAcrossResults;

        return this;
    }

    public build(): ProductCategoryRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ProductCategoryRecommendationRequestCollection, Relewise.Client',
            requireDistinctCategoriesAcrossResults: this.distinctCategoriesAcrossResults,
            requests: this.requests,
        }
    }
}