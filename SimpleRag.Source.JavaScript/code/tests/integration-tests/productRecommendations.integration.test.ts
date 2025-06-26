import { randomUUID } from 'crypto';
import { DataValueFactory, PopularProductsBuilder, ProductRecommendationResponse, ProductsViewedAfterViewingProductBuilder, PurchasedWithProductBuilder, Recommender, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'integration test',
    user: UserFactory.anonymous(),
};

test('PurchasedWithProduct', async() => {

    const result: ProductRecommendationResponse | undefined = await recommender.recommendPurchasedWithProduct(new PurchasedWithProductBuilder(settings).product({ productId: '1' }).build());

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});

test('ProductsViewedAfterViewingProduct', async() => {

    const result: ProductRecommendationResponse | undefined = await recommender.recommendProductsViewedAfterViewingProduct(new ProductsViewedAfterViewingProductBuilder(settings).product({ productId: '1' }).build());

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});

test('ProductsViewedAfterViewingProduct with all conditions', async() => {

    const recommendationBuilder = new ProductsViewedAfterViewingProductBuilder({
        language: 'en-US',
        currency: 'USD',
        displayedAtLocation: 'integration test Conditions',
        user: UserFactory.anonymous(),
    })
        .product({ productId: '1' })
        .filters(f => f
            .addProductDataFilter('ShortDescription', b => b
                .addContainsCondition(DataValueFactory.stringCollection(['d']), 'Any')
                .addContainsCondition(DataValueFactory.booleanCollection([true]), 'Any')
                .addContainsCondition(DataValueFactory.doubleCollection([1]), 'Any')
                .addContainsCondition(DataValueFactory.multilingual([{ language: 'en-us', value: 'd' }]), 'Any')
                .addContainsCondition(DataValueFactory.multiCurrency([{ currency: 'USD', amount: 1 }]), 'Any'),
            ));

    const result: ProductRecommendationResponse | undefined = await recommender.recommendProductsViewedAfterViewingProduct(recommendationBuilder.build());

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toEqual(0);
});

test('ProductsViewedAfterViewingProduct with all conditions', async() => {

    const recommendationBuilder = new PopularProductsBuilder(settings)
        .setPopularityMultiplier(pm => pm.setDataKeyPopularityMultiplierSelector({ key: 'some-data-key' }));

    const result: ProductRecommendationResponse | undefined = await recommender.recommendPopularProducts(recommendationBuilder.build());

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});

test('Filter on products in cart', async() => {
    settings.user = UserFactory.byTemporaryId(randomUUID());
    const recommendationBuilder = new PopularProductsBuilder(settings)
        .filters(f => f.addProductInCartFilter());

    const result: ProductRecommendationResponse | undefined = await recommender.recommendPopularProducts(recommendationBuilder.build());

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toEqual(0);
});

test('Filter on products in cart negated', async() => {
    settings.user = UserFactory.byTemporaryId(randomUUID());
    const recommendationBuilder = new PopularProductsBuilder(settings)
        .filters(f => f.addProductInCartFilter(true));

    const result: ProductRecommendationResponse | undefined = await recommender.recommendPopularProducts(recommendationBuilder.build());

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});