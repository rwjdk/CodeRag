import { ContentRecommendationRequest } from '../../../models/data-contracts';

export interface ContentsRecommendationBuilder<TRequest = ContentRecommendationRequest> {
    build(): TRequest;
};