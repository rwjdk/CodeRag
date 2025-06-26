import { UserFactory } from '../../../../src/factory';
import { ContentSearchBuilder } from '../../../../src/builders/search';
import { test, expect } from '@jest/globals'
import { ContentSearchRequest } from '../../../../src/models/data-contracts';

function baseBuilder() {
    return new ContentSearchBuilder({
        language: 'da-DK',
        currency: 'DKK',
        displayedAtLocation: 'search page',
        user: UserFactory.anonymous(),
    });
};

test('searchHightlighting', () => {
    const subject: ContentSearchRequest = baseBuilder()
        .highlighting(h => {
            h.enabled(false);
            h.setHighlightable({
                displayName: true,
                dataKeys: ['datakey-1', 'datakey-2']
            });
            h.setLimit({
                maxEntryLimit: 1,
                maxSnippetsPerEntry: 2,
                maxSnippetsPerField: 3
            });
            h.setShape({
                offsets: { include: true },
                snippets: { include: true, includeMatchedWords: true, useEllipses: true }
            });
        }).build();

    expect(subject.settings?.highlight?.enabled).toBe(false);
    expect(subject.settings?.highlight?.highlightable.displayName).toBe(true);
    expect(subject.settings?.highlight?.highlightable.dataKeys![0]).toBe('datakey-1');
    expect(subject.settings?.highlight?.highlightable.dataKeys![1]).toBe('datakey-2');
    expect(subject.settings?.highlight?.limit.maxEntryLimit).toBe(1);
    expect(subject.settings?.highlight?.limit.maxSnippetsPerEntry).toBe(2);
    expect(subject.settings?.highlight?.limit.maxSnippetsPerField).toBe(3);
    expect(subject.settings?.highlight?.shape.offsets?.include).toBe(true);
    expect(subject.settings?.highlight?.shape.snippets?.include).toBe(true);
});