import { ContentAssortmentFilter, ContentCategoryAssortmentFilter, ContentCategoryHasAncestorFilter, ContentCategoryHasChildFilter, ContentCategoryHasContentsFilter, ContentCategoryHasParentFilter, ContentCategoryIdFilter, ContentCategoryLevelFilter, ContentCategoryDataFilter, ContentDataFilter, ContentIdFilter, ContentCategoryDataHasKeyFilter, ContentCategoryDisabledFilter, ContentCategoryRecentlyViewedByUserFilter, ContentDataHasKeyFilter, ContentDisabledFilter, ContentRecentlyViewedByUserFilter, ContentHasCategoriesFilter } from '../../models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';

export class ContentFilterBuilder extends FilterBuilderBase<ContentFilterBuilder> {
    constructor() { super(ContentFilterBuilder); }

    /**
     * Adds a content assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return contents within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(categoryIds)
            ? categoryIds
            : [categoryIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryIdFilter, Relewise.Client',
            evaluationScope: evaluationScope,
            categoryIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return the specified contents.
     * @param contentIds - Array of content IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentIdFilter(contentIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(contentIds)
            ? contentIds
            : [contentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentIdFilter, Relewise.Client',
            contentIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryLevelFilter(levels: number | number[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryLevelFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryLevelFilter, Relewise.Client',
            levels: Array.isArray(levels) ? levels : [levels],
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryHasParentFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryHasParentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryHasParentFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryHasChildFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryHasChildFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryHasChildFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryHasAncestorFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryHasAncestorFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryHasAncestorFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category has contents filter to the request ensuring that only categories with content in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryHasContentsFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryHasContentsFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryHasContentsFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out categories without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            objectPath: options?.objectPath,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out contents without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            objectPath: options?.objectPath,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return content categories recently viewed by the user.
     * @param sinceMinutesAgo - Time in minutes since the category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentCategoryRecentlyViewedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryRecentlyViewedByUserFilter, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return content recently viewed by the user.
     * @param sinceMinutesAgo - Time in minutes since the content was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentRecentlyViewedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentRecentlyViewedByUserFilter, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    public addContentHasCategoriesFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ContentHasCategoriesFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentHasCategoriesFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }
}
