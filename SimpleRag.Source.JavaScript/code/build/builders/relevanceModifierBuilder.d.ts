import { DataDoubleSelector, FixedDoubleValueSelector, RelevanceModifierCollection } from '../models/data-contracts';
import { ConditionBuilder } from './conditionBuilder';
import { FilterBuilder } from './filterBuilder';
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
