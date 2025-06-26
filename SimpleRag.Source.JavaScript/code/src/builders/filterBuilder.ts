import { AndFilter, CartDataFilter, FilterCollection, OrFilter, ProductAndVariantId } from '../models/data-contracts';
import { FilterSettingsBuilder } from './filterSettingsBuilder';
import { ConditionBuilder } from './conditionBuilder';
import { BrandFilterBuilder } from './filters/brandFilterBuilder';
import { CompanyFilterBuilder } from './filters/companyFilterBuilder';
import { ContentFilterBuilder } from './filters/contentFilterBuilder';
import { ProductFilterBuilder } from './filters/productFilterBuilder';
import { VariantFilterBuilder } from './filters/variantFilterBuilder';
import { AllFilters, FilterOptions, EntityDataFilterOptions } from './filters/filters.types.shared';

export class FilterBuilder {
    private filters: AllFilters[] = [];

    private productFilterBuilder: ProductFilterBuilder = new ProductFilterBuilder();
    private brandFilterBuilder: BrandFilterBuilder = new BrandFilterBuilder();
    private contentFilterBuilder: ContentFilterBuilder = new ContentFilterBuilder();
    private variantFilterBuilder: VariantFilterBuilder = new VariantFilterBuilder();
    private companyFilterBuilder: CompanyFilterBuilder = new CompanyFilterBuilder();

