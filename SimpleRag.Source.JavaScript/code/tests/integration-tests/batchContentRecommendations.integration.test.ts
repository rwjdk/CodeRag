import { ContentRecommendationRequestCollection, ContentsRecommendationCollectionBuilder, ContentsViewedAfterViewingContentBuilder, PopularContentsBuilder, Recommender, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'batched integration test',
    user: UserFactory.anonymous(),
};

test('Batched Content Reommendations', async() => {

    const request: ContentRecommendationRequestCollection = new ContentsRecommendationCollectionBuilder()      
        .addRequest(new PopularContentsBuilder(settings).sinceMinutesAgo(5000).setNumberOfRecommendations(1).build())
        .addRequest(new ContentsViewedAfterViewingContentBuilder(settings).setNumberOfRecommendations(1).setContentId('1').build())
        .build();

    const result = await recommender.batchContentRecommendations(request);

    expect(result?.responses).not.toBe(undefined);
    expect(result!.responses![0].recommendations?.length).toBeGreaterThan(0);
    expect(result!.responses![1].recommendations?.length).toBeGreaterThan(0);

});