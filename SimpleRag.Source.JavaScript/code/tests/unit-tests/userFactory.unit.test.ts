import { test, expect } from '@jest/globals'
import { UserFactory } from '../../src/factory';

test('Anonymous', () => {
    const user = UserFactory.anonymous();
    expect(Object.keys(user)).toHaveLength(0);
});

test('byAuthenticatedId', () => {
    const user = UserFactory.byAuthenticatedId('1234');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.temporaryId).toBeUndefined();
    expect(user.authenticatedId).toBe('1234');
});

test('byAuthenticatedId + TemporaryId', () => {
    const user = UserFactory.byAuthenticatedId('1234', '5678');
    expect(Object.keys(user)).toHaveLength(2);
    expect(user.authenticatedId).toBe('1234');
    expect(user.temporaryId).toBe('5678');
});

test('byTemporaryId', () => {
    const user = UserFactory.byTemporaryId('1234');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.temporaryId).toBe('1234');
});

test('byIdentifier', () => {
    const user = UserFactory.byIdentifier('foo', 'bar');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.identifiers).toBeDefined();
    expect(user.identifiers!['foo']).toBe('bar');
});

test('byIdentifiers', () => {
    const user = UserFactory.byIdentifiers({ foo: 'bar' });
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.identifiers).toBeDefined();
    expect(user.identifiers!['foo']).toBe('bar');
});

test('byEmail', () => {
    const user = UserFactory.byEmail('foo@bar.com');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.email).toBeDefined();
});

test('byFingerprint', () => {
    const user = UserFactory.byFingerprint('fingerprint');
    expect(Object.keys(user)).toHaveLength(1);
    expect(user.fingerprint).toBeDefined();
});