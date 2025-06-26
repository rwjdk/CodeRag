import { test, expect } from '@jest/globals'
import { Pagination, PaginationBuilder } from '../../../src/builders/paginationBuilder';

function baseBuilder() {
    return new PaginationBuilder();
};

test('pageSize', () => {
    const expected = 20;

    const subject: Pagination = baseBuilder()
        .setPageSize(expected)
        .build();

    expect(subject.take).toBe(expected);
});

test('page', () => {
    const page = 3;
    const pageSize = 10;

    const subject: Pagination = baseBuilder()
        .setPage(page)
        .setPageSize(pageSize)
        .build();

    expect(subject.skip).toBe(20);
});
