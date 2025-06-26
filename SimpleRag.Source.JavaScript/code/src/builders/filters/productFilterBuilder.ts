import { ProductAndVariantIdFilter, ProductAssortmentFilter, ProductCategoryAssortmentFilter, ProductCategoryHasAncestorFilter, ProductCategoryHasChildFilter, ProductCategoryHasParentFilter, ProductCategoryHasProductsFilter, ProductCategoryIdFilter, ProductCategoryLevelFilter, ProductDataFilter, ProductDisplayNameFilter, ProductHasVariantsFilter, ProductIdFilter, ProductListPriceFilter, ProductRecentlyPurchasedByUserFilter, ProductRecentlyViewedByUserFilter, ProductSalesPriceFilter, ProductAndVariantId, ProductCategoryDataFilter, ProductCategoryDataHasKeyFilter, ProductCategoryDisabledFilter, ProductCategoryRecentlyViewedByUserFilter, ProductDataHasKeyFilter, ProductDisabledFilter, ProductHasCategoriesFilter, ProductRecentlyPurchasedByCompanyFilter, ProductRecentlyPurchasedByUserCompanyFilter, ProductRecentlyPurchasedByUserParentCompanyFilter, ProductRecentlyViewedByCompanyFilter, ProductRecentlyViewedByUserCompanyFilter, ProductRecentlyViewedByUserParentCompanyFilter, ProductInCartFilter } from '../../models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';

export class ProductFilterBuilder extends FilterBuilderBase<ProductFilterBuilder> {
    constructor() { super(ProductFilterBuilder); }

    /**
     * Adds a product assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(categoryIds)
            ? categoryIds
            : [categoryIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryIdFilter, Relewise.Client',
            evaluationScope: evaluationScope,
            categoryIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out categories without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryDataFilter, Relewise.Client',
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
     * Filters the request to only return the specified products.
     * @param productIds - Array of product IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductIdFilter(productIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(productIds)
            ? productIds
            : [productIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductIdFilter, Relewise.Client',
            productIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a range filter to the request ensuring the product has a certain range of variants.
     * @param lowerBound - Lower bound of the range (inclusive).
     * @param upperBound - Upper bound of the range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions & { includeDisabled?: boolean }): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductHasVariantsFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductHasVariantsFilter, Relewise.Client',
            numberOfVariants: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            negated: negated,
            settings: internalSettingsBuilder.build(),
            includeDisabled: options?.includeDisabled ?? false
        };
        
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products purchased since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductRecentlyPurchasedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyPurchasedByUserFilter, Relewise.Client',
            sinceUtc: sinceUtc,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products viewed since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true

, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductRecentlyViewedByUserFilter(sinceUtc: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductRecentlyViewedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyViewedByUserFilter, Relewise.Client',
            sinceUtc: sinceUtc,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductSalesPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductSalesPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductListPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductListPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product display name filter to the request.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductDisplayNameFilter(conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductDisplayNameFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDisplayNameFilter, Relewise.Client',
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product and variant ID filter to the request.
     * @param products - Array of product and variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductAndVariantIdFilter(products: ProductAndVariantId | ProductAndVariantId[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductAndVariantIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductAndVariantIdFilter, Relewise.Client',
            productAndVariantIds: Array.isArray(products) ? products : [products],
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryLevelFilter(levels: number | number[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryLevelFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryLevelFilter, Relewise.Client',
            levels: Array.isArray(levels) ? levels : [levels],
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryHasParentFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryHasParentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryHasParentFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryHasChildFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryHasChildFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryHasChildFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryHasAncestorFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryHasAncestorFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryHasAncestorFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category has products filter to the request ensuring that only categories with products in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryHasProductsFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryHasProductsFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryHasProductsFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out products without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDataFilter, Relewise.Client',
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
     * Adds a product category has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryRecentlyViewedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryRecentlyViewedByUserFilter, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductHasCategoriesFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductHasCategoriesFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductHasCategoriesFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return products recently purchased by a company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductRecentlyPurchasedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const companies: string[] = Array.isArray(companyIds)
            ? companyIds
            : [companyIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductRecentlyPurchasedByCompanyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyPurchasedByCompanyFilter, Relewise.Client',
            companyIds: companies,
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return products recently purchased by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductRecentlyPurchasedByUserCompanyFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductRecentlyPurchasedByUserCompanyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyPurchasedByUserCompanyFilter, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return products recently purchased by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductRecentlyPurchasedByUserParentCompanyFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductRecentlyPurchasedByUserParentCompanyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyPurchasedByUserParentCompanyFilter, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return products recently viewed by a company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductRecentlyViewedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const companies: string[] = Array.isArray(companyIds)
            ? companyIds
            : [companyIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductRecentlyViewedByCompanyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyViewedByCompanyFilter, Relewise.Client',
            companyIds: companies,
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return products recently viewed by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductRecentlyViewedByUserCompanyFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductRecentlyViewedByUserCompanyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyViewedByUserCompanyFilter, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return products recently viewed by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductRecentlyViewedByUserParentCompanyFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductRecentlyViewedByUserParentCompanyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyViewedByUserParentCompanyFilter, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a filter to only return products in the user's cart.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductInCartFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductInCartFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductInCartFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };

        this.filters.push(filter);

        return this;
    }
}