    /**
     * Adds a product assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a variant assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addVariantAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a brand assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addBrandAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.brandFilterBuilder.addBrandAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a content assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a content category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a product category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryIdFilter(evaluationScope, categoryIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return contents within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryIdFilter(evaluationScope, categoryIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified products.
     * @param productIds - Array of product IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductIdFilter(productIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductIdFilter(productIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified variants.
     * @param variantIds - Array of variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addVariantIdFilter(variantIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantIdFilter(variantIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified brands.
     * @param brandIds - Array of brand IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addBrandIdFilter(brandIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.brandFilterBuilder.addBrandIdFilter(brandIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified contents.
     * @param contentIds - Array of content IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentIdFilter(contentIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentIdFilter(contentIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified companies.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addCompanyIdFilter(companyIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.companyFilterBuilder.addCompanyIdFilter(companyIds, negated, options);
        return this;
    }

    /**
     * Adds a range filter to the request ensuring the product has a certain range of variants.
     * @param lowerBound - Lower bound of the range (inclusive).
     * @param upperBound - Upper bound of the range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions & { includeDisabled?: boolean }): this {
        this.productFilterBuilder.addProductHasVariantsFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products purchased since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyPurchasedByUserFilter(sinceUtc, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products viewed since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductRecentlyViewedByUserFilter(sinceUtc: string, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyViewedByUserFilter(sinceUtc, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductSalesPriceFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductListPriceFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return variants within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantSalesPriceFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return variants within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantListPriceFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return variants with a certain specification.
     * @param key - Specification key.
     * @param equalTo - Specification value to match.
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantSpecificationFilter(key, equalTo, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    /**
     * Combines filters using logical AND.
     * @param filterBuilder - Function to build the AND filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     * @throws Error if no filters are provided.
     */
    public and(filterBuilder: (builder: FilterBuilder) => void, negated: boolean = false, options?: FilterOptions): this {
        const builder = new FilterBuilder();
        filterBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filters = builder.build();
        if (filters === null || filters.items === undefined || filters.items === null || filters.items.length <= 0) {
            throw new Error('And-filters must contain at least 1 filter');
        }

        const filter: AndFilter = {
            $type: 'Relewise.Client.Requests.Filters.AndFilter, Relewise.Client',
            filters: filters.items,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Combines filters using logical OR.
     * @param filterBuilder - Function to build the OR filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     * @throws Error if no filters are provided.
     */
    public or(filterBuilder: (builder: FilterBuilder) => void, negated: boolean = false, options?: FilterOptions): this {
        const builder = new FilterBuilder();
        filterBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filters = builder.build();
        if (filters === null || filters.items === undefined || filters.items === null || filters.items.length <= 0) {
            throw new Error('Or-filters must contain at least 1 filter');
        }

        const filter: OrFilter = {
            $type: 'Relewise.Client.Requests.Filters.OrFilter, Relewise.Client',
            filters: filters.items,
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
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.productFilterBuilder.addProductDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    /**
     * Adds a variant data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.variantFilterBuilder.addVariantDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    /**
     * Adds a brand data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out brands without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addBrandDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.brandFilterBuilder.addBrandDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    /**
     * Adds a cart data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out carts without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addCartDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: CartDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.CartDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
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
     * @param filterOutIfKeyIsNotFound - If true, filters out content categories without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.contentFilterBuilder.addContentCategoryDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
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
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.contentFilterBuilder.addContentDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    /**
     * Adds a product category data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out product categories without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.productFilterBuilder.addProductCategoryDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    /**
     * Adds a company data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out companies without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addCompanyDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.companyFilterBuilder.addCompanyDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    /**
     * Adds a product display name filter to the request.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductDisplayNameFilter(conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductDisplayNameFilter(conditionBuilder, mustMatchAllConditions, negated, options);
        return this;
    }

    /**
     * Adds a product and variant ID filter to the request.
     * @param products - Array of product and variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductAndVariantIdFilter(products: ProductAndVariantId | ProductAndVariantId[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductAndVariantIdFilter(products, negated, options);
        return this;
    }

    /**
     * Adds a product category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductCategoryLevelFilter(levels: number | number[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryLevelFilter(levels, negated, options);
        return this;
    }

    /**
     * Adds a product category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductCategoryHasParentFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryHasParentFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a product category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductCategoryHasChildFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryHasChildFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a product category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductCategoryHasAncestorFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryHasAncestorFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a content category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryLevelFilter(levels: number | number[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryLevelFilter(levels, negated, options);
        return this;
    }

    /**
     * Adds a content category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryHasParentFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryHasParentFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a content category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryHasChildFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryHasChildFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a content category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryHasAncestorFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryHasAncestorFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a product category has products filter to the request ensuring that only categories with products in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductCategoryHasProductsFilter(negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryHasProductsFilter(negated, options);
        return this;
    }

    /**
     * Adds a content category has contents filter to the request ensuring that only categories with content in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryHasContentsFilter(negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryHasContentsFilter(negated, options);
        return this;
    }

    /**
     * Adds a brand data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addBrandDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.brandFilterBuilder.addBrandDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a brand is disabled filter to the request. Only works for brand queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addBrandDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.brandFilterBuilder.addBrandDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a company data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addCompanyDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.companyFilterBuilder.addCompanyDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a company is disabled filter to the request. Only works for company queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addCompanyDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.companyFilterBuilder.addCompanyDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a variant data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addVariantDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a variant is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addVariantDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a content category data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a content category is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a content category recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the content category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo, negated, options);
        return this;
    }

    /**
     * Adds a content data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a content is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a content recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the content was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentRecentlyViewedByUserFilter(sinceMinutesAgo, negated, options);
        return this;
    }

    /**
     * Adds a content has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addContentHasCategoriesFilter(negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentHasCategoriesFilter(negated, options);
        return this;
    }

    /**
     * Adds a product is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a product data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a product has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductHasCategoriesFilter(negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductHasCategoriesFilter(negated, options);
        return this;
    }

    /**
     * Adds a filter to only return products recently purchased by a company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductRecentlyPurchasedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyPurchasedByCompanyFilter(sinceMinutesAgo, companyIds, negated, options);
        return this;
    }

    /**
     * Adds a filter to only return products recently purchased by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductRecentlyPurchasedByUserCompanyFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyPurchasedByUserCompanyFilter(sinceMinutesAgo, negated, options);
        return this;
    }

    /**
     * Adds a filter to only return products recently purchased by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductRecentlyPurchasedByUserParentCompanyFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyPurchasedByUserParentCompanyFilter(sinceMinutesAgo, negated, options);
        return this;
    }

    /**
     * Adds a filter to only return products recently viewed by a company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductRecentlyViewedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyViewedByCompanyFilter(sinceMinutesAgo, companyIds, negated, options);
        return this;
    }

    /**
     * Adds a filter to only return products recently viewed by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductRecentlyViewedByUserCompanyFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyViewedByUserCompanyFilter(sinceMinutesAgo, negated, options);
        return this;
    }

    /**
     * Adds a filter to only return products recently viewed by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    public addProductRecentlyViewedByUserParentCompanyFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyViewedByUserParentCompanyFilter(sinceMinutesAgo, negated, options);
        return this;
    }

    /**
     * Adds a filter to only return products in the user's cart.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    public addProductInCartFilter(negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductInCartFilter(negated, options);
        return this;
    }

    /**
     * Resets all filters and filter builders.
     * @returns The FilterBuilder instance for chaining.
     */
    public reset(): this {
        this.filters = [];
        this.productFilterBuilder.reset();
        this.brandFilterBuilder.reset();
        this.contentFilterBuilder.reset();
        this.variantFilterBuilder.reset();
        this.companyFilterBuilder.reset();
        return this;
    }

    /**
     * Builds and combines all filters into a FilterCollection.
     * @returns The combined FilterCollection or null if no filters are set.
     */
    public build(): FilterCollection | null {
        const productFilters = this.productFilterBuilder.build();
        const brandFilters = this.brandFilterBuilder.build();
        const contentFilters = this.contentFilterBuilder.build();
        const variantFilters = this.variantFilterBuilder.build();
        const companyFilters = this.companyFilterBuilder.build();

        const combinedFilters = [
            ...(this.filters ?? []),
            ...(productFilters?.items ?? []),
            ...(brandFilters?.items ?? []),
            ...(contentFilters?.items ?? []),
            ...(variantFilters?.items ?? []),
            ...(companyFilters?.items ?? []),
        ];

        return combinedFilters.length === 0 ? null : { items: combinedFilters };
    }
}
