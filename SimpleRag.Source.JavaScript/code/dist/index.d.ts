export declare type AbandonedCartTriggerConfiguration = AbandonedCartTriggerResultTriggerConfiguration & {
    cartName?: string | null;
};

export declare interface AbandonedCartTriggerResultTriggerConfiguration {
    $type: string;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    /** @format int32 */
    withinTimeSpanMinutes: number;
    settings?: Record<string, string | null>;
    userConditions?: UserConditionCollection | null;
}

export declare type AbandonedSearchTriggerConfiguration = AbandonedSearchTriggerResultTriggerConfiguration & {
    searchTypesInPrioritizedOrder: ("Product" | "ProductCategory" | "Content")[];
    searchTermCondition?: SearchTermCondition | RetailMediaSearchTermCondition | null;
    suppressOnEntityFromSearchResultViewed: boolean;
    /** @format int32 */
    considerAbandonedAfterMinutes: number;
};

export declare interface AbandonedSearchTriggerResultTriggerConfiguration {
    $type: string;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    /** @format int32 */
    withinTimeSpanMinutes: number;
    settings?: Record<string, string | null>;
    userConditions?: UserConditionCollection | null;
}

export declare type Advertiser = AdvertiserEntityStateAdvertiserMetadataValuesRetailMediaEntity & {
    name: string;
    allowedPromotions?: PromotionSpecificationCollection | null;
    allowedLocations?: PromotionLocationCollection | null;
};

export declare interface AdvertiserAdvertiserEntityStateEntityResponse {
    $type: string;
    entities?: Advertiser[] | null;
    /** @format int32 */
    hits: number;
    hitsPerState?: {
        /** @format int32 */
        Active: number;
        /** @format int32 */
        Inactive: number;
        /** @format int32 */
        Archived: number;
    } | null;
    statistics?: Statistics | null;
}

