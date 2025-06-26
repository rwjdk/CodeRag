import { error  } from 'console';
import { DataValueFactory, ProblemDetailsError, Tracker, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const tracker = new Tracker(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

test('Track Order', async() => {
    const result = await tracker.trackOrder({
        lineItems: [
            {
                lineTotal: 100,
                productId: '1',
                quantity: 1,
                variantId: 'v1',
            },
            {
                lineTotal: 100,
                productId: '2',
                quantity: 1,
                variantId: 'v1',
            }],
        subtotal: {
            amount: 100,
            currency: 'DKK',
        },
        orderNumber: '',
        trackingNumber: '',
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track Cart', async() => {
    const result = await tracker.trackCart({
        lineItems: [
            {
                lineTotal: 100,
                productId: '1',
                quantity: 1,
                variantId: 'v1',
            },
            {
                lineTotal: 100,
                productId: '2',
                quantity: 1,
                variantId: 'v1',
            },
        ],
        subtotal: {
            amount: 100,
            currency: 'DKK',
        },
        user: UserFactory.anonymous(),
        data: { 'basketId': DataValueFactory.string('basketid') },
    });

    expect(result).toBeUndefined();
});

test('Track Product View', async() => {
    const result = await tracker.trackProductView({
        productId: '1',
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track Product View', async() => {
    const result = await tracker.trackProductView({
        productId: '2',
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track Product Category View', async() => {
    const result = await tracker.trackProductCategoryView({
        idPath: ['c1'],
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track Content View', async() => {
    const result = await tracker.trackContentView({
        contentId: '1',
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track Content View', async() => {
    const result = await tracker.trackContentView({
        contentId: '2',
        user: UserFactory.anonymous(),
    });

    await tracker.trackContentView({
        contentId: '3',
        user: UserFactory.anonymous(),
    });

    await tracker.trackContentView({
        contentId: '4',
        user: UserFactory.anonymous(),
    });

    await tracker.trackContentView({
        contentId: '5',
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track Content Category View', async() => {
    const result = await tracker.trackContentCategoryView({
        idPath: ['c1'],
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track Brand View', async() => {
    const result = await tracker.trackBrandView({
        brandId: 'b-1',
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track Search Term', async() => {

    const result = await tracker.trackSearchTerm({
        term: 'term',
        language: 'da-DK',
        user: UserFactory.anonymous(),
    });

    expect(result).toBeUndefined();
});

test('Track User Update', async() => {
    const user = UserFactory.byTemporaryId('tempId', {
        email: 'integrationtests@relewise.com',
        identifiers: {
            'emailIntegrationId': 'abc',
        },
    });

    const result = await tracker.trackUserUpdate({
        user: user,
    });

    expect(result).toBeUndefined();
});

test('Track Product View with invalid key', async() => {

    await new Tracker(DATASET_ID!, '12', { serverUrl: SERVER_URL }).trackProductView({
        productId: '2',
        user: UserFactory.anonymous(),
    }).catch((e) => {
        expect(e).toBeDefined();
        expect((e as ProblemDetailsError).details?.title).toEqual('Unauthorized');
        expect(e.message).toContain('Error when calling the Relewise API.')
        expect(e.message).toContain('Title: Unauthorized')
        expect(e.message).toContain('Status: 401')
    });
});

test('Track Product View without id', async() => {
    await expect(async() => {
        return await tracker.trackProductView({
            productId: null,
            user: UserFactory.anonymous(),
        } as any)
    }).rejects.toThrow();
});

test('Track Product View without id', async() => {
    try {
        await tracker.trackProductView({
            productId: null,
            user: UserFactory.anonymous(),
        } as any);
    }
    catch (e) {
        expect(e).toBeDefined();
    }
});

test('Track Product View on a Dataset that does not exist', async() => {
    await expect(async() => {
        const tracker = new Tracker("00000000-0000-0000-0000-000000000000", API_KEY!, { serverUrl: SERVER_URL });

        return await tracker.trackProductView({
            productId: null,
            user: UserFactory.anonymous(),
        } as any)
    }).rejects.toThrow();
});