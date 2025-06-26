import { ContentSortBySpecification } from '../../models/data-contracts';
export declare class ContentSortingBuilder {
    private value;
    sortByContentData(key: string, order?: 'Ascending' | 'Descending', mode?: 'Auto' | 'Alphabetical' | 'Numerical', thenBy?: (thenBy: ContentSortingBuilder) => void): void;
    sortByContentRelevance(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ContentSortingBuilder) => void): void;
    sortByContentPopularity(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ContentSortingBuilder) => void): void;
    sortByContentAttribute(attribute: 'Id' | 'DisplayName', order: 'Ascending' | 'Descending', mode?: 'Auto' | 'Alphabetical' | 'Numerical', thenBy?: (thenBy: ContentSortingBuilder) => void): void;
    private thenBy;
    build(): ContentSortBySpecification | null;
}