export declare interface AdvertiserEntityStateAdvertiserMetadataValuesAdvertisersRequestSortByAdvertisersRequestEntityFiltersEntitiesRequest {
    $type: string;
    filters?: AdvertisersRequestEntityFilters | null;
    sorting?: AdvertisersRequestSortBySorting | null;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface AdvertiserEntityStateAdvertiserMetadataValuesRetailMediaEntity {
    $type: string;
    state: "Active" | "Inactive" | "Archived";
    metadata: AdvertiserMetadataValues;
    /** @format uuid */
    id?: string | null;
}

export declare type AdvertiserMetadataValues = MetadataValues & {
    /** @format date-time */
    inactivated?: string | null;
    inactivatedBy?: string | null;
    /** @format date-time */
    activated?: string | null;
    activatedBy?: string | null;
    /** @format date-time */
    archived?: string | null;
    archivedBy?: string | null;
};

export declare interface AdvertiserSaveEntitiesRequest {
    $type: string;
    entities: Advertiser[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface AdvertiserSaveEntitiesResponse {
    $type: string;
    entities?: Advertiser[] | null;
    statistics?: Statistics | null;
}

export declare type AdvertisersRequest = AdvertiserEntityStateAdvertiserMetadataValuesAdvertisersRequestSortByAdvertisersRequestEntityFiltersEntitiesRequest;

export declare type AdvertisersRequestEntityFilters = RetailMediaEntity2AdvertiserEntityStateAdvertiserMetadataValuesRetailMediaEntity2EntityFilters & {
    ids?: string[] | null;
};

export declare interface AdvertisersRequestSortBySorting {
    sortBy: "Created" | "Modified" | "Name";
    sortOrder: "Ascending" | "Descending";
}

export declare type AdvertisersResponse = AdvertiserAdvertiserEntityStateEntityResponse;

export declare type AllFilters = NonNullable<FilterCollection['items']> extends (infer U)[] ? U : never;

export declare interface AnalyzerRequest {
    $type: string;
    language?: Language | null;
    currency?: Currency | null;
    custom?: Record<string, string | null>;
}

export declare type AndCondition = UserCondition & {
    conditions?: UserConditionCollection | null;
};

export declare type AndFilter = Filter & {
    filters: (AndFilter | BrandAssortmentFilter | BrandDataFilter | BrandDataHasKeyFilter | BrandDisabledFilter | BrandIdFilter | CartDataFilter | CompanyDataFilter | CompanyDataHasKeyFilter | CompanyDisabledFilter | CompanyIdFilter | ContentAssortmentFilter | ContentCategoryAssortmentFilter | ContentCategoryDataFilter | ContentCategoryDataHasKeyFilter | ContentCategoryDisabledFilter | ContentCategoryHasAncestorFilter | ContentCategoryHasChildFilter | ContentCategoryHasContentsFilter | ContentCategoryHasParentFilter | ContentCategoryIdFilter | ContentCategoryLevelFilter | ContentCategoryRecentlyViewedByUserFilter | ContentDataFilter | ContentDataHasKeyFilter | ContentDisabledFilter | ContentHasCategoriesFilter | ContentIdFilter | ContentRecentlyViewedByUserFilter | OrFilter | ProductAndVariantIdFilter | ProductAssortmentFilter | ProductCategoryAssortmentFilter | ProductCategoryDataFilter | ProductCategoryDataHasKeyFilter | ProductCategoryDisabledFilter | ProductCategoryHasAncestorFilter | ProductCategoryHasChildFilter | ProductCategoryHasParentFilter | ProductCategoryHasProductsFilter | ProductCategoryIdFilter | ProductCategoryLevelFilter | ProductCategoryRecentlyViewedByUserFilter | ProductDataFilter | ProductDataHasKeyFilter | ProductDisabledFilter | ProductDisplayNameFilter | ProductHasCategoriesFilter | ProductHasVariantsFilter | ProductIdFilter | ProductInCartFilter | ProductListPriceFilter | ProductRecentlyPurchasedByCompanyFilter | ProductRecentlyPurchasedByUserCompanyFilter | ProductRecentlyPurchasedByUserFilter | ProductRecentlyPurchasedByUserParentCompanyFilter | ProductRecentlyViewedByCompanyFilter | ProductRecentlyViewedByUserCompanyFilter | ProductRecentlyViewedByUserFilter | ProductRecentlyViewedByUserParentCompanyFilter | ProductSalesPriceFilter | VariantAssortmentFilter | VariantDataFilter | VariantDataHasKeyFilter | VariantDisabledFilter | VariantIdFilter | VariantListPriceFilter | VariantSalesPriceFilter | VariantSpecificationFilter)[];
};

export declare interface ApplicableIndexes {
    indexes?: string[] | null;
}

export declare interface ApplicableLanguages {
    languages?: Language[] | null;
}

export declare type ApplyFilterSettings = FilterScopeSettings & {
    apply: boolean;
};

export declare interface AssortmentFacet {
    $type: string;
    assortmentFilterType: "Or";
    selected?: number[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface AssortmentFacetResult {
    $type: string;
    assortmentFilterType: "Or";
    selected?: number[] | null;
    available?: Int32AvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare type BatchedTrackingRequest = TrackingRequest & {
    items?: (BrandAdministrativeAction | BrandUpdate | BrandView | Cart | CompanyAdministrativeAction | CompanyUpdate | ContentAdministrativeAction | ContentCategoryAdministrativeAction | ContentCategoryUpdate | ContentCategoryView | ContentUpdate | ContentView | Order | ProductAdministrativeAction | ProductCategoryAdministrativeAction | ProductCategoryUpdate | ProductCategoryView | ProductUpdate | ProductView | SearchTerm | UserUpdate)[] | null;
};

export declare interface BooleanAvailableFacetValue {
    value: boolean;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare interface BooleanBooleanValueFacetResult {
    $type: string;
    selected?: boolean[] | null;
    available?: BooleanAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare class BooleanCollectionDataValue extends DataValueBase<CollectionWithType<boolean>> {
    constructor(value: boolean[]);
    readonly isCollection = true;
}

export declare interface BooleanContentDataValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: boolean[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface BooleanContentDataValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: boolean[] | null;
    available?: BooleanAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface BooleanDataObjectValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: boolean[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface BooleanDataObjectValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: boolean[] | null;
    available?: BooleanAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare class BooleanDataValue extends DataValueBase<boolean> {
    constructor(value: boolean);
    readonly isCollection = false;
}

export declare interface BooleanProductCategoryDataValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: boolean[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface BooleanProductCategoryDataValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: boolean[] | null;
    available?: BooleanAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface BooleanProductDataValueFacet {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: boolean[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface BooleanProductDataValueFacetResult {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: boolean[] | null;
    available?: BooleanAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface BooleanValueFacet {
    $type: string;
    selected?: boolean[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare type BoostAndBuryRule = MerchandisingRule & {
    multiplierSelector?: DataDoubleSelector | FixedDoubleValueSelector | null;
};

export declare interface Brand {
    id: string;
    displayName?: string | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
}

export declare type BrandAdministrativeAction = Trackable & {
    filters: FilterCollection;
    language?: Language | null;
    kind: "Disable" | "Enable" | "Delete";
    currency?: Currency | null;
};

export declare type BrandAssortmentFilter = Filter & {
    assortments: number[];
};

export declare type BrandDataFilter = DataFilter;

export declare type BrandDataHasKeyFilter = Filter & {
    key: string;
};

export declare type BrandDetailsCollectionResponse = TimedResponse & {
    brands?: BrandResultDetails[] | null;
    /** @format int32 */
    totalNumberOfResults?: number | null;
};

export declare type BrandDisabledFilter = Filter;

export declare type BrandFacet = StringValueFacet;

export declare type BrandFacetResult = StringBrandNameAndIdResultValueFacetResult;

export declare class BrandFilterBuilder extends FilterBuilderBase<BrandFilterBuilder> {
    constructor();
    /**
     * Adds a brand assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified brands.
     * @param brandIds - Array of brand IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandIdFilter(brandIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out brands without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a brand has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand is disabled filter to the request. Only works for brand queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The BrandFilterBuilder instance for chaining.
     */
    addBrandDisabledFilter(negated?: boolean, options?: FilterOptions): this;
}

export declare type BrandIdFilter = Filter & {
    brandIds?: string[] | null;
};

export declare type BrandIdRelevanceModifier = RelevanceModifier & {
    brandId?: string | null;
    /** @format double */
    ifProductIsBrandMultiplyWeightBy: number;
    /** @format double */
    ifProductIsNotBrandMultiplyWeightBy: number;
};

export declare interface BrandIndexConfiguration {
    id?: FieldIndexConfiguration | null;
    displayName?: FieldIndexConfiguration | null;
}

export declare interface BrandNameAndIdResult {
    id?: string | null;
    displayName?: string | null;
}

export declare interface BrandNameAndIdResultAvailableFacetValue {
    value?: BrandNameAndIdResult | null;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare type BrandQuery = LicensedRequest & {
    filters: FilterCollection;
    /** @format int32 */
    numberOfResults: number;
    language?: Language | null;
    currency?: Currency | null;
    /** @format int32 */
    skipNumberOfResults: number;
    returnTotalNumberOfResults: boolean;
    includeDisabledBrands: boolean;
};

export declare interface BrandRecommendationRequest {
    $type: string;
    settings: BrandRecommendationRequestSettings;
    language?: Language | null;
    user?: User | null;
    relevanceModifiers: RelevanceModifierCollection;
    filters: FilterCollection;
    displayedAtLocationType: string;
    currency?: Currency | null;
    /** @deprecated */
    channel?: Channel | null;
    custom?: Record<string, string | null>;
}

export declare interface BrandRecommendationRequestSettings {
    /** @format int32 */
    numberOfRecommendations: number;
    allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
    allowReplacingOfRecentlyShownRecommendations: boolean;
    prioritizeDiversityBetweenRequests: boolean;
    selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
    custom?: Record<string, string>;
    /** @format int32 */
    prioritizeResultsNotRecommendedWithinSeconds?: number | null;
}

export declare type BrandRecommendationResponse = RecommendationResponse & {
    recommendations?: BrandResult[] | null;
};

export declare interface BrandRecommendationWeights {
    /** @format double */
    brandViews: number;
    /** @format double */
    productViews: number;
    /** @format double */
    productPurchases: number;
}

export declare interface BrandResult {
    id?: string | null;
    displayName?: string | null;
    /** @format int32 */
    rank: number;
    viewedByUser?: ViewedByUserInfo | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    custom?: Record<string, string | null>;
}

export declare interface BrandResultDetails {
    brandId?: string | null;
    displayName?: string | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    viewedByUser?: ViewedByUserInfo | null;
    /** @format date-time */
    createdUtc: string;
    /** @format date-time */
    lastViewedUtc?: string | null;
    /** @format int64 */
    viewedTotalNumberOfTimes: number;
    /** @format int32 */
    viewedByDifferentNumberOfUsers: number;
    disabled: boolean;
    custom?: Record<string, string | null>;
    /** @format int32 */
    purchasedFromByDifferentNumberOfUsers: number;
    purchasedByUser?: PurchasedByUserInfo | null;
}

export declare class BrandSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: BrandRecommendationRequestSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the brand to be returned, by default only the brand id is returned.
     * @param brandProperties
     */
    setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings> | null): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
}

export declare interface BrandsRecommendationBuilder<TRequest = BrandRecommendationRequest> {
    build(): TRequest;
}

export declare type BrandUpdate = Trackable & {
    brand?: Brand | null;
    kind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export declare type BrandView = Trackable & {
    user?: User | null;
    brand: Brand;
    /** @deprecated */
    channel?: Channel | null;
};

export declare interface Budget {
    $type: string;
    /** @format double */
    maxTotalCost?: number | null;
    /** @format double */
    totalCost: number;
}

export declare type ByHitsFacetSorting = FacetSorting;

export declare class BySingleProductRecommendationBuilder extends ProductSettingsRecommendationBuilder {
    protected productAndVariantId: ProductAndVariantId | null;
    constructor(settings: Settings);
    product(product: {
        productId: string;
        variantId?: string;
    }): this;
}

export declare type Campaign = CampaignEntityStateCampaignMetadataValuesRetailMediaEntity & {
    name: string;
    schedule?: ISchedule | null;
    promotions: PromotionCollection;
    /** @format uuid */
    advertiserId: string;
    budget: CPMBudget;
    status: CampaignStatusWithHistory;
    conditions?: CampaignCampaignConditions | null;
};

export declare interface CampaignAnalytics {
    products?: CampaignAnalyticsProductAnalytics | null;
}

export declare interface CampaignAnalyticsProductAnalytics {
    timeSeries?: CampaignAnalyticsProductAnalyticsPeriodMetrics[] | null;
    /** @format int32 */
    promotions: number;
    promotedProducts?: CampaignAnalyticsProductAnalyticsPromotedProductMetrics[] | null;
}

export declare interface CampaignAnalyticsProductAnalyticsPeriodMetrics {
    /** @format date-time */
    periodFromUtc: string;
    /** @format int32 */
    views: number;
    /** @format int32 */
    salesQuantity: number;
    currencies?: CampaignAnalyticsProductAnalyticsPeriodMetricsCurrencyMetrics[] | null;
}

export declare interface CampaignAnalyticsProductAnalyticsPeriodMetricsCurrencyMetrics {
    currency?: string | null;
    /** @format double */
    revenue: number;
}

export declare interface CampaignAnalyticsProductAnalyticsPromotedProductMetrics {
    productId?: string | null;
    /** @format int32 */
    promotions: number;
}

export declare type CampaignAnalyticsRequest = LicensedRequest & {
    /** @format uuid */
    id: string;
    periodUtc: DateTimeRange;
    filters?: FilterCollection | null;
};

export declare type CampaignAnalyticsResponse = TimedResponse & {
    analytics?: CampaignAnalytics | null;
};

export declare type CampaignCampaignConditions = RetailMediaConditions & {
    searchTerm?: RetailMediaSearchTermConditionCollection | null;
};

export declare interface CampaignCampaignEntityStateEntityResponse {
    $type: string;
    entities?: Campaign[] | null;
    /** @format int32 */
    hits: number;
    hitsPerState?: {
        /** @format int32 */
        Proposed: number;
        /** @format int32 */
        Approved: number;
        /** @format int32 */
        Archived: number;
    } | null;
    statistics?: Statistics | null;
}

export declare interface CampaignEntityStateCampaignMetadataValuesCampaignsRequestSortByCampaignsRequestEntityFiltersEntitiesRequest {
    $type: string;
    filters?: CampaignsRequestEntityFilters | null;
    sorting?: CampaignsRequestSortBySorting | null;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface CampaignEntityStateCampaignMetadataValuesRetailMediaEntity {
    $type: string;
    state: "Proposed" | "Approved" | "Archived";
    metadata: CampaignMetadataValues;
    /** @format uuid */
    id?: string | null;
}

export declare type CampaignMetadataValues = MetadataValues & {
    /** @format date-time */
    proposed?: string | null;
    proposedBy?: string | null;
    /** @format date-time */
    approved?: string | null;
    approvedBy?: string | null;
    /** @format date-time */
    archived?: string | null;
    archivedBy?: string | null;
};

export declare interface CampaignSaveEntitiesRequest {
    $type: string;
    entities: Campaign[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface CampaignSaveEntitiesResponse {
    $type: string;
    entities?: Campaign[] | null;
    statistics?: Statistics | null;
}

export declare type CampaignsRequest = CampaignEntityStateCampaignMetadataValuesCampaignsRequestSortByCampaignsRequestEntityFiltersEntitiesRequest;

export declare type CampaignsRequestEntityFilters = RetailMediaEntity2CampaignEntityStateCampaignMetadataValuesRetailMediaEntity2EntityFilters & {
    ids?: string[] | null;
    advertiserIds?: string[] | null;
};

export declare interface CampaignsRequestSortBySorting {
    sortBy: "Created" | "Modified" | "Name";
    sortOrder: "Ascending" | "Descending";
}

export declare type CampaignsResponse = CampaignCampaignEntityStateEntityResponse;

export declare interface CampaignStatusWithHistory {
    current: "Active" | "Inactive" | "ScheduleCompleted" | "BudgetReached";
    history: CampaignStatusWithHistoryChange[];
}

export declare interface CampaignStatusWithHistoryChange {
    /** @format date-time */
    utcTime: string;
    status: "Active" | "Inactive" | "ScheduleCompleted" | "BudgetReached";
}

export declare type Cart = Trackable & {
    user?: User | null;
    name?: string | null;
    subtotal?: Money | null;
    lineItems?: LineItem[] | null;
    data?: Record<string, DataValue>;
    /** @deprecated */
    channel?: Channel | null;
};

export declare type CartDataFilter = Filter & {
    key: string;
    filterOutIfKeyIsNotFound: boolean;
    mustMatchAllConditions: boolean;
    conditions?: ValueConditionCollection | null;
    language?: Language | null;
    currency?: Currency | null;
};

export declare interface CartDetails {
    name?: string | null;
    /** @format date-time */
    modifiedUtc: string;
    lineItems?: LineItem[] | null;
    subtotal?: Money | null;
    data?: Record<string, DataValue>;
}

export declare interface Category {
    $type: string;
    id?: string | null;
    displayName?: Multilingual | null;
    categoryPaths?: CategoryPath[] | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    custom?: Record<string, string | null>;
}

export declare interface CategoryAdministrativeAction {
    $type: string;
    filters: FilterCollection;
    language?: Language | null;
    kind: "Disable" | "Enable" | "Delete";
    currency?: Currency | null;
    custom?: Record<string, string | null>;
}

export declare type CategoryFacet = StringValueFacet & {
    categorySelectionStrategy: "ImmediateParent" | "Ancestors" | "Descendants";
};

export declare type CategoryFacetResult = StringCategoryNameAndIdResultValueFacetResult & {
    categorySelectionStrategy: "ImmediateParent" | "Ancestors" | "Descendants";
};

export declare type CategoryHierarchyFacet = CategoryPathValueFacet & {
    categorySelectionStrategy: "ImmediateParent" | "Ancestors" | "Descendants";
    selectedPropertiesSettings?: SelectedContentCategoryPropertiesSettings | SelectedProductCategoryPropertiesSettings | null;
};

export declare type CategoryHierarchyFacetResult = FacetResult & {
    categorySelectionStrategy: "ImmediateParent" | "Ancestors" | "Descendants";
    nodes: CategoryHierarchyFacetResultCategoryNode[];
};

export declare interface CategoryHierarchyFacetResultCategoryNode {
    category: ContentCategoryResult | ProductCategoryResult;
    /** @format int32 */
    hits: number;
    parentId?: string | null;
    children?: CategoryHierarchyFacetResultCategoryNode[] | null;
    selected: boolean;
}

export declare interface CategoryIdFilter {
    $type: string;
    categoryIds?: string[] | null;
    evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor";
    negated: boolean;
    custom?: Record<string, string>;
    settings?: FilterSettings | null;
}

export declare interface CategoryIndexConfiguration {
    $type: string;
    unspecified?: CategoryIndexConfigurationEntry | null;
}

export declare interface CategoryIndexConfigurationEntry {
    id?: FieldIndexConfiguration | null;
    displayName?: FieldIndexConfiguration | null;
    data?: DataIndexConfiguration | null;
}

export declare interface CategoryLevelFilter {
    $type: string;
    levels?: number[] | null;
    negated: boolean;
    custom?: Record<string, string>;
    settings?: FilterSettings | null;
}

export declare interface CategoryNameAndId {
    id: string;
    displayName?: Multilingual | null;
}

export declare interface CategoryNameAndIdResult {
    id?: string | null;
    displayName?: string | null;
}

export declare interface CategoryNameAndIdResultAvailableFacetValue {
    value?: CategoryNameAndIdResult | null;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare interface CategoryPath {
    breadcrumbPathStartingFromRoot: CategoryNameAndId[];
}

export declare interface CategoryPathResult {
    pathFromRoot?: CategoryNameAndIdResult[] | null;
    /** @format int32 */
    rank: number;
}

export declare interface CategoryPathResultDetails {
    breadcrumbPathStartingFromRoot?: CategoryNameAndId[] | null;
}

export declare interface CategoryPathValueFacet {
    $type: string;
    selected?: CategoryPath[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface CategoryResult {
    $type: string;
    categoryId?: string | null;
    displayName?: string | null;
    /** @format int32 */
    rank: number;
    viewedByUser?: ViewedByUserInfo | null;
    paths?: CategoryPathResult[] | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    custom?: Record<string, string | null>;
}

export declare interface CategoryUpdate {
    $type: string;
    kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
    custom?: Record<string, string | null>;
}

export declare interface Channel {
    name: string;
    subChannel?: Channel | null;
}

export declare type ClearTextParser = Parser;

export declare interface CollectionWithType<T> {
    $type: string;
    $values: T[];
}

export declare interface Company {
    id: string;
    parent?: Company | null;
    data?: Record<string, DataValue>;
}

export declare type CompanyAdministrativeAction = Trackable & {
    filters: FilterCollection;
    language?: Language | null;
    kind: "Disable" | "Enable" | "Delete";
    currency?: Currency | null;
};

export declare type CompanyDataFilter = DataFilter;

export declare type CompanyDataHasKeyFilter = Filter & {
    key: string;
};

export declare type CompanyDisabledFilter = Filter;

export declare class CompanyFilterBuilder extends FilterBuilderBase<CompanyFilterBuilder> {
    constructor();
    /**
     * Filters the request to only return the specified companies.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    addCompanyIdFilter(companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a company data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out companies without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    addCompanyDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a company has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    addCompanyDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a company is disabled filter to the request. Only works for company queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The CompanyFilterBuilder instance for chaining.
     */
    addCompanyDisabledFilter(negated?: boolean, options?: FilterOptions): this;
}

export declare type CompanyIdFilter = Filter & {
    companyIds: string[];
};

export declare type CompanyUpdate = Trackable & {
    company: Company;
    kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
    parents?: Company[] | null;
    replaceExistingParents: boolean;
};

export declare class ConditionBuilder {
    conditions: Conditions[];
    addContainsCondition<T>(value: DataValueBase<T>, valueCollectionEvaluationMode?: 'All' | 'Any', negated?: boolean): this;
    addDistinctCondition(numberOfOccurrencesAllowedWithTheSameValue: number, negated?: boolean): this;
    addEqualsCondition<T>(value: DataValueBase<T>, negated?: boolean): this;
    addGreaterThanCondition(value: number, negated?: boolean): this;
    addLessThanCondition(value: number, negated?: boolean): this;
    addDataObjectCondition(conditions: (builder: DataObjectFilterConditionBuilder) => void, skip?: number, take?: number, negated?: boolean): this;
    addHasValueCondition(negated?: boolean): this;
    addRelativeDateTimeCondition(comparison: 'Before' | 'After', unit: 'UnixMilliseconds' | 'UnixSeconds' | 'UnixMinutes', currentTimeOffset?: number, negated?: boolean): this;
    build(): ValueConditionCollection | null;
}

export declare interface ConditionConfiguration {
    user?: UserConditionConfiguration | null;
    input?: InputConditionConfiguration | null;
    target?: TargetConditionConfiguration | null;
    context?: ContextConditionConfiguration | null;
}

export declare type Conditions = ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition | HasValueCondition | RelativeDateTimeCondition;

export declare type Constructor<T> = new () => T;

export declare type ContainsCondition = ValueCondition & {
    value?: DataValue | null;
    valueCollectionEvaluationMode: "All" | "Any";
    objectFilter?: DataObjectFilter | null;
};

export declare interface Content {
    id: string;
    displayName?: Multilingual | null;
    categoryPaths?: CategoryPath[] | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    custom?: Record<string, string>;
}

export declare type ContentAdministrativeAction = Trackable & {
    filters: FilterCollection;
    language?: Language | null;
    kind: "DisableInRecommendations" | "Disable" | "EnableInRecommendations" | "Enable" | "PermanentlyDelete" | "Delete";
    currency?: Currency | null;
};

export declare type ContentAssortmentFacet = AssortmentFacet;

export declare type ContentAssortmentFacetResult = AssortmentFacetResult;

export declare type ContentAssortmentFilter = Filter & {
    assortments: number[];
};

export declare type ContentAttributeSorting = ContentSorting & {
    attribute: "Id" | "DisplayName";
    mode: "Auto" | "Alphabetical" | "Numerical";
};

export declare interface ContentCategoriesRecommendationBuilder<TRequest = ContentCategoryRecommendationRequest> {
    build(): TRequest;
}

export declare class ContentCategoriesRecommendationCollectionBuilder {
    private requests;
    private distinctCategoriesAcrossResults;
    addRequest(request: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)): this;
    requireDistinctCategoriesAcrossResults(distinctCategoriesAcrossResults?: boolean): this;
    build(): ContentCategoryRecommendationRequestCollection;
}

export declare type ContentCategory = Category;

export declare type ContentCategoryAdministrativeAction = CategoryAdministrativeAction;

export declare type ContentCategoryAssortmentFilter = Filter & {
    assortments: number[];
};

export declare type ContentCategoryDataFilter = DataFilter;

export declare type ContentCategoryDataHasKeyFilter = Filter & {
    key: string;
};

export declare type ContentCategoryDataRelevanceModifier = DataRelevanceModifier;

export declare type ContentCategoryDetailsCollectionResponse = TimedResponse & {
    categories?: ContentCategoryResultDetails[] | null;
    /** @format int32 */
    totalNumberOfResults?: number | null;
};

export declare type ContentCategoryDisabledFilter = Filter;

export declare type ContentCategoryHasAncestorFilter = HasAncestorCategoryFilter;

export declare type ContentCategoryHasChildFilter = HasChildCategoryFilter;

export declare type ContentCategoryHasContentsFilter = Filter;

export declare type ContentCategoryHasParentFilter = HasParentCategoryFilter;

export declare type ContentCategoryIdFilter = CategoryIdFilter;

export declare interface ContentCategoryIdFilterCategoryQuery {
    $type: string;
    filters: FilterCollection;
    /** @format int32 */
    numberOfResults: number;
    language?: Language | null;
    currency?: Currency | null;
    /** @format int32 */
    skipNumberOfResults: number;
    returnTotalNumberOfResults: boolean;
    includeDisabledCategories: boolean;
    /** @format int32 */
    includeChildCategoriesToDepth: number;
    /** @format int32 */
    includeParentCategoriesToDepth: number;
    custom?: Record<string, string | null>;
}

export declare type ContentCategoryInterestTriggerConfiguration = ContentCategoryInterestTriggerResultTriggerConfiguration & {
    categoryViews?: Int32NullableRange | null;
    contentViews?: Int32NullableRange | null;
    filters?: FilterCollection | null;
};

export declare interface ContentCategoryInterestTriggerResultTriggerConfiguration {
    $type: string;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    /** @format int32 */
    withinTimeSpanMinutes: number;
    settings?: Record<string, string | null>;
    userConditions?: UserConditionCollection | null;
}

export declare type ContentCategoryLevelFilter = CategoryLevelFilter;

export declare type ContentCategoryQuery = ContentCategoryIdFilterCategoryQuery;

export declare type ContentCategoryRecentlyViewedByUserFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ContentCategoryRecentlyViewedByUserRelevanceModifier = RecentlyViewedByUserRelevanceModifier;

export declare interface ContentCategoryRecommendationRequest {
    $type: string;
    settings: ContentCategoryRecommendationRequestSettings;
    language?: Language | null;
    user?: User | null;
    relevanceModifiers: RelevanceModifierCollection;
    filters: FilterCollection;
    displayedAtLocationType: string;
    currency?: Currency | null;
    /** @deprecated */
    channel?: Channel | null;
    custom?: Record<string, string | null>;
}

export declare type ContentCategoryRecommendationRequestCollection = LicensedRequest & {
    requests?: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)[] | null;
    requireDistinctCategoriesAcrossResults: boolean;
};

export declare interface ContentCategoryRecommendationRequestSettings {
    /** @format int32 */
    numberOfRecommendations: number;
    allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
    allowReplacingOfRecentlyShownRecommendations: boolean;
    prioritizeDiversityBetweenRequests: boolean;
    selectedContentCategoryProperties?: SelectedContentCategoryPropertiesSettings | null;
    custom?: Record<string, string | null>;
    /** @format int32 */
    prioritizeResultsNotRecommendedWithinSeconds?: number | null;
}

export declare type ContentCategoryRecommendationResponse = RecommendationResponse & {
    recommendations?: ContentCategoryResult[] | null;
};

export declare type ContentCategoryRecommendationResponseCollection = TimedResponse & {
    responses?: ContentCategoryRecommendationResponse[] | null;
};

export declare interface ContentCategoryRecommendationWeights {
    /** @format double */
    categoryViews: number;
    /** @format double */
    contentViews: number;
}

export declare type ContentCategoryResult = CategoryResult;

export declare type ContentCategoryResultDetails = ContentCategoryResultDetailsCategoryResultDetails;

export declare interface ContentCategoryResultDetailsCategoryResultDetails {
    $type: string;
    categoryId?: string | null;
    displayName?: Multilingual | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    viewedByUser?: ViewedByUserInfo | null;
    /** @format date-time */
    createdUtc: string;
    /** @format date-time */
    lastViewedUtc?: string | null;
    /** @format int64 */
    viewedTotalNumberOfTimes: number;
    /** @format int32 */
    viewedByDifferentNumberOfUsers: number;
    disabled: boolean;
    custom?: Record<string, string | null>;
    childCategories?: ContentCategoryResultDetails[] | null;
    parentCategories?: ContentCategoryResultDetails[] | null;
}

export declare type ContentCategorySearchRequest = PaginatedSearchRequest & {
    term: string;
    settings?: ContentCategorySearchSettings | null;
};

export declare type ContentCategorySearchResponse = PaginatedSearchResponse;

export declare type ContentCategorySearchSettings = SearchSettings & {
    /** @format int32 */
    numberOfRecommendations?: number | null;
    onlyIncludeRecommendationsForEmptyResults?: boolean | null;
};

export declare class ContentCategorySettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ContentCategoryRecommendationRequestSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the content category to be returned, by default only the content category id is returned.
     * @param contentCategoryProperties
     */
    setSelectedContentCategoryProperties(contentCategoryProperties: Partial<SelectedContentCategoryPropertiesSettings> | null): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
}

export declare type ContentCategoryUpdate = CategoryUpdate & {
    category?: ContentCategory | null;
};

export declare type ContentCategoryView = Trackable & {
    user?: User | null;
    idPath: string[];
    /** @deprecated */
    channel?: Channel | null;
};

export declare interface ContentContentHighlightPropsHighlightSettings {
    $type: string;
    enabled: boolean;
    limit: HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits;
    highlightable: ContentHighlightProps;
    shape: HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape;
}

export declare type ContentDataBooleanValueFacet = BooleanContentDataValueFacet;

export declare type ContentDataBooleanValueFacetResult = BooleanContentDataValueFacetResult;

export declare type ContentDataDoubleRangeFacet = DoubleNullableContentDataRangeFacet;

export declare type ContentDataDoubleRangeFacetResult = DoubleNullableContentDataRangeFacetResult;

export declare type ContentDataDoubleRangesFacet = DoubleNullableContentDataRangesFacet;

export declare type ContentDataDoubleRangesFacetResult = DoubleNullableContentDataRangesFacetResult;

export declare type ContentDataDoubleValueFacet = DoubleContentDataValueFacet;

export declare type ContentDataDoubleValueFacetResult = DoubleContentDataValueFacetResult;

export declare type ContentDataFilter = DataFilter;

export declare type ContentDataHasKeyFilter = Filter & {
    key: string;
};

export declare type ContentDataIntegerValueFacet = Int32ContentDataValueFacet;

export declare type ContentDataIntegerValueFacetResult = Int32ContentDataValueFacetResult;

export declare type ContentDataObjectFacet = DataObjectFacet;

export declare type ContentDataObjectFacetResult = DataObjectFacetResult;

export declare type ContentDataRelevanceModifier = DataRelevanceModifier;

export declare type ContentDataSorting = ContentSorting & {
    key?: string | null;
    mode: "Auto" | "Alphabetical" | "Numerical";
};

export declare type ContentDataStringValueFacet = StringContentDataValueFacet;

export declare type ContentDataStringValueFacetResult = StringContentDataValueFacetResult;

export declare type ContentDetailsCollectionResponse = TimedResponse & {
    contents?: ContentResultDetails[] | null;
    /** @format int32 */
    totalNumberOfResults?: number | null;
};

export declare type ContentDisabledFilter = Filter;

export declare type ContentFacetQuery = FacetQuery & {
    items: (ContentAssortmentFacet | ProductAssortmentFacet | ProductCategoryAssortmentFacet | BrandFacet | CategoryFacet | CategoryHierarchyFacet | ContentDataObjectFacet | ContentDataDoubleRangeFacet | ContentDataDoubleRangesFacet | ContentDataStringValueFacet | ContentDataBooleanValueFacet | ContentDataDoubleValueFacet | ContentDataIntegerValueFacet | DataObjectFacet | DataObjectDoubleRangeFacet | DataObjectDoubleRangesFacet | DataObjectStringValueFacet | DataObjectBooleanValueFacet | DataObjectDoubleValueFacet | PriceRangeFacet | PriceRangesFacet | ProductCategoryDataObjectFacet | ProductCategoryDataDoubleRangeFacet | ProductCategoryDataDoubleRangesFacet | ProductCategoryDataStringValueFacet | ProductCategoryDataBooleanValueFacet | ProductCategoryDataDoubleValueFacet | ProductDataObjectFacet | ProductDataDoubleRangeFacet | ProductDataDoubleRangesFacet | ProductDataStringValueFacet | ProductDataBooleanValueFacet | ProductDataDoubleValueFacet | ProductDataIntegerValueFacet | RecentlyPurchasedFacet | VariantSpecificationFacet)[];
};

export declare interface ContentFacetResult {
    items?: (ProductAssortmentFacetResult | ContentAssortmentFacetResult | ProductCategoryAssortmentFacetResult | BrandFacetResult | CategoryFacetResult | CategoryHierarchyFacetResult | ContentDataObjectFacetResult | ContentDataDoubleRangeFacetResult | ContentDataDoubleRangesFacetResult | ContentDataStringValueFacetResult | ContentDataBooleanValueFacetResult | ContentDataDoubleValueFacetResult | ContentDataIntegerValueFacetResult | DataObjectFacetResult | DataObjectDoubleRangeFacetResult | DataObjectDoubleRangesFacetResult | DataObjectStringValueFacetResult | DataObjectBooleanValueFacetResult | DataObjectDoubleValueFacetResult | PriceRangeFacetResult | PriceRangesFacetResult | ProductCategoryDataObjectFacetResult | ProductCategoryDataDoubleRangeFacetResult | ProductCategoryDataDoubleRangesFacetResult | ProductCategoryDataStringValueFacetResult | ProductCategoryDataBooleanValueFacetResult | ProductCategoryDataDoubleValueFacetResult | ProductDataObjectFacetResult | ProductDataDoubleRangeFacetResult | ProductDataDoubleRangesFacetResult | ProductDataStringValueFacetResult | ProductDataBooleanValueFacetResult | ProductDataDoubleValueFacetResult | ProductDataIntegerValueFacetResult | RecentlyPurchasedFacetResult | VariantSpecificationFacetResult)[] | null;
}

export declare class ContentFilterBuilder extends FilterBuilderBase<ContentFilterBuilder> {
    constructor();
    /**
     * Adds a content assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return contents within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified contents.
     * @param contentIds - Array of content IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentIdFilter(contentIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryLevelFilter(levels: number | number[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryHasParentFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryHasChildFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryHasAncestorFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has contents filter to the request ensuring that only categories with content in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryHasContentsFilter(negated?: boolean, options?: FilterOptions): this;
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
    addContentCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
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
    addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a content category has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return content categories recently viewed by the user.
     * @param sinceMinutesAgo - Time in minutes since the category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return content recently viewed by the user.
     * @param sinceMinutesAgo - Time in minutes since the content was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ContentFilterBuilder instance for chaining.
     */
    addContentHasCategoriesFilter(negated?: boolean, options?: FilterOptions): this;
}

export declare type ContentHasCategoriesFilter = Filter;

export declare class ContentHighlightingBuilder {
    private enabledState;
    private highlightable;
    private limit;
    private shape;
    enabled(enabled: boolean): this;
    setHighlightable(highlightable: {
        displayName?: boolean;
        dataKeys?: string[] | null;
    }): this;
    setLimit(limit: HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits): this;
    setShape(shape: HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape): this;
    build(): ContentSearchSettingsHighlightSettings;
}

export declare interface ContentHighlightProperties {
    $type: string;
    displayName: boolean;
    dataKeys?: string[] | null;
}

export declare type ContentHighlightProps = ContentHighlightProperties;

export declare type ContentIdFilter = Filter & {
    contentIds: string[];
};

export declare interface ContentIndexConfiguration {
    id?: FieldIndexConfiguration | null;
    displayName?: FieldIndexConfiguration | null;
    category?: CategoryIndexConfiguration | ProductCategoryIndexConfiguration | null;
    data?: DataIndexConfiguration | null;
}

export declare type ContentPopularitySorting = ContentSorting;

export declare type ContentQuery = LicensedRequest & {
    filters: FilterCollection;
    /** @format int32 */
    numberOfResults: number;
    language?: Language | null;
    currency?: Currency | null;
    /** @format int32 */
    skipNumberOfResults: number;
    returnTotalNumberOfResults: boolean;
    includeDisabledContents: boolean;
};

export declare type ContentRecentlyViewedByUserFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ContentRecentlyViewedByUserRelevanceModifier = RecentlyViewedByUserRelevanceModifier;

export declare interface ContentRecommendationRequest {
    $type: string;
    settings: ContentRecommendationRequestSettings;
    language?: Language | null;
    user?: User | null;
    relevanceModifiers: RelevanceModifierCollection;
    filters: FilterCollection;
    displayedAtLocationType: string;
    currency?: Currency | null;
    /** @deprecated */
    channel?: Channel | null;
    custom?: Record<string, string | null>;
}

export declare type ContentRecommendationRequestCollection = LicensedRequest & {
    requests?: (ContentsViewedAfterViewingContentRequest | ContentsViewedAfterViewingMultipleContentsRequest | ContentsViewedAfterViewingMultipleProductsRequest | ContentsViewedAfterViewingProductRequest | PersonalContentRecommendationRequest | PopularContentsRequest)[] | null;
    requireDistinctContentsAcrossResults: boolean;
};

export declare interface ContentRecommendationRequestSettings {
    /** @format int32 */
    numberOfRecommendations: number;
    allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
    allowReplacingOfRecentlyShownRecommendations: boolean;
    selectedContentProperties?: SelectedContentPropertiesSettings | null;
    custom?: Record<string, string>;
    prioritizeDiversityBetweenRequests: boolean;
    /** @format int32 */
    prioritizeResultsNotRecommendedWithinSeconds?: number | null;
}

export declare type ContentRecommendationResponse = RecommendationResponse & {
    recommendations?: ContentResult[] | null;
};

export declare type ContentRecommendationResponseCollection = TimedResponse & {
    responses?: ContentRecommendationResponse[] | null;
};

export declare type ContentRelevanceSorting = ContentSorting;

export declare interface ContentResult {
    contentId?: string | null;
    displayName?: string | null;
    /** @format int32 */
    rank: number;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    categoryPaths?: CategoryPathResult[] | null;
    viewedByUser?: ViewedByUserInfo | null;
    custom?: Record<string, string | null>;
    highlight?: HighlightResult | null;
}

export declare interface ContentResultDetails {
    contentId?: string | null;
    displayName?: Multilingual | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    categoryPaths?: CategoryPathResultDetails[] | null;
    viewedByUser?: ViewedByUserInfo | null;
    /** @format date-time */
    createdUtc: string;
    /** @format date-time */
    lastViewedUtc?: string | null;
    /** @format int64 */
    viewedTotalNumberOfTimes: number;
    /** @format int32 */
    viewedByDifferentNumberOfUsers: number;
    disabled: boolean;
    deleted: boolean;
    custom?: Record<string, string | null>;
}

export declare class ContentSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder;
    private paginationBuilder;
    private sortingBuilder;
    private term;
    private highlightingBuilder;
    private searchSettings;
    constructor(settings: Settings);
    setContentProperties(contentProperties: Partial<SelectedContentPropertiesSettings>): this;
    setRecommendationSettings(settings: RecommendationSettings): this;
    setTerm(term: string | null | undefined): this;
    pagination(paginate: (pagination: PaginationBuilder) => void): this;
    facets(facets: (pagination: FacetBuilder) => void): this;
    sorting(sorting: (sortingBuilder: ContentSortingBuilder) => void): this;
    highlighting(highlightingBuilder: (highlightingBuilder: ContentHighlightingBuilder) => void): this;
    build(): ContentSearchRequest;
}

export declare type ContentSearchRequest = PaginatedSearchRequest & {
    term?: string | null;
    facets?: ContentFacetQuery | null;
    settings?: ContentSearchSettings | null;
    sorting?: ContentSortBySpecification | null;
};

export declare type ContentSearchResponse = PaginatedSearchResponse & {
    results?: ContentResult[] | null;
    facets?: ContentFacetResult | null;
    recommendations?: ContentResult[] | null;
};

export declare type ContentSearchSettings = SearchSettings & {
    selectedContentProperties?: SelectedContentPropertiesSettings | null;
    recommendations: RecommendationSettings;
    highlight?: ContentSearchSettingsHighlightSettings | null;
};

export declare type ContentSearchSettingsHighlightSettings = ContentContentHighlightPropsHighlightSettings;

export declare class ContentSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ContentRecommendationRequestSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the content to be returned, by default only the content id is returned.
     * @param contentProperties
     */
    setSelectedContentProperties(contentProperties: Partial<SelectedContentPropertiesSettings> | null): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
}

export declare interface ContentSortBySpecification {
    value?: ContentAttributeSorting | ContentDataSorting | ContentPopularitySorting | ContentRelevanceSorting | null;
}

export declare interface ContentSorting {
    $type: string;
    order: "Ascending" | "Descending";
    thenBy?: ContentAttributeSorting | ContentDataSorting | ContentPopularitySorting | ContentRelevanceSorting | null;
}

export declare class ContentSortingBuilder {
    private value;
    sortByContentData(key: string, order?: 'Ascending' | 'Descending', mode?: 'Auto' | 'Alphabetical' | 'Numerical', thenBy?: (thenBy: ContentSortingBuilder) => void): void;
    sortByContentRelevance(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ContentSortingBuilder) => void): void;
    sortByContentPopularity(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ContentSortingBuilder) => void): void;
    sortByContentAttribute(attribute: 'Id' | 'DisplayName', order: 'Ascending' | 'Descending', mode?: 'Auto' | 'Alphabetical' | 'Numerical', thenBy?: (thenBy: ContentSortingBuilder) => void): void;
    private thenBy;
    build(): ContentSortBySpecification | null;
}

export declare interface ContentsRecommendationBuilder<TRequest = ContentRecommendationRequest> {
    build(): TRequest;
}

export declare class ContentsRecommendationCollectionBuilder {
    private requests;
    private distinctContentsAcrossResults;
    addRequest(request: ContentsViewedAfterViewingContentRequest | ContentsViewedAfterViewingMultipleContentsRequest | ContentsViewedAfterViewingMultipleProductsRequest | ContentsViewedAfterViewingProductRequest | PersonalContentRecommendationRequest | PopularContentsRequest): this;
    requireDistinctContentsAcrossResults(distinctContentsAcrossResults?: boolean): this;
    build(): ContentRecommendationRequestCollection;
}

export declare class ContentsViewedAfterViewingContentBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingContentRequest> {
    private id;
    constructor(settings: Settings);
    setContentId(contentId: string): this;
    build(): ContentsViewedAfterViewingContentRequest;
}

export declare type ContentsViewedAfterViewingContentRequest = ContentRecommendationRequest & {
    contentId: string;
};

export declare class ContentsViewedAfterViewingMultipleContentsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingMultipleContentsRequest> {
    private ids;
    constructor(settings: Settings);
    setContentIds(...ids: string[]): this;
    build(): ContentsViewedAfterViewingMultipleContentsRequest;
}

export declare type ContentsViewedAfterViewingMultipleContentsRequest = ContentRecommendationRequest & {
    contentIds: string[];
};

export declare class ContentsViewedAfterViewingMultipleProductsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingMultipleProductsRequest> {
    private products;
    constructor(settings: Settings);
    addProduct(product: {
        productId: string;
        variantId?: string;
    }): this;
    addProducts(products: {
        productId: string;
        variantId?: string;
    }[]): this;
    build(): ContentsViewedAfterViewingMultipleProductsRequest;
}

export declare type ContentsViewedAfterViewingMultipleProductsRequest = ContentRecommendationRequest & {
    productAndVariantIds: ProductAndVariantId[];
};

export declare class ContentsViewedAfterViewingProductBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingProductRequest> {
    private productAndVariantId;
    constructor(settings: Settings);
    product(product: {
        productId: string;
        variantId?: string;
    }): this;
    build(): ContentsViewedAfterViewingProductRequest;
}

export declare type ContentsViewedAfterViewingProductRequest = ContentRecommendationRequest & {
    productAndVariantId: ProductAndVariantId;
};

export declare type ContentUpdate = Trackable & {
    content?: Content | null;
    kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export declare type ContentView = Trackable & {
    user?: User | null;
    content: Content;
    /** @deprecated */
    channel?: Channel | null;
};

export declare interface ContextConditionConfiguration {
    filters?: RequestContextFilter[] | null;
}

export declare type CPMBudget = Budget & {
    /** @format double */
    costPerMille: number;
};

export declare interface Currency {
    value: string;
}

export declare type CustomProductRecommendationRequest = ProductRecommendationRequest & {
    recommendationType: string;
    parameters?: Record<string, string>;
};

export declare type DataDoubleSelector = ValueSelector & {
    key?: string | null;
};

export declare interface DataFilter {
    $type: string;
    key: string;
    filterOutIfKeyIsNotFound: boolean;
    mustMatchAllConditions: boolean;
    conditions?: ValueConditionCollection | null;
    language?: Language | null;
    currency?: Currency | null;
    objectPath?: string[] | null;
    negated: boolean;
    custom?: Record<string, string>;
    settings?: FilterSettings | null;
}

export declare interface DataIndexConfiguration {
    keys?: Record<string, FieldIndexConfiguration>;
    unspecified?: FieldIndexConfiguration | null;
}

export declare type DataKeyPopularityMultiplierSelector = PopularityMultiplierSelector & {
    key?: string | null;
};

export declare interface DataObject {
    data: Record<string, DataValue>;
}

export declare type DataObjectBooleanValueFacet = BooleanDataObjectValueFacet;

export declare type DataObjectBooleanValueFacetResult = BooleanDataObjectValueFacetResult;

export declare type DataObjectDoubleRangeFacet = DoubleNullableDataObjectRangeFacet;

export declare type DataObjectDoubleRangeFacetResult = DoubleNullableDataObjectRangeFacetResult;

export declare type DataObjectDoubleRangesFacet = DoubleNullableDataObjectRangesFacet;

export declare type DataObjectDoubleRangesFacetResult = DoubleNullableDataObjectRangesFacetResult;

export declare type DataObjectDoubleValueFacet = DoubleDataObjectValueFacet;

export declare type DataObjectDoubleValueFacetResult = DoubleDataObjectValueFacetResult;

export declare type DataObjectFacet = UtilRequiredKeys<Facet, "$type"> & {
    $type: string;
    key: string;
    items: (ContentAssortmentFacet | ProductAssortmentFacet | ProductCategoryAssortmentFacet | BrandFacet | CategoryFacet | CategoryHierarchyFacet | ContentDataObjectFacet | ContentDataDoubleRangeFacet | ContentDataDoubleRangesFacet | ContentDataStringValueFacet | ContentDataBooleanValueFacet | ContentDataDoubleValueFacet | ContentDataIntegerValueFacet | DataObjectFacet | DataObjectDoubleRangeFacet | DataObjectDoubleRangesFacet | DataObjectStringValueFacet | DataObjectBooleanValueFacet | DataObjectDoubleValueFacet | PriceRangeFacet | PriceRangesFacet | ProductCategoryDataObjectFacet | ProductCategoryDataDoubleRangeFacet | ProductCategoryDataDoubleRangesFacet | ProductCategoryDataStringValueFacet | ProductCategoryDataBooleanValueFacet | ProductCategoryDataDoubleValueFacet | ProductDataObjectFacet | ProductDataDoubleRangeFacet | ProductDataDoubleRangesFacet | ProductDataStringValueFacet | ProductDataBooleanValueFacet | ProductDataDoubleValueFacet | ProductDataIntegerValueFacet | RecentlyPurchasedFacet | VariantSpecificationFacet)[];
    filter: DataObjectFilter;
};

export declare class DataObjectFacetBuilder {
    private facets;
    addDataObjectFacet(key: string, builder?: (facets: DataObjectFacetBuilder) => void, filter?: {
        conditions?: (builder: DataObjectFilterConditionBuilder) => void;
        skip?: number;
        take?: number;
    }, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addStringFacet(key: string, selectedValues?: string[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addBooleanFacet(key: string, selectedValues?: boolean[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addNumberFacet(key: string, selectedValues?: number[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addNumberRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addNumberRangesFacet(key: string, predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    build(): (BooleanDataObjectValueFacet | DataObjectFacet | DoubleNullableDataObjectRangeFacet | DoubleNullableDataObjectRangesFacet | StringDataObjectValueFacet | DoubleDataObjectValueFacet)[] | null;
}

export declare type DataObjectFacetResult = UtilRequiredKeys<FacetResult, "$type"> & {
    $type: string;
    key?: string | null;
    items?: (ProductAssortmentFacetResult | ContentAssortmentFacetResult | ProductCategoryAssortmentFacetResult | BrandFacetResult | CategoryFacetResult | CategoryHierarchyFacetResult | ContentDataObjectFacetResult | ContentDataDoubleRangeFacetResult | ContentDataDoubleRangesFacetResult | ContentDataStringValueFacetResult | ContentDataBooleanValueFacetResult | ContentDataDoubleValueFacetResult | ContentDataIntegerValueFacetResult | DataObjectFacetResult | DataObjectDoubleRangeFacetResult | DataObjectDoubleRangesFacetResult | DataObjectStringValueFacetResult | DataObjectBooleanValueFacetResult | DataObjectDoubleValueFacetResult | PriceRangeFacetResult | PriceRangesFacetResult | ProductCategoryDataObjectFacetResult | ProductCategoryDataDoubleRangeFacetResult | ProductCategoryDataDoubleRangesFacetResult | ProductCategoryDataStringValueFacetResult | ProductCategoryDataBooleanValueFacetResult | ProductCategoryDataDoubleValueFacetResult | ProductDataObjectFacetResult | ProductDataDoubleRangeFacetResult | ProductDataDoubleRangesFacetResult | ProductDataStringValueFacetResult | ProductDataBooleanValueFacetResult | ProductDataDoubleValueFacetResult | ProductDataIntegerValueFacetResult | RecentlyPurchasedFacetResult | VariantSpecificationFacetResult)[] | null;
    filter?: DataObjectFilter | null;
};

export declare interface DataObjectFilter {
    conditions?: (ObjectValueContainsCondition | ObjectValueEqualsCondition | ObjectValueGreaterThanCondition | ObjectValueInRangeCondition | ObjectValueIsSubsetOfCondition | ObjectValueLessThanCondition | ObjectValueMaxByCondition | ObjectValueMinByCondition | ObjectValueRelativeDateTimeCondition)[] | null;
    /** @format int32 */
    skip?: number | null;
    /** @format int32 */
    take?: number | null;
}

export declare class DataObjectFilterConditionBuilder {
    conditions: DataObjectFilterConditions[];
    addContainsCondition<T>(key: string, value: DataValueBase<T>, mode?: 'All' | 'Any', objectPath?: string[], negated?: boolean): this;
    addEqualsCondition<T>(key: string, value: DataValueBase<T>, objectPath?: string[], negated?: boolean): this;
    addInRangeCondition(key: string, range: DoubleRange_2, objectPath?: string[], negated?: boolean): this;
    addGreaterThanCondition(key: string, value: number, objectPath?: string[], negated?: boolean): this;
    addLessThanCondition(key: string, value: number, objectPath?: string[], negated?: boolean): this;
    addMinByCondition(key: string, objectPath?: string[], negated?: boolean): this;
    addMaxByCondition(key: string, objectPath?: string[], negated?: boolean): this;
    addObjectValueIsSubsetOfCondition<T>(key: string, value: DataValueBase<T>, objectPath?: string[], negated?: boolean): this;
    build(): DataObjectFilterConditions[] | null;
}

export declare type DataObjectFilterConditions = ObjectValueContainsCondition | ObjectValueEqualsCondition | ObjectValueGreaterThanCondition | ObjectValueInRangeCondition | ObjectValueLessThanCondition | ObjectValueMaxByCondition | ObjectValueMinByCondition;

export declare type DataObjectStringValueFacet = StringDataObjectValueFacet;

export declare type DataObjectStringValueFacetResult = StringDataObjectValueFacetResult;

export declare interface DataObjectValueSelector {
    key: string;
    filter?: DataObjectFilter | null;
    childSelector?: DataObjectValueSelector | null;
    fallbackSelector?: DataObjectValueSelector | null;
}

export declare class DataObjectValueSelectorBuilder {
    private key;
    private filter?;
    private childSelector?;
    private fallbackSelector?;
    select(key: string, settings?: {
        filter?: {
            conditions?: (builder: DataObjectFilterConditionBuilder) => void;
            skip?: number;
            take?: number;
        } | null;
        childSelector?: (childSelector: DataObjectValueSelectorBuilder) => void | null;
        fallbackSelector?: (childSelector: DataObjectValueSelectorBuilder) => void | null;
    }): void;
    build(): DataObjectValueSelector;
}

export declare interface DataObjectWithType extends DataObject {
    $type: string;
}

export declare interface DataRelevanceModifier {
    $type: string;
    key?: string | null;
    considerAsMatchIfKeyIsNotFound: boolean;
    /**
     * @deprecated
     * @format double
     */
    multiplyWeightBy: number;
    mustMatchAllConditions: boolean;
    conditions?: (ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | HasValueCondition | LessThanCondition | RelativeDateTimeCondition)[] | null;
    multiplierSelector?: DataDoubleSelector | FixedDoubleValueSelector | null;
    filters?: FilterCollection | null;
    custom?: Record<string, string | null>;
}

export declare type DataSelectionStrategy = ProductDataDoubleRangeFacetResult['dataSelectionStrategy'];

export declare interface DataValue {
    type: "String" | "Double" | "Boolean" | "Multilingual" | "Money" | "MultiCurrency" | "StringList" | "DoubleList" | "BooleanList" | "MultilingualCollection" | "Object" | "ObjectList";
    value?: any;
    isCollection: boolean;
}

export declare abstract class DataValueBase<T> implements DataValue {
    constructor(type: DataValueTypes, value: T);
    type: DataValueTypes;
    value: T;
    readonly abstract isCollection: boolean;
}

export declare class DataValueFactory {
    static string(value: string): StringDataValue;
    static stringCollection(collection: string[]): StringCollectionDataValue;
    static number(value: number): NumberDataValue;
    static doubleCollection(collection: number[]): DoubleCollectionDataValue;
    static boolean(value: boolean): BooleanDataValue;
    static booleanCollection(collection: boolean[]): BooleanCollectionDataValue;
    static multiCurrency(values: {
        amount: number;
        currency: string;
    }[]): MultiCurrencyDataValue;
    static multilingual(values: {
        value: string;
        language: string;
    }[]): MultilingualDataValue;
    static multilingualCollection(values: {
        values: string[];
        language: string;
    }[]): MultilingualCollectionDataValue;
    static object(data: {
        [key: string]: DataValue;
    }): ObjectDataValue;
    static objectCollection(objects: {
        [key: string]: DataValue;
    }[]): ObjectCollectionDataValue;
}

export declare type DataValueTypes = 'String' | 'Double' | 'Boolean' | 'Multilingual' | 'Money' | 'MultiCurrency' | 'StringList' | 'DoubleList' | 'BooleanList' | 'MultilingualCollection' | 'Object' | 'ObjectList';

export declare interface DateTimeRange {
    /** @format date-time */
    lowerBoundInclusive: string;
    /** @format date-time */
    upperBoundInclusive: string;
}

export declare interface DecimalNullableChainableRange {
    /** @format double */
    lowerBoundInclusive?: number | null;
    /** @format double */
    upperBoundExclusive?: number | null;
}

export declare interface DecimalNullableChainableRangeAvailableFacetValue {
    value?: DecimalNullableChainableRange | null;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare interface DecimalNullableRange {
    /** @format double */
    lowerBoundInclusive?: number | null;
    /** @format double */
    upperBoundInclusive?: number | null;
}

export declare interface DecimalRange {
    /** @format double */
    lowerBoundInclusive: number;
    /** @format double */
    upperBoundInclusive: number;
}

export declare interface DecimalRangeAvailableFacetValue {
    value?: DecimalRange | null;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare type DecompoundRule = SearchRule & {
    word: string;
    head?: string | null;
    modifiers?: string[] | null;
};

export declare interface DecompoundRuleSaveSearchRulesRequest {
    $type: string;
    rules: DecompoundRule[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface DecompoundRuleSaveSearchRulesResponse {
    $type: string;
    rules?: DecompoundRule[] | null;
    statistics?: Statistics | null;
}

export declare interface DecompoundRuleSearchRulesResponse {
    $type: string;
    rules?: DecompoundRule[] | null;
    /** @format int32 */
    hits: number;
    statistics?: Statistics | null;
}

export declare type DecompoundRulesRequest = DecompoundRulesRequestSortBySearchRulesRequest;

export declare interface DecompoundRulesRequestSortBySearchRulesRequest {
    $type: string;
    filters: SearchRuleFilters;
    sorting: DecompoundRulesRequestSortBySorting;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface DecompoundRulesRequestSortBySorting {
    sortBy: "Created" | "Modified";
    sortOrder: "Ascending" | "Descending";
}

export declare type DecompoundRulesResponse = DecompoundRuleSearchRulesResponse;

export declare type DeleteDecompoundRulesRequest = DeleteSearchRulesRequest;

export declare type DeleteMerchandisingRuleRequest = LicensedRequest & {
    /** @format uuid */
    id: string;
};

export declare type DeletePredictionRulesRequest = DeleteSearchRulesRequest;

export declare type DeleteRedirectRulesRequest = DeleteSearchRulesRequest;

export declare type DeleteSearchIndexRequest = LicensedRequest & {
    id?: string | null;
    deletedBy?: string | null;
};

export declare type DeleteSearchResultModifierRulesRequest = DeleteSearchRulesRequest;

export declare interface DeleteSearchRulesRequest {
    $type: string;
    ids: string[];
    deletedBy: string;
    custom?: Record<string, string | null>;
}

export declare type DeleteSearchRulesResponse = TimedResponse;

export declare type DeleteSearchTermModifierRulesRequest = DeleteSearchRulesRequest;

export declare type DeleteStemmingRulesRequest = DeleteSearchRulesRequest;

export declare type DeleteSynonymsRequest = LicensedRequest & {
    ids?: string[] | null;
    deletedBy?: string | null;
};

export declare type DeleteSynonymsResponse = TimedResponse;

export declare type DeleteTriggerConfigurationRequest = LicensedRequest & {
    /** @format uuid */
    id: string;
};

export declare type DistinctCondition = ValueCondition & {
    /** @format int32 */
    numberOfOccurrencesAllowedWithTheSameValue: number;
};

export declare interface DoubleAvailableFacetValue {
    /** @format double */
    value: number;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare class DoubleCollectionDataValue extends DataValueBase<CollectionWithType<number>> {
    constructor(value: number[]);
    readonly isCollection = true;
}

export declare interface DoubleContentDataValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleContentDataValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    available?: DoubleAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleDataObjectValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleDataObjectValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    available?: DoubleAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableChainableRange {
    /** @format double */
    lowerBoundInclusive?: number | null;
    /** @format double */
    upperBoundExclusive?: number | null;
}

export declare interface DoubleNullableChainableRangeAvailableFacetValue {
    value?: DoubleNullableChainableRange | null;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare interface DoubleNullableContentDataRangeFacet {
    $type: string;
    selected?: DoubleNullableRange | null;
    key: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleNullableContentDataRangeFacetResult {
    $type: string;
    key?: string | null;
    selected?: DoubleNullableRange | null;
    available?: DoubleNullableRangeAvailableFacetValue | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableContentDataRangesFacet {
    $type: string;
    predefinedRanges?: DoubleNullableChainableRange[] | null;
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DoubleNullableChainableRange[] | null;
    key: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleNullableContentDataRangesFacetResult {
    $type: string;
    key?: string | null;
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DoubleNullableChainableRange[] | null;
    available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableDataObjectRangeFacet {
    $type: string;
    selected?: DoubleNullableRange | null;
    key: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleNullableDataObjectRangeFacetResult {
    $type: string;
    key?: string | null;
    selected?: DoubleNullableRange | null;
    available?: DoubleNullableRangeAvailableFacetValue | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableDataObjectRangesFacet {
    $type: string;
    predefinedRanges?: DoubleNullableChainableRange[] | null;
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DoubleNullableChainableRange[] | null;
    key: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleNullableDataObjectRangesFacetResult {
    $type: string;
    key?: string | null;
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DoubleNullableChainableRange[] | null;
    available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableProductCategoryDataRangeFacet {
    $type: string;
    selected?: DoubleNullableRange | null;
    key: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleNullableProductCategoryDataRangeFacetResult {
    $type: string;
    key?: string | null;
    selected?: DoubleNullableRange | null;
    available?: DoubleNullableRangeAvailableFacetValue | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableProductCategoryDataRangesFacet {
    $type: string;
    predefinedRanges?: DoubleNullableChainableRange[] | null;
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DoubleNullableChainableRange[] | null;
    key: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleNullableProductCategoryDataRangesFacetResult {
    $type: string;
    key?: string | null;
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DoubleNullableChainableRange[] | null;
    available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableProductDataRangeFacet {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    selected?: DoubleNullableRange | null;
    key: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleNullableProductDataRangeFacetResult {
    $type: string;
    key?: string | null;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    selected?: DoubleNullableRange | null;
    available?: DoubleNullableRangeAvailableFacetValue | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableProductDataRangesFacet {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    predefinedRanges?: DoubleNullableChainableRange[] | null;
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DoubleNullableChainableRange[] | null;
    key: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleNullableProductDataRangesFacetResult {
    $type: string;
    key?: string | null;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DoubleNullableChainableRange[] | null;
    available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleNullableRange {
    /** @format double */
    lowerBoundInclusive?: number | null;
    /** @format double */
    upperBoundInclusive?: number | null;
}

export declare interface DoubleNullableRangeAvailableFacetValue {
    value?: DoubleNullableRange | null;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare interface DoubleProductCategoryDataValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleProductCategoryDataValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    available?: DoubleAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface DoubleProductDataValueFacet {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface DoubleProductDataValueFacetResult {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    available?: DoubleAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

declare interface DoubleRange_2 {
    /** @format double */
    lowerBoundInclusive: number;
    /** @format double */
    upperBoundInclusive: number;
}
export { DoubleRange_2 as DoubleRange }

export declare type EntityDataFilterOptions = FilterOptions & {
    objectPath?: string[];
};

export declare type EqualsCondition = ValueCondition & {
    value?: DataValue | null;
};

export declare interface ExpectedSearchTermResult {
    /** @format int32 */
    estimatedHits: number;
    type: "Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory";
}

export declare interface Facet {
    $type: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare class FacetBuilder {
    private facets;
    addCategoryFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors', selectedValues?: string[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryHierarchyFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants', selectedValues?: CategoryPath[] | null, selectedPropertiesSettings?: Partial<SelectedProductCategoryPropertiesSettings>, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentCategoryHierarchyFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants', selectedValues?: CategoryPath[] | null, selectedPropertiesSettings?: Partial<SelectedContentCategoryPropertiesSettings>, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addBrandFacet(selectedValues?: string[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductAssortmentFacet(selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues?: number[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addVariantSpecificationFacet(key: string, selectedValues?: string[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataDoubleRangeFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataDoubleRangesFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataStringValueFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues?: string[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataBooleanValueFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues?: boolean[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataDoubleValueFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues?: number[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addSalesPriceRangeFacet(priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addSalesPriceRangesFacet(priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addListPriceRangeFacet(priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addListPriceRangesFacet(priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductDataObjectFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', builder?: (facets: DataObjectFacetBuilder) => void, filter?: {
        conditions?: (builder: DataObjectFilterConditionBuilder) => void;
        skip?: number;
        take?: number;
    }, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addRecentlyPurchasedFacet(purchaseQualifiers: PurchaseQualifiers, selectedValues?: boolean[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentAssortmentFacet(selectedValues?: number[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataDoubleRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataDoubleRangesFacet(key: string, predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataStringValueFacet(key: string, selectedValues?: string[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataBooleanValueFacet(key: string, selectedValues?: boolean[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataDoubleValueFacet(key: string, selectedValues?: number[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addContentDataObjectFacet(key: string, builder?: (facets: DataObjectFacetBuilder) => void, filter?: {
        conditions?: (builder: DataObjectFilterConditionBuilder) => void;
        skip?: number;
        take?: number;
    }, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryAssortmentFacet(selectedValues?: number[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataDoubleRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataDoubleRangesFacet(key: string, predefinedRanges?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, expandedRangeSize?: number | null, selectedValues?: {
        lowerBound?: number;
        upperBound?: number;
    }[] | null, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataStringValueFacet(key: string, selectedValues?: string[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataBooleanValueFacet(key: string, selectedValues?: boolean[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataDoubleValueFacet(key: string, selectedValues?: number[] | null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    addProductCategoryDataObjectFacet(key: string, builder?: (facets: DataObjectFacetBuilder) => void, filter?: {
        conditions?: (builder: DataObjectFilterConditionBuilder) => void;
        skip?: number;
        take?: number;
    }, facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this;
    build(): ProductFacetQuery | null;
    private mapSelectedDoubleRange;
}

export declare interface FacetQuery {
    $type: string;
}

export declare interface FacetResult {
    $type: string;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface FacetSettings {
    alwaysIncludeSelectedInAvailable: boolean;
    includeZeroHitsInAvailable: boolean;
    sorting?: ByHitsFacetSorting | null;
    /** @format int32 */
    take?: number | null;
}

export declare class FacetSettingsBuilder {
    private settings;
    alwaysIncludeSelectedInAvailable(include?: boolean): this;
    includeZeroHitsInAvailable(include?: boolean): this;
    take(take: number | null): this;
    /**
     * Sorts facet values in descending order by hit count, so that the values with the most hits appear first in the list.
     */
    sortByHits(): this;
    build(): FacetSettings;
}

export declare interface FacetSorting {
    $type: string;
}

export declare interface FieldIndexConfiguration {
    included: boolean;
    /** @format int32 */
    weight: number;
    /** @deprecated */
    predictionSourceType: "Disabled" | "IndividualWords" | "PartialWordSequences" | "CompleteWordSequence";
    parser?: ClearTextParser | HtmlParser | null;
    matchTypeSettings?: MatchTypeSettings | null;
    predictionConfiguration?: PredictionConfiguration | null;
}

export declare interface Filter {
    $type: string;
    negated: boolean;
    custom?: Record<string, string>;
    settings?: FilterSettings | null;
}

export declare class FilterBuilder {
    private filters;
    private productFilterBuilder;
    private brandFilterBuilder;
    private contentFilterBuilder;
    private variantFilterBuilder;
    private companyFilterBuilder;
    /**
     * Adds a product assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return contents within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified products.
     * @param productIds - Array of product IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductIdFilter(productIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified variants.
     * @param variantIds - Array of variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantIdFilter(variantIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified brands.
     * @param brandIds - Array of brand IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandIdFilter(brandIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified contents.
     * @param contentIds - Array of content IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentIdFilter(contentIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified companies.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addCompanyIdFilter(companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a range filter to the request ensuring the product has a certain range of variants.
     * @param lowerBound - Lower bound of the range (inclusive).
     * @param upperBound - Upper bound of the range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions & {
        includeDisabled?: boolean;
    }): this;
    /**
     * Filters the request to only return products purchased since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products viewed since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserFilter(sinceUtc: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants with a certain specification.
     * @param key - Specification key.
     * @param equalTo - Specification value to match.
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Combines filters using logical AND.
     * @param filterBuilder - Function to build the AND filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     * @throws Error if no filters are provided.
     */
    and(filterBuilder: (builder: FilterBuilder) => void, negated?: boolean, options?: FilterOptions): this;
    /**
     * Combines filters using logical OR.
     * @param filterBuilder - Function to build the OR filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     * @throws Error if no filters are provided.
     */
    or(filterBuilder: (builder: FilterBuilder) => void, negated?: boolean, options?: FilterOptions): this;
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
    addProductDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
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
    addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
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
    addBrandDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
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
    addCartDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: FilterOptions): this;
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
    addContentCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
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
    addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
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
    addProductCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
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
    addCompanyDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a product display name filter to the request.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductDisplayNameFilter(conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product and variant ID filter to the request.
     * @param products - Array of product and variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductAndVariantIdFilter(products: ProductAndVariantId | ProductAndVariantId[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryLevelFilter(levels: number | number[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryHasParentFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryHasChildFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryHasAncestorFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryLevelFilter(levels: number | number[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryHasParentFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryHasChildFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryHasAncestorFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has products filter to the request ensuring that only categories with products in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductCategoryHasProductsFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category has contents filter to the request ensuring that only categories with content in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryHasContentsFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a brand is disabled filter to the request. Only works for brand queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addBrandDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a company data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addCompanyDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a company is disabled filter to the request. Only works for company queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addCompanyDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addVariantDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content category recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the content category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content is disabled filter to the request. Only works for content queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the content was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a content has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addContentHasCategoriesFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product data has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductHasCategoriesFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by a company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserParentCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by a company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserParentCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products in the user's cart.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductInCartFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Resets all filters and filter builders.
     * @returns The FilterBuilder instance for chaining.
     */
    reset(): this;
    /**
     * Builds and combines all filters into a FilterCollection.
     * @returns The combined FilterCollection or null if no filters are set.
     */
    build(): FilterCollection | null;
}

export declare abstract class FilterBuilderBase<TFilterBuilder extends FilterBuilderBase<any>> {
    private TFilterBuilderCtor;
    constructor(TFilterBuilderCtor: Constructor<TFilterBuilder>);
    protected filters: AllFilters[];
    /**
     * Adds an AND filter to the request.
     * @param filterBuilder - Function to build the AND filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilderBase instance for chaining.
     */
    and(filterBuilder: (builder: TFilterBuilder) => void, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds an OR filter to the request.
     * @param filterBuilder - Function to build the OR filter.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The FilterBuilderBase instance for chaining.
     */
    or(filterBuilder: (builder: TFilterBuilder) => void, negated?: boolean, options?: FilterOptions): this;
    /**
     * Resets the filters.
     * @returns The FilterBuilderBase instance for chaining.
     */
    reset(): this;
    /**
     * Builds the filter collection.
     * @returns The FilterCollection or null if no filters are added.
     */
    build(): FilterCollection | null;
}

export declare interface FilterCollection {
    items?: (AndFilter | BrandAssortmentFilter | BrandDataFilter | BrandDataHasKeyFilter | BrandDisabledFilter | BrandIdFilter | CartDataFilter | CompanyDataFilter | CompanyDataHasKeyFilter | CompanyDisabledFilter | CompanyIdFilter | ContentAssortmentFilter | ContentCategoryAssortmentFilter | ContentCategoryDataFilter | ContentCategoryDataHasKeyFilter | ContentCategoryDisabledFilter | ContentCategoryHasAncestorFilter | ContentCategoryHasChildFilter | ContentCategoryHasContentsFilter | ContentCategoryHasParentFilter | ContentCategoryIdFilter | ContentCategoryLevelFilter | ContentCategoryRecentlyViewedByUserFilter | ContentDataFilter | ContentDataHasKeyFilter | ContentDisabledFilter | ContentHasCategoriesFilter | ContentIdFilter | ContentRecentlyViewedByUserFilter | OrFilter | ProductAndVariantIdFilter | ProductAssortmentFilter | ProductCategoryAssortmentFilter | ProductCategoryDataFilter | ProductCategoryDataHasKeyFilter | ProductCategoryDisabledFilter | ProductCategoryHasAncestorFilter | ProductCategoryHasChildFilter | ProductCategoryHasParentFilter | ProductCategoryHasProductsFilter | ProductCategoryIdFilter | ProductCategoryLevelFilter | ProductCategoryRecentlyViewedByUserFilter | ProductDataFilter | ProductDataHasKeyFilter | ProductDisabledFilter | ProductDisplayNameFilter | ProductHasCategoriesFilter | ProductHasVariantsFilter | ProductIdFilter | ProductInCartFilter | ProductListPriceFilter | ProductRecentlyPurchasedByCompanyFilter | ProductRecentlyPurchasedByUserCompanyFilter | ProductRecentlyPurchasedByUserFilter | ProductRecentlyPurchasedByUserParentCompanyFilter | ProductRecentlyViewedByCompanyFilter | ProductRecentlyViewedByUserCompanyFilter | ProductRecentlyViewedByUserFilter | ProductRecentlyViewedByUserParentCompanyFilter | ProductSalesPriceFilter | VariantAssortmentFilter | VariantDataFilter | VariantDataHasKeyFilter | VariantDisabledFilter | VariantIdFilter | VariantListPriceFilter | VariantSalesPriceFilter | VariantSpecificationFilter)[] | null;
}

export declare interface FilteredVariantsSettings {
    filters?: FilterCollection | null;
    inheritFiltersFromRequest?: boolean | null;
}

export declare type FilterOptions = {
    filterSettings?: (builder: FilterSettingsBuilder) => void;
};

export declare type FilterRule = MerchandisingRule;

export declare interface FilterScopes {
    default?: ApplyFilterSettings | null;
    fill?: ApplyFilterSettings | null;
}

export declare class FilterScopesBuilder {
    private fillScope;
    private defaultScope;
    fill({ apply }: {
        apply: boolean;
    }): this;
    default({ apply }: {
        apply: boolean;
    }): this;
    build(): FilterScopes | null;
}

export declare interface FilterScopeSettings {
    $type: string;
}

export declare interface FilterSettings {
    scopes?: FilterScopes | null;
}

export declare class FilterSettingsBuilder {
    private scopesBuilder;
    scopes(builder: (builder: FilterScopesBuilder) => void): this;
    build(): FilterSettings | null;
}

export declare type FixedDoubleValueSelector = ValueSelector & {
    /** @format double */
    value: number;
};

export declare type FixedPositionRule = MerchandisingRule & {
    /** @format int32 */
    position: number;
};

export declare class GetContentFacet {
    items: FacetResult[] | null;
    constructor(items: FacetResult[] | null);
    static category(facets: ContentFacetResult, selectionStrategy: string): CategoryFacetResult | null;
    static categoryHierarchy(facets: ContentFacetResult, selectionStrategy: string): CategoryHierarchyFacetResult | null;
    static assortment(facets: ContentFacetResult): ContentAssortmentFacetResult | null;
    static dataDoubleRange(facets: ContentFacetResult, key: string): ContentDataDoubleRangeFacetResult | null;
    static dataDoubleRanges(facets: ContentFacetResult, key: string): ContentDataDoubleRangesFacetResult | null;
    static dataString(facets: ContentFacetResult, key: string): ContentDataStringValueFacetResult | null;
    static dataBoolean(facets: ContentFacetResult, key: string): ContentDataBooleanValueFacetResult | null;
    static dataNumber(facets: ContentFacetResult, key: string): ContentDataDoubleValueFacetResult | null;
    static dataObject(facets: ContentFacetResult, key: string): ContentDataObjectFacetResult | null;
    private static data;
}

export declare class GetProductCategoryFacet {
    items: FacetResult[] | null;
    constructor(items: FacetResult[] | null);
    static assortment(facets: ProductCategoryFacetResult): ProductCategoryAssortmentFacetResult | null;
    static dataDoubleRange(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataDoubleRangeFacetResult | null;
    static dataDoubleRanges(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataDoubleRangesFacetResult | null;
    static dataString(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataStringValueFacetResult | null;
    static dataBoolean(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataBooleanValueFacetResult | null;
    static dataNumber(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataDoubleValueFacetResult | null;
    static dataObject(facets: ProductCategoryFacetResult, key: string): ProductCategoryDataObjectFacetResult | null;
    private static data;
}

export declare class GetProductFacet {
    static productAssortment(facets: ProductFacetResult, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant'): ProductAssortmentFacetResult | null;
    static brand(facets: ProductFacetResult): BrandFacetResult | null;
    static category(facets: ProductFacetResult, selectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants'): CategoryFacetResult | null;
    static categoryHierarchy(facets: ProductFacetResult, selectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants'): CategoryHierarchyFacetResult | null;
    static listPriceRange(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy): PriceRangeFacetResult | null;
    static salesPriceRange(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy): PriceRangeFacetResult | null;
    static listPriceRanges(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy): PriceRangesFacetResult | null;
    static listPriceRangesWithRange(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy, expandedRangeSize: number | null): PriceRangesFacetResult | null;
    static salesPriceRanges(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy): PriceRangesFacetResult | null;
    static salesPriceRangesWithRange(facets: ProductFacetResult, selectionStrategy: PriceSelectionStrategy, expandedRangeSize: number | null): PriceRangesFacetResult | null;
    static dataDoubleRange(facets: ProductFacetResult, selectionStrategy: DataSelectionStrategy, key: string): ProductDataDoubleRangeFacetResult | null;
    static dataDoubleRanges(facets: ProductFacetResult, selectionStrategy: DataSelectionStrategy, key: string): ProductDataDoubleRangesFacetResult | null;
    static variantSpecification(facets: ProductFacetResult, key: string): VariantSpecificationFacetResult | null;
    static dataString(facets: ProductFacetResult, key: string, selectionStrategy: DataSelectionStrategy): ProductDataStringValueFacetResult | null;
    static dataBoolean(facets: ProductFacetResult, key: string, selectionStrategy: DataSelectionStrategy): ProductDataBooleanValueFacetResult | null;
    static dataNumber(facets: ProductFacetResult, key: string, selectionStrategy: DataSelectionStrategy): ProductDataDoubleValueFacetResult | null;
    static dataObject(facets: ProductFacetResult, selectionStrategy: DataSelectionStrategy, key: string): ProductDataObjectFacetResult | null;
    private static data;
}

export declare interface GlobalRetailMediaConfiguration {
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    thresholds?: ScoreThresholds | null;
}

export declare type GlobalRetailMediaConfigurationRequest = LicensedRequest;

export declare type GlobalRetailMediaConfigurationResponse = TimedResponse & {
    configuration?: GlobalRetailMediaConfiguration | null;
};

export declare interface GlobalTriggerConfiguration {
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    enabled: boolean;
    /** @format int32 */
    minimumCooldownAnyTrigger?: number | null;
    /** @format int32 */
    minimumCooldownSameTrigger?: number | null;
    /** @format int32 */
    minimumCooldownSameGroup?: number | null;
    settings?: Record<string, string | null>;
}

export declare type GlobalTriggerConfigurationRequest = LicensedRequest;

export declare type GlobalTriggerConfigurationResponse = TimedResponse & {
    configuration?: GlobalTriggerConfiguration | null;
};

export declare type GreaterThanCondition = ValueCondition & {
    /** @format double */
    value: number;
};

export declare type HasActivityCondition = UserCondition & {
    /** @format int32 */
    withinMinutes: number;
    /** @format int32 */
    forAtLeastSeconds: number;
};

export declare interface HasAncestorCategoryFilter {
    $type: string;
    categoryIds?: string[] | null;
    negated: boolean;
    custom?: Record<string, string>;
    settings?: FilterSettings | null;
}

export declare type HasAuthenticatedIdCondition = UserCondition;

export declare interface HasChildCategoryFilter {
    $type: string;
    categoryIds?: string[] | null;
    negated: boolean;
    custom?: Record<string, string>;
    settings?: FilterSettings | null;
}

export declare type HasClassificationCondition = UserCondition & {
    key?: string | null;
    value?: string | null;
};

export declare type HasDataCondition = UserCondition & {
    key?: string | null;
    conditions?: ValueConditionCollection | null;
};

export declare type HasEmailCondition = UserCondition;

export declare type HasIdentifierCondition = UserCondition & {
    key?: string | null;
};

export declare type HasLineItemsInCartCondition = UserCondition & {
    numberOfItems?: Int32NullableRange | null;
    cartName?: string | null;
    filters?: FilterCollection | null;
};

export declare type HasModifiedCartCondition = UserCondition & {
    /** @format int32 */
    withinMinutes: number;
    cartName?: string | null;
};

export declare interface HasParentCategoryFilter {
    $type: string;
    categoryIds?: string[] | null;
    negated: boolean;
    custom?: Record<string, string>;
    settings?: FilterSettings | null;
}

export declare type HasPlacedOrderCondition = UserCondition & {
    /** @format int32 */
    withinMinutes: number;
};

export declare type HasRecentlyReceivedSameTriggerCondition = UserCondition & {
    /** @format int32 */
    withinMinutes: number;
};

export declare type HasRecentlyReceivedTriggerCondition = UserCondition & {
    /** @format int32 */
    withinMinutes: number;
    /** @format uuid */
    id?: string | null;
    group?: string | null;
    /** @format int32 */
    type?: number | null;
};

export declare type HasValueCondition = ValueCondition;

export declare interface HighlightResult {
    offsets?: HighlightResultOffset | null;
    snippets?: HighlightResultSnippet | null;
}

export declare interface HighlightResultOffset {
    displayName: Int32Range[];
    data: StringRange1ArrayKeyValuePair[];
}

export declare interface HighlightResultSnippet {
    displayName: HighlightResultSnippetDisplayNameSnippetMatch[];
    data: StringFieldSnippetMatchArrayKeyValuePair[];
}

export declare type HighlightResultSnippetDisplayNameSnippetMatch = HighlightResultSnippetSnippetMatch;

export declare type HighlightResultSnippetFieldSnippetMatch = HighlightResultSnippetSnippetMatch;

export declare interface HighlightResultSnippetMatchMatchedWord {
    offset?: Int32Range | null;
}

export declare interface HighlightResultSnippetSnippetMatch {
    $type: string;
    text: string;
    matchedWords?: HighlightResultSnippetMatchMatchedWord[] | null;
}

export declare interface HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits {
    /** @format int32 */
    maxEntryLimit?: number | null;
    /** @format int32 */
    maxSnippetsPerEntry?: number | null;
    /** @format int32 */
    maxSnippetsPerField?: number | null;
    /** @format int32 */
    maxWordsBeforeMatch?: number | null;
    /** @format int32 */
    maxWordsAfterMatch?: number | null;
    /** @format int32 */
    maxSentencesToIncludeBeforeMatch?: number | null;
    /** @format int32 */
    maxSentencesToIncludeAfterMatch?: number | null;
}

export declare interface HighlightSettings2ContentContentHighlightPropsHighlightSettings2OffsetSettings {
    include: boolean;
}

export declare interface HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape {
    offsets?: HighlightSettings2ContentContentHighlightPropsHighlightSettings2OffsetSettings | null;
    snippets?: HighlightSettings2ContentContentHighlightPropsHighlightSettings2SnippetsSettings | null;
}

export declare interface HighlightSettings2ContentContentHighlightPropsHighlightSettings2SnippetsSettings {
    include: boolean;
    useEllipses: boolean;
    includeMatchedWords: boolean;
}

export declare interface HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits {
    /** @format int32 */
    maxEntryLimit?: number | null;
    /** @format int32 */
    maxSnippetsPerEntry?: number | null;
    /** @format int32 */
    maxSnippetsPerField?: number | null;
    /** @format int32 */
    maxWordsBeforeMatch?: number | null;
    /** @format int32 */
    maxWordsAfterMatch?: number | null;
    /** @format int32 */
    maxSentencesToIncludeBeforeMatch?: number | null;
    /** @format int32 */
    maxSentencesToIncludeAfterMatch?: number | null;
}

export declare interface HighlightSettings2ProductProductHighlightPropsHighlightSettings2OffsetSettings {
    include: boolean;
}

export declare interface HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape {
    offsets?: HighlightSettings2ProductProductHighlightPropsHighlightSettings2OffsetSettings | null;
    snippets?: HighlightSettings2ProductProductHighlightPropsHighlightSettings2SnippetsSettings | null;
}

export declare interface HighlightSettings2ProductProductHighlightPropsHighlightSettings2SnippetsSettings {
    include: boolean;
    useEllipses: boolean;
    includeMatchedWords: boolean;
}

export declare type HtmlParser = Parser;

export declare interface HttpProblemDetails {
    type: string;
    title: string;
    status: number;
    traceId: string;
    detail?: string;
    errors?: Record<string, string>;
}

export declare type IChange = object;

export declare interface IndexConfiguration {
    language?: LanguageIndexConfiguration | null;
    product?: ProductIndexConfiguration | null;
    content?: ContentIndexConfiguration | null;
    productCategory?: ProductCategoryIndexConfiguration | null;
}

export declare interface InputConditionConfiguration {
    filters?: FilterCollection | null;
    evaluationMode: "Any" | "All";
}

export declare type InputModifierRule = MerchandisingRule;

export declare interface Int32AvailableFacetValue {
    /** @format int32 */
    value: number;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare interface Int32ContentDataValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface Int32ContentDataValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    available?: Int32AvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface Int32NullableRange {
    /** @format int32 */
    lowerBoundInclusive?: number | null;
    /** @format int32 */
    upperBoundInclusive?: number | null;
}

export declare interface Int32ProductDataValueFacet {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface Int32ProductDataValueFacetResult {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: number[] | null;
    available?: Int32AvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface Int32Range {
    /** @format int32 */
    lowerBoundInclusive: number;
    /** @format int32 */
    upperBoundInclusive: number;
}

export declare type ISchedule = object;

export declare type ITriggerResult = object;

export declare interface KeyMultiplier {
    key?: string | null;
    /** @format double */
    multiplier: number;
}

export declare interface Language {
    value: string;
}

export declare interface LanguageIndexConfiguration {
    languages?: LanguageIndexConfigurationEntry[] | null;
}

export declare interface LanguageIndexConfigurationEntry {
    language: Language;
    included: boolean;
    isO639_1?: string | null;
}

export declare type LessThanCondition = ValueCondition & {
    /** @format double */
    value: number;
};

export declare interface LicensedRequest {
    $type: string;
    custom?: Record<string, string | null>;
}

export declare interface LineItem {
    product: Product;
    variant?: ProductVariant | null;
    custom?: Record<string, string>;
    /** @format float */
    quantity: number;
    /** @format double */
    lineTotal: number;
    data?: Record<string, DataValue>;
}

declare type Location_2 = LocationEntityStateLocationMetadataValuesRetailMediaEntity & {
    name: string;
    key?: string | null;
    placements?: LocationPlacementCollection | null;
    supportedPromotions?: PromotionSpecificationCollection | null;
};
export { Location_2 as Location }

export declare interface LocationEntityStateLocationMetadataValuesLocationsRequestSortByLocationsRequestEntityFiltersEntitiesRequest {
    $type: string;
    filters?: LocationsRequestEntityFilters | null;
    sorting?: LocationsRequestSortBySorting | null;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface LocationEntityStateLocationMetadataValuesRetailMediaEntity {
    $type: string;
    state: "Active" | "Inactive" | "Archived";
    metadata: LocationMetadataValues;
    /** @format uuid */
    id?: string | null;
}

export declare interface LocationLocationEntityStateEntityResponse {
    $type: string;
    entities?: Location_2[] | null;
    /** @format int32 */
    hits: number;
    hitsPerState?: {
        /** @format int32 */
        Active: number;
        /** @format int32 */
        Inactive: number;
        /** @format int32 */
        Archived: number;
    } | null;
    statistics?: Statistics | null;
}

export declare type LocationMetadataValues = MetadataValues & {
    /** @format date-time */
    inactivated?: string | null;
    inactivatedBy?: string | null;
    /** @format date-time */
    activated?: string | null;
    activatedBy?: string | null;
    /** @format date-time */
    archived?: string | null;
    archivedBy?: string | null;
};

export declare interface LocationPlacement {
    name: string;
    key?: string | null;
    variations?: LocationPlacementVariationCollection | null;
    thresholds?: ScoreThresholds | null;
}

export declare interface LocationPlacementCollection {
    items: LocationPlacement[];
}

export declare interface LocationPlacementVariation {
    name: string;
    key?: string | null;
    supportedPromotions?: PromotionSpecificationVariationCollection | null;
}

export declare interface LocationPlacementVariationCollection {
    items: LocationPlacementVariation[];
}

export declare interface LocationSaveEntitiesRequest {
    $type: string;
    entities: Location_2[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface LocationSaveEntitiesResponse {
    $type: string;
    entities?: Location_2[] | null;
    statistics?: Statistics | null;
}

export declare type LocationsRequest = LocationEntityStateLocationMetadataValuesLocationsRequestSortByLocationsRequestEntityFiltersEntitiesRequest;

export declare type LocationsRequestEntityFilters = RetailMediaEntity2LocationEntityStateLocationMetadataValuesRetailMediaEntity2EntityFilters & {
    ids?: string[] | null;
    keys?: string[] | null;
};

export declare interface LocationsRequestSortBySorting {
    sortBy: "Created" | "Modified" | "Name";
    sortOrder: "Ascending" | "Descending";
}

export declare type LocationsResponse = LocationLocationEntityStateEntityResponse;

export declare interface MatchTypeSettings {
    compound: boolean;
    exact: boolean;
    startsWith: boolean;
    endsWith: boolean;
    fuzzy: boolean;
}

export declare interface MerchandisingRule {
    $type: string;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    conditions?: ConditionConfiguration | null;
    request?: RequestConfiguration | null;
    /** @format double */
    priority: number;
    settings?: Record<string, string | null>;
    schedule?: ISchedule | null;
    status?: "Active" | "Inactive" | null;
}

export declare type MerchandisingRuleCollectionResponse = TimedResponse & {
    rules?: (BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule)[] | null;
};

export declare type MerchandisingRuleRequest = LicensedRequest & {
    /** @format uuid */
    id: string;
    /** @format int32 */
    type?: number | null;
};

export declare type MerchandisingRuleResponse = TimedResponse & {
    rule?: BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule | null;
};

export declare type MerchandisingRulesRequest = LicensedRequest & {
    /** @format int32 */
    type?: number | null;
};

export declare interface MetadataValues {
    $type: string;
    /** @format date-time */
    created: string;
    createdBy: string;
    /** @format date-time */
    modified: string;
    modifiedBy: string;
}

export declare type MixedRecommendationResponseCollection = TimedResponse & {
    responses?: (BrandRecommendationResponse | ContentCategoryRecommendationResponse | ContentRecommendationResponse | ProductCategoryRecommendationResponse | ProductRecommendationResponse | SearchTermRecommendationResponse)[] | null;
};

export declare interface Money {
    /** @format double */
    amount: number;
    currency: Currency;
}

export declare interface MultiCurrency {
    values?: Money[] | null;
}

export declare class MultiCurrencyDataValue extends DataValueBase<MultiCurrencyWithType> {
    constructor(values: {
        amount: number;
        currency: string;
    }[]);
    readonly isCollection = false;
}

export declare interface MultiCurrencyWithType extends MultiCurrency {
    $type: string;
}

export declare interface Multilingual {
    values?: MultilingualValue[] | null;
}

export declare interface MultilingualCollection {
    values?: MultilingualCollectionValue[] | null;
}

export declare class MultilingualCollectionDataValue extends DataValueBase<MultilingualCollectionWithType<MultilingualCollectionValue>> {
    constructor(values: {
        values: string[];
        language: string;
    }[]);
    readonly isCollection = true;
}

export declare interface MultilingualCollectionValue {
    language?: Language | null;
    values?: string[] | null;
}

export declare interface MultilingualCollectionWithType<T> {
    $type: string;
    values: T[];
}

export declare class MultilingualDataValue extends DataValueBase<MultilingualWithType> {
    constructor(values: {
        value: string;
        language: string;
    }[]);
    readonly isCollection = false;
}

export declare interface MultilingualValue {
    language: Language;
    text?: string | null;
}

export declare interface MultilingualWithType extends Multilingual {
    $type: string;
}

export declare class NumberDataValue extends DataValueBase<number> {
    constructor(value: number);
    readonly isCollection = false;
}

export declare class ObjectCollectionDataValue extends DataValueBase<CollectionWithType<DataObjectWithType>> {
    constructor(dataObjects: {
        [key: string]: DataValue;
    }[]);
    readonly isCollection = true;
}

export declare class ObjectDataValue extends DataValueBase<DataObjectWithType> {
    constructor(dataObject: {
        [key: string]: DataValue;
    });
    readonly isCollection = false;
}

export declare interface ObjectValueCondition {
    $type: string;
    negated: boolean;
    key: string;
    objectPath?: string[] | null;
}

export declare type ObjectValueContainsCondition = ObjectValueCondition & {
    value?: DataValue | null;
    mode: "All" | "Any";
};

export declare type ObjectValueEqualsCondition = ObjectValueCondition & {
    value?: DataValue | null;
};

export declare type ObjectValueGreaterThanCondition = ObjectValueCondition & {
    /** @format double */
    value: number;
};

export declare type ObjectValueInRangeCondition = ObjectValueCondition & {
    range?: DoubleRange_2 | null;
};

export declare type ObjectValueIsSubsetOfCondition = ObjectValueCondition & {
    value?: DataValue | null;
};

export declare type ObjectValueLessThanCondition = ObjectValueCondition & {
    /** @format double */
    value: number;
};

export declare type ObjectValueMaxByCondition = ObjectValueCondition;

export declare type ObjectValueMinByCondition = ObjectValueCondition;

export declare type ObjectValueRelativeDateTimeCondition = ObjectValueCondition & {
    comparison: "Before" | "After";
    unit: "UnixMilliseconds" | "UnixSeconds" | "UnixMinutes";
    /** @format int64 */
    currentTimeOffset: number;
};

export declare type ObservableProductAttributeSelector = ProductPropertySelector & {
    attribute: "ListPrice" | "SalesPrice";
};

export declare type ObservableProductDataValueSelector = ProductPropertySelector & {
    dataObjectValueSelector?: DataObjectValueSelector | null;
};

export declare type ObservableVariantAttributeSelector = VariantPropertySelector & {
    attribute: "ListPrice" | "SalesPrice";
};

export declare type ObservableVariantDataValueSelector = VariantPropertySelector & {
    dataObjectValueSelector?: DataObjectValueSelector | null;
};

export declare type OrCondition = UserCondition & {
    conditions?: UserConditionCollection | null;
};

export declare type Order = Trackable & {
    user?: User | null;
    subtotal: Money;
    lineItems: LineItem[];
    orderNumber: string;
    cartName: string;
    /** @deprecated */
    channel?: Channel | null;
    /** @deprecated */
    subChannel?: string | null;
    data?: Record<string, DataValue>;
    /** @deprecated */
    trackingNumber?: string | null;
};

export declare type OrFilter = Filter & {
    filters: (AndFilter | BrandAssortmentFilter | BrandDataFilter | BrandDataHasKeyFilter | BrandDisabledFilter | BrandIdFilter | CartDataFilter | CompanyDataFilter | CompanyDataHasKeyFilter | CompanyDisabledFilter | CompanyIdFilter | ContentAssortmentFilter | ContentCategoryAssortmentFilter | ContentCategoryDataFilter | ContentCategoryDataHasKeyFilter | ContentCategoryDisabledFilter | ContentCategoryHasAncestorFilter | ContentCategoryHasChildFilter | ContentCategoryHasContentsFilter | ContentCategoryHasParentFilter | ContentCategoryIdFilter | ContentCategoryLevelFilter | ContentCategoryRecentlyViewedByUserFilter | ContentDataFilter | ContentDataHasKeyFilter | ContentDisabledFilter | ContentHasCategoriesFilter | ContentIdFilter | ContentRecentlyViewedByUserFilter | OrFilter | ProductAndVariantIdFilter | ProductAssortmentFilter | ProductCategoryAssortmentFilter | ProductCategoryDataFilter | ProductCategoryDataHasKeyFilter | ProductCategoryDisabledFilter | ProductCategoryHasAncestorFilter | ProductCategoryHasChildFilter | ProductCategoryHasParentFilter | ProductCategoryHasProductsFilter | ProductCategoryIdFilter | ProductCategoryLevelFilter | ProductCategoryRecentlyViewedByUserFilter | ProductDataFilter | ProductDataHasKeyFilter | ProductDisabledFilter | ProductDisplayNameFilter | ProductHasCategoriesFilter | ProductHasVariantsFilter | ProductIdFilter | ProductInCartFilter | ProductListPriceFilter | ProductRecentlyPurchasedByCompanyFilter | ProductRecentlyPurchasedByUserCompanyFilter | ProductRecentlyPurchasedByUserFilter | ProductRecentlyPurchasedByUserParentCompanyFilter | ProductRecentlyViewedByCompanyFilter | ProductRecentlyViewedByUserCompanyFilter | ProductRecentlyViewedByUserFilter | ProductRecentlyViewedByUserParentCompanyFilter | ProductSalesPriceFilter | VariantAssortmentFilter | VariantDataFilter | VariantDataHasKeyFilter | VariantDisabledFilter | VariantIdFilter | VariantListPriceFilter | VariantSalesPriceFilter | VariantSpecificationFilter)[];
};

export declare interface OverriddenContentRecommendationRequestSettings {
    /** @format int32 */
    numberOfRecommendations?: number | null;
    allowFillIfNecessaryToReachNumberOfRecommendations?: boolean | null;
    allowReplacingOfRecentlyShownRecommendations?: boolean | null;
    selectedContentProperties?: OverriddenSelectedContentPropertiesSettings | null;
    custom?: Record<string, string | null>;
    prioritizeDiversityBetweenRequests?: boolean | null;
    /** @format int32 */
    prioritizeResultsNotRecommendedWithinSeconds?: number | null;
}

export declare interface OverriddenProductRecommendationRequestSettings {
    /** @format int32 */
    numberOfRecommendations?: number | null;
    allowFillIfNecessaryToReachNumberOfRecommendations?: boolean | null;
    allowReplacingOfRecentlyShownRecommendations?: boolean | null;
    recommendVariant?: boolean | null;
    selectedProductProperties?: OverriddenSelectedProductPropertiesSettings | null;
    selectedVariantProperties?: OverriddenSelectedVariantPropertiesSettings | null;
    custom?: Record<string, string | null>;
    prioritizeDiversityBetweenRequests?: boolean | null;
    allowProductsCurrentlyInCart?: boolean | null;
    selectedBrandProperties?: OverriddenSelectedBrandPropertiesSettings | null;
    /** @format int32 */
    prioritizeResultsNotRecommendedWithinSeconds?: number | null;
}

export declare interface OverriddenSelectedBrandPropertiesSettings {
    displayName?: boolean | null;
    assortments?: boolean | null;
    viewedByUserInfo?: boolean | null;
    allData?: boolean | null;
    dataKeys?: string[] | null;
}

export declare interface OverriddenSelectedContentPropertiesSettings {
    displayName?: boolean | null;
    categoryPaths?: boolean | null;
    assortments?: boolean | null;
    allData?: boolean | null;
    viewedByUserInfo?: boolean | null;
    dataKeys?: string[] | null;
}

export declare interface OverriddenSelectedProductPropertiesSettings {
    displayName?: boolean | null;
    categoryPaths?: boolean | null;
    assortments?: boolean | null;
    pricing?: boolean | null;
    allData?: boolean | null;
    viewedByUserInfo?: boolean | null;
    purchasedByUserInfo?: boolean | null;
    brand?: boolean | null;
    allVariants?: boolean | null;
    dataKeys?: string[] | null;
    score?: SelectedScorePropertiesSettings | null;
}

export declare interface OverriddenSelectedVariantPropertiesSettings {
    displayName?: boolean | null;
    pricing?: boolean | null;
    allSpecifications?: boolean | null;
    assortments?: boolean | null;
    allData?: boolean | null;
    dataKeys?: string[] | null;
    specificationKeys?: string[] | null;
}

export declare interface PaginatedSearchRequest {
    $type: string;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    language?: Language | null;
    currency?: Currency | null;
    user?: User | null;
    displayedAtLocation?: string | null;
    relevanceModifiers?: RelevanceModifierCollection | null;
    filters?: FilterCollection | null;
    indexSelector?: SearchIndexSelector | null;
    postFilters?: FilterCollection | null;
    /** @deprecated */
    channel?: Channel | null;
    custom?: Record<string, string | null>;
}

export declare interface PaginatedSearchResponse {
    /** @format int32 */
    hits: number;
    custom?: Record<string, string | null>;
    statistics?: Statistics | null;
}

export declare type Pagination = {
    take: number;
    skip: number;
};

export declare class PaginationBuilder {
    private pageNumber;
    private pageSize;
    /**
     * Defines how many results to return
     * @param pageSize
     * @returns
     */
    setPageSize(pageSize: number): this;
    /**
     * Page starts at 1, so this to skip 'X' pages of results
     * @param pageNumber
     * @returns
     */
    setPage(pageNumber: number): this;
    build(): Pagination;
}

export declare interface Parser {
    $type: string;
}

export declare type PartialUser<TKeys extends string> = Omit<User, TKeys>;

export declare class PersonalBrandRecommendationBuilder extends BrandSettingsRecommendationBuilder implements BrandsRecommendationBuilder<PersonalBrandRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: BrandRecommendationWeights): this;
    build(): PersonalBrandRecommendationRequest;
}

export declare type PersonalBrandRecommendationRequest = BrandRecommendationRequest & {
    /** @format int32 */
    sinceMinutesAgo: number;
    weights: BrandRecommendationWeights;
};

export declare class PersonalContentCategoryRecommendationBuilder extends ContentCategorySettingsRecommendationBuilder implements ContentCategoriesRecommendationBuilder<PersonalContentCategoryRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: ContentCategoryRecommendationWeights): this;
    build(): PersonalContentCategoryRecommendationRequest;
}

export declare type PersonalContentCategoryRecommendationRequest = ContentCategoryRecommendationRequest & {
    /** @format int32 */
    sinceMinutesAgo: number;
    weights: ContentCategoryRecommendationWeights;
};

export declare class PersonalContentRecommendationBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<PersonalContentRecommendationRequest> {
    constructor(settings: Settings);
    build(): ContentRecommendationRequest;
}

export declare type PersonalContentRecommendationRequest = ContentRecommendationRequest;

export declare class PersonalProductCategoryRecommendationBuilder extends ProductCategorySettingsRecommendationBuilder implements ProductCategoriesRecommendationBuilder<PersonalProductCategoryRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: ProductCategoryRecommendationWeights): this;
    build(): PersonalProductCategoryRecommendationRequest;
}

export declare type PersonalProductCategoryRecommendationRequest = ProductCategoryRecommendationRequest & {
    /** @format int32 */
    sinceMinutesAgo: number;
    weights: ProductCategoryRecommendationWeights;
};

export declare class PersonalProductRecommendationBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PersonalProductRecommendationRequest> {
    constructor(settings: Settings);
    build(): ProductRecommendationRequest;
}

export declare type PersonalProductRecommendationRequest = ProductRecommendationRequest;

export declare class PopularBrandsRecommendationBuilder extends BrandSettingsRecommendationBuilder implements BrandsRecommendationBuilder<PopularBrandsRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: BrandRecommendationWeights): this;
    build(): PopularBrandsRecommendationRequest;
}

export declare type PopularBrandsRecommendationRequest = BrandRecommendationRequest & {
    /** @format int32 */
    sinceMinutesAgo: number;
    weights: BrandRecommendationWeights;
};

export declare class PopularContentCategoriesRecommendationBuilder extends ContentCategorySettingsRecommendationBuilder implements ContentCategoriesRecommendationBuilder<PopularContentCategoriesRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: ContentCategoryRecommendationWeights): this;
    build(): PopularContentCategoriesRecommendationRequest;
}

export declare type PopularContentCategoriesRecommendationRequest = ContentCategoryRecommendationRequest & {
    /** @format int32 */
    sinceMinutesAgo: number;
    weights: ContentCategoryRecommendationWeights;
};

export declare class PopularContentsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<PopularContentsRequest> {
    private since;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    build(): PopularContentsRequest;
}

export declare type PopularContentsRequest = ContentRecommendationRequest & {
    /** @format int32 */
    sinceMinutesAgo: number;
};

export declare class PopularityMultiplierBuilder {
    private popularityMultiplierSelector;
    setDataKeyPopularityMultiplierSelector(selector: {
        key?: string | null;
    }): this;
    build(): PopularityMultiplierSelector | null;
}

export declare interface PopularityMultiplierSelector {
    $type: string;
}

export declare class PopularProductCategoriesRecommendationBuilder extends ProductCategorySettingsRecommendationBuilder implements ProductCategoriesRecommendationBuilder<PopularProductCategoriesRecommendationRequest> {
    private since;
    private weights;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setWeights(weights: ProductCategoryRecommendationWeights): this;
    build(): PopularProductCategoriesRecommendationRequest;
}

export declare type PopularProductCategoriesRecommendationRequest = ProductCategoryRecommendationRequest & {
    /** @format int32 */
    sinceMinutesAgo: number;
    weights: ProductCategoryRecommendationWeights;
};

export declare class PopularProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PopularProductsRequest> {
    private since;
    private basedOnSelection;
    private popularityMultiplierBuilder;
    constructor(settings: Settings);
    basedOn(basedOn: 'MostPurchased' | 'MostViewed'): this;
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    setPopularityMultiplier(popularityMultiplierBuilder: (popularityMultiplierBuilder: PopularityMultiplierBuilder) => void): this;
    build(): PopularProductsRequest;
}

export declare type PopularProductsRequest = ProductRecommendationRequest & {
    basedOn: "MostPurchased" | "MostViewed" | "LineRevenue";
    /** @format int32 */
    sinceMinutesAgo: number;
    popularityMultiplier?: DataKeyPopularityMultiplierSelector | null;
};

export declare class PopularSearchTermsRecommendationBuilder extends RecommendationRequestBuilder {
    term: string | null | undefined;
    recommendationSettings: RecommendPopularSearchTermSettings;
    constructor(settings: Settings);
    setTerm(term: string | null | undefined): this;
    addEntityType(...types: ('Product' | 'Variant' | 'ProductCategory' | 'Brand' | 'Content' | 'ContentCategory')[]): this;
    build(): PopularSearchTermsRecommendationRequest;
}

export declare type PopularSearchTermsRecommendationRequest = RecommendationRequest & {
    term?: string | null;
    settings?: RecommendPopularSearchTermSettings | null;
};

export declare interface PredictionConfiguration {
    includeInPredictions: boolean;
}

export declare type PredictionRule = SearchRule & {
    condition: SearchTermCondition | RetailMediaSearchTermCondition;
    promote?: PredictionRulePromotion | null;
    suppress?: PredictionRuleSuppression | null;
};

export declare interface PredictionRulePromotion {
    to: "Top" | "Bottom";
    values: string[];
}

export declare interface PredictionRuleSaveSearchRulesRequest {
    $type: string;
    rules: PredictionRule[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface PredictionRuleSaveSearchRulesResponse {
    $type: string;
    rules?: PredictionRule[] | null;
    statistics?: Statistics | null;
}

export declare interface PredictionRuleSearchRulesResponse {
    $type: string;
    rules?: PredictionRule[] | null;
    /** @format int32 */
    hits: number;
    statistics?: Statistics | null;
}

export declare type PredictionRulesRequest = PredictionRulesRequestSortBySearchRulesRequest;

export declare interface PredictionRulesRequestSortBySearchRulesRequest {
    $type: string;
    filters: SearchRuleFilters;
    sorting: PredictionRulesRequestSortBySorting;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface PredictionRulesRequestSortBySorting {
    sortBy: "Created" | "Modified";
    sortOrder: "Ascending" | "Descending";
}

export declare type PredictionRulesResponse = PredictionRuleSearchRulesResponse;

export declare interface PredictionRuleSuppression {
    condition: "Contains";
    values: string[];
}

export declare type PriceRangeFacet = Facet & {
    selected?: DecimalNullableRange | null;
    priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export declare type PriceRangeFacetResult = FacetResult & {
    selected?: DecimalNullableRange | null;
    available?: DecimalRangeAvailableFacetValue | null;
    priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export declare type PriceRangesFacet = Facet & {
    predefinedRanges?: DecimalNullableChainableRange[] | null;
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DecimalNullableChainableRange[] | null;
    priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export declare type PriceRangesFacetResult = FacetResult & {
    /** @format double */
    expandedRangeSize?: number | null;
    selected?: DecimalNullableChainableRange[] | null;
    available?: DecimalNullableChainableRangeAvailableFacetValue[] | null;
    priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export declare type PriceSelectionStrategy = PriceRangeFacetResult['priceSelectionStrategy'];

export declare class ProblemDetailsError extends Error {
    private _details?;
    get details(): HttpProblemDetails | undefined | null;
    constructor(message: string, details?: HttpProblemDetails | null);
}

export declare interface Product {
    id: string;
    displayName?: Multilingual | null;
    categoryPaths?: CategoryPath[] | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    custom?: Record<string, string>;
    listPrice?: MultiCurrency | null;
    salesPrice?: MultiCurrency | null;
    brand?: Brand | null;
}

export declare type ProductAdministrativeAction = Trackable & {
    filters: FilterCollection;
    language?: Language | null;
    productUpdateKind: "None" | "DisableInRecommendations" | "Disable" | "EnableInRecommendations" | "Enable" | "PermanentlyDelete" | "Delete";
    variantUpdateKind: "None" | "DisableInRecommendations" | "Disable" | "EnableInRecommendations" | "Enable" | "PermanentlyDelete" | "Delete";
    currency?: Currency | null;
};

export declare interface ProductAndVariantId {
    productId: string;
    variantId?: string | null;
}

export declare type ProductAndVariantIdFilter = Filter & {
    productAndVariantIds: ProductAndVariantId[];
};

export declare type ProductAssortmentFacet = AssortmentFacet & {
    assortmentSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export declare type ProductAssortmentFacetResult = AssortmentFacetResult & {
    assortmentSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export declare type ProductAssortmentFilter = Filter & {
    assortments: number[];
};

export declare type ProductAssortmentRelevanceModifier = RelevanceModifier & {
    assortments?: number[] | null;
    /** @format double */
    multiplyWeightBy: number;
};

export declare type ProductAttributeSorting = ProductSorting & {
    attribute: "Id" | "DisplayName" | "BrandId" | "BrandName" | "ListPrice" | "SalesPrice";
    mode: "Auto" | "Alphabetical" | "Numerical";
};

export declare interface ProductCategoriesRecommendationBuilder<TRequest = ProductCategoryRecommendationRequest> {
    build(): TRequest;
}

export declare class ProductCategoriesRecommendationCollectionBuilder {
    private requests;
    private distinctCategoriesAcrossResults;
    addRequest(request: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)): this;
    requireDistinctCategoriesAcrossResults(distinctCategoriesAcrossResults?: boolean): this;
    build(): ProductCategoryRecommendationRequestCollection;
}

export declare type ProductCategory = Category;

export declare type ProductCategoryAdministrativeAction = CategoryAdministrativeAction;

export declare type ProductCategoryAssortmentFacet = AssortmentFacet;

export declare type ProductCategoryAssortmentFacetResult = AssortmentFacetResult;

export declare type ProductCategoryAssortmentFilter = Filter & {
    assortments: number[];
};

export declare type ProductCategoryAttributeSorting = ProductCategorySorting & {
    attribute: "Id" | "DisplayName";
    mode: "Auto" | "Alphabetical" | "Numerical";
};

export declare type ProductCategoryDataBooleanValueFacet = BooleanProductCategoryDataValueFacet;

export declare type ProductCategoryDataBooleanValueFacetResult = BooleanProductCategoryDataValueFacetResult;

export declare type ProductCategoryDataDoubleRangeFacet = DoubleNullableProductCategoryDataRangeFacet;

export declare type ProductCategoryDataDoubleRangeFacetResult = DoubleNullableProductCategoryDataRangeFacetResult;

export declare type ProductCategoryDataDoubleRangesFacet = DoubleNullableProductCategoryDataRangesFacet;

export declare type ProductCategoryDataDoubleRangesFacetResult = DoubleNullableProductCategoryDataRangesFacetResult;

export declare type ProductCategoryDataDoubleValueFacet = DoubleProductCategoryDataValueFacet;

export declare type ProductCategoryDataDoubleValueFacetResult = DoubleProductCategoryDataValueFacetResult;

export declare type ProductCategoryDataFilter = DataFilter;

export declare type ProductCategoryDataHasKeyFilter = Filter & {
    key: string;
};

export declare type ProductCategoryDataObjectFacet = DataObjectFacet;

export declare type ProductCategoryDataObjectFacetResult = DataObjectFacetResult;

export declare type ProductCategoryDataRelevanceModifier = DataRelevanceModifier;

export declare type ProductCategoryDataSorting = ProductCategorySorting & {
    key?: string | null;
    mode: "Auto" | "Alphabetical" | "Numerical";
};

export declare type ProductCategoryDataStringValueFacet = StringProductCategoryDataValueFacet;

export declare type ProductCategoryDataStringValueFacetResult = StringProductCategoryDataValueFacetResult;

export declare type ProductCategoryDetailsCollectionResponse = TimedResponse & {
    categories?: ProductCategoryResultDetails[] | null;
    /** @format int32 */
    totalNumberOfResults?: number | null;
};

export declare type ProductCategoryDisabledFilter = Filter;

export declare type ProductCategoryFacetQuery = FacetQuery & {
    items: (ContentAssortmentFacet | ProductAssortmentFacet | ProductCategoryAssortmentFacet | BrandFacet | CategoryFacet | CategoryHierarchyFacet | ContentDataObjectFacet | ContentDataDoubleRangeFacet | ContentDataDoubleRangesFacet | ContentDataStringValueFacet | ContentDataBooleanValueFacet | ContentDataDoubleValueFacet | ContentDataIntegerValueFacet | DataObjectFacet | DataObjectDoubleRangeFacet | DataObjectDoubleRangesFacet | DataObjectStringValueFacet | DataObjectBooleanValueFacet | DataObjectDoubleValueFacet | PriceRangeFacet | PriceRangesFacet | ProductCategoryDataObjectFacet | ProductCategoryDataDoubleRangeFacet | ProductCategoryDataDoubleRangesFacet | ProductCategoryDataStringValueFacet | ProductCategoryDataBooleanValueFacet | ProductCategoryDataDoubleValueFacet | ProductDataObjectFacet | ProductDataDoubleRangeFacet | ProductDataDoubleRangesFacet | ProductDataStringValueFacet | ProductDataBooleanValueFacet | ProductDataDoubleValueFacet | ProductDataIntegerValueFacet | RecentlyPurchasedFacet | VariantSpecificationFacet)[];
};

export declare interface ProductCategoryFacetResult {
    items?: (ProductAssortmentFacetResult | ContentAssortmentFacetResult | ProductCategoryAssortmentFacetResult | BrandFacetResult | CategoryFacetResult | CategoryHierarchyFacetResult | ContentDataObjectFacetResult | ContentDataDoubleRangeFacetResult | ContentDataDoubleRangesFacetResult | ContentDataStringValueFacetResult | ContentDataBooleanValueFacetResult | ContentDataDoubleValueFacetResult | ContentDataIntegerValueFacetResult | DataObjectFacetResult | DataObjectDoubleRangeFacetResult | DataObjectDoubleRangesFacetResult | DataObjectStringValueFacetResult | DataObjectBooleanValueFacetResult | DataObjectDoubleValueFacetResult | PriceRangeFacetResult | PriceRangesFacetResult | ProductCategoryDataObjectFacetResult | ProductCategoryDataDoubleRangeFacetResult | ProductCategoryDataDoubleRangesFacetResult | ProductCategoryDataStringValueFacetResult | ProductCategoryDataBooleanValueFacetResult | ProductCategoryDataDoubleValueFacetResult | ProductDataObjectFacetResult | ProductDataDoubleRangeFacetResult | ProductDataDoubleRangesFacetResult | ProductDataStringValueFacetResult | ProductDataBooleanValueFacetResult | ProductDataDoubleValueFacetResult | ProductDataIntegerValueFacetResult | RecentlyPurchasedFacetResult | VariantSpecificationFacetResult)[] | null;
}

export declare type ProductCategoryHasAncestorFilter = HasAncestorCategoryFilter;

export declare type ProductCategoryHasChildFilter = HasChildCategoryFilter;

export declare type ProductCategoryHasParentFilter = HasParentCategoryFilter;

export declare type ProductCategoryHasProductsFilter = Filter;

export declare type ProductCategoryIdFilter = CategoryIdFilter;

export declare interface ProductCategoryIdFilterCategoryQuery {
    $type: string;
    filters: FilterCollection;
    /** @format int32 */
    numberOfResults: number;
    language?: Language | null;
    currency?: Currency | null;
    /** @format int32 */
    skipNumberOfResults: number;
    returnTotalNumberOfResults: boolean;
    includeDisabledCategories: boolean;
    /** @format int32 */
    includeChildCategoriesToDepth: number;
    /** @format int32 */
    includeParentCategoriesToDepth: number;
    custom?: Record<string, string | null>;
}

export declare type ProductCategoryIdRelevanceModifier = RelevanceModifier & {
    categoryId?: string | null;
    evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor";
    /** @format double */
    multiplyWeightBy: number;
    negated: boolean;
};

export declare type ProductCategoryIndexConfiguration = CategoryIndexConfiguration;

export declare type ProductCategoryInterestTriggerConfiguration = ProductCategoryInterestTriggerResultTriggerConfiguration & {
    categoryViews?: Int32NullableRange | null;
    productViews?: Int32NullableRange | null;
    filters?: FilterCollection | null;
};

export declare interface ProductCategoryInterestTriggerResultTriggerConfiguration {
    $type: string;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    /** @format int32 */
    withinTimeSpanMinutes: number;
    settings?: Record<string, string | null>;
    userConditions?: UserConditionCollection | null;
}

export declare type ProductCategoryLevelFilter = CategoryLevelFilter;

export declare type ProductCategoryPopularitySorting = ProductCategorySorting;

export declare type ProductCategoryQuery = ProductCategoryIdFilterCategoryQuery;

export declare type ProductCategoryRecentlyViewedByUserFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductCategoryRecentlyViewedByUserRelevanceModifier = RecentlyViewedByUserRelevanceModifier;

export declare interface ProductCategoryRecommendationRequest {
    $type: string;
    settings: ProductCategoryRecommendationRequestSettings;
    language?: Language | null;
    user?: User | null;
    relevanceModifiers: RelevanceModifierCollection;
    filters: FilterCollection;
    displayedAtLocationType: string;
    currency?: Currency | null;
    /** @deprecated */
    channel?: Channel | null;
    custom?: Record<string, string | null>;
}

export declare type ProductCategoryRecommendationRequestCollection = LicensedRequest & {
    requests?: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)[] | null;
    requireDistinctCategoriesAcrossResults: boolean;
};

export declare interface ProductCategoryRecommendationRequestSettings {
    /** @format int32 */
    numberOfRecommendations: number;
    allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
    allowReplacingOfRecentlyShownRecommendations: boolean;
    prioritizeDiversityBetweenRequests: boolean;
    selectedProductCategoryProperties?: SelectedProductCategoryPropertiesSettings | null;
    custom?: Record<string, string | null>;
    /** @format int32 */
    prioritizeResultsNotRecommendedWithinSeconds?: number | null;
}

export declare type ProductCategoryRecommendationResponse = RecommendationResponse & {
    recommendations?: ProductCategoryResult[] | null;
};

export declare type ProductCategoryRecommendationResponseCollection = TimedResponse & {
    responses?: ProductCategoryRecommendationResponse[] | null;
};

export declare interface ProductCategoryRecommendationWeights {
    /** @format double */
    categoryViews: number;
    /** @format double */
    productViews: number;
    /** @format double */
    productPurchases: number;
}

export declare type ProductCategoryRelevanceSorting = ProductCategorySorting;

export declare type ProductCategoryResult = CategoryResult;

export declare type ProductCategoryResultDetails = ProductCategoryResultDetailsCategoryResultDetails & {
    /** @format int32 */
    purchasedFromByDifferentNumberOfUsers: number;
    purchasedByUser?: PurchasedByUserInfo | null;
};

export declare interface ProductCategoryResultDetailsCategoryResultDetails {
    $type: string;
    categoryId?: string | null;
    displayName?: Multilingual | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    viewedByUser?: ViewedByUserInfo | null;
    /** @format date-time */
    createdUtc: string;
    /** @format date-time */
    lastViewedUtc?: string | null;
    /** @format int64 */
    viewedTotalNumberOfTimes: number;
    /** @format int32 */
    viewedByDifferentNumberOfUsers: number;
    disabled: boolean;
    custom?: Record<string, string | null>;
    childCategories?: ProductCategoryResultDetails[] | null;
    parentCategories?: ProductCategoryResultDetails[] | null;
}

export declare class ProductCategorySearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder;
    private paginationBuilder;
    private sortingBuilder;
    private term;
    private searchSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the product category to be returned, by default only the product category id is returned.
     * @param productCategoryProperties
     */
    setSelectedCategoryProperties(productCategoryProperties: Partial<SelectedProductCategoryPropertiesSettings> | null): this;
    setRecommendationSettings(settings: RecommendationSettings): this;
    /**
     * Set the term used to filter product categories by
     */
    setTerm(term: string | null | undefined): this;
    pagination(paginate: (pagination: PaginationBuilder) => void): this;
    facets(facets: (facets: FacetBuilder) => void): this;
    sorting(sorting: (sortingBuilder: ProductCategorySortingBuilder) => void): this;
    build(): ProductCategorySearchRequest;
}

export declare type ProductCategorySearchRequest = PaginatedSearchRequest & {
    term?: string | null;
    settings?: ProductCategorySearchSettings | null;
    facets?: ProductCategoryFacetQuery | null;
    sorting?: ProductCategorySortBySpecification | null;
};

export declare type ProductCategorySearchResponse = PaginatedSearchResponse & {
    results?: ProductCategoryResult[] | null;
    facets?: ProductCategoryFacetResult | null;
    recommendations?: ProductCategoryResult[] | null;
};

export declare type ProductCategorySearchSettings = SearchSettings & {
    selectedCategoryProperties?: SelectedProductCategoryPropertiesSettings | null;
    recommendations: RecommendationSettings;
};

export declare class ProductCategorySettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ProductCategoryRecommendationRequestSettings;
    constructor(settings: Settings);
    setProductCategoryProperties(ProductCategoryProperties: Partial<SelectedProductCategoryPropertiesSettings>): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
}

export declare interface ProductCategorySortBySpecification {
    value?: ProductCategoryAttributeSorting | ProductCategoryDataSorting | ProductCategoryPopularitySorting | ProductCategoryRelevanceSorting | null;
}

export declare interface ProductCategorySorting {
    $type: string;
    order: "Ascending" | "Descending";
    thenBy?: ProductCategoryAttributeSorting | ProductCategoryDataSorting | ProductCategoryPopularitySorting | ProductCategoryRelevanceSorting | null;
}

export declare class ProductCategorySortingBuilder {
    private value;
    sortByProductCategoryData(key: string, order?: 'Ascending' | 'Descending', mode?: 'Auto' | 'Alphabetical' | 'Numerical', thenBy?: (thenBy: ProductCategorySortingBuilder) => void): void;
    sortByProductCategoryRelevance(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductCategorySortingBuilder) => void): void;
    sortByProductCategoryPopularity(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductCategorySortingBuilder) => void): void;
    sortByProductCategoryAttribute(attribute: 'Id' | 'DisplayName', order: 'Ascending' | 'Descending', mode?: 'Auto' | 'Alphabetical' | 'Numerical', thenBy?: (thenBy: ProductCategorySortingBuilder) => void): void;
    private thenBy;
    build(): ProductCategorySortBySpecification | null;
}

export declare type ProductCategoryUpdate = CategoryUpdate & {
    category?: ProductCategory | null;
};

export declare type ProductCategoryView = Trackable & {
    user?: User | null;
    idPath: string[];
    /** @deprecated */
    channel?: Channel | null;
};

export declare type ProductChangeTriggerConfiguration = ProductChangeTriggerResultProductChangeTriggerResultSettingsProductPropertySelectorEntityChangeTriggerConfiguration;

export declare interface ProductChangeTriggerResultProductChangeTriggerResultSettingsProductPropertySelectorEntityChangeTriggerConfiguration {
    $type: string;
    entityPropertySelector: ObservableProductAttributeSelector | ObservableProductDataValueSelector;
    beforeChangeFilters: FilterCollection;
    afterChangeFilters: FilterCollection;
    change: IChange;
    resultSettings: ProductChangeTriggerResultSettings;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    /** @format int32 */
    withinTimeSpanMinutes: number;
    settings?: Record<string, string | null>;
    userConditions?: UserConditionCollection | null;
}

export declare interface ProductChangeTriggerResultSettings {
    selectedProductProperties?: SelectedProductDetailsPropertiesSettings | null;
    selectedVariantProperties?: SelectedVariantDetailsPropertiesSettings | null;
}

export declare type ProductDataBooleanValueFacet = BooleanProductDataValueFacet;

export declare type ProductDataBooleanValueFacetResult = BooleanProductDataValueFacetResult;

export declare type ProductDataDoubleRangeFacet = DoubleNullableProductDataRangeFacet;

export declare type ProductDataDoubleRangeFacetResult = DoubleNullableProductDataRangeFacetResult;

export declare type ProductDataDoubleRangesFacet = DoubleNullableProductDataRangesFacet;

export declare type ProductDataDoubleRangesFacetResult = DoubleNullableProductDataRangesFacetResult;

export declare type ProductDataDoubleValueFacet = DoubleProductDataValueFacet;

export declare type ProductDataDoubleValueFacetResult = DoubleProductDataValueFacetResult;

export declare type ProductDataFilter = DataFilter;

export declare type ProductDataHasKeyFilter = Filter & {
    key: string;
};

export declare type ProductDataIntegerValueFacet = Int32ProductDataValueFacet;

export declare type ProductDataIntegerValueFacetResult = Int32ProductDataValueFacetResult;

export declare type ProductDataObjectFacet = DataObjectFacet & {
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export declare type ProductDataObjectFacetResult = DataObjectFacetResult & {
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export declare type ProductDataObjectSorting = ProductSorting & {
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    mode: "Auto" | "Alphabetical" | "Numerical";
    valueSelector: DataObjectValueSelector;
};

export declare type ProductDataRelevanceModifier = DataRelevanceModifier;

export declare type ProductDataSorting = ProductSorting & {
    key?: string | null;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    mode: "Auto" | "Alphabetical" | "Numerical";
};

export declare type ProductDataStringValueFacet = StringProductDataValueFacet;

export declare type ProductDataStringValueFacetResult = StringProductDataValueFacetResult;

export declare type ProductDetailsCollectionResponse = TimedResponse & {
    products?: ProductResultDetails[] | null;
    /** @format int32 */
    totalNumberOfResults?: number | null;
    /** @format uuid */
    nextPageToken?: string | null;
};

export declare type ProductDisabledFilter = Filter;

export declare type ProductDisplayNameFilter = Filter & {
    language?: Language | null;
    conditions?: ValueConditionCollection | null;
    mustMatchAllConditions: boolean;
};

export declare type ProductFacetQuery = FacetQuery & {
    items: (ContentAssortmentFacet | ProductAssortmentFacet | ProductCategoryAssortmentFacet | BrandFacet | CategoryFacet | CategoryHierarchyFacet | ContentDataObjectFacet | ContentDataDoubleRangeFacet | ContentDataDoubleRangesFacet | ContentDataStringValueFacet | ContentDataBooleanValueFacet | ContentDataDoubleValueFacet | ContentDataIntegerValueFacet | DataObjectFacet | DataObjectDoubleRangeFacet | DataObjectDoubleRangesFacet | DataObjectStringValueFacet | DataObjectBooleanValueFacet | DataObjectDoubleValueFacet | PriceRangeFacet | PriceRangesFacet | ProductCategoryDataObjectFacet | ProductCategoryDataDoubleRangeFacet | ProductCategoryDataDoubleRangesFacet | ProductCategoryDataStringValueFacet | ProductCategoryDataBooleanValueFacet | ProductCategoryDataDoubleValueFacet | ProductDataObjectFacet | ProductDataDoubleRangeFacet | ProductDataDoubleRangesFacet | ProductDataStringValueFacet | ProductDataBooleanValueFacet | ProductDataDoubleValueFacet | ProductDataIntegerValueFacet | RecentlyPurchasedFacet | VariantSpecificationFacet)[];
};

export declare interface ProductFacetResult {
    items?: (ProductAssortmentFacetResult | ContentAssortmentFacetResult | ProductCategoryAssortmentFacetResult | BrandFacetResult | CategoryFacetResult | CategoryHierarchyFacetResult | ContentDataObjectFacetResult | ContentDataDoubleRangeFacetResult | ContentDataDoubleRangesFacetResult | ContentDataStringValueFacetResult | ContentDataBooleanValueFacetResult | ContentDataDoubleValueFacetResult | ContentDataIntegerValueFacetResult | DataObjectFacetResult | DataObjectDoubleRangeFacetResult | DataObjectDoubleRangesFacetResult | DataObjectStringValueFacetResult | DataObjectBooleanValueFacetResult | DataObjectDoubleValueFacetResult | PriceRangeFacetResult | PriceRangesFacetResult | ProductCategoryDataObjectFacetResult | ProductCategoryDataDoubleRangeFacetResult | ProductCategoryDataDoubleRangesFacetResult | ProductCategoryDataStringValueFacetResult | ProductCategoryDataBooleanValueFacetResult | ProductCategoryDataDoubleValueFacetResult | ProductDataObjectFacetResult | ProductDataDoubleRangeFacetResult | ProductDataDoubleRangesFacetResult | ProductDataStringValueFacetResult | ProductDataBooleanValueFacetResult | ProductDataDoubleValueFacetResult | ProductDataIntegerValueFacetResult | RecentlyPurchasedFacetResult | VariantSpecificationFacetResult)[] | null;
}

export declare class ProductFilterBuilder extends FilterBuilderBase<ProductFilterBuilder> {
    constructor();
    /**
     * Adds a product assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within the specified categories.
     * @param evaluationScope - Scope of the category evaluation (ImmediateParent, ImmediateParentOrItsParent, Ancestor).
     * @param categoryIds - Array of category IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated?: boolean, options?: FilterOptions): this;
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
    addProductCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Filters the request to only return the specified products.
     * @param productIds - Array of product IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductIdFilter(productIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a range filter to the request ensuring the product has a certain range of variants.
     * @param lowerBound - Lower bound of the range (inclusive).
     * @param upperBound - Upper bound of the range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions & {
        includeDisabled?: boolean;
    }): this;
    /**
     * Filters the request to only return products purchased since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products viewed since a certain point in time.
     * @param sinceUtc - Date-time string indicating the point in time.
     * @param negated - If true

     , negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserFilter(sinceUtc: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return products within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product display name filter to the request.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductDisplayNameFilter(conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product and variant ID filter to the request.
     * @param products - Array of product and variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductAndVariantIdFilter(products: ProductAndVariantId | ProductAndVariantId[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category level filter to the request.
     * @param levels - Array of category levels or a single level.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryLevelFilter(levels: number | number[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has parent filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryHasParentFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has child filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryHasChildFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has ancestor filter to the request.
     * @param categoryIds - Array of category IDs or a single ID (optional).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryHasAncestorFilter(categoryIds?: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category has products filter to the request ensuring that only categories with products in them are returned.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryHasProductsFilter(negated?: boolean, options?: FilterOptions): this;
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
    addProductDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a product category has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product category recently viewed by user filter to the request.
     * @param sinceMinutesAgo - Time in minutes since the category was viewed.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductDisabledFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a product has categories filter to the request.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductHasCategoriesFilter(negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by a company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently purchased by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the purchase.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyPurchasedByUserParentCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by a company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param companyIds - Array of company IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByCompanyFilter(sinceMinutesAgo: number, companyIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by the user's company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products recently viewed by the user's parent company.
     * @param sinceMinutesAgo - Time in minutes since the view.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductRecentlyViewedByUserParentCompanyFilter(sinceMinutesAgo: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a filter to only return products in the user's cart.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The ProductFilterBuilder instance for chaining.
     */
    addProductInCartFilter(negated?: boolean, options?: FilterOptions): this;
}

export declare type ProductHasCategoriesFilter = Filter;

export declare type ProductHasVariantsFilter = Filter & {
    numberOfVariants: Int32NullableRange;
    includeDisabled: boolean;
};

export declare class ProductHighlightingBuilder {
    private enabledState;
    private highlightable;
    private limit;
    private shape;
    enabled(enabled: boolean): this;
    setHighlightable(highlightable: {
        displayName?: boolean;
        dataKeys?: string[] | null;
    }): this;
    setLimit(limit: HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits): this;
    setShape(shape: HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape): this;
    build(): ProductSearchSettingsHighlightSettings;
}

export declare interface ProductHighlightProperties {
    $type: string;
    displayName: boolean;
    dataKeys?: string[] | null;
}

export declare type ProductHighlightProps = ProductHighlightProperties;

export declare type ProductIdFilter = Filter & {
    productIds: string[];
};

export declare type ProductIdRelevanceModifier = RelevanceModifier & {
    productIds?: string[] | null;
    /** @format double */
    multiplyWeightBy: number;
    negated: boolean;
};

export declare type ProductInCartFilter = Filter;

export declare interface ProductIndexConfiguration {
    id?: FieldIndexConfiguration | null;
    displayName?: FieldIndexConfiguration | null;
    category?: CategoryIndexConfiguration | ProductCategoryIndexConfiguration | null;
    brand?: BrandIndexConfiguration | null;
    data?: DataIndexConfiguration | null;
    variants?: VariantIndexConfiguration | null;
}

export declare type ProductInterestTriggerConfiguration = ProductInterestTriggerResultTriggerConfiguration & {
    productViews?: Int32NullableRange | null;
    filters?: FilterCollection | null;
    resultSettings?: ProductInterestTriggerResultResultSettings | null;
};

export declare interface ProductInterestTriggerResultResultSettings {
    selectedProductProperties?: SelectedProductDetailsPropertiesSettings | null;
    selectedVariantProperties?: SelectedVariantDetailsPropertiesSettings | null;
}

export declare interface ProductInterestTriggerResultTriggerConfiguration {
    $type: string;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    /** @format int32 */
    withinTimeSpanMinutes: number;
    settings?: Record<string, string | null>;
    userConditions?: UserConditionCollection | null;
}

export declare type ProductListPriceFilter = Filter & {
    range: DecimalNullableRange;
    currency?: Currency | null;
};

export declare type ProductListPriceRelevanceModifier = RelevanceModifier & {
    range: DecimalNullableRange;
    currency?: Currency | null;
    /** @format double */
    multiplyWeightBy: number;
    negated: boolean;
};

export declare type ProductPerformanceRequest = AnalyzerRequest & {
    /** @format int64 */
    fromUnixTimeSeconds: number;
    /** @format int64 */
    toUnixTimeSeconds: number;
    filters?: FilterCollection | null;
    /** @format int32 */
    numberOfResults: number;
    /** @format int32 */
    skipNumberOfResults: number;
    byVariant: boolean;
    selectedProductProperties?: SelectedProductPropertiesSettings | null;
    selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
    orderBy: "Created" | "Views" | "Sales" | "CartsOpened" | "RankByView" | "RankBySales";
    variantData: "FromVariant" | "FromProduct" | "FromProductDividedByVariants";
    classifications?: StringStringKeyValuePair[] | null;
    selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
};

export declare type ProductPerformanceResponse = TimedResponse & {
    results?: ProductPerformanceResult[] | null;
    /** @format int32 */
    totalNumberOfResults: number;
    /** @format int32 */
    remainingNumberOfResults: number;
};

export declare interface ProductPerformanceResult {
    product?: ProductResult | null;
    classifications?: ProductPerformanceResultClassificationMetrics[] | null;
}

export declare interface ProductPerformanceResultCartMetrics {
    /** @format int32 */
    opened: number;
}

export declare interface ProductPerformanceResultCategoryMetrics {
    category?: CategoryNameAndIdResult | null;
    immediateParent: boolean;
    rank?: ProductPerformanceResultViewsAndSalesMetrics | null;
}

export declare interface ProductPerformanceResultClassificationMetrics {
    combination?: Record<string, string | null>;
    views?: ProductPerformanceResultViewsMetrics | null;
    sales?: ProductPerformanceResultSalesMetrics | null;
    carts?: ProductPerformanceResultCartMetrics | null;
    rank?: ProductPerformanceResultRankMetrics | null;
}

export declare interface ProductPerformanceResultRankMetrics {
    overall?: ProductPerformanceResultViewsAndSalesMetrics | null;
    withinCategories?: ProductPerformanceResultCategoryMetrics[] | null;
    withinBrand?: ProductPerformanceResultViewsAndSalesMetrics | null;
}

export declare interface ProductPerformanceResultSalesByCurrency {
    currency?: Currency | null;
    /** @format int32 */
    orders: number;
    /** @format double */
    averageSubtotal: number;
    /** @format double */
    units: number;
    /** @format double */
    revenue: number;
}

export declare interface ProductPerformanceResultSalesMetrics {
    /** @format int32 */
    orders: number;
    /** @format double */
    averageNoOfLineItems: number;
    currencies?: ProductPerformanceResultSalesByCurrency[] | null;
    withKnownCartOpener?: ProductPerformanceResultSalesWithKnownCartOpenerMetrics | null;
}

export declare interface ProductPerformanceResultSalesWithKnownCartOpenerMetrics {
    /** @format int32 */
    orders: number;
    /** @format int32 */
    opened: number;
    /** @format double */
    openedPercent: number;
}

export declare interface ProductPerformanceResultViewsAndSalesMetrics {
    /** @format double */
    byViews: number;
    /** @format double */
    bySales: number;
}

export declare interface ProductPerformanceResultViewsMetrics {
    /** @format int32 */
    total: number;
}

export declare type ProductPopularitySorting = ProductSorting;

export declare interface ProductProductHighlightPropsHighlightSettings {
    $type: string;
    enabled: boolean;
    limit: HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits;
    highlightable: ProductHighlightProps;
    shape: HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape;
}

export declare type ProductPromotion = Promotion & {
    filters?: FilterCollection | null;
    conditions?: ProductPromotionPromotionConditions | null;
};

export declare type ProductPromotionPromotionConditions = RetailMediaConditions & {
    searchTerm?: RetailMediaSearchTermConditionCollection | null;
};

export declare type ProductPromotionSpecification = PromotionSpecification & {
    promotableProducts?: FilterCollection | null;
};

export declare type ProductPromotionSpecificationVariation = PromotionSpecificationVariation & {
    /** @format int32 */
    maxCount: number;
};

export declare interface ProductPropertySelector {
    $type: string;
}

export declare type ProductQuery = LicensedRequest & {
    filters?: FilterCollection | null;
    /**
     * @deprecated
     * @format int32
     */
    numberOfResults: number;
    language?: Language | null;
    currency?: Currency | null;
    /**
     * @deprecated
     * @format int32
     */
    skipNumberOfResults: number;
    returnTotalNumberOfResults: boolean;
    includeDisabledProducts: boolean;
    includeDisabledVariants: boolean;
    excludeProductsWithNoVariants: boolean;
    /** @format uuid */
    nextPageToken?: string | null;
    /** @format int32 */
    pageSize?: number | null;
    resultSettings?: ProductQuerySelectedPropertiesSettings | null;
};

export declare interface ProductQuerySelectedPropertiesSettings {
    selectedProductDetailsProperties?: SelectedProductDetailsPropertiesSettings | null;
    selectedVariantDetailsProperties?: SelectedVariantDetailsPropertiesSettings | null;
}

export declare type ProductRecentlyPurchasedByCompanyFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    companyIds: string[];
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyPurchasedByCompanyRelevanceModifier = RelevanceModifier & {
    /** @format date-time */
    sinceUtc?: string | null;
    companyIds?: string[] | null;
    /** @format double */
    ifPurchasedByCompanyMultiplyWeightBy: number;
    /** @format double */
    elseIfNotPurchasedByCompanyMultiplyWeightBy: number;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyPurchasedByUserCompanyFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyPurchasedByUserCompanyRelevanceModifier = RelevanceModifier & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format double */
    ifPurchasedByCompanyMultiplyWeightBy: number;
    /** @format double */
    elseIfPurchasedByParentCompanyMultiplyWeightBy: number;
    /** @format double */
    elseIfNotPurchasedByEitherCompanyMultiplyWeightBy: number;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyPurchasedByUserFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyPurchasedByUserParentCompanyFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyPurchasedByUserRelevanceModifier = RelevanceModifier & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format double */
    ifPreviouslyPurchasedByUserMultiplyWeightBy: number;
    /** @format double */
    ifNotPreviouslyPurchasedByUserMultiplyWeightBy: number;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyViewedByCompanyFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    companyIds: string[];
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyViewedByCompanyRelevanceModifier = RelevanceModifier & {
    /** @format date-time */
    sinceUtc?: string | null;
    companyIds?: string[] | null;
    /** @format double */
    ifViewedByCompanyMultiplyWeightBy: number;
    /** @format double */
    elseIfNotViewedByCompanyMultiplyWeightBy: number;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyViewedByUserCompanyFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyViewedByUserCompanyRelevanceModifier = RelevanceModifier & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format double */
    ifViewedByUserCompanyMultiplyWeightBy: number;
    /** @format double */
    elseIfViewedByUserParentCompanyMultiplyWeightBy: number;
    /** @format double */
    elseIfNotViewedByEitherCompanyMultiplyWeightBy: number;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyViewedByUserFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyViewedByUserParentCompanyFilter = Filter & {
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
};

export declare type ProductRecentlyViewedByUserRelevanceModifier = RecentlyViewedByUserRelevanceModifier;

export declare interface ProductRecommendationRequest {
    $type: string;
    settings: ProductRecommendationRequestSettings;
    language?: Language | null;
    user?: User | null;
    relevanceModifiers: RelevanceModifierCollection;
    filters: FilterCollection;
    displayedAtLocationType: string;
    currency?: Currency | null;
    /** @deprecated */
    channel?: Channel | null;
    custom?: Record<string, string | null>;
}

export declare type ProductRecommendationRequestCollection = LicensedRequest & {
    requests?: (CustomProductRecommendationRequest | PersonalProductRecommendationRequest | PopularProductsRequest | ProductsViewedAfterViewingContentRequest | ProductsViewedAfterViewingProductRequest | PurchasedWithCurrentCartRequest | PurchasedWithMultipleProductsRequest | PurchasedWithProductRequest | RecentlyViewedProductsRequest | SearchTermBasedProductRecommendationRequest | SimilarProductsRequest | SortProductsRequest | SortVariantsRequest)[] | null;
    requireDistinctProductsAcrossResults: boolean;
};

export declare interface ProductRecommendationRequestSettings {
    /** @format int32 */
    numberOfRecommendations: number;
    allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
    allowReplacingOfRecentlyShownRecommendations: boolean;
    recommendVariant: boolean;
    selectedProductProperties?: SelectedProductPropertiesSettings | null;
    selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
    custom?: Record<string, string>;
    prioritizeDiversityBetweenRequests: boolean;
    allowProductsCurrentlyInCart?: boolean | null;
    selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
    /** @format int32 */
    prioritizeResultsNotRecommendedWithinSeconds?: number | null;
}

export declare type ProductRecommendationResponse = RecommendationResponse & {
    recommendations?: ProductResult[] | null;
};

export declare type ProductRecommendationResponseCollection = TimedResponse & {
    responses?: ProductRecommendationResponse[] | null;
};

export declare type ProductRelevanceSorting = ProductSorting;

export declare interface ProductResult {
    productId?: string | null;
    displayName?: string | null;
    variant?: VariantResult | null;
    /** @format int32 */
    rank: number;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    categoryPaths?: CategoryPathResult[] | null;
    purchasedByUser?: PurchasedByUserInfo | null;
    viewedByUser?: ViewedByUserInfo | null;
    custom?: Record<string, string | null>;
    /** @format double */
    listPrice?: number | null;
    /** @format double */
    salesPrice?: number | null;
    brand?: BrandResult | null;
    allVariants?: VariantResult[] | null;
    purchasedByUserCompany?: PurchasedByUserCompanyInfo | null;
    viewedByUserCompany?: ViewedByUserCompanyInfo | null;
    filteredVariants?: VariantResult[] | null;
    highlight?: HighlightResult | null;
    score?: Score | null;
}

export declare interface ProductResultDetails {
    productId?: string | null;
    displayName?: Multilingual | null;
    /** @deprecated */
    variant?: VariantResult | null;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    categoryPaths?: CategoryPathResultDetails[] | null;
    purchasedByUser?: PurchasedByUserInfo | null;
    viewedByUser?: ViewedByUserInfo | null;
    custom?: Record<string, string | null>;
    allVariants?: VariantResultDetails[] | null;
    /** @format date-time */
    createdUtc: string;
    /** @format date-time */
    lastPurchasedUtc?: string | null;
    /** @format date-time */
    lastViewedUtc?: string | null;
    /** @format int64 */
    containedInTotalNumberOfOrders: number;
    /** @format int64 */
    viewedTotalNumberOfTimes: number;
    /** @format int32 */
    purchasedByDifferentNumberOfUsers: number;
    /** @format int32 */
    viewedByDifferentNumberOfUsers: number;
    disabled: boolean;
    deleted: boolean;
    listPrice?: MultiCurrency | null;
    salesPrice?: MultiCurrency | null;
    brand?: BrandResultDetails | null;
    filteredVariants?: VariantResultDetails[] | null;
}

export declare type ProductSalesPriceFilter = Filter & {
    range: DecimalNullableRange;
    currency?: Currency | null;
};

export declare type ProductSalesPriceRelevanceModifier = RelevanceModifier & {
    range: DecimalNullableRange;
    currency?: Currency | null;
    /** @format double */
    multiplyWeightBy: number;
    negated: boolean;
};

export declare class ProductSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder;
    private retailMediaQuery;
    private paginationBuilder;
    private sortingBuilder;
    private searchConstraintBuilder;
    private term;
    private highlightingBuilder;
    private searchSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the product to be returned, by default only the product id is returned.
     * @param productProperties
     */
    setSelectedProductProperties(productProperties: Partial<SelectedProductPropertiesSettings> | null): this;
    /**
     * Select the properties of the variant to be returned, by default only the variant id is returned.
     * @param variantProperties
     */
    setSelectedVariantProperties(variantProperties: Partial<SelectedVariantPropertiesSettings> | null): this;
    /**
     * Select the properties of the brand to be returned, by default only the brand id is returned.
     * @param brandProperties
     */
    setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings> | null): this;
    setVariantSearchSettings(variantSearchSettings: Partial<VariantSearchSettings>): this;
    setExplodedVariants(count?: number | null): this;
    setRecommendationSettings(settings: RecommendationSettings): this;
    setRetailMedia(query: RetailMediaQuery | null): this;
    /**
     * Set the term used to filter products by
     */
    setTerm(term: string | null | undefined): this;
    pagination(paginate: (pagination: PaginationBuilder) => void): this;
    facets(facets: (facets: FacetBuilder) => void): this;
    sorting(sorting: (sortingBuilder: ProductSortingBuilder) => void): this;
    searchConstraints(searchConstraintbuilder: (searchConstraintBuilder: SearchConstraintBuilder) => void): this;
    highlighting(highlightingBuilder: (highlightingBuilder: ProductHighlightingBuilder) => void): this;
    build(): ProductSearchRequest;
}

export declare type ProductSearchRequest = PaginatedSearchRequest & {
    term?: string | null;
    facets?: ProductFacetQuery | null;
    settings?: ProductSearchSettings | null;
    sorting?: ProductSortBySpecification | null;
    retailMedia?: RetailMediaQuery | null;
};

export declare type ProductSearchResponse = PaginatedSearchResponse & {
    results?: ProductResult[] | null;
    facets?: ProductFacetResult | null;
    recommendations?: ProductResult[] | null;
    redirects?: RedirectResult[] | null;
    retailMedia?: RetailMediaResult | null;
};

export declare interface ProductSearchResultConstraint {
    $type: string;
}

export declare type ProductSearchSettings = SearchSettings & {
    selectedProductProperties?: SelectedProductPropertiesSettings | null;
    selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
    /** @format int32 */
    explodedVariants?: number | null;
    /** @deprecated */
    recommendations: RecommendationSettings;
    selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
    variantSettings?: VariantSearchSettings | null;
    resultConstraint?: ResultMustHaveVariantConstraint | null;
    highlight?: ProductSearchSettingsHighlightSettings | null;
};

export declare type ProductSearchSettingsHighlightSettings = ProductProductHighlightPropsHighlightSettings;

export declare class ProductSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ProductRecommendationRequestSettings;
    constructor(settings: Settings);
    /**
     * Select the properties of the product to be returned, by default only the product id is returned.
     * @param productProperties
     */
    setSelectedProductProperties(productProperties: Partial<SelectedProductPropertiesSettings> | null): this;
    /**
     * Select the properties of the variant to be returned, by default only the variant id is returned.
     * @param variantProperties
     */
    setSelectedVariantProperties(variantProperties: Partial<SelectedVariantPropertiesSettings> | null): this;
    /**
     * Select the properties of the brand to be returned, by default only the brand id is returned.
     * @param brandProperties
     */
    setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings> | null): this;
    setNumberOfRecommendations(count: number): this;
    allowFillIfNecessaryToReachNumberOfRecommendations(allowed?: boolean): this;
    allowReplacingOfRecentlyShownRecommendations(allowed?: boolean): this;
    allowProductsCurrentlyInCart(allowed?: boolean): this;
    prioritizeDiversityBetweenRequests(prioritize?: boolean): this;
    recommendVariant(recommend?: boolean): this;
}

export declare interface ProductSortBySpecification {
    value?: ProductAttributeSorting | ProductDataObjectSorting | ProductDataSorting | ProductPopularitySorting | ProductRelevanceSorting | ProductVariantAttributeSorting | ProductVariantSpecificationSorting | null;
}

export declare interface ProductSorting {
    $type: string;
    order: "Ascending" | "Descending";
    thenBy?: ProductAttributeSorting | ProductDataObjectSorting | ProductDataSorting | ProductPopularitySorting | ProductRelevanceSorting | ProductVariantAttributeSorting | ProductVariantSpecificationSorting | null;
}

export declare class ProductSortingBuilder {
    private value;
    sortByProductData(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    sortByProductDataObject(selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', order: 'Ascending' | 'Descending', valueSelector: (valueSelector: DataObjectValueSelectorBuilder) => void, thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    sortByProductRelevance(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void): void;
    sortByProductPopularity(order?: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void): void;
    sortByProductAttribute(attribute: 'Id' | 'DisplayName' | 'BrandId' | 'BrandName' | 'ListPrice' | 'SalesPrice', order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    sortByProductVariantAttribute(attribute: 'Id' | 'DisplayName' | 'ListPrice' | 'SalesPrice', order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    sortByProductVariantSpecification(key: string, order: 'Ascending' | 'Descending', thenBy?: (thenBy: ProductSortingBuilder) => void, mode?: 'Auto' | 'Alphabetical' | 'Numerical'): void;
    private thenBy;
    build(): ProductSortBySpecification | null;
}

export declare interface ProductsRecommendationBuilder<TRequest = ProductRecommendationRequest> {
    build(): TRequest;
}

export declare class ProductsRecommendationCollectionBuilder {
    private requests;
    private distinctProductsAcrossResults;
    addRequest(request: CustomProductRecommendationRequest | PersonalProductRecommendationRequest | PopularProductsRequest | ProductsViewedAfterViewingContentRequest | ProductsViewedAfterViewingProductRequest | PurchasedWithCurrentCartRequest | PurchasedWithMultipleProductsRequest | PurchasedWithProductRequest | RecentlyViewedProductsRequest | SearchTermBasedProductRecommendationRequest | SimilarProductsRequest | SortProductsRequest | SortVariantsRequest): this;
    requireDistinctProductsAcrossResults(distinctProductsAcrossResults?: boolean): this;
    build(): ProductRecommendationRequestCollection;
}

export declare class ProductsViewedAfterViewingContentBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<ProductsViewedAfterViewingContentRequest> {
    private id;
    constructor(settings: Settings);
    setContentId(contentId: string): this;
    build(): ProductsViewedAfterViewingContentRequest;
}

export declare type ProductsViewedAfterViewingContentRequest = ProductRecommendationRequest & {
    contentId: string;
};

export declare class ProductsViewedAfterViewingProductBuilder extends BySingleProductRecommendationBuilder implements ProductsRecommendationBuilder<ProductsViewedAfterViewingProductRequest> {
    constructor(settings: Settings);
    build(): ProductsViewedAfterViewingProductRequest;
}

export declare type ProductsViewedAfterViewingProductRequest = ProductRecommendationRequest & {
    productAndVariantId: ProductAndVariantId;
};

export declare type ProductUpdate = Trackable & {
    product?: Product | null;
    variants?: ProductVariant[] | null;
    productUpdateKind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
    variantUpdateKind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
    replaceExistingVariants: boolean;
    brandUpdateKind?: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace" | null;
};

export declare interface ProductVariant {
    id: string;
    displayName?: Multilingual | null;
    assortments?: number[] | null;
    specification?: Record<string, string | null>;
    data?: Record<string, DataValue>;
    custom?: Record<string, string>;
    listPrice?: MultiCurrency | null;
    salesPrice?: MultiCurrency | null;
}

export declare type ProductVariantAttributeSorting = ProductSorting & {
    attribute: "Id" | "DisplayName" | "ListPrice" | "SalesPrice";
    mode: "Auto" | "Alphabetical" | "Numerical";
};

export declare type ProductVariantSpecificationSorting = ProductSorting & {
    key?: string | null;
    mode: "Auto" | "Alphabetical" | "Numerical";
};

export declare type ProductView = Trackable & {
    user?: User | null;
    product: Product;
    variant?: ProductVariant | null;
    /** @deprecated */
    channel?: Channel | null;
};

export declare interface Promotion {
    $type: string;
    name: string;
    locations?: PromotionLocationCollection | null;
}

export declare interface PromotionCollection {
    promotions: ProductPromotion[];
}

export declare interface PromotionLocation {
    key: string;
    placements?: PromotionLocationPlacementCollection | null;
}

export declare interface PromotionLocationCollection {
    items?: PromotionLocation[] | null;
}

export declare interface PromotionLocationPlacement {
    key?: string | null;
    thresholds?: ScoreThresholds | null;
}

export declare interface PromotionLocationPlacementCollection {
    items?: PromotionLocationPlacement[] | null;
}

export declare interface PromotionSpecification {
    $type: string;
}

export declare interface PromotionSpecificationCollection {
    productPromotion?: ProductPromotionSpecification | null;
}

export declare interface PromotionSpecificationVariation {
    $type: string;
}

export declare interface PromotionSpecificationVariationCollection {
    productPromotion?: ProductPromotionSpecificationVariation | null;
}

export declare interface PurchasedByUserCompanyInfo {
    /** @format date-time */
    mostRecentPurchasedUtc: string;
    /** @format int64 */
    totalNumberOfTimesPurchased: number;
    purchasedByParentCompany?: PurchasedByUserCompanyInfo | null;
}

export declare interface PurchasedByUserInfo {
    /** @format date-time */
    mostRecentPurchasedUtc: string;
    /** @format int64 */
    totalNumberOfTimesPurchased: number;
}

export declare class PurchasedWithCurrentCartBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithCurrentCartRequest> {
    constructor(settings: Settings);
    build(): ProductRecommendationRequest;
}

export declare type PurchasedWithCurrentCartRequest = ProductRecommendationRequest;

export declare class PurchasedWithMultipleProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithMultipleProductsRequest> {
    private products;
    constructor(settings: Settings);
    addProduct(product: {
        productId: string;
        variantId?: string;
    }): this;
    addProducts(products: {
        productId: string;
        variantId?: string;
    }[]): this;
    build(): PurchasedWithMultipleProductsRequest;
}

export declare type PurchasedWithMultipleProductsRequest = ProductRecommendationRequest & {
    productAndVariantIds: ProductAndVariantId[];
};

export declare class PurchasedWithProductBuilder extends BySingleProductRecommendationBuilder implements ProductsRecommendationBuilder<PurchasedWithProductRequest> {
    constructor(settings: Settings);
    build(): PurchasedWithProductRequest;
}

export declare type PurchasedWithProductRequest = ProductRecommendationRequest & {
    productAndVariantId: ProductAndVariantId;
};

export declare interface PurchaseQualifiers {
    /** @format int32 */
    sinceMinutesAgo: number;
    byUser: boolean;
    byUserCompany: boolean;
    byUserParentCompany: boolean;
}

export declare interface RebuildStatus {
    isRebuilding: boolean;
    isStale: boolean;
    /** @format date-time */
    lastRebuildStarted: string;
    /** @format date-time */
    lastRebuildCompleted: string;
    /** @format date-time */
    lastRebuildOpportunity: string;
    /** @format date-span */
    lastRebuildDuration: string;
    isBuilt: boolean;
    isPartial: boolean;
    /** @format date-time */
    lastMarkedAsStale: string;
    /** @format date-span */
    staleDuration: string;
    /** @format date-span */
    lastStaleDuration: string;
}

export declare type RecentlyPurchasedFacet = BooleanValueFacet & {
    purchaseQualifiers: PurchaseQualifiers;
};

export declare type RecentlyPurchasedFacetResult = BooleanBooleanValueFacetResult & {
    purchaseQualifiers: PurchaseQualifiers;
};

export declare interface RecentlyViewedByUserRelevanceModifier {
    $type: string;
    /** @format date-time */
    sinceUtc?: string | null;
    /** @format double */
    ifPreviouslyViewedByUserMultiplyWeightBy: number;
    /** @format double */
    ifNotPreviouslyViewedByUserMultiplyWeightBy: number;
    /** @format int32 */
    sinceMinutesAgo?: number | null;
    filters?: FilterCollection | null;
    custom?: Record<string, string | null>;
}

export declare class RecentlyViewedProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<RecentlyViewedProductsRequest> {
    constructor(settings: Settings);
    build(): ProductRecommendationRequest;
}

export declare type RecentlyViewedProductsRequest = ProductRecommendationRequest;

export declare interface RecommendationRequest {
    $type: string;
    language?: Language | null;
    user?: User | null;
    relevanceModifiers: RelevanceModifierCollection;
    filters: FilterCollection;
    displayedAtLocationType: string;
    currency?: Currency | null;
    /** @deprecated */
    channel?: Channel | null;
    custom?: Record<string, string | null>;
}

export declare abstract class RecommendationRequestBuilder {
    private readonly settings;
    private readonly filterBuilder;
    private readonly relevanceModifiersBuilder;
    constructor(settings: Settings);
    /**
     * Adds filters to the request
     * @param filterBuilder
     * @returns
     */
    filters(filterBuilder: (builder: FilterBuilder) => void): this;
    relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this;
    protected baseBuild(): Omit<RecommendationRequest, '$type'>;
}

export declare interface RecommendationResponse {
    custom?: Record<string, string | null>;
    statistics?: Statistics | null;
}

export declare interface RecommendationSettings {
    /** @format int32 */
    take?: number | null;
    /** @format int32 */
    onlyIncludeRecommendationsWhenLessResultsThan?: number | null;
}

export declare interface RecommendationTypeCollection {
    unionCodes?: number[] | null;
}

export declare class Recommender extends RelewiseClient {
    protected readonly datasetId: string;
    protected readonly apiKey: string;
    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    recommendPopularSearchTerms(request: PopularSearchTermsRecommendationRequest, options?: RelewiseRequestOptions): Promise<SearchTermRecommendationResponse | undefined>;
    recommendPersonalBrands(request: PersonalBrandRecommendationRequest, options?: RelewiseRequestOptions): Promise<BrandRecommendationResponse | undefined>;
    recommendPopularBrands(request: PopularBrandsRecommendationRequest, options?: RelewiseRequestOptions): Promise<BrandRecommendationResponse | undefined>;
    recommendPersonalContentCategories(request: PersonalContentCategoryRecommendationRequest, options?: RelewiseRequestOptions): Promise<ContentCategoryRecommendationResponse | undefined>;
    recommendPopularContentCategories(request: PopularContentCategoriesRecommendationRequest, options?: RelewiseRequestOptions): Promise<ContentCategoryRecommendationResponse | undefined>;
    recommendPersonalProductCategories(request: PersonalProductCategoryRecommendationRequest, options?: RelewiseRequestOptions): Promise<ProductCategoryRecommendationResponse | undefined>;
    recommendPopularProductCategories(request: PopularProductCategoriesRecommendationRequest, options?: RelewiseRequestOptions): Promise<ProductCategoryRecommendationResponse | undefined>;
    recommendPurchasedWithProduct(request: PurchasedWithProductRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendPurchasedWithMultipleProducts(request: PurchasedWithMultipleProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    sortVariants(request: SortVariantsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    sortProducts(request: SortProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendSimilarProducts(request: SimilarProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendSearchTermBasedProducts(request: SearchTermBasedProductRecommendationRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recentlyViewedProducts(request: RecentlyViewedProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendPurchasedWithCurrentCart(request: PurchasedWithCurrentCartRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendProductsViewedAfterViewingProduct(request: ProductsViewedAfterViewingProductRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendProductsViewedAfterViewingContent(request: ProductsViewedAfterViewingContentRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendPopularProducts(request: PopularProductsRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendPersonalProducts(request: PersonalProductRecommendationRequest, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponse | undefined>;
    recommendPopularContents(request: PopularContentsRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined>;
    recommendPersonalContents(request: PersonalContentRecommendationRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined>;
    recommendContentsViewedAfterViewingProduct(request: ContentsViewedAfterViewingProductRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined>;
    recommendContentsViewedAfterViewingMultipleProducts(request: ContentsViewedAfterViewingMultipleProductsRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined>;
    recommendContentsViewedAfterViewingMultipleContents(request: ContentsViewedAfterViewingMultipleContentsRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined>;
    recommendContentsViewedAfterViewingContent(request: ContentsViewedAfterViewingContentRequest, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponse | undefined>;
    batchProductRecommendations(request: ProductRecommendationRequestCollection, options?: RelewiseRequestOptions): Promise<ProductRecommendationResponseCollection | undefined>;
    batchContentRecommendations(request: ContentRecommendationRequestCollection, options?: RelewiseRequestOptions): Promise<ContentRecommendationResponseCollection | undefined>;
    batchContentCategoryRecommendations(request: ContentCategoryRecommendationRequestCollection, options?: RelewiseRequestOptions): Promise<ContentCategoryRecommendationResponseCollection | undefined>;
    batchProductCategoryRecommendations(request: ProductCategoryRecommendationRequestCollection, options?: RelewiseRequestOptions): Promise<ProductCategoryRecommendationResponseCollection | undefined>;
}

export declare interface RecommendPopularSearchTermSettings {
    targetEntityTypes?: ("Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory")[] | null;
    /** @format int32 */
    numberOfRecommendations: number;
}

export declare interface RedirectResult {
    /** @format uuid */
    id: string;
    condition: SearchTermCondition | RetailMediaSearchTermCondition;
    destination?: string | null;
    data?: Record<string, string>;
}

export declare type RedirectRule = SearchRule & {
    condition: SearchTermCondition | RetailMediaSearchTermCondition;
    destination?: string | null;
    data?: Record<string, string>;
};

export declare interface RedirectRuleSaveSearchRulesRequest {
    $type: string;
    rules: RedirectRule[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface RedirectRuleSaveSearchRulesResponse {
    $type: string;
    rules?: RedirectRule[] | null;
    statistics?: Statistics | null;
}

export declare interface RedirectRuleSearchRulesResponse {
    $type: string;
    rules?: RedirectRule[] | null;
    /** @format int32 */
    hits: number;
    statistics?: Statistics | null;
}

export declare type RedirectRulesRequest = RedirectRulesRequestSortBySearchRulesRequest;

export declare interface RedirectRulesRequestSortBySearchRulesRequest {
    $type: string;
    filters: SearchRuleFilters;
    sorting: RedirectRulesRequestSortBySorting;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface RedirectRulesRequestSortBySorting {
    sortBy: "Created" | "Modified";
    sortOrder: "Ascending" | "Descending";
}

export declare type RedirectRulesResponse = RedirectRuleSearchRulesResponse;

export declare type RelativeDateTimeCondition = ValueCondition & {
    comparison: "Before" | "After";
    unit: "UnixMilliseconds" | "UnixSeconds" | "UnixMinutes";
    /** @format int64 */
    currentTimeOffset: number;
};

export declare interface RelevanceModifier {
    $type: string;
    filters?: FilterCollection | null;
    custom?: Record<string, string | null>;
}

export declare class RelevanceModifierBuilder {
    private modifiers;
    addBrandIdRelevanceModifier(brandId: string, ifProductIsBrandMultiplyWeightBy?: number, ifProductIsNotBrandMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addProductAssortmentRelevanceModifier(assortments: number[], multiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addVariantAssortmentRelevanceModifier(assortments: number[], multiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addProductCategoryIdRelevanceModifier(categoryId: string, evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', multiplyWeightBy?: number, negated?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addProductDataRelevanceModifier(key: string, conditions: (builder: ConditionBuilder) => void, multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector, mustMatchAllConditions?: boolean, considerAsMatchIfKeyIsNotFound?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addVariantDataRelevanceModifier(key: string, conditions: (builder: ConditionBuilder) => void, multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector, mustMatchAllConditions?: boolean, considerAsMatchIfKeyIsNotFound?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addContentCategoryDataRelevanceModifier(key: string, conditions: (builder: ConditionBuilder) => void, multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector, mustMatchAllConditions?: boolean, considerAsMatchIfKeyIsNotFound?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addContentDataRelevanceModifier(key: string, conditions: (builder: ConditionBuilder) => void, multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector, mustMatchAllConditions?: boolean, considerAsMatchIfKeyIsNotFound?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addProductCategoryDataRelevanceModifier(key: string, conditions: (builder: ConditionBuilder) => void, multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector, mustMatchAllConditions?: boolean, considerAsMatchIfKeyIsNotFound?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addVariantIdRelevanceModifier(variantIds: string[], multiplyWeightBy?: number, negated?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addProductIdRelevanceModifier(productIds: string[], multiplyWeightBy?: number, negated?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addProductListPriceRelevanceModifier(currency: string, lowerBound: number | null | undefined, upperBound: number | null | undefined, multiplyWeightBy?: number, negated?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addProductSalesPriceRelevanceModifier(currency: string, lowerBound: number | null | undefined, upperBound: number | null | undefined, multiplyWeightBy?: number, negated?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addVariantListPriceRelevanceModifier(currency: string, lowerBound: number | null | undefined, upperBound: number | null | undefined, multiplyWeightBy?: number, negated?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addVariantSalesPriceRelevanceModifier(currency: string, lowerBound: number | null | undefined, upperBound: number | null | undefined, multiplyWeightBy?: number, negated?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addVariantSpecificationsInCommonRelevanceModifier(specificationKeysAndMultipliers: {
        key: string;
        multiplier: number;
    }[], filter?: (builder: FilterBuilder) => void): this;
    addVariantSpecificationValueRelevanceModifier(key: string, value: string, ifIdenticalMultiplyWeightBy?: number, ifNotIdenticalMultiplyWeightBy?: number, ifSpecificationKeyNotFoundApplyNotEqualMultiplier?: boolean, filter?: (builder: FilterBuilder) => void): this;
    addProductRecentlyPurchasedByUserRelevanceModifier(sinceUtc: Date, ifNotPreviouslyPurchasedByUserMultiplyWeightBy?: number, ifPreviouslyPurchasedByUserMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addProductRecentlyPurchasedByCompanyRelevanceModifier(sinceMinutesAgo: number, companyIds: string[], ifPurchasedByCompanyMultiplyWeightBy?: number, elseIfNotPurchasedByCompanyMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addProductRecentlyPurchasedByUserCompanyRelevanceModifier(sinceMinutesAgo: number, ifPurchasedByCompanyMultiplyWeightBy?: number, elseIfPurchasedByParentCompanyMultiplyWeightBy?: number, elseIfNotPurchasedByEitherCompanyMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addProductRecentlyViewedByUserRelevanceModifier(sinceUtc: Date, ifNotPreviouslyViewedByUserMultiplyWeightBy?: number, ifPreviouslyViewedByUserMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addProductRecentlyViewedByCompanyRelevanceModifier(sinceMinutesAgo: number, companyIds: string[], ifViewedByCompanyMultiplyWeightBy?: number, elseIfNotViewedByCompanyMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addProductRecentlyViewedByUserCompanyRelevanceModifier(sinceMinutesAgo: number, ifViewedByUserCompanyMultiplyWeightBy?: number, elseIfViewedByUserParentCompanyMultiplyWeightBy?: number, elseIfNotViewedByEitherCompanyMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addProductCategoryRecentlyViewedByUserRelevanceModifier(sinceUtc: Date, ifNotPreviouslyViewedByUserMultiplyWeightBy?: number, ifPreviouslyViewedByUserMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addContentRecentlyViewedByUserRelevanceModifier(sinceUtc: Date, ifNotPreviouslyViewedByUserMultiplyWeightBy?: number, ifPreviouslyViewedByUserMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addContentCategoryRecentlyViewedByUserRelevanceModifier(sinceUtc: Date, ifNotPreviouslyViewedByUserMultiplyWeightBy?: number, ifPreviouslyViewedByUserMultiplyWeightBy?: number, filter?: (builder: FilterBuilder) => void): this;
    addUserFavoriteProductRelevanceModifier(sinceMinutesAgo: number, ifNotPurchasedBaseWeight?: number, mostRecentPurchaseWeight?: number, numberOfPurchasesWeight?: number, filter?: (builder: FilterBuilder) => void): this;
    build(): RelevanceModifierCollection | null;
}

export declare interface RelevanceModifierCollection {
    items?: (BrandIdRelevanceModifier | ContentCategoryDataRelevanceModifier | ContentCategoryRecentlyViewedByUserRelevanceModifier | ContentDataRelevanceModifier | ContentRecentlyViewedByUserRelevanceModifier | ProductAssortmentRelevanceModifier | ProductCategoryDataRelevanceModifier | ProductCategoryIdRelevanceModifier | ProductCategoryRecentlyViewedByUserRelevanceModifier | ProductDataRelevanceModifier | ProductIdRelevanceModifier | ProductListPriceRelevanceModifier | ProductRecentlyPurchasedByCompanyRelevanceModifier | ProductRecentlyPurchasedByUserCompanyRelevanceModifier | ProductRecentlyPurchasedByUserRelevanceModifier | ProductRecentlyViewedByCompanyRelevanceModifier | ProductRecentlyViewedByUserCompanyRelevanceModifier | ProductRecentlyViewedByUserRelevanceModifier | ProductSalesPriceRelevanceModifier | UserFavoriteProductRelevanceModifier | VariantAssortmentRelevanceModifier | VariantDataRelevanceModifier | VariantIdRelevanceModifier | VariantListPriceRelevanceModifier | VariantSalesPriceRelevanceModifier | VariantSpecificationsInCommonRelevanceModifier | VariantSpecificationValueRelevanceModifier)[] | null;
}

export declare abstract class RelewiseClient {
    protected readonly datasetId: string;
    protected readonly apiKey: string;
    private readonly _serverUrl;
    private readonly _urlPath;
    private readonly _apiKeyHeader;
    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    get serverUrl(): string;
    protected request<TRequest, TResponse>(name: string, data: TRequest, options?: RelewiseRequestOptions): Promise<TResponse | undefined>;
    private createRequestUrl;
    private handleRequestError;
    private parseJson;
}

export declare interface RelewiseClientOptions {
    serverUrl?: string;
}

export declare interface RelewiseRequestOptions {
    abortSignal?: AbortSignal;
}

export declare interface RequestConfiguration {
    filters: "Merge" | "Suppress";
    relevanceModifiers: "Merge" | "Suppress";
    overriddenProductRecommendationRequestSettings?: OverriddenProductRecommendationRequestSettings | null;
    overriddenContentRecommendationRequestSettings?: OverriddenContentRecommendationRequestSettings | null;
}

export declare interface RequestContextFilter {
    recommendations?: RecommendationTypeCollection | null;
    searches?: SearchTypeCollection | null;
    locations?: string[] | null;
    languages?: Language[] | null;
    currencies?: Currency[] | null;
    filters?: RequestFilterCriteria | null;
}

export declare interface RequestFilterCriteria {
    includes?: FilterCollection | null;
    excludes?: FilterCollection | null;
    count?: Int32NullableRange | null;
}

export declare type ResultMustHaveVariantConstraint = ProductSearchResultConstraint & {
    exceptWhenProductHasNoVariants: boolean;
};

export declare interface RetailMediaConditions {
    $type: string;
}

export declare interface RetailMediaEntity2AdvertiserEntityStateAdvertiserMetadataValuesRetailMediaEntity2EntityFilters {
    $type: string;
    term?: string | null;
    states?: ("Active" | "Inactive" | "Archived")[] | null;
}

export declare interface RetailMediaEntity2CampaignEntityStateCampaignMetadataValuesRetailMediaEntity2EntityFilters {
    $type: string;
    term?: string | null;
    states?: ("Proposed" | "Approved" | "Archived")[] | null;
}

export declare interface RetailMediaEntity2LocationEntityStateLocationMetadataValuesRetailMediaEntity2EntityFilters {
    $type: string;
    term?: string | null;
    states?: ("Active" | "Inactive" | "Archived")[] | null;
}

export declare interface RetailMediaQuery {
    location: RetailMediaQueryLocationSelector;
}

export declare interface RetailMediaQueryLocationSelector {
    key: string;
    variation: RetailMediaQueryVariationSelector;
    placements: RetailMediaQueryPlacementSelector[];
}

export declare interface RetailMediaQueryPlacementSelector {
    key: string;
}

export declare interface RetailMediaQueryVariationSelector {
    key: string;
}

export declare interface RetailMediaResult {
    placements?: Record<string, RetailMediaResultPlacement>;
}

export declare interface RetailMediaResultPlacement {
    results?: RetailMediaResultPlacementResultEntity[] | null;
}

export declare interface RetailMediaResultPlacementResultEntity {
    promotedProduct?: RetailMediaResultPlacementResultEntityProduct | null;
}

export declare interface RetailMediaResultPlacementResultEntityProduct {
    result: ProductResult;
}

export declare type RetailMediaSearchTermCondition = SearchTermCondition & {
    language?: Language | null;
};

export declare interface RetailMediaSearchTermConditionCollection {
    values?: RetailMediaSearchTermCondition[] | null;
}

export declare type SaveAdvertisersRequest = AdvertiserSaveEntitiesRequest;

export declare type SaveAdvertisersResponse = AdvertiserSaveEntitiesResponse;

export declare type SaveCampaignsRequest = CampaignSaveEntitiesRequest;

export declare type SaveCampaignsResponse = CampaignSaveEntitiesResponse;

export declare type SaveDecompoundRulesRequest = DecompoundRuleSaveSearchRulesRequest;

export declare type SaveDecompoundRulesResponse = DecompoundRuleSaveSearchRulesResponse;

export declare type SaveGlobalRetailMediaConfigurationRequest = LicensedRequest & {
    configuration?: GlobalRetailMediaConfiguration | null;
    modifiedBy?: string | null;
};

export declare type SaveGlobalTriggerConfigurationRequest = LicensedRequest & {
    configuration?: GlobalTriggerConfiguration | null;
    modifiedBy?: string | null;
};

export declare type SaveLocationsRequest = LocationSaveEntitiesRequest;

export declare type SaveLocationsResponse = LocationSaveEntitiesResponse;

export declare type SaveMerchandisingRuleRequest = LicensedRequest & {
    rule?: BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule | null;
    modifiedBy?: string | null;
};

export declare type SavePredictionRulesRequest = PredictionRuleSaveSearchRulesRequest;

export declare type SavePredictionRulesResponse = PredictionRuleSaveSearchRulesResponse;

export declare type SaveRedirectRulesRequest = RedirectRuleSaveSearchRulesRequest;

export declare type SaveRedirectRulesResponse = RedirectRuleSaveSearchRulesResponse;

export declare type SaveSearchIndexRequest = LicensedRequest & {
    index?: SearchIndex | null;
    modifiedBy?: string | null;
};

export declare type SaveSearchResultModifierRulesRequest = SearchResultModifierRuleSaveSearchRulesRequest;

export declare type SaveSearchResultModifierRulesResponse = SearchResultModifierRuleSaveSearchRulesResponse;

export declare type SaveSearchTermModifierRulesRequest = SearchTermModifierRuleSaveSearchRulesRequest;

export declare type SaveSearchTermModifierRulesResponse = SearchTermModifierRuleSaveSearchRulesResponse;

export declare type SaveStemmingRulesRequest = StemmingRuleSaveSearchRulesRequest;

export declare type SaveStemmingRulesResponse = StemmingRuleSaveSearchRulesResponse;

export declare type SaveSynonymsRequest = LicensedRequest & {
    synonyms?: Synonym[] | null;
    modifiedBy?: string | null;
};

export declare type SaveSynonymsResponse = TimedResponse & {
    values?: Synonym[] | null;
};

export declare type SaveTriggerConfigurationRequest = LicensedRequest & {
    configuration?: AbandonedCartTriggerConfiguration | AbandonedSearchTriggerConfiguration | ContentCategoryInterestTriggerConfiguration | ProductCategoryInterestTriggerConfiguration | ProductChangeTriggerConfiguration | ProductInterestTriggerConfiguration | UserActivityTriggerConfiguration | VariantChangeTriggerConfiguration | null;
    modifiedBy?: string | null;
};

export declare interface Score {
    /** @format float */
    relevance?: number | null;
    /** @format float */
    adjusted?: number | null;
}

export declare interface ScoreThresholds {
    /** @format float */
    relevance?: number | null;
    /** @format float */
    adjusted?: number | null;
}

export declare interface SearchBuilder<T = ProductSearchRequest | ContentSearchRequest | ProductCategorySearchRequest | SearchTermPredictionRequest> {
    build(): T;
}

export declare class SearchCollectionBuilder extends SearchRequestBuilder {
    private requests;
    constructor(settings?: Settings);
    addRequest(request: ProductSearchRequest | ContentSearchRequest | ProductCategorySearchRequest | SearchTermPredictionRequest): this;
    build(): SearchRequestCollection;
}

export declare class SearchConstraintBuilder {
    private resultConstraint;
    setResultMustHaveVariantConstraint(constaint: {
        exceptWhenProductHasNoVariants: boolean;
    }): this;
    build(): ResultMustHaveVariantConstraint | null;
}

export declare class Searcher extends RelewiseClient {
    protected readonly datasetId: string;
    protected readonly apiKey: string;
    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    searchProducts(request: ProductSearchRequest, options?: RelewiseRequestOptions): Promise<ProductSearchResponse | undefined>;
    searchProductCategories(request: ProductCategorySearchRequest, options?: RelewiseRequestOptions): Promise<ProductCategorySearchResponse | undefined>;
    searchContents(request: ContentSearchRequest, options?: RelewiseRequestOptions): Promise<ContentSearchResponse | undefined>;
    searchTermPrediction(request: SearchTermPredictionRequest, options?: RelewiseRequestOptions): Promise<SearchTermPredictionResponse | undefined>;
    batch(requestCollections: SearchRequestCollection, options?: RelewiseRequestOptions): Promise<SearchResponseCollection | undefined>;
}

export declare interface SearchIndex {
    id?: string | null;
    description?: string | null;
    enabled: boolean;
    isDefault: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    custom?: Record<string, string | null>;
    configuration?: IndexConfiguration | null;
    rebuildStatus?: RebuildStatus | null;
}

export declare type SearchIndexCollectionResponse = TimedResponse & {
    indexes?: SearchIndex[] | null;
};

export declare type SearchIndexesRequest = LicensedRequest;

export declare type SearchIndexRequest = LicensedRequest & {
    id?: string | null;
};

export declare type SearchIndexResponse = TimedResponse & {
    index?: SearchIndex | null;
};

export declare interface SearchIndexSelector {
    id: string;
}

export declare interface SearchRequest {
    $type: string;
    language?: Language | null;
    currency?: Currency | null;
    user?: User | null;
    displayedAtLocation?: string | null;
    relevanceModifiers?: RelevanceModifierCollection | null;
    filters?: FilterCollection | null;
    indexSelector?: SearchIndexSelector | null;
    postFilters?: FilterCollection | null;
    /** @deprecated */
    channel?: Channel | null;
    custom?: Record<string, string | null>;
}

export declare abstract class SearchRequestBuilder {
    private readonly settings?;
    private readonly filterBuilder;
    private readonly postFilterBuilder;
    private readonly relevanceModifiersBuilder;
    private indexId;
    constructor(settings?: Settings | undefined);
    /**
     * Adds filters to the request
     * @param filterBuilder
     * @returns
     */
    filters(filterBuilder: (builder: FilterBuilder) => void): this;
    /**
     * Adds post filters to the request
     * @param filterBuilder
     * @returns
     */
    postFilters(filterBuilder: (builder: FilterBuilder) => void): this;
    relevanceModifiers(relevanceModifiersBuilder: (builder: RelevanceModifierBuilder) => void): this;
    /**
     * Use only when a specific index different from the 'default'-index is needed
     * @param id
     * @returns
     */
    setIndex(id?: string | null): this;
    protected baseBuild(): Omit<SearchRequest, '$type' | 'currency' | 'language' | 'displayedAtLocation'>;
}

export declare type SearchRequestCollection = SearchRequest & {
    requests: (ContentCategorySearchRequest | ContentSearchRequest | ProductCategorySearchRequest | ProductSearchRequest | SearchRequestCollection | SearchTermPredictionRequest)[];
};

export declare interface SearchResponse {
    custom?: Record<string, string | null>;
    statistics?: Statistics | null;
}

export declare type SearchResponseCollection = SearchResponse & {
    responses?: (ContentCategorySearchResponse | ContentSearchResponse | ProductCategorySearchResponse | ProductSearchResponse | SearchResponseCollection | SearchTermPredictionResponse)[] | null;
};

export declare type SearchResultModifierRule = SearchRule & {
    condition: SearchTermCondition | RetailMediaSearchTermCondition;
    actions: (SearchResultModifierRuleAddFiltersAction | SearchResultModifierRuleAddTermFilterAction)[];
};

export declare type SearchResultModifierRuleAddFiltersAction = SearchResultModifierRuleRuleAction & {
    filters: FilterCollection;
};

export declare type SearchResultModifierRuleAddTermFilterAction = SearchResultModifierRuleRuleAction & {
    term: string;
    negated: boolean;
};

export declare interface SearchResultModifierRuleRuleAction {
    $type: string;
}

export declare interface SearchResultModifierRuleSaveSearchRulesRequest {
    $type: string;
    rules: SearchResultModifierRule[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface SearchResultModifierRuleSaveSearchRulesResponse {
    $type: string;
    rules?: SearchResultModifierRule[] | null;
    statistics?: Statistics | null;
}

export declare interface SearchResultModifierRuleSearchRulesResponse {
    $type: string;
    rules?: SearchResultModifierRule[] | null;
    /** @format int32 */
    hits: number;
    statistics?: Statistics | null;
}

export declare type SearchResultModifierRulesRequest = SearchResultModifierRulesRequestSortBySearchRulesRequest;

export declare interface SearchResultModifierRulesRequestSortBySearchRulesRequest {
    $type: string;
    filters: SearchRuleFilters;
    sorting: SearchResultModifierRulesRequestSortBySorting;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface SearchResultModifierRulesRequestSortBySorting {
    sortBy: "Created" | "Modified";
    sortOrder: "Ascending" | "Descending";
}

export declare type SearchResultModifierRulesResponse = SearchResultModifierRuleSearchRulesResponse;

export declare interface SearchRule {
    $type: string;
    /** @format uuid */
    id: string;
    indexes?: ApplicableIndexes | null;
    languages?: ApplicableLanguages | null;
    /** @format date-time */
    created: string;
    createdBy: string;
    /** @format date-time */
    modified: string;
    modifiedBy: string;
    /** @format date-time */
    approved?: string | null;
    approvedBy: string;
    isApproved: boolean;
}

export declare interface SearchRuleFilters {
    term?: string | null;
    approved?: boolean | null;
    /** @format uuid */
    id?: string | null;
}

export declare interface SearchSettings {
    $type: string;
}

export declare type SearchTerm = Trackable & {
    language?: Language | null;
    user?: User | null;
    term?: string | null;
    /** @deprecated */
    channel?: Channel | null;
};

export declare class SearchTermBasedProductRecommendationBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SearchTermBasedProductRecommendationRequest> {
    private term;
    constructor(settings: Settings);
    setTerm(term: string): this;
    build(): SearchTermBasedProductRecommendationRequest;
}

export declare type SearchTermBasedProductRecommendationRequest = ProductRecommendationRequest & {
    term: string;
};

export declare interface SearchTermCondition {
    $type: string;
    kind?: "Equals" | "StartsWith" | "EndsWith" | "Contains" | null;
    value?: string | null;
    andConditions?: (SearchTermCondition | RetailMediaSearchTermCondition)[] | null;
    orConditions?: (SearchTermCondition | RetailMediaSearchTermCondition)[] | null;
    /** @format int32 */
    minimumLength?: number | null;
    negated: boolean;
}

export declare type SearchTermModifierRule = SearchRule & {
    condition: SearchTermCondition | RetailMediaSearchTermCondition;
    actions: (SearchTermModifierRuleAppendToTermAction | SearchTermModifierRuleRemoveFromTermAction | SearchTermModifierRuleReplaceTermAction | SearchTermModifierRuleReplaceWordsInTermAction)[];
};

export declare type SearchTermModifierRuleAppendToTermAction = SearchTermModifierRuleRuleAction & {
    words: string;
};

export declare type SearchTermModifierRuleRemoveFromTermAction = SearchTermModifierRuleRuleAction & {
    words: string;
};

export declare type SearchTermModifierRuleReplaceTermAction = SearchTermModifierRuleRuleAction & {
    replacement?: string | null;
};

export declare type SearchTermModifierRuleReplaceWordsInTermAction = SearchTermModifierRuleRuleAction & {
    words: string;
    replacement?: string | null;
};

export declare interface SearchTermModifierRuleRuleAction {
    $type: string;
}

export declare interface SearchTermModifierRuleSaveSearchRulesRequest {
    $type: string;
    rules: SearchTermModifierRule[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface SearchTermModifierRuleSaveSearchRulesResponse {
    $type: string;
    rules?: SearchTermModifierRule[] | null;
    statistics?: Statistics | null;
}

export declare interface SearchTermModifierRuleSearchRulesResponse {
    $type: string;
    rules?: SearchTermModifierRule[] | null;
    /** @format int32 */
    hits: number;
    statistics?: Statistics | null;
}

export declare type SearchTermModifierRulesRequest = SearchTermModifierRulesRequestSortBySearchRulesRequest;

export declare interface SearchTermModifierRulesRequestSortBySearchRulesRequest {
    $type: string;
    filters: SearchRuleFilters;
    sorting: SearchTermModifierRulesRequestSortBySorting;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface SearchTermModifierRulesRequestSortBySorting {
    sortBy: "Created" | "Modified";
    sortOrder: "Ascending" | "Descending";
}

export declare type SearchTermModifierRulesResponse = SearchTermModifierRuleSearchRulesResponse;

export declare class SearchTermPredictionBuilder extends SearchRequestBuilder {
    private count;
    private term;
    private targetEntityTypes;
    constructor(settings: Settings);
    take(count: number): this;
    setTerm(term: string): this;
    addEntityType(...types: ('Product' | 'Variant' | 'ProductCategory' | 'Brand' | 'Content' | 'ContentCategory')[]): this;
    build(): SearchTermPredictionRequest;
}

export declare type SearchTermPredictionRequest = SearchRequest & {
    term: string;
    /** @format int32 */
    take: number;
    settings?: SearchTermPredictionSettings | null;
};

export declare type SearchTermPredictionResponse = SearchResponse & {
    predictions?: SearchTermPredictionResult[] | null;
};

export declare interface SearchTermPredictionResult {
    term?: string | null;
    /** @format int32 */
    rank: number;
    expectedResultTypes?: ExpectedSearchTermResult[] | null;
    /** @deprecated */
    type: "Match" | "WordContinuation" | "Word" | "WordSequence";
    correctedWordsMask?: boolean[] | null;
}

export declare type SearchTermPredictionSettings = SearchSettings & {
    targetEntityTypes?: ("Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory")[] | null;
};

export declare type SearchTermRecommendationResponse = RecommendationResponse & {
    recommendations?: SearchTermResult[] | null;
};

export declare interface SearchTermResult {
    term?: string | null;
    /** @format int32 */
    rank: number;
    expectedResultTypes?: ExpectedSearchTermResult[] | null;
}

export declare interface SearchTypeCollection {
    unionCodes?: number[] | null;
}

export declare interface SelectedBrandPropertiesSettings {
    displayName: boolean;
    assortments: boolean;
    viewedByUserInfo: boolean;
    allData: boolean;
    dataKeys?: string[] | null;
}

export declare interface SelectedCategoryPropertiesSettings {
    $type: string;
    displayName: boolean;
    paths: boolean;
    assortments: boolean;
    viewedByUserInfo: boolean;
    allData: boolean;
    dataKeys?: string[] | null;
}

export declare type SelectedContentCategoryPropertiesSettings = SelectedCategoryPropertiesSettings;

export declare interface SelectedContentPropertiesSettings {
    displayName: boolean;
    categoryPaths: boolean;
    assortments: boolean;
    allData: boolean;
    viewedByUserInfo: boolean;
    dataKeys?: string[] | null;
}

export declare type SelectedProductCategoryPropertiesSettings = SelectedCategoryPropertiesSettings;

export declare interface SelectedProductDetailsPropertiesSettings {
    displayName: boolean;
    categoryPaths: boolean;
    assortments: boolean;
    pricing: boolean;
    allData: boolean;
    viewedByUserInfo: boolean;
    purchasedByUserInfo: boolean;
    brand: boolean;
    allVariants: boolean;
    dataKeys?: string[] | null;
    viewedByUserCompanyInfo: boolean;
    purchasedByUserCompanyInfo: boolean;
    filteredVariants?: FilteredVariantsSettings | null;
}

export declare interface SelectedProductPropertiesSettings {
    displayName: boolean;
    categoryPaths: boolean;
    assortments: boolean;
    pricing: boolean;
    allData: boolean;
    viewedByUserInfo: boolean;
    purchasedByUserInfo: boolean;
    brand: boolean;
    allVariants: boolean;
    dataKeys?: string[] | null;
    viewedByUserCompanyInfo: boolean;
    purchasedByUserCompanyInfo: boolean;
    filteredVariants?: FilteredVariantsSettings | null;
    score?: SelectedScorePropertiesSettings | null;
}

export declare interface SelectedScorePropertiesSettings {
    relevance: boolean;
    adjusted: boolean;
}

export declare interface SelectedVariantDetailsPropertiesSettings {
    displayName: boolean;
    pricing: boolean;
    allSpecifications: boolean;
    assortments: boolean;
    allData: boolean;
    dataKeys?: string[] | null;
    specificationKeys?: string[] | null;
}

export declare interface SelectedVariantPropertiesSettings {
    displayName: boolean;
    pricing: boolean;
    allSpecifications: boolean;
    assortments: boolean;
    allData: boolean;
    dataKeys?: string[] | null;
    specificationKeys?: string[] | null;
}

export declare type Settings = {
    language: string;
    currency: string;
    displayedAtLocation: string;
    user: User;
};

export declare interface SignificantDataValue {
    key: string;
    comparer: "Equals" | "NumericPercentDifference" | "StringSimilarity" | "KeyExists" | "CollectionOverlap";
    /** @format double */
    significance: number;
    transformer?: TrimStringTransformer | null;
}

export declare interface SimilarProductsEvaluationSettings {
    /** @format double */
    significanceOfSimilaritiesInDisplayName: number;
    productDisplayNameTransformer?: TrimStringTransformer | null;
    /** @format double */
    significanceOfSimilarListPrice: number;
    /** @format double */
    significanceOfCommonImmediateParentCategories: number;
    /** @format double */
    significanceOfCommonParentsParentCategories: number;
    /** @format double */
    significanceOfCommonAncestorCategories: number;
    /** @format double */
    significanceOfCommonProductDataKeys: number;
    /** @format double */
    significanceOfIdenticalProductDataValues: number;
    significantProductDataFields?: SignificantDataValue[] | null;
    /** @format double */
    significanceOfSimilarSalesPrice: number;
    /** @format double */
    significanceOfSimilarBrand: number;
    variantEvaluationSettings?: SimilarVariantEvaluationSettings | null;
}

export declare class SimilarProductsProductBuilder extends BySingleProductRecommendationBuilder implements ProductsRecommendationBuilder<SimilarProductsRequest> {
    private evaluationSettings;
    private considerAlreadyKnownInformationAboutProduct;
    private productData;
    constructor(settings: Settings);
    /** @deprecated
     * Use setEvaluationSettings instead
     */
    setSimilarProductsEvaluationSettings(settings: SimilarProductsEvaluationSettings): this;
    setEvaluationSettings(builder: (settings: Partial<SimilarProductsEvaluationSettings>) => void): this;
    build(): SimilarProductsRequest;
}

export declare type SimilarProductsRequest = ProductRecommendationRequest & {
    existingProductId?: ProductAndVariantId | null;
    productData?: Product | null;
    considerAlreadyKnownInformationAboutProduct: boolean;
    evaluationSettings?: SimilarProductsEvaluationSettings | null;
    /** @format int32 */
    explodedVariants?: number | null;
};

export declare interface SimilarVariantEvaluationSettings {
    /** @format double */
    significanceOfSimilaritiesInDisplayName?: number | null;
    /** @format double */
    significanceOfSimilarListPrice?: number | null;
    /** @format double */
    significanceOfSimilarSalesPrice?: number | null;
    /** @format double */
    significanceOfCommonDataKeys?: number | null;
    /** @format double */
    significanceOfIdenticalDataValues?: number | null;
    significantDataFields?: SignificantDataValue[] | null;
}

export declare class SortProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SortProductsRequest> {
    private ids;
    constructor(settings: Settings);
    setProductIds(productIds: string[]): this;
    build(): SortProductsRequest;
}

export declare type SortProductsRequest = ProductRecommendationRequest & {
    productIds: string[];
};

export declare class SortVariantsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuilder<SortVariantsRequest> {
    private id;
    constructor(settings: Settings);
    setProductId(productId: string): this;
    build(): SortVariantsRequest;
}

export declare type SortVariantsRequest = ProductRecommendationRequest & {
    productId: string;
};

export declare interface SpecificationsIndexConfiguration {
    keys?: Record<string, FieldIndexConfiguration>;
    unspecified?: FieldIndexConfiguration | null;
}

export declare interface Statistics {
    /** @format double */
    serverTimeInMs: number;
}

export declare type StemmingRule = SearchRule & {
    words: string[];
    stem?: string | null;
};

export declare interface StemmingRuleSaveSearchRulesRequest {
    $type: string;
    rules: StemmingRule[];
    modifiedBy: string;
    custom?: Record<string, string | null>;
}

export declare interface StemmingRuleSaveSearchRulesResponse {
    $type: string;
    rules?: StemmingRule[] | null;
    statistics?: Statistics | null;
}

export declare interface StemmingRuleSearchRulesResponse {
    $type: string;
    rules?: StemmingRule[] | null;
    /** @format int32 */
    hits: number;
    statistics?: Statistics | null;
}

export declare type StemmingRulesRequest = StemmingRulesRequestSortBySearchRulesRequest;

export declare interface StemmingRulesRequestSortBySearchRulesRequest {
    $type: string;
    filters: SearchRuleFilters;
    sorting: StemmingRulesRequestSortBySorting;
    /** @format int32 */
    skip: number;
    /** @format int32 */
    take: number;
    custom?: Record<string, string | null>;
}

export declare interface StemmingRulesRequestSortBySorting {
    sortBy: "Created" | "Modified";
    sortOrder: "Ascending" | "Descending";
}

export declare type StemmingRulesResponse = StemmingRuleSearchRulesResponse;

export declare interface StringAvailableFacetValue {
    value?: string | null;
    /** @format int32 */
    hits: number;
    selected: boolean;
}

export declare interface StringBrandNameAndIdResultValueFacetResult {
    $type: string;
    selected?: string[] | null;
    available?: BrandNameAndIdResultAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface StringCategoryNameAndIdResultValueFacetResult {
    $type: string;
    selected?: string[] | null;
    available?: CategoryNameAndIdResultAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare class StringCollectionDataValue extends DataValueBase<CollectionWithType<string>> {
    constructor(value: string[]);
    readonly isCollection = true;
}

export declare interface StringContentDataValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: string[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface StringContentDataValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: string[] | null;
    available?: StringAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface StringDataObjectValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: string[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface StringDataObjectValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: string[] | null;
    available?: StringAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare class StringDataValue extends DataValueBase<string> {
    constructor(value: string);
    readonly isCollection = false;
}

export declare interface StringFieldSnippetMatchArrayKeyValuePair {
    key: string;
    value: HighlightResultSnippetFieldSnippetMatch[];
}

export declare interface StringProductCategoryDataValueFacet {
    $type: string;
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: string[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface StringProductCategoryDataValueFacetResult {
    $type: string;
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: string[] | null;
    available?: StringAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface StringProductDataValueFacet {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    key: string;
    collectionFilterType?: "Or" | "And" | null;
    selected?: string[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface StringProductDataValueFacetResult {
    $type: string;
    dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
    key?: string | null;
    collectionFilterType?: "Or" | "And" | null;
    selected?: string[] | null;
    available?: StringAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface StringRange1ArrayKeyValuePair {
    key: string;
    value: Int32Range[];
}

export declare interface StringStringKeyValuePair {
    key: string;
    value: string;
}

export declare interface StringValueFacet {
    $type: string;
    selected?: string[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
    settings?: FacetSettings | null;
}

export declare interface StringValueFacetResult {
    $type: string;
    selected?: string[] | null;
    available?: StringAvailableFacetValue[] | null;
    field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export declare interface Synonym {
    /** @format uuid */
    id: string;
    type: "OneWay" | "Multidirectional";
    indexes?: string[] | null;
    languages?: Language[] | null;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    from?: string[] | null;
    words?: string[] | null;
    /** @format date-time */
    approved?: string | null;
    approvedBy?: string | null;
    /** @format int64 */
    usages: number;
    isApproved: boolean;
    allowInPredictions: boolean;
}

export declare type SynonymsRequest = LicensedRequest & {
    sorting?: SynonymsRequestSynonymSortingSorting | null;
    /** @format int32 */
    take: number;
    /** @format int32 */
    skip: number;
    term?: string | null;
    isApproved?: boolean | null;
};

export declare interface SynonymsRequestSynonymSortingSorting {
    sortBy: "Created" | "CreatedBy" | "Modified" | "ModifiedBy" | "Approved" | "ApprovedBy" | "Usages" | "Type" | "Predictable";
    sortOrder: "Ascending" | "Descending";
}

export declare type SynonymsResponse = TimedResponse & {
    values?: Synonym[] | null;
    /** @format int32 */
    hits: number;
};

export declare interface TargetConditionConfiguration {
    filters?: FilterCollection | null;
}

export declare interface TimedResponse {
    statistics?: Statistics | null;
}

export declare interface Trackable {
    $type: string;
    custom?: Record<string, string | null>;
}

export declare type TrackBrandAdministrativeActionRequest = TrackingRequest & {
    administrativeAction?: BrandAdministrativeAction | null;
};

export declare type TrackBrandUpdateRequest = TrackingRequest & {
    brandUpdate?: BrandUpdate | null;
};

export declare type TrackBrandViewRequest = TrackingRequest & {
    brandView: BrandView;
};

export declare type TrackCartRequest = TrackingRequest & {
    cart: Cart;
};

export declare type TrackCompanyAdministrativeActionRequest = TrackingRequest & {
    administrativeAction?: CompanyAdministrativeAction | null;
};

export declare type TrackCompanyUpdateRequest = TrackingRequest & {
    companyUpdate?: CompanyUpdate | null;
};

export declare type TrackContentAdministrativeActionRequest = TrackingRequest & {
    administrativeAction?: ContentAdministrativeAction | null;
};

export declare type TrackContentCategoryAdministrativeActionRequest = TrackingRequest & {
    administrativeAction?: ContentCategoryAdministrativeAction | null;
};

export declare type TrackContentCategoryUpdateRequest = TrackingRequest & {
    contentCategoryUpdate?: ContentCategoryUpdate | null;
};

export declare type TrackContentCategoryViewRequest = TrackingRequest & {
    contentCategoryView: ContentCategoryView;
};

export declare type TrackContentUpdateRequest = TrackingRequest & {
    contentUpdate?: ContentUpdate | null;
};

export declare type TrackContentViewRequest = TrackingRequest & {
    contentView: ContentView;
};

export declare class Tracker extends RelewiseClient {
    protected readonly datasetId: string;
    protected readonly apiKey: string;
    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    trackOrder({ user, subtotal, orderNumber, lineItems, cartName, trackingNumber, data }: {
        user: User;
        subtotal: {
            currency: string;
            amount: number;
        };
        orderNumber: string;
        /** @deprecated Use orderNumber instead. */
        trackingNumber?: string;
        lineItems: {
            productId: string;
            variantId?: string;
            lineTotal: number;
            quantity: number;
            data?: Record<string, DataValue>;
        }[];
        data?: Record<string, DataValue>;
        cartName?: string;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackCart({ user, subtotal, lineItems, data, cartName }: {
        user?: User;
        subtotal: {
            currency: string;
            amount: number;
        };
        lineItems: {
            productId: string;
            variantId?: string;
            lineTotal: number;
            quantity: number;
            data?: Record<string, DataValue>;
        }[];
        data?: Record<string, DataValue>;
        cartName?: string;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackProductView({ productId, variantId, user }: {
        productId: string;
        variantId?: string;
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackProductCategoryView({ idPath, user }: {
        idPath: string[];
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackContentView({ contentId, user }: {
        contentId: string;
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackContentCategoryView({ idPath, user }: {
        idPath: string[];
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackBrandView({ brandId, user }: {
        brandId: string;
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackSearchTerm({ term, language, user }: {
        term: string;
        user: User;
        language: string;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackUserUpdate({ user, updateKind }: {
        user: User;
        updateKind?: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
}

export declare interface TrackingRequest {
    $type: string;
    custom?: Record<string, string | null>;
}

export declare type TrackOrderRequest = TrackingRequest & {
    order: Order;
};

export declare type TrackProductAdministrativeActionRequest = TrackingRequest & {
    administrativeAction?: ProductAdministrativeAction | null;
};

export declare type TrackProductCategoryAdministrativeActionRequest = TrackingRequest & {
    administrativeAction?: ProductCategoryAdministrativeAction | null;
};

export declare type TrackProductCategoryUpdateRequest = TrackingRequest & {
    productCategoryUpdate?: ProductCategoryUpdate | null;
};

export declare type TrackProductCategoryViewRequest = TrackingRequest & {
    productCategoryView: ProductCategoryView;
};

export declare type TrackProductUpdateRequest = TrackingRequest & {
    productUpdate?: ProductUpdate | null;
};

export declare type TrackProductViewRequest = TrackingRequest & {
    productView: ProductView;
};

export declare type TrackSearchTermRequest = TrackingRequest & {
    searchTerm?: SearchTerm | null;
};

export declare type TrackUserUpdateRequest = TrackingRequest & {
    userUpdate?: UserUpdate | null;
};

export declare type TriggerConfigurationCollectionResponse = TimedResponse & {
    configurations?: (AbandonedCartTriggerConfiguration | AbandonedSearchTriggerConfiguration | ContentCategoryInterestTriggerConfiguration | ProductCategoryInterestTriggerConfiguration | ProductChangeTriggerConfiguration | ProductInterestTriggerConfiguration | UserActivityTriggerConfiguration | VariantChangeTriggerConfiguration)[] | null;
};

export declare type TriggerConfigurationRequest = LicensedRequest & {
    /** @format uuid */
    id: string;
    /** @format int32 */
    type?: number | null;
};

export declare type TriggerConfigurationResponse = TimedResponse & {
    configuration?: AbandonedCartTriggerConfiguration | AbandonedSearchTriggerConfiguration | ContentCategoryInterestTriggerConfiguration | ProductCategoryInterestTriggerConfiguration | ProductChangeTriggerConfiguration | ProductInterestTriggerConfiguration | UserActivityTriggerConfiguration | VariantChangeTriggerConfiguration | null;
};

export declare type TriggerConfigurationsRequest = LicensedRequest & {
    /** @format int32 */
    type?: number | null;
};

export declare type TriggerResultRequest = LicensedRequest & {
    /** @format uuid */
    configurationId: string;
};

export declare type TriggerResultResponse = TimedResponse & {
    result?: ITriggerResult | null;
};

export declare interface TrimStringTransformer {
    valuesToTrim: string[];
}

export declare interface User {
    authenticatedId?: string | null;
    temporaryId?: string | null;
    email?: string | null;
    classifications?: Record<string, string | null>;
    identifiers?: Record<string, string | null>;
    data?: Record<string, DataValue>;
    fingerprint?: string | null;
    channel?: Channel | null;
    company?: Company | null;
    custom?: Record<string, string>;
}

export declare type UserActivityTriggerConfiguration = UserActivityTriggerResultTriggerConfiguration;

export declare interface UserActivityTriggerResultTriggerConfiguration {
    $type: string;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    /** @format int32 */
    withinTimeSpanMinutes: number;
    settings?: Record<string, string | null>;
    userConditions?: UserConditionCollection | null;
}

export declare interface UserAssociatedCompanyResultDetails {
    id: string;
    parent?: UserAssociatedCompanyResultDetails | null;
    data?: Record<string, DataValue>;
    /** @format date-time */
    createdUtc: string;
    /** @format date-time */
    lastAccessedUtc: string;
}

export declare interface UserCondition {
    $type: string;
    custom?: Record<string, string | null>;
    negated: boolean;
}

export declare interface UserConditionCollection {
    items?: (AndCondition | HasActivityCondition | HasAuthenticatedIdCondition | HasClassificationCondition | HasDataCondition | HasEmailCondition | HasIdentifierCondition | HasLineItemsInCartCondition | HasModifiedCartCondition | HasPlacedOrderCondition | HasRecentlyReceivedSameTriggerCondition | HasRecentlyReceivedTriggerCondition | OrCondition)[] | null;
}

export declare interface UserConditionConfiguration {
    conditions?: UserConditionCollection | null;
}

export declare type UserDetailsCollectionResponse = TimedResponse & {
    results?: UserResultDetails[][] | null;
};

export declare class UserFactory {
    static anonymous(user?: PartialUser<'temporaryId' | 'fingerprint' | 'authenticatedId'>): User;
    static byAuthenticatedId(authenticatedId: string, temporaryId?: string, user?: PartialUser<'temporaryId' | 'authenticatedId'>): User;
    static byTemporaryId(temporaryId: string, user?: PartialUser<'temporaryId'>): User;
    static byIdentifier(key: string, value: string, user?: PartialUser<'identifiers'>): User;
    static byIdentifiers(identifiers: Record<string, string>, user?: PartialUser<'identifiers'>): User;
    static byEmail(email: string, user?: PartialUser<'email'>): User;
    static byFingerprint(fingerprint: string, user?: PartialUser<'fingerprint'>): User;
}

export declare type UserFavoriteProductRelevanceModifier = RelevanceModifier & {
    /** @format int32 */
    sinceMinutesAgo: number;
    /** @format double */
    numberOfPurchasesWeight: number;
    /** @format double */
    mostRecentPurchaseWeight: number;
    /** @format double */
    ifNotPurchasedBaseWeight: number;
};

export declare type UserQuery = LicensedRequest & {
    criteria: UserQueryCriteria[];
    language?: Language | null;
    currency?: Currency | null;
};

export declare interface UserQueryCriteria {
    authenticatedId?: string | null;
    temporaryId?: string | null;
    email?: string | null;
    language?: Language | null;
    currency?: Currency | null;
    identifiers?: Record<string, string>;
}

export declare interface UserResultDetails {
    authenticatedId?: string | null;
    temporaryId?: string | null;
    email?: string | null;
    classifications?: Record<string, string | null>;
    /** @format date-time */
    lastCartUpdateUtc?: string | null;
    /** @format date-time */
    lastActivityUtc: string;
    /** @format date-time */
    lastOrderUtc?: string | null;
    carts?: Record<string, CartDetails>;
    lastActiveCartName?: string | null;
    /** @format int32 */
    totalNumberOfOrders: number;
    identifiers?: Record<string, string | null>;
    /** @format int32 */
    key: number;
    data?: Record<string, DataValue>;
    temporaryIds?: string[] | null;
    channel?: Channel | null;
    company?: UserAssociatedCompanyResultDetails | null;
}

export declare type UserUpdate = Trackable & {
    user?: User | null;
    kind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export declare type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export declare interface ValueCondition {
    $type: string;
    negated: boolean;
}

export declare interface ValueConditionCollection {
    items?: (ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | HasValueCondition | LessThanCondition | RelativeDateTimeCondition)[] | null;
}

export declare interface ValueSelector {
    $type: string;
}

export declare class ValueSelectorFactory {
    static dataDoubleSelector(key: string): DataDoubleSelector;
    static fixedDoubleValueSelector(value: number): FixedDoubleValueSelector;
}

export declare type VariantAssortmentFilter = Filter & {
    assortments: number[];
};

export declare type VariantAssortmentRelevanceModifier = RelevanceModifier & {
    assortments?: number[] | null;
    /** @format double */
    multiplyWeightBy: number;
};

export declare type VariantChangeTriggerConfiguration = VariantChangeTriggerResultVariantChangeTriggerResultSettingsVariantPropertySelectorEntityChangeTriggerConfiguration;

export declare interface VariantChangeTriggerResultSettings {
    selectedProductProperties?: SelectedProductDetailsPropertiesSettings | null;
    selectedVariantProperties?: SelectedVariantDetailsPropertiesSettings | null;
}

export declare interface VariantChangeTriggerResultVariantChangeTriggerResultSettingsVariantPropertySelectorEntityChangeTriggerConfiguration {
    $type: string;
    entityPropertySelector: ObservableVariantAttributeSelector | ObservableVariantDataValueSelector;
    beforeChangeFilters: FilterCollection;
    afterChangeFilters: FilterCollection;
    change: IChange;
    resultSettings: VariantChangeTriggerResultSettings;
    custom?: Record<string, string | null>;
    /** @format uuid */
    id: string;
    name?: string | null;
    description?: string | null;
    group?: string | null;
    enabled: boolean;
    /** @format date-time */
    created: string;
    createdBy?: string | null;
    /** @format date-time */
    modified: string;
    modifiedBy?: string | null;
    /** @format int32 */
    withinTimeSpanMinutes: number;
    settings?: Record<string, string | null>;
    userConditions?: UserConditionCollection | null;
}

export declare type VariantDataFilter = DataFilter;

export declare type VariantDataHasKeyFilter = Filter & {
    key: string;
};

export declare type VariantDataRelevanceModifier = DataRelevanceModifier;

export declare type VariantDisabledFilter = Filter;

export declare class VariantFilterBuilder extends FilterBuilderBase<VariantFilterBuilder> {
    constructor();
    /**
     * Adds a variant assortment filter to the request.
     * @param assortmentIds - Array of assortment IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantAssortmentFilter(assortmentIds: number[] | number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return the specified variants.
     * @param variantIds - Array of variant IDs or a single ID.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantIdFilter(variantIds: string | string[], negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants within a certain list price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants within a certain sales price range.
     * @param lowerBound - Lower bound of the price range (inclusive).
     * @param upperBound - Upper bound of the price range (inclusive).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated?: boolean, options?: FilterOptions): this;
    /**
     * Filters the request to only return variants with a certain specification.
     * @param key - Specification key.
     * @param equalTo - Specification value to match.
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant data filter to the request.
     * @param key - Data key.
     * @param conditionBuilder - Function to build the condition.
     * @param mustMatchAllConditions - If true, all conditions must be met (default is true).
     * @param filterOutIfKeyIsNotFound - If true, filters out variants without the key (default is true).
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions?: boolean, filterOutIfKeyIsNotFound?: boolean, negated?: boolean, options?: EntityDataFilterOptions): this;
    /**
     * Adds a variant has key filter to the request.
     * @param key - Data key.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantDataHasKeyFilter(key: string, negated?: boolean, options?: FilterOptions): this;
    /**
     * Adds a variant is disabled filter to the request. Only works for product queries, not in searches or recommendations.
     * @param negated - If true, negates the filter (default is false).
     * @param options - Optional settings for the filter.
     * @returns The VariantFilterBuilder instance for chaining.
     */
    addVariantDisabledFilter(negated?: boolean, options?: FilterOptions): this;
}

export declare type VariantIdFilter = Filter & {
    variantIds: string[];
};

export declare type VariantIdRelevanceModifier = RelevanceModifier & {
    variantIds?: string[] | null;
    /** @format double */
    multiplyWeightBy: number;
    negated: boolean;
};

export declare interface VariantIndexConfiguration {
    id?: FieldIndexConfiguration | null;
    displayName?: FieldIndexConfiguration | null;
    specifications?: SpecificationsIndexConfiguration | null;
    data?: DataIndexConfiguration | null;
}

export declare type VariantListPriceFilter = Filter & {
    range: DecimalNullableRange;
    currency?: Currency | null;
};

export declare type VariantListPriceRelevanceModifier = RelevanceModifier & {
    range: DecimalNullableRange;
    currency?: Currency | null;
    /** @format double */
    multiplyWeightBy: number;
    negated: boolean;
};

export declare interface VariantPropertySelector {
    $type: string;
}

export declare interface VariantResult {
    variantId?: string | null;
    displayName?: string | null;
    specification?: Record<string, string | null>;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    /** @format int32 */
    rank: number;
    custom?: Record<string, string | null>;
    /** @format double */
    listPrice?: number | null;
    /** @format double */
    salesPrice?: number | null;
}

export declare interface VariantResultDetails {
    variantId?: string | null;
    displayName?: Multilingual | null;
    specification?: Record<string, string | null>;
    assortments?: number[] | null;
    data?: Record<string, DataValue>;
    custom?: Record<string, string | null>;
    listPrice?: MultiCurrency | null;
    salesPrice?: MultiCurrency | null;
    disabled: boolean;
}

export declare type VariantSalesPriceFilter = Filter & {
    range: DecimalNullableRange;
    currency?: Currency | null;
};

export declare type VariantSalesPriceRelevanceModifier = RelevanceModifier & {
    range: DecimalNullableRange;
    currency?: Currency | null;
    /** @format double */
    multiplyWeightBy: number;
    negated: boolean;
};

export declare interface VariantSearchSettings {
    /** @deprecated */
    excludeResultsWithoutVariant: boolean;
}

export declare type VariantSpecificationFacet = StringValueFacet & {
    key: string;
};

export declare type VariantSpecificationFacetResult = StringValueFacetResult & {
    key?: string | null;
};

export declare type VariantSpecificationFilter = Filter & {
    key: string;
    filterOutIfKeyIsNotFound: boolean;
    equalTo: string;
};

export declare type VariantSpecificationsInCommonRelevanceModifier = RelevanceModifier & {
    specificationKeysAndMultipliers?: KeyMultiplier[] | null;
};

export declare type VariantSpecificationValueRelevanceModifier = RelevanceModifier & {
    key?: string | null;
    value?: string | null;
    /** @format double */
    ifIdenticalMultiplyWeightBy: number;
    /** @format double */
    ifNotIdenticalMultiplyWeightBy: number;
    ifSpecificationKeyNotFoundApplyNotEqualMultiplier: boolean;
};

export declare interface ViewedByUserCompanyInfo {
    /** @format date-time */
    mostRecentlyViewedUtc: string;
    /** @format int64 */
    totalNumberOfTimesViewed: number;
    viewedByParentCompany?: ViewedByUserCompanyInfo | null;
}

export declare interface ViewedByUserInfo {
    /** @format date-time */
    mostRecentlyViewedUtc: string;
    /** @format int32 */
    totalNumberOfTimesViewed: number;
}

export { }
