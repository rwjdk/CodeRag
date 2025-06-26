/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type AbandonedCartTriggerConfiguration = AbandonedCartTriggerResultTriggerConfiguration & {
  cartName?: string | null;
};

export interface AbandonedCartTriggerResultTriggerConfiguration {
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

export type AbandonedSearchTriggerConfiguration = AbandonedSearchTriggerResultTriggerConfiguration & {
  searchTypesInPrioritizedOrder: ("Product" | "ProductCategory" | "Content")[];
  searchTermCondition?: SearchTermCondition | RetailMediaSearchTermCondition | null;
  suppressOnEntityFromSearchResultViewed: boolean;
  /** @format int32 */
  considerAbandonedAfterMinutes: number;
};

export interface AbandonedSearchTriggerResultTriggerConfiguration {
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

export type Advertiser = AdvertiserEntityStateAdvertiserMetadataValuesRetailMediaEntity & {
  name: string;
  allowedPromotions?: PromotionSpecificationCollection | null;
  allowedLocations?: PromotionLocationCollection | null;
};

export interface AdvertiserAdvertiserEntityStateEntityResponse {
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

export interface AdvertiserEntityStateAdvertiserMetadataValuesAdvertisersRequestSortByAdvertisersRequestEntityFiltersEntitiesRequest {
  $type: string;
  filters?: AdvertisersRequestEntityFilters | null;
  sorting?: AdvertisersRequestSortBySorting | null;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface AdvertiserEntityStateAdvertiserMetadataValuesRetailMediaEntity {
  $type: string;
  state: "Active" | "Inactive" | "Archived";
  metadata: AdvertiserMetadataValues;
  /** @format uuid */
  id?: string | null;
}

export type AdvertiserMetadataValues = MetadataValues & {
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

export interface AdvertiserSaveEntitiesRequest {
  $type: string;
  entities: Advertiser[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface AdvertiserSaveEntitiesResponse {
  $type: string;
  entities?: Advertiser[] | null;
  statistics?: Statistics | null;
}

export type AdvertisersRequest =
  AdvertiserEntityStateAdvertiserMetadataValuesAdvertisersRequestSortByAdvertisersRequestEntityFiltersEntitiesRequest;

export type AdvertisersRequestEntityFilters =
  RetailMediaEntity2AdvertiserEntityStateAdvertiserMetadataValuesRetailMediaEntity2EntityFilters & {
    ids?: string[] | null;
  };

export interface AdvertisersRequestSortBySorting {
  sortBy: "Created" | "Modified" | "Name";
  sortOrder: "Ascending" | "Descending";
}

export type AdvertisersResponse = AdvertiserAdvertiserEntityStateEntityResponse;

export interface AnalyzerRequest {
  $type: string;
  language?: Language | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type AndCondition = UserCondition & {
  conditions?: UserConditionCollection | null;
};

export type AndFilter = Filter & {
  filters: (
    | AndFilter
    | BrandAssortmentFilter
    | BrandDataFilter
    | BrandDataHasKeyFilter
    | BrandDisabledFilter
    | BrandIdFilter
    | CartDataFilter
    | CompanyDataFilter
    | CompanyDataHasKeyFilter
    | CompanyDisabledFilter
    | CompanyIdFilter
    | ContentAssortmentFilter
    | ContentCategoryAssortmentFilter
    | ContentCategoryDataFilter
    | ContentCategoryDataHasKeyFilter
    | ContentCategoryDisabledFilter
    | ContentCategoryHasAncestorFilter
    | ContentCategoryHasChildFilter
    | ContentCategoryHasContentsFilter
    | ContentCategoryHasParentFilter
    | ContentCategoryIdFilter
    | ContentCategoryLevelFilter
    | ContentCategoryRecentlyViewedByUserFilter
    | ContentDataFilter
    | ContentDataHasKeyFilter
    | ContentDisabledFilter
    | ContentHasCategoriesFilter
    | ContentIdFilter
    | ContentRecentlyViewedByUserFilter
    | OrFilter
    | ProductAndVariantIdFilter
    | ProductAssortmentFilter
    | ProductCategoryAssortmentFilter
    | ProductCategoryDataFilter
    | ProductCategoryDataHasKeyFilter
    | ProductCategoryDisabledFilter
    | ProductCategoryHasAncestorFilter
    | ProductCategoryHasChildFilter
    | ProductCategoryHasParentFilter
    | ProductCategoryHasProductsFilter
    | ProductCategoryIdFilter
    | ProductCategoryLevelFilter
    | ProductCategoryRecentlyViewedByUserFilter
    | ProductDataFilter
    | ProductDataHasKeyFilter
    | ProductDisabledFilter
    | ProductDisplayNameFilter
    | ProductHasCategoriesFilter
    | ProductHasVariantsFilter
    | ProductIdFilter
    | ProductInCartFilter
    | ProductListPriceFilter
    | ProductRecentlyPurchasedByCompanyFilter
    | ProductRecentlyPurchasedByUserCompanyFilter
    | ProductRecentlyPurchasedByUserFilter
    | ProductRecentlyPurchasedByUserParentCompanyFilter
    | ProductRecentlyViewedByCompanyFilter
    | ProductRecentlyViewedByUserCompanyFilter
    | ProductRecentlyViewedByUserFilter
    | ProductRecentlyViewedByUserParentCompanyFilter
    | ProductSalesPriceFilter
    | VariantAssortmentFilter
    | VariantDataFilter
    | VariantDataHasKeyFilter
    | VariantDisabledFilter
    | VariantIdFilter
    | VariantListPriceFilter
    | VariantSalesPriceFilter
    | VariantSpecificationFilter
  )[];
};

export interface ApplicableIndexes {
  indexes?: string[] | null;
}

export interface ApplicableLanguages {
  languages?: Language[] | null;
}

export type ApplyFilterSettings = FilterScopeSettings & {
  apply: boolean;
};

export interface AssortmentFacet {
  $type: string;
  assortmentFilterType: "Or";
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface AssortmentFacetResult {
  $type: string;
  assortmentFilterType: "Or";
  selected?: number[] | null;
  available?: Int32AvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export type BatchedTrackingRequest = TrackingRequest & {
  items?:
    | (
        | BrandAdministrativeAction
        | BrandUpdate
        | BrandView
        | Cart
        | CompanyAdministrativeAction
        | CompanyUpdate
        | ContentAdministrativeAction
        | ContentCategoryAdministrativeAction
        | ContentCategoryUpdate
        | ContentCategoryView
        | ContentUpdate
        | ContentView
        | Order
        | ProductAdministrativeAction
        | ProductCategoryAdministrativeAction
        | ProductCategoryUpdate
        | ProductCategoryView
        | ProductUpdate
        | ProductView
        | SearchTerm
        | UserUpdate
      )[]
    | null;
};

export interface BooleanAvailableFacetValue {
  value: boolean;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface BooleanBooleanValueFacetResult {
  $type: string;
  selected?: boolean[] | null;
  available?: BooleanAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface BooleanContentDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface BooleanContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  available?: BooleanAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface BooleanDataObjectValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface BooleanDataObjectValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  available?: BooleanAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface BooleanProductCategoryDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface BooleanProductCategoryDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  available?: BooleanAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface BooleanProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface BooleanProductDataValueFacetResult {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  available?: BooleanAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface BooleanValueFacet {
  $type: string;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export type BoostAndBuryRule = MerchandisingRule & {
  multiplierSelector?: DataDoubleSelector | FixedDoubleValueSelector | null;
};

export interface Brand {
  id: string;
  displayName?: string | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
}

export type BrandAdministrativeAction = Trackable & {
  filters: FilterCollection;
  language?: Language | null;
  kind: "Disable" | "Enable" | "Delete";
  currency?: Currency | null;
};

export type BrandAssortmentFilter = Filter & {
  assortments: number[];
};

export type BrandDataFilter = DataFilter;

export type BrandDataHasKeyFilter = Filter & {
  key: string;
};

export type BrandDetailsCollectionResponse = TimedResponse & {
  brands?: BrandResultDetails[] | null;
  /** @format int32 */
  totalNumberOfResults?: number | null;
};

export type BrandDisabledFilter = Filter;

export type BrandFacet = StringValueFacet;

export type BrandFacetResult = StringBrandNameAndIdResultValueFacetResult;

export type BrandIdFilter = Filter & {
  brandIds?: string[] | null;
};

export type BrandIdRelevanceModifier = RelevanceModifier & {
  brandId?: string | null;
  /** @format double */
  ifProductIsBrandMultiplyWeightBy: number;
  /** @format double */
  ifProductIsNotBrandMultiplyWeightBy: number;
};

export interface BrandIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
}

export interface BrandNameAndIdResult {
  id?: string | null;
  displayName?: string | null;
}

export interface BrandNameAndIdResultAvailableFacetValue {
  value?: BrandNameAndIdResult | null;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export type BrandQuery = LicensedRequest & {
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

export interface BrandRecommendationRequest {
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

export interface BrandRecommendationRequestSettings {
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

export type BrandRecommendationResponse = RecommendationResponse & {
  recommendations?: BrandResult[] | null;
};

export interface BrandRecommendationWeights {
  /** @format double */
  brandViews: number;
  /** @format double */
  productViews: number;
  /** @format double */
  productPurchases: number;
}

export interface BrandResult {
  id?: string | null;
  displayName?: string | null;
  /** @format int32 */
  rank: number;
  viewedByUser?: ViewedByUserInfo | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string | null>;
}

export interface BrandResultDetails {
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

export type BrandUpdate = Trackable & {
  brand?: Brand | null;
  kind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export type BrandView = Trackable & {
  user?: User | null;
  brand: Brand;
  /** @deprecated */
  channel?: Channel | null;
};

export interface Budget {
  $type: string;
  /** @format double */
  maxTotalCost?: number | null;
  /** @format double */
  totalCost: number;
}

export type ByHitsFacetSorting = FacetSorting;

export type CPMBudget = Budget & {
  /** @format double */
  costPerMille: number;
};

export type Campaign = CampaignEntityStateCampaignMetadataValuesRetailMediaEntity & {
  name: string;
  schedule?: ISchedule | null;
  promotions: PromotionCollection;
  /** @format uuid */
  advertiserId: string;
  budget: CPMBudget;
  status: CampaignStatusWithHistory;
  conditions?: CampaignCampaignConditions | null;
};

export interface CampaignAnalytics {
  products?: CampaignAnalyticsProductAnalytics | null;
}

export interface CampaignAnalyticsProductAnalytics {
  timeSeries?: CampaignAnalyticsProductAnalyticsPeriodMetrics[] | null;
  /** @format int32 */
  promotions: number;
  promotedProducts?: CampaignAnalyticsProductAnalyticsPromotedProductMetrics[] | null;
}

export interface CampaignAnalyticsProductAnalyticsPeriodMetrics {
  /** @format date-time */
  periodFromUtc: string;
  /** @format int32 */
  views: number;
  /** @format int32 */
  salesQuantity: number;
  currencies?: CampaignAnalyticsProductAnalyticsPeriodMetricsCurrencyMetrics[] | null;
}

export interface CampaignAnalyticsProductAnalyticsPeriodMetricsCurrencyMetrics {
  currency?: string | null;
  /** @format double */
  revenue: number;
}

export interface CampaignAnalyticsProductAnalyticsPromotedProductMetrics {
  productId?: string | null;
  /** @format int32 */
  promotions: number;
}

export type CampaignAnalyticsRequest = LicensedRequest & {
  /** @format uuid */
  id: string;
  periodUtc: DateTimeRange;
  filters?: FilterCollection | null;
};

export type CampaignAnalyticsResponse = TimedResponse & {
  analytics?: CampaignAnalytics | null;
};

export type CampaignCampaignConditions = RetailMediaConditions & {
  searchTerm?: RetailMediaSearchTermConditionCollection | null;
};

export interface CampaignCampaignEntityStateEntityResponse {
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

export interface CampaignEntityStateCampaignMetadataValuesCampaignsRequestSortByCampaignsRequestEntityFiltersEntitiesRequest {
  $type: string;
  filters?: CampaignsRequestEntityFilters | null;
  sorting?: CampaignsRequestSortBySorting | null;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface CampaignEntityStateCampaignMetadataValuesRetailMediaEntity {
  $type: string;
  state: "Proposed" | "Approved" | "Archived";
  metadata: CampaignMetadataValues;
  /** @format uuid */
  id?: string | null;
}

export type CampaignMetadataValues = MetadataValues & {
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

export interface CampaignSaveEntitiesRequest {
  $type: string;
  entities: Campaign[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface CampaignSaveEntitiesResponse {
  $type: string;
  entities?: Campaign[] | null;
  statistics?: Statistics | null;
}

export interface CampaignStatusWithHistory {
  current: "Active" | "Inactive" | "ScheduleCompleted" | "BudgetReached";
  history: CampaignStatusWithHistoryChange[];
}

export interface CampaignStatusWithHistoryChange {
  /** @format date-time */
  utcTime: string;
  status: "Active" | "Inactive" | "ScheduleCompleted" | "BudgetReached";
}

export type CampaignsRequest =
  CampaignEntityStateCampaignMetadataValuesCampaignsRequestSortByCampaignsRequestEntityFiltersEntitiesRequest;

export type CampaignsRequestEntityFilters =
  RetailMediaEntity2CampaignEntityStateCampaignMetadataValuesRetailMediaEntity2EntityFilters & {
    ids?: string[] | null;
    advertiserIds?: string[] | null;
  };

export interface CampaignsRequestSortBySorting {
  sortBy: "Created" | "Modified" | "Name";
  sortOrder: "Ascending" | "Descending";
}

export type CampaignsResponse = CampaignCampaignEntityStateEntityResponse;

export type Cart = Trackable & {
  user?: User | null;
  name?: string | null;
  subtotal?: Money | null;
  lineItems?: LineItem[] | null;
  data?: Record<string, DataValue>;
  /** @deprecated */
  channel?: Channel | null;
};

export type CartDataFilter = Filter & {
  key: string;
  filterOutIfKeyIsNotFound: boolean;
  mustMatchAllConditions: boolean;
  conditions?: ValueConditionCollection | null;
  language?: Language | null;
  currency?: Currency | null;
};

export interface CartDetails {
  name?: string | null;
  /** @format date-time */
  modifiedUtc: string;
  lineItems?: LineItem[] | null;
  subtotal?: Money | null;
  data?: Record<string, DataValue>;
}

export interface Category {
  $type: string;
  id?: string | null;
  displayName?: Multilingual | null;
  categoryPaths?: CategoryPath[] | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string | null>;
}

export interface CategoryAdministrativeAction {
  $type: string;
  filters: FilterCollection;
  language?: Language | null;
  kind: "Disable" | "Enable" | "Delete";
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type CategoryFacet = StringValueFacet & {
  categorySelectionStrategy: "ImmediateParent" | "Ancestors" | "Descendants";
};

export type CategoryFacetResult = StringCategoryNameAndIdResultValueFacetResult & {
  categorySelectionStrategy: "ImmediateParent" | "Ancestors" | "Descendants";
};

export type CategoryHierarchyFacet = CategoryPathValueFacet & {
  categorySelectionStrategy: "ImmediateParent" | "Ancestors" | "Descendants";
  selectedPropertiesSettings?:
    | SelectedContentCategoryPropertiesSettings
    | SelectedProductCategoryPropertiesSettings
    | null;
};

export type CategoryHierarchyFacetResult = FacetResult & {
  categorySelectionStrategy: "ImmediateParent" | "Ancestors" | "Descendants";
  nodes: CategoryHierarchyFacetResultCategoryNode[];
};

export interface CategoryHierarchyFacetResultCategoryNode {
  category: ContentCategoryResult | ProductCategoryResult;
  /** @format int32 */
  hits: number;
  parentId?: string | null;
  children?: CategoryHierarchyFacetResultCategoryNode[] | null;
  selected: boolean;
}

export interface CategoryIdFilter {
  $type: string;
  categoryIds?: string[] | null;
  evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor";
  negated: boolean;
  custom?: Record<string, string>;
  settings?: FilterSettings | null;
}

export interface CategoryIndexConfiguration {
  $type: string;
  unspecified?: CategoryIndexConfigurationEntry | null;
}

export interface CategoryIndexConfigurationEntry {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
}

export interface CategoryLevelFilter {
  $type: string;
  levels?: number[] | null;
  negated: boolean;
  custom?: Record<string, string>;
  settings?: FilterSettings | null;
}

export interface CategoryNameAndId {
  id: string;
  displayName?: Multilingual | null;
}

export interface CategoryNameAndIdResult {
  id?: string | null;
  displayName?: string | null;
}

export interface CategoryNameAndIdResultAvailableFacetValue {
  value?: CategoryNameAndIdResult | null;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface CategoryPath {
  breadcrumbPathStartingFromRoot: CategoryNameAndId[];
}

export interface CategoryPathResult {
  pathFromRoot?: CategoryNameAndIdResult[] | null;
  /** @format int32 */
  rank: number;
}

export interface CategoryPathResultDetails {
  breadcrumbPathStartingFromRoot?: CategoryNameAndId[] | null;
}

export interface CategoryPathValueFacet {
  $type: string;
  selected?: CategoryPath[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface CategoryResult {
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

export interface CategoryUpdate {
  $type: string;
  kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  custom?: Record<string, string | null>;
}

export interface Channel {
  name: string;
  subChannel?: Channel | null;
}

export type ClearTextParser = Parser;

export interface Company {
  id: string;
  parent?: Company | null;
  data?: Record<string, DataValue>;
}

export type CompanyAdministrativeAction = Trackable & {
  filters: FilterCollection;
  language?: Language | null;
  kind: "Disable" | "Enable" | "Delete";
  currency?: Currency | null;
};

export type CompanyDataFilter = DataFilter;

export type CompanyDataHasKeyFilter = Filter & {
  key: string;
};

export type CompanyDisabledFilter = Filter;

export type CompanyIdFilter = Filter & {
  companyIds: string[];
};

export type CompanyUpdate = Trackable & {
  company: Company;
  kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  parents?: Company[] | null;
  replaceExistingParents: boolean;
};

export interface ConditionConfiguration {
  user?: UserConditionConfiguration | null;
  input?: InputConditionConfiguration | null;
  target?: TargetConditionConfiguration | null;
  context?: ContextConditionConfiguration | null;
}

export type ContainsCondition = ValueCondition & {
  value?: DataValue | null;
  valueCollectionEvaluationMode: "All" | "Any";
  objectFilter?: DataObjectFilter | null;
};

export interface Content {
  id: string;
  displayName?: Multilingual | null;
  categoryPaths?: CategoryPath[] | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string>;
}

export type ContentAdministrativeAction = Trackable & {
  filters: FilterCollection;
  language?: Language | null;
  kind: "DisableInRecommendations" | "Disable" | "EnableInRecommendations" | "Enable" | "PermanentlyDelete" | "Delete";
  currency?: Currency | null;
};

export type ContentAssortmentFacet = AssortmentFacet;

export type ContentAssortmentFacetResult = AssortmentFacetResult;

export type ContentAssortmentFilter = Filter & {
  assortments: number[];
};

export type ContentAttributeSorting = ContentSorting & {
  attribute: "Id" | "DisplayName";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ContentCategory = Category;

export type ContentCategoryAdministrativeAction = CategoryAdministrativeAction;

export type ContentCategoryAssortmentFilter = Filter & {
  assortments: number[];
};

export type ContentCategoryDataFilter = DataFilter;

export type ContentCategoryDataHasKeyFilter = Filter & {
  key: string;
};

export type ContentCategoryDataRelevanceModifier = DataRelevanceModifier;

export type ContentCategoryDetailsCollectionResponse = TimedResponse & {
  categories?: ContentCategoryResultDetails[] | null;
  /** @format int32 */
  totalNumberOfResults?: number | null;
};

export type ContentCategoryDisabledFilter = Filter;

export type ContentCategoryHasAncestorFilter = HasAncestorCategoryFilter;

export type ContentCategoryHasChildFilter = HasChildCategoryFilter;

export type ContentCategoryHasContentsFilter = Filter;

export type ContentCategoryHasParentFilter = HasParentCategoryFilter;

export type ContentCategoryIdFilter = CategoryIdFilter;

export interface ContentCategoryIdFilterCategoryQuery {
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

export type ContentCategoryInterestTriggerConfiguration = ContentCategoryInterestTriggerResultTriggerConfiguration & {
  categoryViews?: Int32NullableRange | null;
  contentViews?: Int32NullableRange | null;
  filters?: FilterCollection | null;
};

export interface ContentCategoryInterestTriggerResultTriggerConfiguration {
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

export type ContentCategoryLevelFilter = CategoryLevelFilter;

export type ContentCategoryQuery = ContentCategoryIdFilterCategoryQuery;

export type ContentCategoryRecentlyViewedByUserFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ContentCategoryRecentlyViewedByUserRelevanceModifier = RecentlyViewedByUserRelevanceModifier;

export interface ContentCategoryRecommendationRequest {
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

export type ContentCategoryRecommendationRequestCollection = LicensedRequest & {
  requests?: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)[] | null;
  requireDistinctCategoriesAcrossResults: boolean;
};

export interface ContentCategoryRecommendationRequestSettings {
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

export type ContentCategoryRecommendationResponse = RecommendationResponse & {
  recommendations?: ContentCategoryResult[] | null;
};

export type ContentCategoryRecommendationResponseCollection = TimedResponse & {
  responses?: ContentCategoryRecommendationResponse[] | null;
};

export interface ContentCategoryRecommendationWeights {
  /** @format double */
  categoryViews: number;
  /** @format double */
  contentViews: number;
}

export type ContentCategoryResult = CategoryResult;

export type ContentCategoryResultDetails = ContentCategoryResultDetailsCategoryResultDetails;

export interface ContentCategoryResultDetailsCategoryResultDetails {
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

export type ContentCategorySearchRequest = PaginatedSearchRequest & {
  term: string;
  settings?: ContentCategorySearchSettings | null;
};

export type ContentCategorySearchResponse = PaginatedSearchResponse;

export type ContentCategorySearchSettings = SearchSettings & {
  /** @format int32 */
  numberOfRecommendations?: number | null;
  onlyIncludeRecommendationsForEmptyResults?: boolean | null;
};

export type ContentCategoryUpdate = CategoryUpdate & {
  category?: ContentCategory | null;
};

export type ContentCategoryView = Trackable & {
  user?: User | null;
  idPath: string[];
  /** @deprecated */
  channel?: Channel | null;
};

export interface ContentContentHighlightPropsHighlightSettings {
  $type: string;
  enabled: boolean;
  limit: HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits;
  highlightable: ContentHighlightProps;
  shape: HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape;
}

export type ContentDataBooleanValueFacet = BooleanContentDataValueFacet;

export type ContentDataBooleanValueFacetResult = BooleanContentDataValueFacetResult;

export type ContentDataDoubleRangeFacet = DoubleNullableContentDataRangeFacet;

export type ContentDataDoubleRangeFacetResult = DoubleNullableContentDataRangeFacetResult;

export type ContentDataDoubleRangesFacet = DoubleNullableContentDataRangesFacet;

export type ContentDataDoubleRangesFacetResult = DoubleNullableContentDataRangesFacetResult;

export type ContentDataDoubleValueFacet = DoubleContentDataValueFacet;

export type ContentDataDoubleValueFacetResult = DoubleContentDataValueFacetResult;

export type ContentDataFilter = DataFilter;

export type ContentDataHasKeyFilter = Filter & {
  key: string;
};

export type ContentDataIntegerValueFacet = Int32ContentDataValueFacet;

export type ContentDataIntegerValueFacetResult = Int32ContentDataValueFacetResult;

export type ContentDataObjectFacet = DataObjectFacet;

export type ContentDataObjectFacetResult = DataObjectFacetResult;

export type ContentDataRelevanceModifier = DataRelevanceModifier;

export type ContentDataSorting = ContentSorting & {
  key?: string | null;
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ContentDataStringValueFacet = StringContentDataValueFacet;

export type ContentDataStringValueFacetResult = StringContentDataValueFacetResult;

export type ContentDetailsCollectionResponse = TimedResponse & {
  contents?: ContentResultDetails[] | null;
  /** @format int32 */
  totalNumberOfResults?: number | null;
};

export type ContentDisabledFilter = Filter;

export type ContentFacetQuery = FacetQuery & {
  items: (
    | ContentAssortmentFacet
    | ProductAssortmentFacet
    | ProductCategoryAssortmentFacet
    | BrandFacet
    | CategoryFacet
    | CategoryHierarchyFacet
    | ContentDataObjectFacet
    | ContentDataDoubleRangeFacet
    | ContentDataDoubleRangesFacet
    | ContentDataStringValueFacet
    | ContentDataBooleanValueFacet
    | ContentDataDoubleValueFacet
    | ContentDataIntegerValueFacet
    | DataObjectFacet
    | DataObjectDoubleRangeFacet
    | DataObjectDoubleRangesFacet
    | DataObjectStringValueFacet
    | DataObjectBooleanValueFacet
    | DataObjectDoubleValueFacet
    | PriceRangeFacet
    | PriceRangesFacet
    | ProductCategoryDataObjectFacet
    | ProductCategoryDataDoubleRangeFacet
    | ProductCategoryDataDoubleRangesFacet
    | ProductCategoryDataStringValueFacet
    | ProductCategoryDataBooleanValueFacet
    | ProductCategoryDataDoubleValueFacet
    | ProductDataObjectFacet
    | ProductDataDoubleRangeFacet
    | ProductDataDoubleRangesFacet
    | ProductDataStringValueFacet
    | ProductDataBooleanValueFacet
    | ProductDataDoubleValueFacet
    | ProductDataIntegerValueFacet
    | RecentlyPurchasedFacet
    | VariantSpecificationFacet
  )[];
};

export interface ContentFacetResult {
  items?:
    | (
        | ProductAssortmentFacetResult
        | ContentAssortmentFacetResult
        | ProductCategoryAssortmentFacetResult
        | BrandFacetResult
        | CategoryFacetResult
        | CategoryHierarchyFacetResult
        | ContentDataObjectFacetResult
        | ContentDataDoubleRangeFacetResult
        | ContentDataDoubleRangesFacetResult
        | ContentDataStringValueFacetResult
        | ContentDataBooleanValueFacetResult
        | ContentDataDoubleValueFacetResult
        | ContentDataIntegerValueFacetResult
        | DataObjectFacetResult
        | DataObjectDoubleRangeFacetResult
        | DataObjectDoubleRangesFacetResult
        | DataObjectStringValueFacetResult
        | DataObjectBooleanValueFacetResult
        | DataObjectDoubleValueFacetResult
        | PriceRangeFacetResult
        | PriceRangesFacetResult
        | ProductCategoryDataObjectFacetResult
        | ProductCategoryDataDoubleRangeFacetResult
        | ProductCategoryDataDoubleRangesFacetResult
        | ProductCategoryDataStringValueFacetResult
        | ProductCategoryDataBooleanValueFacetResult
        | ProductCategoryDataDoubleValueFacetResult
        | ProductDataObjectFacetResult
        | ProductDataDoubleRangeFacetResult
        | ProductDataDoubleRangesFacetResult
        | ProductDataStringValueFacetResult
        | ProductDataBooleanValueFacetResult
        | ProductDataDoubleValueFacetResult
        | ProductDataIntegerValueFacetResult
        | RecentlyPurchasedFacetResult
        | VariantSpecificationFacetResult
      )[]
    | null;
}

export type ContentHasCategoriesFilter = Filter;

export interface ContentHighlightProperties {
  $type: string;
  displayName: boolean;
  dataKeys?: string[] | null;
}

export type ContentHighlightProps = ContentHighlightProperties;

export type ContentIdFilter = Filter & {
  contentIds: string[];
};

export interface ContentIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  category?: CategoryIndexConfiguration | ProductCategoryIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
}

export type ContentPopularitySorting = ContentSorting;

export type ContentQuery = LicensedRequest & {
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

export type ContentRecentlyViewedByUserFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ContentRecentlyViewedByUserRelevanceModifier = RecentlyViewedByUserRelevanceModifier;

export interface ContentRecommendationRequest {
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

export type ContentRecommendationRequestCollection = LicensedRequest & {
  requests?:
    | (
        | ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest
      )[]
    | null;
  requireDistinctContentsAcrossResults: boolean;
};

export interface ContentRecommendationRequestSettings {
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

export type ContentRecommendationResponse = RecommendationResponse & {
  recommendations?: ContentResult[] | null;
};

export type ContentRecommendationResponseCollection = TimedResponse & {
  responses?: ContentRecommendationResponse[] | null;
};

export type ContentRelevanceSorting = ContentSorting;

export interface ContentResult {
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

export interface ContentResultDetails {
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

export type ContentSearchRequest = PaginatedSearchRequest & {
  term?: string | null;
  facets?: ContentFacetQuery | null;
  settings?: ContentSearchSettings | null;
  sorting?: ContentSortBySpecification | null;
};

export type ContentSearchResponse = PaginatedSearchResponse & {
  results?: ContentResult[] | null;
  facets?: ContentFacetResult | null;
  recommendations?: ContentResult[] | null;
};

export type ContentSearchSettings = SearchSettings & {
  selectedContentProperties?: SelectedContentPropertiesSettings | null;
  recommendations: RecommendationSettings;
  highlight?: ContentSearchSettingsHighlightSettings | null;
};

export type ContentSearchSettingsHighlightSettings = ContentContentHighlightPropsHighlightSettings;

export interface ContentSortBySpecification {
  value?: ContentAttributeSorting | ContentDataSorting | ContentPopularitySorting | ContentRelevanceSorting | null;
}

export interface ContentSorting {
  $type: string;
  order: "Ascending" | "Descending";
  thenBy?: ContentAttributeSorting | ContentDataSorting | ContentPopularitySorting | ContentRelevanceSorting | null;
}

export type ContentUpdate = Trackable & {
  content?: Content | null;
  kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export type ContentView = Trackable & {
  user?: User | null;
  content: Content;
  /** @deprecated */
  channel?: Channel | null;
};

export type ContentsViewedAfterViewingContentRequest = ContentRecommendationRequest & {
  contentId: string;
};

export type ContentsViewedAfterViewingMultipleContentsRequest = ContentRecommendationRequest & {
  contentIds: string[];
};

export type ContentsViewedAfterViewingMultipleProductsRequest = ContentRecommendationRequest & {
  productAndVariantIds: ProductAndVariantId[];
};

export type ContentsViewedAfterViewingProductRequest = ContentRecommendationRequest & {
  productAndVariantId: ProductAndVariantId;
};

export interface ContextConditionConfiguration {
  filters?: RequestContextFilter[] | null;
}

export interface Currency {
  value: string;
}

export type CustomProductRecommendationRequest = ProductRecommendationRequest & {
  recommendationType: string;
  parameters?: Record<string, string>;
};

export type DataDoubleSelector = ValueSelector & {
  key?: string | null;
};

export interface DataFilter {
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

export interface DataIndexConfiguration {
  keys?: Record<string, FieldIndexConfiguration>;
  unspecified?: FieldIndexConfiguration | null;
}

export type DataKeyPopularityMultiplierSelector = PopularityMultiplierSelector & {
  key?: string | null;
};

export interface DataObject {
  data: Record<string, DataValue>;
}

export type DataObjectBooleanValueFacet = BooleanDataObjectValueFacet;

export type DataObjectBooleanValueFacetResult = BooleanDataObjectValueFacetResult;

export type DataObjectDoubleRangeFacet = DoubleNullableDataObjectRangeFacet;

export type DataObjectDoubleRangeFacetResult = DoubleNullableDataObjectRangeFacetResult;

export type DataObjectDoubleRangesFacet = DoubleNullableDataObjectRangesFacet;

export type DataObjectDoubleRangesFacetResult = DoubleNullableDataObjectRangesFacetResult;

export type DataObjectDoubleValueFacet = DoubleDataObjectValueFacet;

export type DataObjectDoubleValueFacetResult = DoubleDataObjectValueFacetResult;

export type DataObjectFacet = UtilRequiredKeys<Facet, "$type"> & {
  $type: string;
  key: string;
  items: (
    | ContentAssortmentFacet
    | ProductAssortmentFacet
    | ProductCategoryAssortmentFacet
    | BrandFacet
    | CategoryFacet
    | CategoryHierarchyFacet
    | ContentDataObjectFacet
    | ContentDataDoubleRangeFacet
    | ContentDataDoubleRangesFacet
    | ContentDataStringValueFacet
    | ContentDataBooleanValueFacet
    | ContentDataDoubleValueFacet
    | ContentDataIntegerValueFacet
    | DataObjectFacet
    | DataObjectDoubleRangeFacet
    | DataObjectDoubleRangesFacet
    | DataObjectStringValueFacet
    | DataObjectBooleanValueFacet
    | DataObjectDoubleValueFacet
    | PriceRangeFacet
    | PriceRangesFacet
    | ProductCategoryDataObjectFacet
    | ProductCategoryDataDoubleRangeFacet
    | ProductCategoryDataDoubleRangesFacet
    | ProductCategoryDataStringValueFacet
    | ProductCategoryDataBooleanValueFacet
    | ProductCategoryDataDoubleValueFacet
    | ProductDataObjectFacet
    | ProductDataDoubleRangeFacet
    | ProductDataDoubleRangesFacet
    | ProductDataStringValueFacet
    | ProductDataBooleanValueFacet
    | ProductDataDoubleValueFacet
    | ProductDataIntegerValueFacet
    | RecentlyPurchasedFacet
    | VariantSpecificationFacet
  )[];
  filter: DataObjectFilter;
};

export type DataObjectFacetResult = UtilRequiredKeys<FacetResult, "$type"> & {
  $type: string;
  key?: string | null;
  items?:
    | (
        | ProductAssortmentFacetResult
        | ContentAssortmentFacetResult
        | ProductCategoryAssortmentFacetResult
        | BrandFacetResult
        | CategoryFacetResult
        | CategoryHierarchyFacetResult
        | ContentDataObjectFacetResult
        | ContentDataDoubleRangeFacetResult
        | ContentDataDoubleRangesFacetResult
        | ContentDataStringValueFacetResult
        | ContentDataBooleanValueFacetResult
        | ContentDataDoubleValueFacetResult
        | ContentDataIntegerValueFacetResult
        | DataObjectFacetResult
        | DataObjectDoubleRangeFacetResult
        | DataObjectDoubleRangesFacetResult
        | DataObjectStringValueFacetResult
        | DataObjectBooleanValueFacetResult
        | DataObjectDoubleValueFacetResult
        | PriceRangeFacetResult
        | PriceRangesFacetResult
        | ProductCategoryDataObjectFacetResult
        | ProductCategoryDataDoubleRangeFacetResult
        | ProductCategoryDataDoubleRangesFacetResult
        | ProductCategoryDataStringValueFacetResult
        | ProductCategoryDataBooleanValueFacetResult
        | ProductCategoryDataDoubleValueFacetResult
        | ProductDataObjectFacetResult
        | ProductDataDoubleRangeFacetResult
        | ProductDataDoubleRangesFacetResult
        | ProductDataStringValueFacetResult
        | ProductDataBooleanValueFacetResult
        | ProductDataDoubleValueFacetResult
        | ProductDataIntegerValueFacetResult
        | RecentlyPurchasedFacetResult
        | VariantSpecificationFacetResult
      )[]
    | null;
  filter?: DataObjectFilter | null;
};

export interface DataObjectFilter {
  conditions?:
    | (
        | ObjectValueContainsCondition
        | ObjectValueEqualsCondition
        | ObjectValueGreaterThanCondition
        | ObjectValueInRangeCondition
        | ObjectValueIsSubsetOfCondition
        | ObjectValueLessThanCondition
        | ObjectValueMaxByCondition
        | ObjectValueMinByCondition
        | ObjectValueRelativeDateTimeCondition
      )[]
    | null;
  /** @format int32 */
  skip?: number | null;
  /** @format int32 */
  take?: number | null;
}

export type DataObjectStringValueFacet = StringDataObjectValueFacet;

export type DataObjectStringValueFacetResult = StringDataObjectValueFacetResult;

export interface DataObjectValueSelector {
  key: string;
  filter?: DataObjectFilter | null;
  childSelector?: DataObjectValueSelector | null;
  fallbackSelector?: DataObjectValueSelector | null;
}

export interface DataRelevanceModifier {
  $type: string;
  key?: string | null;
  considerAsMatchIfKeyIsNotFound: boolean;
  /**
   * @deprecated
   * @format double
   */
  multiplyWeightBy: number;
  mustMatchAllConditions: boolean;
  conditions?:
    | (
        | ContainsCondition
        | DistinctCondition
        | EqualsCondition
        | GreaterThanCondition
        | HasValueCondition
        | LessThanCondition
        | RelativeDateTimeCondition
      )[]
    | null;
  multiplierSelector?: DataDoubleSelector | FixedDoubleValueSelector | null;
  filters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface DataValue {
  type:
    | "String"
    | "Double"
    | "Boolean"
    | "Multilingual"
    | "Money"
    | "MultiCurrency"
    | "StringList"
    | "DoubleList"
    | "BooleanList"
    | "MultilingualCollection"
    | "Object"
    | "ObjectList";
  value?: any;
  isCollection: boolean;
}

export interface DateTimeRange {
  /** @format date-time */
  lowerBoundInclusive: string;
  /** @format date-time */
  upperBoundInclusive: string;
}

export interface DecimalNullableChainableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;
  /** @format double */
  upperBoundExclusive?: number | null;
}

export interface DecimalNullableChainableRangeAvailableFacetValue {
  value?: DecimalNullableChainableRange | null;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DecimalNullableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;
  /** @format double */
  upperBoundInclusive?: number | null;
}

export interface DecimalRange {
  /** @format double */
  lowerBoundInclusive: number;
  /** @format double */
  upperBoundInclusive: number;
}

export interface DecimalRangeAvailableFacetValue {
  value?: DecimalRange | null;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export type DecompoundRule = SearchRule & {
  word: string;
  head?: string | null;
  modifiers?: string[] | null;
};

export interface DecompoundRuleSaveSearchRulesRequest {
  $type: string;
  rules: DecompoundRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface DecompoundRuleSaveSearchRulesResponse {
  $type: string;
  rules?: DecompoundRule[] | null;
  statistics?: Statistics | null;
}

export interface DecompoundRuleSearchRulesResponse {
  $type: string;
  rules?: DecompoundRule[] | null;
  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type DecompoundRulesRequest = DecompoundRulesRequestSortBySearchRulesRequest;

export interface DecompoundRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: DecompoundRulesRequestSortBySorting;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface DecompoundRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type DecompoundRulesResponse = DecompoundRuleSearchRulesResponse;

export type DeleteDecompoundRulesRequest = DeleteSearchRulesRequest;

export type DeleteMerchandisingRuleRequest = LicensedRequest & {
  /** @format uuid */
  id: string;
};

export type DeletePredictionRulesRequest = DeleteSearchRulesRequest;

export type DeleteRedirectRulesRequest = DeleteSearchRulesRequest;

export type DeleteSearchIndexRequest = LicensedRequest & {
  id?: string | null;
  deletedBy?: string | null;
};

export type DeleteSearchResultModifierRulesRequest = DeleteSearchRulesRequest;

export interface DeleteSearchRulesRequest {
  $type: string;
  ids: string[];
  deletedBy: string;
  custom?: Record<string, string | null>;
}

export type DeleteSearchRulesResponse = TimedResponse;

export type DeleteSearchTermModifierRulesRequest = DeleteSearchRulesRequest;

export type DeleteStemmingRulesRequest = DeleteSearchRulesRequest;

export type DeleteSynonymsRequest = LicensedRequest & {
  ids?: string[] | null;
  deletedBy?: string | null;
};

export type DeleteSynonymsResponse = TimedResponse;

export type DeleteTriggerConfigurationRequest = LicensedRequest & {
  /** @format uuid */
  id: string;
};

export type DistinctCondition = ValueCondition & {
  /** @format int32 */
  numberOfOccurrencesAllowedWithTheSameValue: number;
};

export interface DoubleAvailableFacetValue {
  /** @format double */
  value: number;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DoubleContentDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: DoubleAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleDataObjectValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleDataObjectValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: DoubleAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableChainableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;
  /** @format double */
  upperBoundExclusive?: number | null;
}

export interface DoubleNullableChainableRangeAvailableFacetValue {
  value?: DoubleNullableChainableRange | null;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DoubleNullableContentDataRangeFacet {
  $type: string;
  selected?: DoubleNullableRange | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleNullableContentDataRangeFacetResult {
  $type: string;
  key?: string | null;
  selected?: DoubleNullableRange | null;
  available?: DoubleNullableRangeAvailableFacetValue | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableContentDataRangesFacet {
  $type: string;
  predefinedRanges?: DoubleNullableChainableRange[] | null;
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleNullableContentDataRangesFacetResult {
  $type: string;
  key?: string | null;
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableDataObjectRangeFacet {
  $type: string;
  selected?: DoubleNullableRange | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleNullableDataObjectRangeFacetResult {
  $type: string;
  key?: string | null;
  selected?: DoubleNullableRange | null;
  available?: DoubleNullableRangeAvailableFacetValue | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableDataObjectRangesFacet {
  $type: string;
  predefinedRanges?: DoubleNullableChainableRange[] | null;
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleNullableDataObjectRangesFacetResult {
  $type: string;
  key?: string | null;
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableProductCategoryDataRangeFacet {
  $type: string;
  selected?: DoubleNullableRange | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleNullableProductCategoryDataRangeFacetResult {
  $type: string;
  key?: string | null;
  selected?: DoubleNullableRange | null;
  available?: DoubleNullableRangeAvailableFacetValue | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableProductCategoryDataRangesFacet {
  $type: string;
  predefinedRanges?: DoubleNullableChainableRange[] | null;
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleNullableProductCategoryDataRangesFacetResult {
  $type: string;
  key?: string | null;
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableProductDataRangeFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  selected?: DoubleNullableRange | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleNullableProductDataRangeFacetResult {
  $type: string;
  key?: string | null;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  selected?: DoubleNullableRange | null;
  available?: DoubleNullableRangeAvailableFacetValue | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableProductDataRangesFacet {
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

export interface DoubleNullableProductDataRangesFacetResult {
  $type: string;
  key?: string | null;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleNullableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;
  /** @format double */
  upperBoundInclusive?: number | null;
}

export interface DoubleNullableRangeAvailableFacetValue {
  value?: DoubleNullableRange | null;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DoubleProductCategoryDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleProductCategoryDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: DoubleAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface DoubleProductDataValueFacetResult {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: DoubleAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface DoubleRange {
  /** @format double */
  lowerBoundInclusive: number;
  /** @format double */
  upperBoundInclusive: number;
}

export type EqualsCondition = ValueCondition & {
  value?: DataValue | null;
};

export interface ExpectedSearchTermResult {
  /** @format int32 */
  estimatedHits: number;
  type: "Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory";
}

export interface Facet {
  $type: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface FacetQuery {
  $type: string;
}

export interface FacetResult {
  $type: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface FacetSettings {
  alwaysIncludeSelectedInAvailable: boolean;
  includeZeroHitsInAvailable: boolean;
  sorting?: ByHitsFacetSorting | null;
  /** @format int32 */
  take?: number | null;
}

export interface FacetSorting {
  $type: string;
}

export interface FieldIndexConfiguration {
  included: boolean;
  /** @format int32 */
  weight: number;
  /** @deprecated */
  predictionSourceType: "Disabled" | "IndividualWords" | "PartialWordSequences" | "CompleteWordSequence";
  parser?: ClearTextParser | HtmlParser | null;
  matchTypeSettings?: MatchTypeSettings | null;
  predictionConfiguration?: PredictionConfiguration | null;
}

export interface Filter {
  $type: string;
  negated: boolean;
  custom?: Record<string, string>;
  settings?: FilterSettings | null;
}

export interface FilterCollection {
  items?:
    | (
        | AndFilter
        | BrandAssortmentFilter
        | BrandDataFilter
        | BrandDataHasKeyFilter
        | BrandDisabledFilter
        | BrandIdFilter
        | CartDataFilter
        | CompanyDataFilter
        | CompanyDataHasKeyFilter
        | CompanyDisabledFilter
        | CompanyIdFilter
        | ContentAssortmentFilter
        | ContentCategoryAssortmentFilter
        | ContentCategoryDataFilter
        | ContentCategoryDataHasKeyFilter
        | ContentCategoryDisabledFilter
        | ContentCategoryHasAncestorFilter
        | ContentCategoryHasChildFilter
        | ContentCategoryHasContentsFilter
        | ContentCategoryHasParentFilter
        | ContentCategoryIdFilter
        | ContentCategoryLevelFilter
        | ContentCategoryRecentlyViewedByUserFilter
        | ContentDataFilter
        | ContentDataHasKeyFilter
        | ContentDisabledFilter
        | ContentHasCategoriesFilter
        | ContentIdFilter
        | ContentRecentlyViewedByUserFilter
        | OrFilter
        | ProductAndVariantIdFilter
        | ProductAssortmentFilter
        | ProductCategoryAssortmentFilter
        | ProductCategoryDataFilter
        | ProductCategoryDataHasKeyFilter
        | ProductCategoryDisabledFilter
        | ProductCategoryHasAncestorFilter
        | ProductCategoryHasChildFilter
        | ProductCategoryHasParentFilter
        | ProductCategoryHasProductsFilter
        | ProductCategoryIdFilter
        | ProductCategoryLevelFilter
        | ProductCategoryRecentlyViewedByUserFilter
        | ProductDataFilter
        | ProductDataHasKeyFilter
        | ProductDisabledFilter
        | ProductDisplayNameFilter
        | ProductHasCategoriesFilter
        | ProductHasVariantsFilter
        | ProductIdFilter
        | ProductInCartFilter
        | ProductListPriceFilter
        | ProductRecentlyPurchasedByCompanyFilter
        | ProductRecentlyPurchasedByUserCompanyFilter
        | ProductRecentlyPurchasedByUserFilter
        | ProductRecentlyPurchasedByUserParentCompanyFilter
        | ProductRecentlyViewedByCompanyFilter
        | ProductRecentlyViewedByUserCompanyFilter
        | ProductRecentlyViewedByUserFilter
        | ProductRecentlyViewedByUserParentCompanyFilter
        | ProductSalesPriceFilter
        | VariantAssortmentFilter
        | VariantDataFilter
        | VariantDataHasKeyFilter
        | VariantDisabledFilter
        | VariantIdFilter
        | VariantListPriceFilter
        | VariantSalesPriceFilter
        | VariantSpecificationFilter
      )[]
    | null;
}

export type FilterRule = MerchandisingRule;

export interface FilterScopeSettings {
  $type: string;
}

export interface FilterScopes {
  default?: ApplyFilterSettings | null;
  fill?: ApplyFilterSettings | null;
}

export interface FilterSettings {
  scopes?: FilterScopes | null;
}

export interface FilteredVariantsSettings {
  filters?: FilterCollection | null;
  inheritFiltersFromRequest?: boolean | null;
}

export type FixedDoubleValueSelector = ValueSelector & {
  /** @format double */
  value: number;
};

export type FixedPositionRule = MerchandisingRule & {
  /** @format int32 */
  position: number;
};

export interface GlobalRetailMediaConfiguration {
  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;
  thresholds?: ScoreThresholds | null;
}

export type GlobalRetailMediaConfigurationRequest = LicensedRequest;

export type GlobalRetailMediaConfigurationResponse = TimedResponse & {
  configuration?: GlobalRetailMediaConfiguration | null;
};

export interface GlobalTriggerConfiguration {
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

export type GlobalTriggerConfigurationRequest = LicensedRequest;

export type GlobalTriggerConfigurationResponse = TimedResponse & {
  configuration?: GlobalTriggerConfiguration | null;
};

export type GreaterThanCondition = ValueCondition & {
  /** @format double */
  value: number;
};

export type HasActivityCondition = UserCondition & {
  /** @format int32 */
  withinMinutes: number;
  /** @format int32 */
  forAtLeastSeconds: number;
};

export interface HasAncestorCategoryFilter {
  $type: string;
  categoryIds?: string[] | null;
  negated: boolean;
  custom?: Record<string, string>;
  settings?: FilterSettings | null;
}

export type HasAuthenticatedIdCondition = UserCondition;

export interface HasChildCategoryFilter {
  $type: string;
  categoryIds?: string[] | null;
  negated: boolean;
  custom?: Record<string, string>;
  settings?: FilterSettings | null;
}

export type HasClassificationCondition = UserCondition & {
  key?: string | null;
  value?: string | null;
};

export type HasDataCondition = UserCondition & {
  key?: string | null;
  conditions?: ValueConditionCollection | null;
};

export type HasEmailCondition = UserCondition;

export type HasIdentifierCondition = UserCondition & {
  key?: string | null;
};

export type HasLineItemsInCartCondition = UserCondition & {
  numberOfItems?: Int32NullableRange | null;
  cartName?: string | null;
  filters?: FilterCollection | null;
};

export type HasModifiedCartCondition = UserCondition & {
  /** @format int32 */
  withinMinutes: number;
  cartName?: string | null;
};

export interface HasParentCategoryFilter {
  $type: string;
  categoryIds?: string[] | null;
  negated: boolean;
  custom?: Record<string, string>;
  settings?: FilterSettings | null;
}

export type HasPlacedOrderCondition = UserCondition & {
  /** @format int32 */
  withinMinutes: number;
};

export type HasRecentlyReceivedSameTriggerCondition = UserCondition & {
  /** @format int32 */
  withinMinutes: number;
};

export type HasRecentlyReceivedTriggerCondition = UserCondition & {
  /** @format int32 */
  withinMinutes: number;
  /** @format uuid */
  id?: string | null;
  group?: string | null;
  /** @format int32 */
  type?: number | null;
};

export type HasValueCondition = ValueCondition;

export interface HighlightResult {
  offsets?: HighlightResultOffset | null;
  snippets?: HighlightResultSnippet | null;
}

export interface HighlightResultOffset {
  displayName: Int32Range[];
  data: StringRange1ArrayKeyValuePair[];
}

export interface HighlightResultSnippet {
  displayName: HighlightResultSnippetDisplayNameSnippetMatch[];
  data: StringFieldSnippetMatchArrayKeyValuePair[];
}

export type HighlightResultSnippetDisplayNameSnippetMatch = HighlightResultSnippetSnippetMatch;

export type HighlightResultSnippetFieldSnippetMatch = HighlightResultSnippetSnippetMatch;

export interface HighlightResultSnippetMatchMatchedWord {
  offset?: Int32Range | null;
}

export interface HighlightResultSnippetSnippetMatch {
  $type: string;
  text: string;
  matchedWords?: HighlightResultSnippetMatchMatchedWord[] | null;
}

export interface HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits {
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

export interface HighlightSettings2ContentContentHighlightPropsHighlightSettings2OffsetSettings {
  include: boolean;
}

export interface HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape {
  offsets?: HighlightSettings2ContentContentHighlightPropsHighlightSettings2OffsetSettings | null;
  snippets?: HighlightSettings2ContentContentHighlightPropsHighlightSettings2SnippetsSettings | null;
}

export interface HighlightSettings2ContentContentHighlightPropsHighlightSettings2SnippetsSettings {
  include: boolean;
  useEllipses: boolean;
  includeMatchedWords: boolean;
}

export interface HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits {
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

export interface HighlightSettings2ProductProductHighlightPropsHighlightSettings2OffsetSettings {
  include: boolean;
}

export interface HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape {
  offsets?: HighlightSettings2ProductProductHighlightPropsHighlightSettings2OffsetSettings | null;
  snippets?: HighlightSettings2ProductProductHighlightPropsHighlightSettings2SnippetsSettings | null;
}

export interface HighlightSettings2ProductProductHighlightPropsHighlightSettings2SnippetsSettings {
  include: boolean;
  useEllipses: boolean;
  includeMatchedWords: boolean;
}

export type HtmlParser = Parser;

export type IChange = object;

export type ISchedule = object;

export type ITriggerResult = object;

export interface IndexConfiguration {
  language?: LanguageIndexConfiguration | null;
  product?: ProductIndexConfiguration | null;
  content?: ContentIndexConfiguration | null;
  productCategory?: ProductCategoryIndexConfiguration | null;
}

export interface InputConditionConfiguration {
  filters?: FilterCollection | null;
  evaluationMode: "Any" | "All";
}

export type InputModifierRule = MerchandisingRule;

export interface Int32AvailableFacetValue {
  /** @format int32 */
  value: number;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface Int32ContentDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface Int32ContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: Int32AvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface Int32NullableRange {
  /** @format int32 */
  lowerBoundInclusive?: number | null;
  /** @format int32 */
  upperBoundInclusive?: number | null;
}

export interface Int32ProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface Int32ProductDataValueFacetResult {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: Int32AvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface Int32Range {
  /** @format int32 */
  lowerBoundInclusive: number;
  /** @format int32 */
  upperBoundInclusive: number;
}

export interface KeyMultiplier {
  key?: string | null;
  /** @format double */
  multiplier: number;
}

export interface Language {
  value: string;
}

export interface LanguageIndexConfiguration {
  languages?: LanguageIndexConfigurationEntry[] | null;
}

export interface LanguageIndexConfigurationEntry {
  language: Language;
  included: boolean;
  isO639_1?: string | null;
}

export type LessThanCondition = ValueCondition & {
  /** @format double */
  value: number;
};

export interface LicensedRequest {
  $type: string;
  custom?: Record<string, string | null>;
}

export interface LineItem {
  product: Product;
  variant?: ProductVariant | null;
  custom?: Record<string, string>;
  /** @format float */
  quantity: number;
  /** @format double */
  lineTotal: number;
  data?: Record<string, DataValue>;
}

export type Location = LocationEntityStateLocationMetadataValuesRetailMediaEntity & {
  name: string;
  key?: string | null;
  placements?: LocationPlacementCollection | null;
  supportedPromotions?: PromotionSpecificationCollection | null;
};

export interface LocationEntityStateLocationMetadataValuesLocationsRequestSortByLocationsRequestEntityFiltersEntitiesRequest {
  $type: string;
  filters?: LocationsRequestEntityFilters | null;
  sorting?: LocationsRequestSortBySorting | null;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface LocationEntityStateLocationMetadataValuesRetailMediaEntity {
  $type: string;
  state: "Active" | "Inactive" | "Archived";
  metadata: LocationMetadataValues;
  /** @format uuid */
  id?: string | null;
}

export interface LocationLocationEntityStateEntityResponse {
  $type: string;
  entities?: Location[] | null;
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

export type LocationMetadataValues = MetadataValues & {
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

export interface LocationPlacement {
  name: string;
  key?: string | null;
  variations?: LocationPlacementVariationCollection | null;
  thresholds?: ScoreThresholds | null;
}

export interface LocationPlacementCollection {
  items: LocationPlacement[];
}

export interface LocationPlacementVariation {
  name: string;
  key?: string | null;
  supportedPromotions?: PromotionSpecificationVariationCollection | null;
}

export interface LocationPlacementVariationCollection {
  items: LocationPlacementVariation[];
}

export interface LocationSaveEntitiesRequest {
  $type: string;
  entities: Location[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface LocationSaveEntitiesResponse {
  $type: string;
  entities?: Location[] | null;
  statistics?: Statistics | null;
}

export type LocationsRequest =
  LocationEntityStateLocationMetadataValuesLocationsRequestSortByLocationsRequestEntityFiltersEntitiesRequest;

export type LocationsRequestEntityFilters =
  RetailMediaEntity2LocationEntityStateLocationMetadataValuesRetailMediaEntity2EntityFilters & {
    ids?: string[] | null;
    keys?: string[] | null;
  };

export interface LocationsRequestSortBySorting {
  sortBy: "Created" | "Modified" | "Name";
  sortOrder: "Ascending" | "Descending";
}

export type LocationsResponse = LocationLocationEntityStateEntityResponse;

export interface MatchTypeSettings {
  compound: boolean;
  exact: boolean;
  startsWith: boolean;
  endsWith: boolean;
  fuzzy: boolean;
}

export interface MerchandisingRule {
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

export type MerchandisingRuleCollectionResponse = TimedResponse & {
  rules?: (BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule)[] | null;
};

export type MerchandisingRuleRequest = LicensedRequest & {
  /** @format uuid */
  id: string;
  /** @format int32 */
  type?: number | null;
};

export type MerchandisingRuleResponse = TimedResponse & {
  rule?: BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule | null;
};

export type MerchandisingRulesRequest = LicensedRequest & {
  /** @format int32 */
  type?: number | null;
};

export interface MetadataValues {
  $type: string;
  /** @format date-time */
  created: string;
  createdBy: string;
  /** @format date-time */
  modified: string;
  modifiedBy: string;
}

export type MixedRecommendationResponseCollection = TimedResponse & {
  responses?:
    | (
        | BrandRecommendationResponse
        | ContentCategoryRecommendationResponse
        | ContentRecommendationResponse
        | ProductCategoryRecommendationResponse
        | ProductRecommendationResponse
        | SearchTermRecommendationResponse
      )[]
    | null;
};

export interface Money {
  /** @format double */
  amount: number;
  currency: Currency;
}

export interface MultiCurrency {
  values?: Money[] | null;
}

export interface Multilingual {
  values?: MultilingualValue[] | null;
}

export interface MultilingualCollection {
  values?: MultilingualCollectionValue[] | null;
}

export interface MultilingualCollectionValue {
  language?: Language | null;
  values?: string[] | null;
}

export interface MultilingualValue {
  language: Language;
  text?: string | null;
}

export interface ObjectValueCondition {
  $type: string;
  negated: boolean;
  key: string;
  objectPath?: string[] | null;
}

export type ObjectValueContainsCondition = ObjectValueCondition & {
  value?: DataValue | null;
  mode: "All" | "Any";
};

export type ObjectValueEqualsCondition = ObjectValueCondition & {
  value?: DataValue | null;
};

export type ObjectValueGreaterThanCondition = ObjectValueCondition & {
  /** @format double */
  value: number;
};

export type ObjectValueInRangeCondition = ObjectValueCondition & {
  range?: DoubleRange | null;
};

export type ObjectValueIsSubsetOfCondition = ObjectValueCondition & {
  value?: DataValue | null;
};

export type ObjectValueLessThanCondition = ObjectValueCondition & {
  /** @format double */
  value: number;
};

export type ObjectValueMaxByCondition = ObjectValueCondition;

export type ObjectValueMinByCondition = ObjectValueCondition;

export type ObjectValueRelativeDateTimeCondition = ObjectValueCondition & {
  comparison: "Before" | "After";
  unit: "UnixMilliseconds" | "UnixSeconds" | "UnixMinutes";
  /** @format int64 */
  currentTimeOffset: number;
};

export type ObservableProductAttributeSelector = ProductPropertySelector & {
  attribute: "ListPrice" | "SalesPrice";
};

export type ObservableProductDataValueSelector = ProductPropertySelector & {
  dataObjectValueSelector?: DataObjectValueSelector | null;
};

export type ObservableVariantAttributeSelector = VariantPropertySelector & {
  attribute: "ListPrice" | "SalesPrice";
};

export type ObservableVariantDataValueSelector = VariantPropertySelector & {
  dataObjectValueSelector?: DataObjectValueSelector | null;
};

export type OrCondition = UserCondition & {
  conditions?: UserConditionCollection | null;
};

export type OrFilter = Filter & {
  filters: (
    | AndFilter
    | BrandAssortmentFilter
    | BrandDataFilter
    | BrandDataHasKeyFilter
    | BrandDisabledFilter
    | BrandIdFilter
    | CartDataFilter
    | CompanyDataFilter
    | CompanyDataHasKeyFilter
    | CompanyDisabledFilter
    | CompanyIdFilter
    | ContentAssortmentFilter
    | ContentCategoryAssortmentFilter
    | ContentCategoryDataFilter
    | ContentCategoryDataHasKeyFilter
    | ContentCategoryDisabledFilter
    | ContentCategoryHasAncestorFilter
    | ContentCategoryHasChildFilter
    | ContentCategoryHasContentsFilter
    | ContentCategoryHasParentFilter
    | ContentCategoryIdFilter
    | ContentCategoryLevelFilter
    | ContentCategoryRecentlyViewedByUserFilter
    | ContentDataFilter
    | ContentDataHasKeyFilter
    | ContentDisabledFilter
    | ContentHasCategoriesFilter
    | ContentIdFilter
    | ContentRecentlyViewedByUserFilter
    | OrFilter
    | ProductAndVariantIdFilter
    | ProductAssortmentFilter
    | ProductCategoryAssortmentFilter
    | ProductCategoryDataFilter
    | ProductCategoryDataHasKeyFilter
    | ProductCategoryDisabledFilter
    | ProductCategoryHasAncestorFilter
    | ProductCategoryHasChildFilter
    | ProductCategoryHasParentFilter
    | ProductCategoryHasProductsFilter
    | ProductCategoryIdFilter
    | ProductCategoryLevelFilter
    | ProductCategoryRecentlyViewedByUserFilter
    | ProductDataFilter
    | ProductDataHasKeyFilter
    | ProductDisabledFilter
    | ProductDisplayNameFilter
    | ProductHasCategoriesFilter
    | ProductHasVariantsFilter
    | ProductIdFilter
    | ProductInCartFilter
    | ProductListPriceFilter
    | ProductRecentlyPurchasedByCompanyFilter
    | ProductRecentlyPurchasedByUserCompanyFilter
    | ProductRecentlyPurchasedByUserFilter
    | ProductRecentlyPurchasedByUserParentCompanyFilter
    | ProductRecentlyViewedByCompanyFilter
    | ProductRecentlyViewedByUserCompanyFilter
    | ProductRecentlyViewedByUserFilter
    | ProductRecentlyViewedByUserParentCompanyFilter
    | ProductSalesPriceFilter
    | VariantAssortmentFilter
    | VariantDataFilter
    | VariantDataHasKeyFilter
    | VariantDisabledFilter
    | VariantIdFilter
    | VariantListPriceFilter
    | VariantSalesPriceFilter
    | VariantSpecificationFilter
  )[];
};

export type Order = Trackable & {
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

export interface OverriddenContentRecommendationRequestSettings {
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

export interface OverriddenProductRecommendationRequestSettings {
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

export interface OverriddenSelectedBrandPropertiesSettings {
  displayName?: boolean | null;
  assortments?: boolean | null;
  viewedByUserInfo?: boolean | null;
  allData?: boolean | null;
  dataKeys?: string[] | null;
}

export interface OverriddenSelectedContentPropertiesSettings {
  displayName?: boolean | null;
  categoryPaths?: boolean | null;
  assortments?: boolean | null;
  allData?: boolean | null;
  viewedByUserInfo?: boolean | null;
  dataKeys?: string[] | null;
}

export interface OverriddenSelectedProductPropertiesSettings {
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

export interface OverriddenSelectedVariantPropertiesSettings {
  displayName?: boolean | null;
  pricing?: boolean | null;
  allSpecifications?: boolean | null;
  assortments?: boolean | null;
  allData?: boolean | null;
  dataKeys?: string[] | null;
  specificationKeys?: string[] | null;
}

export interface PaginatedSearchRequest {
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

export interface PaginatedSearchResponse {
  /** @format int32 */
  hits: number;
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export interface Parser {
  $type: string;
}

export type PersonalBrandRecommendationRequest = BrandRecommendationRequest & {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights: BrandRecommendationWeights;
};

export type PersonalContentCategoryRecommendationRequest = ContentCategoryRecommendationRequest & {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights: ContentCategoryRecommendationWeights;
};

export type PersonalContentRecommendationRequest = ContentRecommendationRequest;

export type PersonalProductCategoryRecommendationRequest = ProductCategoryRecommendationRequest & {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights: ProductCategoryRecommendationWeights;
};

export type PersonalProductRecommendationRequest = ProductRecommendationRequest;

export type PopularBrandsRecommendationRequest = BrandRecommendationRequest & {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights: BrandRecommendationWeights;
};

export type PopularContentCategoriesRecommendationRequest = ContentCategoryRecommendationRequest & {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights: ContentCategoryRecommendationWeights;
};

export type PopularContentsRequest = ContentRecommendationRequest & {
  /** @format int32 */
  sinceMinutesAgo: number;
};

export type PopularProductCategoriesRecommendationRequest = ProductCategoryRecommendationRequest & {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights: ProductCategoryRecommendationWeights;
};

export type PopularProductsRequest = ProductRecommendationRequest & {
  basedOn: "MostPurchased" | "MostViewed" | "LineRevenue";
  /** @format int32 */
  sinceMinutesAgo: number;
  popularityMultiplier?: DataKeyPopularityMultiplierSelector | null;
};

export type PopularSearchTermsRecommendationRequest = RecommendationRequest & {
  term?: string | null;
  settings?: RecommendPopularSearchTermSettings | null;
};

export interface PopularityMultiplierSelector {
  $type: string;
}

export interface PredictionConfiguration {
  includeInPredictions: boolean;
}

export type PredictionRule = SearchRule & {
  condition: SearchTermCondition | RetailMediaSearchTermCondition;
  promote?: PredictionRulePromotion | null;
  suppress?: PredictionRuleSuppression | null;
};

export interface PredictionRulePromotion {
  to: "Top" | "Bottom";
  values: string[];
}

export interface PredictionRuleSaveSearchRulesRequest {
  $type: string;
  rules: PredictionRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface PredictionRuleSaveSearchRulesResponse {
  $type: string;
  rules?: PredictionRule[] | null;
  statistics?: Statistics | null;
}

export interface PredictionRuleSearchRulesResponse {
  $type: string;
  rules?: PredictionRule[] | null;
  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export interface PredictionRuleSuppression {
  condition: "Contains";
  values: string[];
}

export type PredictionRulesRequest = PredictionRulesRequestSortBySearchRulesRequest;

export interface PredictionRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: PredictionRulesRequestSortBySorting;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface PredictionRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type PredictionRulesResponse = PredictionRuleSearchRulesResponse;

export type PriceRangeFacet = Facet & {
  selected?: DecimalNullableRange | null;
  priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type PriceRangeFacetResult = FacetResult & {
  selected?: DecimalNullableRange | null;
  available?: DecimalRangeAvailableFacetValue | null;
  priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type PriceRangesFacet = Facet & {
  predefinedRanges?: DecimalNullableChainableRange[] | null;
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DecimalNullableChainableRange[] | null;
  priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type PriceRangesFacetResult = FacetResult & {
  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DecimalNullableChainableRange[] | null;
  available?: DecimalNullableChainableRangeAvailableFacetValue[] | null;
  priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export interface Product {
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

export type ProductAdministrativeAction = Trackable & {
  filters: FilterCollection;
  language?: Language | null;
  productUpdateKind:
    | "None"
    | "DisableInRecommendations"
    | "Disable"
    | "EnableInRecommendations"
    | "Enable"
    | "PermanentlyDelete"
    | "Delete";
  variantUpdateKind:
    | "None"
    | "DisableInRecommendations"
    | "Disable"
    | "EnableInRecommendations"
    | "Enable"
    | "PermanentlyDelete"
    | "Delete";
  currency?: Currency | null;
};

export interface ProductAndVariantId {
  productId: string;
  variantId?: string | null;
}

export type ProductAndVariantIdFilter = Filter & {
  productAndVariantIds: ProductAndVariantId[];
};

export type ProductAssortmentFacet = AssortmentFacet & {
  assortmentSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type ProductAssortmentFacetResult = AssortmentFacetResult & {
  assortmentSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type ProductAssortmentFilter = Filter & {
  assortments: number[];
};

export type ProductAssortmentRelevanceModifier = RelevanceModifier & {
  assortments?: number[] | null;
  /** @format double */
  multiplyWeightBy: number;
};

export type ProductAttributeSorting = ProductSorting & {
  attribute: "Id" | "DisplayName" | "BrandId" | "BrandName" | "ListPrice" | "SalesPrice";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductCategory = Category;

export type ProductCategoryAdministrativeAction = CategoryAdministrativeAction;

export type ProductCategoryAssortmentFacet = AssortmentFacet;

export type ProductCategoryAssortmentFacetResult = AssortmentFacetResult;

export type ProductCategoryAssortmentFilter = Filter & {
  assortments: number[];
};

export type ProductCategoryAttributeSorting = ProductCategorySorting & {
  attribute: "Id" | "DisplayName";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductCategoryDataBooleanValueFacet = BooleanProductCategoryDataValueFacet;

export type ProductCategoryDataBooleanValueFacetResult = BooleanProductCategoryDataValueFacetResult;

export type ProductCategoryDataDoubleRangeFacet = DoubleNullableProductCategoryDataRangeFacet;

export type ProductCategoryDataDoubleRangeFacetResult = DoubleNullableProductCategoryDataRangeFacetResult;

export type ProductCategoryDataDoubleRangesFacet = DoubleNullableProductCategoryDataRangesFacet;

export type ProductCategoryDataDoubleRangesFacetResult = DoubleNullableProductCategoryDataRangesFacetResult;

export type ProductCategoryDataDoubleValueFacet = DoubleProductCategoryDataValueFacet;

export type ProductCategoryDataDoubleValueFacetResult = DoubleProductCategoryDataValueFacetResult;

export type ProductCategoryDataFilter = DataFilter;

export type ProductCategoryDataHasKeyFilter = Filter & {
  key: string;
};

export type ProductCategoryDataObjectFacet = DataObjectFacet;

export type ProductCategoryDataObjectFacetResult = DataObjectFacetResult;

export type ProductCategoryDataRelevanceModifier = DataRelevanceModifier;

export type ProductCategoryDataSorting = ProductCategorySorting & {
  key?: string | null;
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductCategoryDataStringValueFacet = StringProductCategoryDataValueFacet;

export type ProductCategoryDataStringValueFacetResult = StringProductCategoryDataValueFacetResult;

export type ProductCategoryDetailsCollectionResponse = TimedResponse & {
  categories?: ProductCategoryResultDetails[] | null;
  /** @format int32 */
  totalNumberOfResults?: number | null;
};

export type ProductCategoryDisabledFilter = Filter;

export type ProductCategoryFacetQuery = FacetQuery & {
  items: (
    | ContentAssortmentFacet
    | ProductAssortmentFacet
    | ProductCategoryAssortmentFacet
    | BrandFacet
    | CategoryFacet
    | CategoryHierarchyFacet
    | ContentDataObjectFacet
    | ContentDataDoubleRangeFacet
    | ContentDataDoubleRangesFacet
    | ContentDataStringValueFacet
    | ContentDataBooleanValueFacet
    | ContentDataDoubleValueFacet
    | ContentDataIntegerValueFacet
    | DataObjectFacet
    | DataObjectDoubleRangeFacet
    | DataObjectDoubleRangesFacet
    | DataObjectStringValueFacet
    | DataObjectBooleanValueFacet
    | DataObjectDoubleValueFacet
    | PriceRangeFacet
    | PriceRangesFacet
    | ProductCategoryDataObjectFacet
    | ProductCategoryDataDoubleRangeFacet
    | ProductCategoryDataDoubleRangesFacet
    | ProductCategoryDataStringValueFacet
    | ProductCategoryDataBooleanValueFacet
    | ProductCategoryDataDoubleValueFacet
    | ProductDataObjectFacet
    | ProductDataDoubleRangeFacet
    | ProductDataDoubleRangesFacet
    | ProductDataStringValueFacet
    | ProductDataBooleanValueFacet
    | ProductDataDoubleValueFacet
    | ProductDataIntegerValueFacet
    | RecentlyPurchasedFacet
    | VariantSpecificationFacet
  )[];
};

export interface ProductCategoryFacetResult {
  items?:
    | (
        | ProductAssortmentFacetResult
        | ContentAssortmentFacetResult
        | ProductCategoryAssortmentFacetResult
        | BrandFacetResult
        | CategoryFacetResult
        | CategoryHierarchyFacetResult
        | ContentDataObjectFacetResult
        | ContentDataDoubleRangeFacetResult
        | ContentDataDoubleRangesFacetResult
        | ContentDataStringValueFacetResult
        | ContentDataBooleanValueFacetResult
        | ContentDataDoubleValueFacetResult
        | ContentDataIntegerValueFacetResult
        | DataObjectFacetResult
        | DataObjectDoubleRangeFacetResult
        | DataObjectDoubleRangesFacetResult
        | DataObjectStringValueFacetResult
        | DataObjectBooleanValueFacetResult
        | DataObjectDoubleValueFacetResult
        | PriceRangeFacetResult
        | PriceRangesFacetResult
        | ProductCategoryDataObjectFacetResult
        | ProductCategoryDataDoubleRangeFacetResult
        | ProductCategoryDataDoubleRangesFacetResult
        | ProductCategoryDataStringValueFacetResult
        | ProductCategoryDataBooleanValueFacetResult
        | ProductCategoryDataDoubleValueFacetResult
        | ProductDataObjectFacetResult
        | ProductDataDoubleRangeFacetResult
        | ProductDataDoubleRangesFacetResult
        | ProductDataStringValueFacetResult
        | ProductDataBooleanValueFacetResult
        | ProductDataDoubleValueFacetResult
        | ProductDataIntegerValueFacetResult
        | RecentlyPurchasedFacetResult
        | VariantSpecificationFacetResult
      )[]
    | null;
}

export type ProductCategoryHasAncestorFilter = HasAncestorCategoryFilter;

export type ProductCategoryHasChildFilter = HasChildCategoryFilter;

export type ProductCategoryHasParentFilter = HasParentCategoryFilter;

export type ProductCategoryHasProductsFilter = Filter;

export type ProductCategoryIdFilter = CategoryIdFilter;

export interface ProductCategoryIdFilterCategoryQuery {
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

export type ProductCategoryIdRelevanceModifier = RelevanceModifier & {
  categoryId?: string | null;
  evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor";
  /** @format double */
  multiplyWeightBy: number;
  negated: boolean;
};

export type ProductCategoryIndexConfiguration = CategoryIndexConfiguration;

export type ProductCategoryInterestTriggerConfiguration = ProductCategoryInterestTriggerResultTriggerConfiguration & {
  categoryViews?: Int32NullableRange | null;
  productViews?: Int32NullableRange | null;
  filters?: FilterCollection | null;
};

export interface ProductCategoryInterestTriggerResultTriggerConfiguration {
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

export type ProductCategoryLevelFilter = CategoryLevelFilter;

export type ProductCategoryPopularitySorting = ProductCategorySorting;

export type ProductCategoryQuery = ProductCategoryIdFilterCategoryQuery;

export type ProductCategoryRecentlyViewedByUserFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductCategoryRecentlyViewedByUserRelevanceModifier = RecentlyViewedByUserRelevanceModifier;

export interface ProductCategoryRecommendationRequest {
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

export type ProductCategoryRecommendationRequestCollection = LicensedRequest & {
  requests?: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)[] | null;
  requireDistinctCategoriesAcrossResults: boolean;
};

export interface ProductCategoryRecommendationRequestSettings {
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

export type ProductCategoryRecommendationResponse = RecommendationResponse & {
  recommendations?: ProductCategoryResult[] | null;
};

export type ProductCategoryRecommendationResponseCollection = TimedResponse & {
  responses?: ProductCategoryRecommendationResponse[] | null;
};

export interface ProductCategoryRecommendationWeights {
  /** @format double */
  categoryViews: number;
  /** @format double */
  productViews: number;
  /** @format double */
  productPurchases: number;
}

export type ProductCategoryRelevanceSorting = ProductCategorySorting;

export type ProductCategoryResult = CategoryResult;

export type ProductCategoryResultDetails = ProductCategoryResultDetailsCategoryResultDetails & {
  /** @format int32 */
  purchasedFromByDifferentNumberOfUsers: number;
  purchasedByUser?: PurchasedByUserInfo | null;
};

export interface ProductCategoryResultDetailsCategoryResultDetails {
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

export type ProductCategorySearchRequest = PaginatedSearchRequest & {
  term?: string | null;
  settings?: ProductCategorySearchSettings | null;
  facets?: ProductCategoryFacetQuery | null;
  sorting?: ProductCategorySortBySpecification | null;
};

export type ProductCategorySearchResponse = PaginatedSearchResponse & {
  results?: ProductCategoryResult[] | null;
  facets?: ProductCategoryFacetResult | null;
  recommendations?: ProductCategoryResult[] | null;
};

export type ProductCategorySearchSettings = SearchSettings & {
  selectedCategoryProperties?: SelectedProductCategoryPropertiesSettings | null;
  recommendations: RecommendationSettings;
};

export interface ProductCategorySortBySpecification {
  value?:
    | ProductCategoryAttributeSorting
    | ProductCategoryDataSorting
    | ProductCategoryPopularitySorting
    | ProductCategoryRelevanceSorting
    | null;
}

export interface ProductCategorySorting {
  $type: string;
  order: "Ascending" | "Descending";
  thenBy?:
    | ProductCategoryAttributeSorting
    | ProductCategoryDataSorting
    | ProductCategoryPopularitySorting
    | ProductCategoryRelevanceSorting
    | null;
}

export type ProductCategoryUpdate = CategoryUpdate & {
  category?: ProductCategory | null;
};

export type ProductCategoryView = Trackable & {
  user?: User | null;
  idPath: string[];
  /** @deprecated */
  channel?: Channel | null;
};

export type ProductChangeTriggerConfiguration =
  ProductChangeTriggerResultProductChangeTriggerResultSettingsProductPropertySelectorEntityChangeTriggerConfiguration;

export interface ProductChangeTriggerResultProductChangeTriggerResultSettingsProductPropertySelectorEntityChangeTriggerConfiguration {
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

export interface ProductChangeTriggerResultSettings {
  selectedProductProperties?: SelectedProductDetailsPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantDetailsPropertiesSettings | null;
}

export type ProductDataBooleanValueFacet = BooleanProductDataValueFacet;

export type ProductDataBooleanValueFacetResult = BooleanProductDataValueFacetResult;

export type ProductDataDoubleRangeFacet = DoubleNullableProductDataRangeFacet;

export type ProductDataDoubleRangeFacetResult = DoubleNullableProductDataRangeFacetResult;

export type ProductDataDoubleRangesFacet = DoubleNullableProductDataRangesFacet;

export type ProductDataDoubleRangesFacetResult = DoubleNullableProductDataRangesFacetResult;

export type ProductDataDoubleValueFacet = DoubleProductDataValueFacet;

export type ProductDataDoubleValueFacetResult = DoubleProductDataValueFacetResult;

export type ProductDataFilter = DataFilter;

export type ProductDataHasKeyFilter = Filter & {
  key: string;
};

export type ProductDataIntegerValueFacet = Int32ProductDataValueFacet;

export type ProductDataIntegerValueFacetResult = Int32ProductDataValueFacetResult;

export type ProductDataObjectFacet = DataObjectFacet & {
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type ProductDataObjectFacetResult = DataObjectFacetResult & {
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type ProductDataObjectSorting = ProductSorting & {
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  mode: "Auto" | "Alphabetical" | "Numerical";
  valueSelector: DataObjectValueSelector;
};

export type ProductDataRelevanceModifier = DataRelevanceModifier;

export type ProductDataSorting = ProductSorting & {
  key?: string | null;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductDataStringValueFacet = StringProductDataValueFacet;

export type ProductDataStringValueFacetResult = StringProductDataValueFacetResult;

export type ProductDetailsCollectionResponse = TimedResponse & {
  products?: ProductResultDetails[] | null;
  /** @format int32 */
  totalNumberOfResults?: number | null;
  /** @format uuid */
  nextPageToken?: string | null;
};

export type ProductDisabledFilter = Filter;

export type ProductDisplayNameFilter = Filter & {
  language?: Language | null;
  conditions?: ValueConditionCollection | null;
  mustMatchAllConditions: boolean;
};

export type ProductFacetQuery = FacetQuery & {
  items: (
    | ContentAssortmentFacet
    | ProductAssortmentFacet
    | ProductCategoryAssortmentFacet
    | BrandFacet
    | CategoryFacet
    | CategoryHierarchyFacet
    | ContentDataObjectFacet
    | ContentDataDoubleRangeFacet
    | ContentDataDoubleRangesFacet
    | ContentDataStringValueFacet
    | ContentDataBooleanValueFacet
    | ContentDataDoubleValueFacet
    | ContentDataIntegerValueFacet
    | DataObjectFacet
    | DataObjectDoubleRangeFacet
    | DataObjectDoubleRangesFacet
    | DataObjectStringValueFacet
    | DataObjectBooleanValueFacet
    | DataObjectDoubleValueFacet
    | PriceRangeFacet
    | PriceRangesFacet
    | ProductCategoryDataObjectFacet
    | ProductCategoryDataDoubleRangeFacet
    | ProductCategoryDataDoubleRangesFacet
    | ProductCategoryDataStringValueFacet
    | ProductCategoryDataBooleanValueFacet
    | ProductCategoryDataDoubleValueFacet
    | ProductDataObjectFacet
    | ProductDataDoubleRangeFacet
    | ProductDataDoubleRangesFacet
    | ProductDataStringValueFacet
    | ProductDataBooleanValueFacet
    | ProductDataDoubleValueFacet
    | ProductDataIntegerValueFacet
    | RecentlyPurchasedFacet
    | VariantSpecificationFacet
  )[];
};

export interface ProductFacetResult {
  items?:
    | (
        | ProductAssortmentFacetResult
        | ContentAssortmentFacetResult
        | ProductCategoryAssortmentFacetResult
        | BrandFacetResult
        | CategoryFacetResult
        | CategoryHierarchyFacetResult
        | ContentDataObjectFacetResult
        | ContentDataDoubleRangeFacetResult
        | ContentDataDoubleRangesFacetResult
        | ContentDataStringValueFacetResult
        | ContentDataBooleanValueFacetResult
        | ContentDataDoubleValueFacetResult
        | ContentDataIntegerValueFacetResult
        | DataObjectFacetResult
        | DataObjectDoubleRangeFacetResult
        | DataObjectDoubleRangesFacetResult
        | DataObjectStringValueFacetResult
        | DataObjectBooleanValueFacetResult
        | DataObjectDoubleValueFacetResult
        | PriceRangeFacetResult
        | PriceRangesFacetResult
        | ProductCategoryDataObjectFacetResult
        | ProductCategoryDataDoubleRangeFacetResult
        | ProductCategoryDataDoubleRangesFacetResult
        | ProductCategoryDataStringValueFacetResult
        | ProductCategoryDataBooleanValueFacetResult
        | ProductCategoryDataDoubleValueFacetResult
        | ProductDataObjectFacetResult
        | ProductDataDoubleRangeFacetResult
        | ProductDataDoubleRangesFacetResult
        | ProductDataStringValueFacetResult
        | ProductDataBooleanValueFacetResult
        | ProductDataDoubleValueFacetResult
        | ProductDataIntegerValueFacetResult
        | RecentlyPurchasedFacetResult
        | VariantSpecificationFacetResult
      )[]
    | null;
}

export type ProductHasCategoriesFilter = Filter;

export type ProductHasVariantsFilter = Filter & {
  numberOfVariants: Int32NullableRange;
  includeDisabled: boolean;
};

export interface ProductHighlightProperties {
  $type: string;
  displayName: boolean;
  dataKeys?: string[] | null;
}

export type ProductHighlightProps = ProductHighlightProperties;

export type ProductIdFilter = Filter & {
  productIds: string[];
};

export type ProductIdRelevanceModifier = RelevanceModifier & {
  productIds?: string[] | null;
  /** @format double */
  multiplyWeightBy: number;
  negated: boolean;
};

export type ProductInCartFilter = Filter;

export interface ProductIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  category?: CategoryIndexConfiguration | ProductCategoryIndexConfiguration | null;
  brand?: BrandIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
  variants?: VariantIndexConfiguration | null;
}

export type ProductInterestTriggerConfiguration = ProductInterestTriggerResultTriggerConfiguration & {
  productViews?: Int32NullableRange | null;
  filters?: FilterCollection | null;
  resultSettings?: ProductInterestTriggerResultResultSettings | null;
};

export interface ProductInterestTriggerResultResultSettings {
  selectedProductProperties?: SelectedProductDetailsPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantDetailsPropertiesSettings | null;
}

export interface ProductInterestTriggerResultTriggerConfiguration {
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

export type ProductListPriceFilter = Filter & {
  range: DecimalNullableRange;
  currency?: Currency | null;
};

export type ProductListPriceRelevanceModifier = RelevanceModifier & {
  range: DecimalNullableRange;
  currency?: Currency | null;
  /** @format double */
  multiplyWeightBy: number;
  negated: boolean;
};

export type ProductPerformanceRequest = AnalyzerRequest & {
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

export type ProductPerformanceResponse = TimedResponse & {
  results?: ProductPerformanceResult[] | null;
  /** @format int32 */
  totalNumberOfResults: number;
  /** @format int32 */
  remainingNumberOfResults: number;
};

export interface ProductPerformanceResult {
  product?: ProductResult | null;
  classifications?: ProductPerformanceResultClassificationMetrics[] | null;
}

export interface ProductPerformanceResultCartMetrics {
  /** @format int32 */
  opened: number;
}

export interface ProductPerformanceResultCategoryMetrics {
  category?: CategoryNameAndIdResult | null;
  immediateParent: boolean;
  rank?: ProductPerformanceResultViewsAndSalesMetrics | null;
}

export interface ProductPerformanceResultClassificationMetrics {
  combination?: Record<string, string | null>;
  views?: ProductPerformanceResultViewsMetrics | null;
  sales?: ProductPerformanceResultSalesMetrics | null;
  carts?: ProductPerformanceResultCartMetrics | null;
  rank?: ProductPerformanceResultRankMetrics | null;
}

export interface ProductPerformanceResultRankMetrics {
  overall?: ProductPerformanceResultViewsAndSalesMetrics | null;
  withinCategories?: ProductPerformanceResultCategoryMetrics[] | null;
  withinBrand?: ProductPerformanceResultViewsAndSalesMetrics | null;
}

export interface ProductPerformanceResultSalesByCurrency {
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

export interface ProductPerformanceResultSalesMetrics {
  /** @format int32 */
  orders: number;
  /** @format double */
  averageNoOfLineItems: number;
  currencies?: ProductPerformanceResultSalesByCurrency[] | null;
  withKnownCartOpener?: ProductPerformanceResultSalesWithKnownCartOpenerMetrics | null;
}

export interface ProductPerformanceResultSalesWithKnownCartOpenerMetrics {
  /** @format int32 */
  orders: number;
  /** @format int32 */
  opened: number;
  /** @format double */
  openedPercent: number;
}

export interface ProductPerformanceResultViewsAndSalesMetrics {
  /** @format double */
  byViews: number;
  /** @format double */
  bySales: number;
}

export interface ProductPerformanceResultViewsMetrics {
  /** @format int32 */
  total: number;
}

export type ProductPopularitySorting = ProductSorting;

export interface ProductProductHighlightPropsHighlightSettings {
  $type: string;
  enabled: boolean;
  limit: HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits;
  highlightable: ProductHighlightProps;
  shape: HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape;
}

export type ProductPromotion = Promotion & {
  filters?: FilterCollection | null;
  conditions?: ProductPromotionPromotionConditions | null;
};

export type ProductPromotionPromotionConditions = RetailMediaConditions & {
  searchTerm?: RetailMediaSearchTermConditionCollection | null;
};

export type ProductPromotionSpecification = PromotionSpecification & {
  promotableProducts?: FilterCollection | null;
};

export type ProductPromotionSpecificationVariation = PromotionSpecificationVariation & {
  /** @format int32 */
  maxCount: number;
};

export interface ProductPropertySelector {
  $type: string;
}

export type ProductQuery = LicensedRequest & {
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

export interface ProductQuerySelectedPropertiesSettings {
  selectedProductDetailsProperties?: SelectedProductDetailsPropertiesSettings | null;
  selectedVariantDetailsProperties?: SelectedVariantDetailsPropertiesSettings | null;
}

export type ProductRecentlyPurchasedByCompanyFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  companyIds: string[];
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyPurchasedByCompanyRelevanceModifier = RelevanceModifier & {
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

export type ProductRecentlyPurchasedByUserCompanyFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyPurchasedByUserCompanyRelevanceModifier = RelevanceModifier & {
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

export type ProductRecentlyPurchasedByUserFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyPurchasedByUserParentCompanyFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyPurchasedByUserRelevanceModifier = RelevanceModifier & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format double */
  ifPreviouslyPurchasedByUserMultiplyWeightBy: number;
  /** @format double */
  ifNotPreviouslyPurchasedByUserMultiplyWeightBy: number;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyViewedByCompanyFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  companyIds: string[];
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyViewedByCompanyRelevanceModifier = RelevanceModifier & {
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

export type ProductRecentlyViewedByUserCompanyFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyViewedByUserCompanyRelevanceModifier = RelevanceModifier & {
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

export type ProductRecentlyViewedByUserFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyViewedByUserParentCompanyFilter = Filter & {
  /** @format date-time */
  sinceUtc?: string | null;
  /** @format int32 */
  sinceMinutesAgo?: number | null;
};

export type ProductRecentlyViewedByUserRelevanceModifier = RecentlyViewedByUserRelevanceModifier;

export interface ProductRecommendationRequest {
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

export type ProductRecommendationRequestCollection = LicensedRequest & {
  requests?:
    | (
        | CustomProductRecommendationRequest
        | PersonalProductRecommendationRequest
        | PopularProductsRequest
        | ProductsViewedAfterViewingContentRequest
        | ProductsViewedAfterViewingProductRequest
        | PurchasedWithCurrentCartRequest
        | PurchasedWithMultipleProductsRequest
        | PurchasedWithProductRequest
        | RecentlyViewedProductsRequest
        | SearchTermBasedProductRecommendationRequest
        | SimilarProductsRequest
        | SortProductsRequest
        | SortVariantsRequest
      )[]
    | null;
  requireDistinctProductsAcrossResults: boolean;
};

export interface ProductRecommendationRequestSettings {
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

export type ProductRecommendationResponse = RecommendationResponse & {
  recommendations?: ProductResult[] | null;
};

export type ProductRecommendationResponseCollection = TimedResponse & {
  responses?: ProductRecommendationResponse[] | null;
};

export type ProductRelevanceSorting = ProductSorting;

export interface ProductResult {
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

export interface ProductResultDetails {
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

export type ProductSalesPriceFilter = Filter & {
  range: DecimalNullableRange;
  currency?: Currency | null;
};

export type ProductSalesPriceRelevanceModifier = RelevanceModifier & {
  range: DecimalNullableRange;
  currency?: Currency | null;
  /** @format double */
  multiplyWeightBy: number;
  negated: boolean;
};

export type ProductSearchRequest = PaginatedSearchRequest & {
  term?: string | null;
  facets?: ProductFacetQuery | null;
  settings?: ProductSearchSettings | null;
  sorting?: ProductSortBySpecification | null;
  retailMedia?: RetailMediaQuery | null;
};

export type ProductSearchResponse = PaginatedSearchResponse & {
  results?: ProductResult[] | null;
  facets?: ProductFacetResult | null;
  recommendations?: ProductResult[] | null;
  redirects?: RedirectResult[] | null;
  retailMedia?: RetailMediaResult | null;
};

export interface ProductSearchResultConstraint {
  $type: string;
}

export type ProductSearchSettings = SearchSettings & {
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

export type ProductSearchSettingsHighlightSettings = ProductProductHighlightPropsHighlightSettings;

export interface ProductSortBySpecification {
  value?:
    | ProductAttributeSorting
    | ProductDataObjectSorting
    | ProductDataSorting
    | ProductPopularitySorting
    | ProductRelevanceSorting
    | ProductVariantAttributeSorting
    | ProductVariantSpecificationSorting
    | null;
}

export interface ProductSorting {
  $type: string;
  order: "Ascending" | "Descending";
  thenBy?:
    | ProductAttributeSorting
    | ProductDataObjectSorting
    | ProductDataSorting
    | ProductPopularitySorting
    | ProductRelevanceSorting
    | ProductVariantAttributeSorting
    | ProductVariantSpecificationSorting
    | null;
}

export type ProductUpdate = Trackable & {
  product?: Product | null;
  variants?: ProductVariant[] | null;
  productUpdateKind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  variantUpdateKind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  replaceExistingVariants: boolean;
  brandUpdateKind?: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace" | null;
};

export interface ProductVariant {
  id: string;
  displayName?: Multilingual | null;
  assortments?: number[] | null;
  specification?: Record<string, string | null>;
  data?: Record<string, DataValue>;
  custom?: Record<string, string>;
  listPrice?: MultiCurrency | null;
  salesPrice?: MultiCurrency | null;
}

export type ProductVariantAttributeSorting = ProductSorting & {
  attribute: "Id" | "DisplayName" | "ListPrice" | "SalesPrice";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductVariantSpecificationSorting = ProductSorting & {
  key?: string | null;
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductView = Trackable & {
  user?: User | null;
  product: Product;
  variant?: ProductVariant | null;
  /** @deprecated */
  channel?: Channel | null;
};

export type ProductsViewedAfterViewingContentRequest = ProductRecommendationRequest & {
  contentId: string;
};

export type ProductsViewedAfterViewingProductRequest = ProductRecommendationRequest & {
  productAndVariantId: ProductAndVariantId;
};

export interface Promotion {
  $type: string;
  name: string;
  locations?: PromotionLocationCollection | null;
}

export interface PromotionCollection {
  promotions: ProductPromotion[];
}

export interface PromotionLocation {
  key: string;
  placements?: PromotionLocationPlacementCollection | null;
}

export interface PromotionLocationCollection {
  items?: PromotionLocation[] | null;
}

export interface PromotionLocationPlacement {
  key?: string | null;
  thresholds?: ScoreThresholds | null;
}

export interface PromotionLocationPlacementCollection {
  items?: PromotionLocationPlacement[] | null;
}

export interface PromotionSpecification {
  $type: string;
}

export interface PromotionSpecificationCollection {
  productPromotion?: ProductPromotionSpecification | null;
}

export interface PromotionSpecificationVariation {
  $type: string;
}

export interface PromotionSpecificationVariationCollection {
  productPromotion?: ProductPromotionSpecificationVariation | null;
}

export interface PurchaseQualifiers {
  /** @format int32 */
  sinceMinutesAgo: number;
  byUser: boolean;
  byUserCompany: boolean;
  byUserParentCompany: boolean;
}

export interface PurchasedByUserCompanyInfo {
  /** @format date-time */
  mostRecentPurchasedUtc: string;
  /** @format int64 */
  totalNumberOfTimesPurchased: number;
  purchasedByParentCompany?: PurchasedByUserCompanyInfo | null;
}

export interface PurchasedByUserInfo {
  /** @format date-time */
  mostRecentPurchasedUtc: string;
  /** @format int64 */
  totalNumberOfTimesPurchased: number;
}

export type PurchasedWithCurrentCartRequest = ProductRecommendationRequest;

export type PurchasedWithMultipleProductsRequest = ProductRecommendationRequest & {
  productAndVariantIds: ProductAndVariantId[];
};

export type PurchasedWithProductRequest = ProductRecommendationRequest & {
  productAndVariantId: ProductAndVariantId;
};

export interface RebuildStatus {
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

export type RecentlyPurchasedFacet = BooleanValueFacet & {
  purchaseQualifiers: PurchaseQualifiers;
};

export type RecentlyPurchasedFacetResult = BooleanBooleanValueFacetResult & {
  purchaseQualifiers: PurchaseQualifiers;
};

export interface RecentlyViewedByUserRelevanceModifier {
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

export type RecentlyViewedProductsRequest = ProductRecommendationRequest;

export interface RecommendPopularSearchTermSettings {
  targetEntityTypes?: ("Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory")[] | null;
  /** @format int32 */
  numberOfRecommendations: number;
}

export interface RecommendationRequest {
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

export interface RecommendationResponse {
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export interface RecommendationSettings {
  /** @format int32 */
  take?: number | null;
  /** @format int32 */
  onlyIncludeRecommendationsWhenLessResultsThan?: number | null;
}

export interface RecommendationTypeCollection {
  unionCodes?: number[] | null;
}

export interface RedirectResult {
  /** @format uuid */
  id: string;
  condition: SearchTermCondition | RetailMediaSearchTermCondition;
  destination?: string | null;
  data?: Record<string, string>;
}

export type RedirectRule = SearchRule & {
  condition: SearchTermCondition | RetailMediaSearchTermCondition;
  destination?: string | null;
  data?: Record<string, string>;
};

export interface RedirectRuleSaveSearchRulesRequest {
  $type: string;
  rules: RedirectRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface RedirectRuleSaveSearchRulesResponse {
  $type: string;
  rules?: RedirectRule[] | null;
  statistics?: Statistics | null;
}

export interface RedirectRuleSearchRulesResponse {
  $type: string;
  rules?: RedirectRule[] | null;
  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type RedirectRulesRequest = RedirectRulesRequestSortBySearchRulesRequest;

export interface RedirectRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: RedirectRulesRequestSortBySorting;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface RedirectRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type RedirectRulesResponse = RedirectRuleSearchRulesResponse;

export type RelativeDateTimeCondition = ValueCondition & {
  comparison: "Before" | "After";
  unit: "UnixMilliseconds" | "UnixSeconds" | "UnixMinutes";
  /** @format int64 */
  currentTimeOffset: number;
};

export interface RelevanceModifier {
  $type: string;
  filters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface RelevanceModifierCollection {
  items?:
    | (
        | BrandIdRelevanceModifier
        | ContentCategoryDataRelevanceModifier
        | ContentCategoryRecentlyViewedByUserRelevanceModifier
        | ContentDataRelevanceModifier
        | ContentRecentlyViewedByUserRelevanceModifier
        | ProductAssortmentRelevanceModifier
        | ProductCategoryDataRelevanceModifier
        | ProductCategoryIdRelevanceModifier
        | ProductCategoryRecentlyViewedByUserRelevanceModifier
        | ProductDataRelevanceModifier
        | ProductIdRelevanceModifier
        | ProductListPriceRelevanceModifier
        | ProductRecentlyPurchasedByCompanyRelevanceModifier
        | ProductRecentlyPurchasedByUserCompanyRelevanceModifier
        | ProductRecentlyPurchasedByUserRelevanceModifier
        | ProductRecentlyViewedByCompanyRelevanceModifier
        | ProductRecentlyViewedByUserCompanyRelevanceModifier
        | ProductRecentlyViewedByUserRelevanceModifier
        | ProductSalesPriceRelevanceModifier
        | UserFavoriteProductRelevanceModifier
        | VariantAssortmentRelevanceModifier
        | VariantDataRelevanceModifier
        | VariantIdRelevanceModifier
        | VariantListPriceRelevanceModifier
        | VariantSalesPriceRelevanceModifier
        | VariantSpecificationsInCommonRelevanceModifier
        | VariantSpecificationValueRelevanceModifier
      )[]
    | null;
}

export interface RequestConfiguration {
  filters: "Merge" | "Suppress";
  relevanceModifiers: "Merge" | "Suppress";
  overriddenProductRecommendationRequestSettings?: OverriddenProductRecommendationRequestSettings | null;
  overriddenContentRecommendationRequestSettings?: OverriddenContentRecommendationRequestSettings | null;
}

export interface RequestContextFilter {
  recommendations?: RecommendationTypeCollection | null;
  searches?: SearchTypeCollection | null;
  locations?: string[] | null;
  languages?: Language[] | null;
  currencies?: Currency[] | null;
  filters?: RequestFilterCriteria | null;
}

export interface RequestFilterCriteria {
  includes?: FilterCollection | null;
  excludes?: FilterCollection | null;
  count?: Int32NullableRange | null;
}

export type ResultMustHaveVariantConstraint = ProductSearchResultConstraint & {
  exceptWhenProductHasNoVariants: boolean;
};

export interface RetailMediaConditions {
  $type: string;
}

export interface RetailMediaEntity2AdvertiserEntityStateAdvertiserMetadataValuesRetailMediaEntity2EntityFilters {
  $type: string;
  term?: string | null;
  states?: ("Active" | "Inactive" | "Archived")[] | null;
}

export interface RetailMediaEntity2CampaignEntityStateCampaignMetadataValuesRetailMediaEntity2EntityFilters {
  $type: string;
  term?: string | null;
  states?: ("Proposed" | "Approved" | "Archived")[] | null;
}

export interface RetailMediaEntity2LocationEntityStateLocationMetadataValuesRetailMediaEntity2EntityFilters {
  $type: string;
  term?: string | null;
  states?: ("Active" | "Inactive" | "Archived")[] | null;
}

export interface RetailMediaQuery {
  location: RetailMediaQueryLocationSelector;
}

export interface RetailMediaQueryLocationSelector {
  key: string;
  variation: RetailMediaQueryVariationSelector;
  placements: RetailMediaQueryPlacementSelector[];
}

export interface RetailMediaQueryPlacementSelector {
  key: string;
}

export interface RetailMediaQueryVariationSelector {
  key: string;
}

export interface RetailMediaResult {
  placements?: Record<string, RetailMediaResultPlacement>;
}

export interface RetailMediaResultPlacement {
  results?: RetailMediaResultPlacementResultEntity[] | null;
}

export interface RetailMediaResultPlacementResultEntity {
  promotedProduct?: RetailMediaResultPlacementResultEntityProduct | null;
}

export interface RetailMediaResultPlacementResultEntityProduct {
  result: ProductResult;
}

export type RetailMediaSearchTermCondition = SearchTermCondition & {
  language?: Language | null;
};

export interface RetailMediaSearchTermConditionCollection {
  values?: RetailMediaSearchTermCondition[] | null;
}

export type SaveAdvertisersRequest = AdvertiserSaveEntitiesRequest;

export type SaveAdvertisersResponse = AdvertiserSaveEntitiesResponse;

export type SaveCampaignsRequest = CampaignSaveEntitiesRequest;

export type SaveCampaignsResponse = CampaignSaveEntitiesResponse;

export type SaveDecompoundRulesRequest = DecompoundRuleSaveSearchRulesRequest;

export type SaveDecompoundRulesResponse = DecompoundRuleSaveSearchRulesResponse;

export type SaveGlobalRetailMediaConfigurationRequest = LicensedRequest & {
  configuration?: GlobalRetailMediaConfiguration | null;
  modifiedBy?: string | null;
};

export type SaveGlobalTriggerConfigurationRequest = LicensedRequest & {
  configuration?: GlobalTriggerConfiguration | null;
  modifiedBy?: string | null;
};

export type SaveLocationsRequest = LocationSaveEntitiesRequest;

export type SaveLocationsResponse = LocationSaveEntitiesResponse;

export type SaveMerchandisingRuleRequest = LicensedRequest & {
  rule?: BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule | null;
  modifiedBy?: string | null;
};

export type SavePredictionRulesRequest = PredictionRuleSaveSearchRulesRequest;

export type SavePredictionRulesResponse = PredictionRuleSaveSearchRulesResponse;

export type SaveRedirectRulesRequest = RedirectRuleSaveSearchRulesRequest;

export type SaveRedirectRulesResponse = RedirectRuleSaveSearchRulesResponse;

export type SaveSearchIndexRequest = LicensedRequest & {
  index?: SearchIndex | null;
  modifiedBy?: string | null;
};

export type SaveSearchResultModifierRulesRequest = SearchResultModifierRuleSaveSearchRulesRequest;

export type SaveSearchResultModifierRulesResponse = SearchResultModifierRuleSaveSearchRulesResponse;

export type SaveSearchTermModifierRulesRequest = SearchTermModifierRuleSaveSearchRulesRequest;

export type SaveSearchTermModifierRulesResponse = SearchTermModifierRuleSaveSearchRulesResponse;

export type SaveStemmingRulesRequest = StemmingRuleSaveSearchRulesRequest;

export type SaveStemmingRulesResponse = StemmingRuleSaveSearchRulesResponse;

export type SaveSynonymsRequest = LicensedRequest & {
  synonyms?: Synonym[] | null;
  modifiedBy?: string | null;
};

export type SaveSynonymsResponse = TimedResponse & {
  values?: Synonym[] | null;
};

export type SaveTriggerConfigurationRequest = LicensedRequest & {
  configuration?:
    | AbandonedCartTriggerConfiguration
    | AbandonedSearchTriggerConfiguration
    | ContentCategoryInterestTriggerConfiguration
    | ProductCategoryInterestTriggerConfiguration
    | ProductChangeTriggerConfiguration
    | ProductInterestTriggerConfiguration
    | UserActivityTriggerConfiguration
    | VariantChangeTriggerConfiguration
    | null;
  modifiedBy?: string | null;
};

export interface Score {
  /** @format float */
  relevance?: number | null;
  /** @format float */
  adjusted?: number | null;
}

export interface ScoreThresholds {
  /** @format float */
  relevance?: number | null;
  /** @format float */
  adjusted?: number | null;
}

export interface SearchIndex {
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

export type SearchIndexCollectionResponse = TimedResponse & {
  indexes?: SearchIndex[] | null;
};

export type SearchIndexRequest = LicensedRequest & {
  id?: string | null;
};

export type SearchIndexResponse = TimedResponse & {
  index?: SearchIndex | null;
};

export interface SearchIndexSelector {
  id: string;
}

export type SearchIndexesRequest = LicensedRequest;

export interface SearchRequest {
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

export type SearchRequestCollection = SearchRequest & {
  requests: (
    | ContentCategorySearchRequest
    | ContentSearchRequest
    | ProductCategorySearchRequest
    | ProductSearchRequest
    | SearchRequestCollection
    | SearchTermPredictionRequest
  )[];
};

export interface SearchResponse {
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export type SearchResponseCollection = SearchResponse & {
  responses?:
    | (
        | ContentCategorySearchResponse
        | ContentSearchResponse
        | ProductCategorySearchResponse
        | ProductSearchResponse
        | SearchResponseCollection
        | SearchTermPredictionResponse
      )[]
    | null;
};

export type SearchResultModifierRule = SearchRule & {
  condition: SearchTermCondition | RetailMediaSearchTermCondition;
  actions: (SearchResultModifierRuleAddFiltersAction | SearchResultModifierRuleAddTermFilterAction)[];
};

export type SearchResultModifierRuleAddFiltersAction = SearchResultModifierRuleRuleAction & {
  filters: FilterCollection;
};

export type SearchResultModifierRuleAddTermFilterAction = SearchResultModifierRuleRuleAction & {
  term: string;
  negated: boolean;
};

export interface SearchResultModifierRuleRuleAction {
  $type: string;
}

export interface SearchResultModifierRuleSaveSearchRulesRequest {
  $type: string;
  rules: SearchResultModifierRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface SearchResultModifierRuleSaveSearchRulesResponse {
  $type: string;
  rules?: SearchResultModifierRule[] | null;
  statistics?: Statistics | null;
}

export interface SearchResultModifierRuleSearchRulesResponse {
  $type: string;
  rules?: SearchResultModifierRule[] | null;
  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type SearchResultModifierRulesRequest = SearchResultModifierRulesRequestSortBySearchRulesRequest;

export interface SearchResultModifierRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: SearchResultModifierRulesRequestSortBySorting;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface SearchResultModifierRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type SearchResultModifierRulesResponse = SearchResultModifierRuleSearchRulesResponse;

export interface SearchRule {
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

export interface SearchRuleFilters {
  term?: string | null;
  approved?: boolean | null;
  /** @format uuid */
  id?: string | null;
}

export interface SearchSettings {
  $type: string;
}

export type SearchTerm = Trackable & {
  language?: Language | null;
  user?: User | null;
  term?: string | null;
  /** @deprecated */
  channel?: Channel | null;
};

export type SearchTermBasedProductRecommendationRequest = ProductRecommendationRequest & {
  term: string;
};

export interface SearchTermCondition {
  $type: string;
  kind?: "Equals" | "StartsWith" | "EndsWith" | "Contains" | null;
  value?: string | null;
  andConditions?: (SearchTermCondition | RetailMediaSearchTermCondition)[] | null;
  orConditions?: (SearchTermCondition | RetailMediaSearchTermCondition)[] | null;
  /** @format int32 */
  minimumLength?: number | null;
  negated: boolean;
}

export type SearchTermModifierRule = SearchRule & {
  condition: SearchTermCondition | RetailMediaSearchTermCondition;
  actions: (
    | SearchTermModifierRuleAppendToTermAction
    | SearchTermModifierRuleRemoveFromTermAction
    | SearchTermModifierRuleReplaceTermAction
    | SearchTermModifierRuleReplaceWordsInTermAction
  )[];
};

export type SearchTermModifierRuleAppendToTermAction = SearchTermModifierRuleRuleAction & {
  words: string;
};

export type SearchTermModifierRuleRemoveFromTermAction = SearchTermModifierRuleRuleAction & {
  words: string;
};

export type SearchTermModifierRuleReplaceTermAction = SearchTermModifierRuleRuleAction & {
  replacement?: string | null;
};

export type SearchTermModifierRuleReplaceWordsInTermAction = SearchTermModifierRuleRuleAction & {
  words: string;
  replacement?: string | null;
};

export interface SearchTermModifierRuleRuleAction {
  $type: string;
}

export interface SearchTermModifierRuleSaveSearchRulesRequest {
  $type: string;
  rules: SearchTermModifierRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface SearchTermModifierRuleSaveSearchRulesResponse {
  $type: string;
  rules?: SearchTermModifierRule[] | null;
  statistics?: Statistics | null;
}

export interface SearchTermModifierRuleSearchRulesResponse {
  $type: string;
  rules?: SearchTermModifierRule[] | null;
  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type SearchTermModifierRulesRequest = SearchTermModifierRulesRequestSortBySearchRulesRequest;

export interface SearchTermModifierRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: SearchTermModifierRulesRequestSortBySorting;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface SearchTermModifierRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type SearchTermModifierRulesResponse = SearchTermModifierRuleSearchRulesResponse;

export type SearchTermPredictionRequest = SearchRequest & {
  term: string;
  /** @format int32 */
  take: number;
  settings?: SearchTermPredictionSettings | null;
};

export type SearchTermPredictionResponse = SearchResponse & {
  predictions?: SearchTermPredictionResult[] | null;
};

export interface SearchTermPredictionResult {
  term?: string | null;
  /** @format int32 */
  rank: number;
  expectedResultTypes?: ExpectedSearchTermResult[] | null;
  /** @deprecated */
  type: "Match" | "WordContinuation" | "Word" | "WordSequence";
  correctedWordsMask?: boolean[] | null;
}

export type SearchTermPredictionSettings = SearchSettings & {
  targetEntityTypes?: ("Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory")[] | null;
};

export type SearchTermRecommendationResponse = RecommendationResponse & {
  recommendations?: SearchTermResult[] | null;
};

export interface SearchTermResult {
  term?: string | null;
  /** @format int32 */
  rank: number;
  expectedResultTypes?: ExpectedSearchTermResult[] | null;
}

export interface SearchTypeCollection {
  unionCodes?: number[] | null;
}

export interface SelectedBrandPropertiesSettings {
  displayName: boolean;
  assortments: boolean;
  viewedByUserInfo: boolean;
  allData: boolean;
  dataKeys?: string[] | null;
}

export interface SelectedCategoryPropertiesSettings {
  $type: string;
  displayName: boolean;
  paths: boolean;
  assortments: boolean;
  viewedByUserInfo: boolean;
  allData: boolean;
  dataKeys?: string[] | null;
}

export type SelectedContentCategoryPropertiesSettings = SelectedCategoryPropertiesSettings;

export interface SelectedContentPropertiesSettings {
  displayName: boolean;
  categoryPaths: boolean;
  assortments: boolean;
  allData: boolean;
  viewedByUserInfo: boolean;
  dataKeys?: string[] | null;
}

export type SelectedProductCategoryPropertiesSettings = SelectedCategoryPropertiesSettings;

export interface SelectedProductDetailsPropertiesSettings {
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

export interface SelectedProductPropertiesSettings {
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

export interface SelectedScorePropertiesSettings {
  relevance: boolean;
  adjusted: boolean;
}

export interface SelectedVariantDetailsPropertiesSettings {
  displayName: boolean;
  pricing: boolean;
  allSpecifications: boolean;
  assortments: boolean;
  allData: boolean;
  dataKeys?: string[] | null;
  specificationKeys?: string[] | null;
}

export interface SelectedVariantPropertiesSettings {
  displayName: boolean;
  pricing: boolean;
  allSpecifications: boolean;
  assortments: boolean;
  allData: boolean;
  dataKeys?: string[] | null;
  specificationKeys?: string[] | null;
}

export interface SignificantDataValue {
  key: string;
  comparer: "Equals" | "NumericPercentDifference" | "StringSimilarity" | "KeyExists" | "CollectionOverlap";
  /** @format double */
  significance: number;
  transformer?: TrimStringTransformer | null;
}

export interface SimilarProductsEvaluationSettings {
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

export type SimilarProductsRequest = ProductRecommendationRequest & {
  existingProductId?: ProductAndVariantId | null;
  productData?: Product | null;
  considerAlreadyKnownInformationAboutProduct: boolean;
  evaluationSettings?: SimilarProductsEvaluationSettings | null;
  /** @format int32 */
  explodedVariants?: number | null;
};

export interface SimilarVariantEvaluationSettings {
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

export type SortProductsRequest = ProductRecommendationRequest & {
  productIds: string[];
};

export type SortVariantsRequest = ProductRecommendationRequest & {
  productId: string;
};

export interface SpecificationsIndexConfiguration {
  keys?: Record<string, FieldIndexConfiguration>;
  unspecified?: FieldIndexConfiguration | null;
}

export interface Statistics {
  /** @format double */
  serverTimeInMs: number;
}

export type StemmingRule = SearchRule & {
  words: string[];
  stem?: string | null;
};

export interface StemmingRuleSaveSearchRulesRequest {
  $type: string;
  rules: StemmingRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface StemmingRuleSaveSearchRulesResponse {
  $type: string;
  rules?: StemmingRule[] | null;
  statistics?: Statistics | null;
}

export interface StemmingRuleSearchRulesResponse {
  $type: string;
  rules?: StemmingRule[] | null;
  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type StemmingRulesRequest = StemmingRulesRequestSortBySearchRulesRequest;

export interface StemmingRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: StemmingRulesRequestSortBySorting;
  /** @format int32 */
  skip: number;
  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface StemmingRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type StemmingRulesResponse = StemmingRuleSearchRulesResponse;

export interface StringAvailableFacetValue {
  value?: string | null;
  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface StringBrandNameAndIdResultValueFacetResult {
  $type: string;
  selected?: string[] | null;
  available?: BrandNameAndIdResultAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface StringCategoryNameAndIdResultValueFacetResult {
  $type: string;
  selected?: string[] | null;
  available?: CategoryNameAndIdResultAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface StringContentDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface StringContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface StringDataObjectValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface StringDataObjectValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface StringFieldSnippetMatchArrayKeyValuePair {
  key: string;
  value: HighlightResultSnippetFieldSnippetMatch[];
}

export interface StringProductCategoryDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface StringProductCategoryDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface StringProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface StringProductDataValueFacetResult {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface StringRange1ArrayKeyValuePair {
  key: string;
  value: Int32Range[];
}

export interface StringStringKeyValuePair {
  key: string;
  value: string;
}

export interface StringValueFacet {
  $type: string;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
  settings?: FacetSettings | null;
}

export interface StringValueFacetResult {
  $type: string;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification" | "User";
}

export interface Synonym {
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

export type SynonymsRequest = LicensedRequest & {
  sorting?: SynonymsRequestSynonymSortingSorting | null;
  /** @format int32 */
  take: number;
  /** @format int32 */
  skip: number;
  term?: string | null;
  isApproved?: boolean | null;
};

export interface SynonymsRequestSynonymSortingSorting {
  sortBy:
    | "Created"
    | "CreatedBy"
    | "Modified"
    | "ModifiedBy"
    | "Approved"
    | "ApprovedBy"
    | "Usages"
    | "Type"
    | "Predictable";
  sortOrder: "Ascending" | "Descending";
}

export type SynonymsResponse = TimedResponse & {
  values?: Synonym[] | null;
  /** @format int32 */
  hits: number;
};

export interface TargetConditionConfiguration {
  filters?: FilterCollection | null;
}

export interface TimedResponse {
  statistics?: Statistics | null;
}

export type TrackBrandAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: BrandAdministrativeAction | null;
};

export type TrackBrandUpdateRequest = TrackingRequest & {
  brandUpdate?: BrandUpdate | null;
};

export type TrackBrandViewRequest = TrackingRequest & {
  brandView: BrandView;
};

export type TrackCartRequest = TrackingRequest & {
  cart: Cart;
};

export type TrackCompanyAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: CompanyAdministrativeAction | null;
};

export type TrackCompanyUpdateRequest = TrackingRequest & {
  companyUpdate?: CompanyUpdate | null;
};

export type TrackContentAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: ContentAdministrativeAction | null;
};

export type TrackContentCategoryAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: ContentCategoryAdministrativeAction | null;
};

export type TrackContentCategoryUpdateRequest = TrackingRequest & {
  contentCategoryUpdate?: ContentCategoryUpdate | null;
};

export type TrackContentCategoryViewRequest = TrackingRequest & {
  contentCategoryView: ContentCategoryView;
};

export type TrackContentUpdateRequest = TrackingRequest & {
  contentUpdate?: ContentUpdate | null;
};

export type TrackContentViewRequest = TrackingRequest & {
  contentView: ContentView;
};

export type TrackOrderRequest = TrackingRequest & {
  order: Order;
};

export type TrackProductAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: ProductAdministrativeAction | null;
};

export type TrackProductCategoryAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: ProductCategoryAdministrativeAction | null;
};

export type TrackProductCategoryUpdateRequest = TrackingRequest & {
  productCategoryUpdate?: ProductCategoryUpdate | null;
};

export type TrackProductCategoryViewRequest = TrackingRequest & {
  productCategoryView: ProductCategoryView;
};

export type TrackProductUpdateRequest = TrackingRequest & {
  productUpdate?: ProductUpdate | null;
};

export type TrackProductViewRequest = TrackingRequest & {
  productView: ProductView;
};

export type TrackSearchTermRequest = TrackingRequest & {
  searchTerm?: SearchTerm | null;
};

export type TrackUserUpdateRequest = TrackingRequest & {
  userUpdate?: UserUpdate | null;
};

export interface Trackable {
  $type: string;
  custom?: Record<string, string | null>;
}

export interface TrackingRequest {
  $type: string;
  custom?: Record<string, string | null>;
}

export type TriggerConfigurationCollectionResponse = TimedResponse & {
  configurations?:
    | (
        | AbandonedCartTriggerConfiguration
        | AbandonedSearchTriggerConfiguration
        | ContentCategoryInterestTriggerConfiguration
        | ProductCategoryInterestTriggerConfiguration
        | ProductChangeTriggerConfiguration
        | ProductInterestTriggerConfiguration
        | UserActivityTriggerConfiguration
        | VariantChangeTriggerConfiguration
      )[]
    | null;
};

export type TriggerConfigurationRequest = LicensedRequest & {
  /** @format uuid */
  id: string;
  /** @format int32 */
  type?: number | null;
};

export type TriggerConfigurationResponse = TimedResponse & {
  configuration?:
    | AbandonedCartTriggerConfiguration
    | AbandonedSearchTriggerConfiguration
    | ContentCategoryInterestTriggerConfiguration
    | ProductCategoryInterestTriggerConfiguration
    | ProductChangeTriggerConfiguration
    | ProductInterestTriggerConfiguration
    | UserActivityTriggerConfiguration
    | VariantChangeTriggerConfiguration
    | null;
};

export type TriggerConfigurationsRequest = LicensedRequest & {
  /** @format int32 */
  type?: number | null;
};

export type TriggerResultRequest = LicensedRequest & {
  /** @format uuid */
  configurationId: string;
};

export type TriggerResultResponse = TimedResponse & {
  result?: ITriggerResult | null;
};

export interface TrimStringTransformer {
  valuesToTrim: string[];
}

export interface User {
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

export type UserActivityTriggerConfiguration = UserActivityTriggerResultTriggerConfiguration;

export interface UserActivityTriggerResultTriggerConfiguration {
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

export interface UserAssociatedCompanyResultDetails {
  id: string;
  parent?: UserAssociatedCompanyResultDetails | null;
  data?: Record<string, DataValue>;
  /** @format date-time */
  createdUtc: string;
  /** @format date-time */
  lastAccessedUtc: string;
}

export interface UserCondition {
  $type: string;
  custom?: Record<string, string | null>;
  negated: boolean;
}

export interface UserConditionCollection {
  items?:
    | (
        | AndCondition
        | HasActivityCondition
        | HasAuthenticatedIdCondition
        | HasClassificationCondition
        | HasDataCondition
        | HasEmailCondition
        | HasIdentifierCondition
        | HasLineItemsInCartCondition
        | HasModifiedCartCondition
        | HasPlacedOrderCondition
        | HasRecentlyReceivedSameTriggerCondition
        | HasRecentlyReceivedTriggerCondition
        | OrCondition
      )[]
    | null;
}

export interface UserConditionConfiguration {
  conditions?: UserConditionCollection | null;
}

export type UserDetailsCollectionResponse = TimedResponse & {
  results?: UserResultDetails[][] | null;
};

export type UserFavoriteProductRelevanceModifier = RelevanceModifier & {
  /** @format int32 */
  sinceMinutesAgo: number;
  /** @format double */
  numberOfPurchasesWeight: number;
  /** @format double */
  mostRecentPurchaseWeight: number;
  /** @format double */
  ifNotPurchasedBaseWeight: number;
};

export type UserQuery = LicensedRequest & {
  criteria: UserQueryCriteria[];
  language?: Language | null;
  currency?: Currency | null;
};

export interface UserQueryCriteria {
  authenticatedId?: string | null;
  temporaryId?: string | null;
  email?: string | null;
  language?: Language | null;
  currency?: Currency | null;
  identifiers?: Record<string, string>;
}

export interface UserResultDetails {
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

export type UserUpdate = Trackable & {
  user?: User | null;
  kind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export interface ValueCondition {
  $type: string;
  negated: boolean;
}

export interface ValueConditionCollection {
  items?:
    | (
        | ContainsCondition
        | DistinctCondition
        | EqualsCondition
        | GreaterThanCondition
        | HasValueCondition
        | LessThanCondition
        | RelativeDateTimeCondition
      )[]
    | null;
}

export interface ValueSelector {
  $type: string;
}

export type VariantAssortmentFilter = Filter & {
  assortments: number[];
};

export type VariantAssortmentRelevanceModifier = RelevanceModifier & {
  assortments?: number[] | null;
  /** @format double */
  multiplyWeightBy: number;
};

export type VariantChangeTriggerConfiguration =
  VariantChangeTriggerResultVariantChangeTriggerResultSettingsVariantPropertySelectorEntityChangeTriggerConfiguration;

export interface VariantChangeTriggerResultSettings {
  selectedProductProperties?: SelectedProductDetailsPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantDetailsPropertiesSettings | null;
}

export interface VariantChangeTriggerResultVariantChangeTriggerResultSettingsVariantPropertySelectorEntityChangeTriggerConfiguration {
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

export type VariantDataFilter = DataFilter;

export type VariantDataHasKeyFilter = Filter & {
  key: string;
};

export type VariantDataRelevanceModifier = DataRelevanceModifier;

export type VariantDisabledFilter = Filter;

export type VariantIdFilter = Filter & {
  variantIds: string[];
};

export type VariantIdRelevanceModifier = RelevanceModifier & {
  variantIds?: string[] | null;
  /** @format double */
  multiplyWeightBy: number;
  negated: boolean;
};

export interface VariantIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  specifications?: SpecificationsIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
}

export type VariantListPriceFilter = Filter & {
  range: DecimalNullableRange;
  currency?: Currency | null;
};

export type VariantListPriceRelevanceModifier = RelevanceModifier & {
  range: DecimalNullableRange;
  currency?: Currency | null;
  /** @format double */
  multiplyWeightBy: number;
  negated: boolean;
};

export interface VariantPropertySelector {
  $type: string;
}

export interface VariantResult {
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

export interface VariantResultDetails {
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

export type VariantSalesPriceFilter = Filter & {
  range: DecimalNullableRange;
  currency?: Currency | null;
};

export type VariantSalesPriceRelevanceModifier = RelevanceModifier & {
  range: DecimalNullableRange;
  currency?: Currency | null;
  /** @format double */
  multiplyWeightBy: number;
  negated: boolean;
};

export interface VariantSearchSettings {
  /** @deprecated */
  excludeResultsWithoutVariant: boolean;
}

export type VariantSpecificationFacet = StringValueFacet & {
  key: string;
};

export type VariantSpecificationFacetResult = StringValueFacetResult & {
  key?: string | null;
};

export type VariantSpecificationFilter = Filter & {
  key: string;
  filterOutIfKeyIsNotFound: boolean;
  equalTo: string;
};

export type VariantSpecificationValueRelevanceModifier = RelevanceModifier & {
  key?: string | null;
  value?: string | null;
  /** @format double */
  ifIdenticalMultiplyWeightBy: number;
  /** @format double */
  ifNotIdenticalMultiplyWeightBy: number;
  ifSpecificationKeyNotFoundApplyNotEqualMultiplier: boolean;
};

export type VariantSpecificationsInCommonRelevanceModifier = RelevanceModifier & {
  specificationKeysAndMultipliers?: KeyMultiplier[] | null;
};

export interface ViewedByUserCompanyInfo {
  /** @format date-time */
  mostRecentlyViewedUtc: string;
  /** @format int64 */
  totalNumberOfTimesViewed: number;
  viewedByParentCompany?: ViewedByUserCompanyInfo | null;
}

export interface ViewedByUserInfo {
  /** @format date-time */
  mostRecentlyViewedUtc: string;
  /** @format int32 */
  totalNumberOfTimesViewed: number;
}
