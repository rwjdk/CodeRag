import { ContentAttributeSorting, ContentDataSorting, ContentPopularitySorting, ContentRelevanceSorting, ContentSortBySpecification } from '../../models/data-contracts';

export class ContentSortingBuilder {
    private value:
        | ContentAttributeSorting
        | ContentDataSorting
        | ContentPopularitySorting
        | ContentRelevanceSorting
        | null = null;

    public sortByContentData(key: string, order: 'Ascending' | 'Descending' = 'Descending', mode: 'Auto' | 'Alphabetical' | 'Numerical' = 'Auto', thenBy?: (thenBy: ContentSortingBuilder) => void) {
        const sort: ContentDataSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Content.ContentDataSorting, Relewise.Client',
            mode,
            order,
            key,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByContentRelevance(order: 'Ascending' | 'Descending' = 'Descending', thenBy?: (thenBy: ContentSortingBuilder) => void) {
        const sort: ContentRelevanceSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Content.ContentRelevanceSorting, Relewise.Client',
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByContentPopularity(order: 'Ascending' | 'Descending' = 'Descending', thenBy?: (thenBy: ContentSortingBuilder) => void) {
        const sort: ContentPopularitySorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Content.ContentPopularitySorting, Relewise.Client',
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    public sortByContentAttribute(
        attribute: 'Id' | 'DisplayName',
        order: 'Ascending' | 'Descending',
        mode: 'Auto' | 'Alphabetical' | 'Numerical' = 'Auto',
        thenBy?: (thenBy: ContentSortingBuilder) => void) {

        const sort: ContentAttributeSorting = {
            $type: 'Relewise.Client.DataTypes.Search.Sorting.Content.ContentAttributeSorting, Relewise.Client',
            attribute,
            mode,
            order,
            thenBy: this.thenBy(thenBy)?.value,
        }

        this.value = sort;
    }

    private thenBy(thenBy: ((thenBy: ContentSortingBuilder) => void) | undefined) {
        const thenByBuilder = new ContentSortingBuilder();
        if (thenBy) {
            thenBy(thenByBuilder);
            thenByBuilder.build();
        }
        return thenByBuilder;
    }

    public build(): ContentSortBySpecification | null {
        return this.value == null
            ? null
            : { value: this.value };
    }
}
