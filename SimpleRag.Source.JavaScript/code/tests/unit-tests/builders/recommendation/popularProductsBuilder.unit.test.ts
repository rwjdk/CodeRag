import { UserFactory } from '../../../../src/factory';
import { test, expect } from '@jest/globals'
import { PopularProductsRequest } from '../../../../src/models/data-contracts';
import { PopularProductsBuilder } from '../../../../src';

function baseBuilder() {
    return new PopularProductsBuilder({
        language: 'da-DK',
        currency: 'DKK',
        displayedAtLocation: 'unit test',
        user: UserFactory.anonymous(),
    });
};

test('setPopularityMultiplier', () => {
    const key: string = 'data-key';

    const subject: PopularProductsRequest = baseBuilder()
        .setPopularityMultiplier(pm => pm.setDataKeyPopularityMultiplierSelector({ key: key }))
        .build();

    expect(subject.popularityMultiplier?.key).toBe(key);
});

test('do not set since minutes ago', () => {
    const subject: PopularProductsRequest = baseBuilder()
        .build();

    expect(subject.sinceMinutesAgo).toBe(20160);
});

test('set since minutes ago', () => {
    const since = 10; 

    const subject: PopularProductsRequest = baseBuilder()
        .sinceMinutesAgo(since)
        .build();

    expect(subject.sinceMinutesAgo).toBe(since);
});