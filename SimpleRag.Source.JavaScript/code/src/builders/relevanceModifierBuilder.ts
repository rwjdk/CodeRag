import { BrandIdRelevanceModifier, ContentCategoryDataRelevanceModifier, ContentCategoryRecentlyViewedByUserRelevanceModifier, ContentDataRelevanceModifier, ContentRecentlyViewedByUserRelevanceModifier, ProductAssortmentRelevanceModifier, ProductCategoryDataRelevanceModifier, ProductCategoryIdRelevanceModifier, ProductCategoryRecentlyViewedByUserRelevanceModifier, ProductDataRelevanceModifier, ProductIdRelevanceModifier, ProductListPriceRelevanceModifier, ProductRecentlyPurchasedByCompanyRelevanceModifier, ProductRecentlyPurchasedByUserCompanyRelevanceModifier, ProductRecentlyPurchasedByUserRelevanceModifier, ProductRecentlyViewedByCompanyRelevanceModifier, ProductRecentlyViewedByUserCompanyRelevanceModifier, ProductRecentlyViewedByUserRelevanceModifier, ProductSalesPriceRelevanceModifier, UserFavoriteProductRelevanceModifier, VariantAssortmentRelevanceModifier, VariantDataRelevanceModifier, VariantIdRelevanceModifier, VariantListPriceRelevanceModifier, VariantSalesPriceRelevanceModifier, VariantSpecificationsInCommonRelevanceModifier, VariantSpecificationValueRelevanceModifier, DataDoubleSelector, FixedDoubleValueSelector, RelevanceModifierCollection } from '../models/data-contracts';
import { ConditionBuilder } from './conditionBuilder';
import { FilterBuilder } from './filterBuilder';

export class RelevanceModifierBuilder {
    private modifiers: (
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
    )[] = [];

    public addBrandIdRelevanceModifier(
        brandId: string,
        ifProductIsBrandMultiplyWeightBy: number = 1,
        ifProductIsNotBrandMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: BrandIdRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.BrandIdRelevanceModifier, Relewise.Client',
            ifProductIsBrandMultiplyWeightBy: ifProductIsBrandMultiplyWeightBy,
            ifProductIsNotBrandMultiplyWeightBy: ifProductIsNotBrandMultiplyWeightBy,
            brandId: brandId,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductAssortmentRelevanceModifier(
        assortments: number[],
        multiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductAssortmentRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductAssortmentRelevanceModifier, Relewise.Client',
            assortments: assortments,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addVariantAssortmentRelevanceModifier(
        assortments: number[],
        multiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: VariantAssortmentRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.VariantAssortmentRelevanceModifier, Relewise.Client',
            assortments: assortments,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductCategoryIdRelevanceModifier(
        categoryId: string,
        evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor',
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductCategoryIdRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductCategoryIdRelevanceModifier, Relewise.Client',
            categoryId: categoryId,
            evaluationScope: evaluationScope,
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductDataRelevanceModifier(
        key: string,
        conditions: (builder: ConditionBuilder) => void,
        multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector,
        mustMatchAllConditions: boolean = true,
        considerAsMatchIfKeyIsNotFound: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const conditionBuilder = new ConditionBuilder();
        conditions(conditionBuilder);

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductDataRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductDataRelevanceModifier, Relewise.Client',
            key: key,
            considerAsMatchIfKeyIsNotFound: considerAsMatchIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: conditionBuilder.build()?.items,
            multiplierSelector: multiplierSelector,
            multiplyWeightBy: 0, // Obsolete, but required property
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addVariantDataRelevanceModifier(
        key: string,
        conditions: (builder: ConditionBuilder) => void,
        multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector,
        mustMatchAllConditions: boolean = true,
        considerAsMatchIfKeyIsNotFound: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const conditionBuilder = new ConditionBuilder();
        conditions(conditionBuilder);

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: VariantDataRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.VariantDataRelevanceModifier, Relewise.Client',
            key: key,
            considerAsMatchIfKeyIsNotFound: considerAsMatchIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: conditionBuilder.build()?.items,
            multiplierSelector: multiplierSelector,
            multiplyWeightBy: 0, // Obsolete, but required property
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addContentCategoryDataRelevanceModifier(
        key: string,
        conditions: (builder: ConditionBuilder) => void,
        multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector,
        mustMatchAllConditions: boolean = true,
        considerAsMatchIfKeyIsNotFound: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const conditionBuilder = new ConditionBuilder();
        conditions(conditionBuilder);

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ContentCategoryDataRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ContentCategoryDataRelevanceModifier, Relewise.Client',
            key: key,
            considerAsMatchIfKeyIsNotFound: considerAsMatchIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: conditionBuilder.build()?.items,
            multiplierSelector: multiplierSelector,
            multiplyWeightBy: 0, // Obsolete, but required property
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addContentDataRelevanceModifier(
        key: string,
        conditions: (builder: ConditionBuilder) => void,
        multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector,
        mustMatchAllConditions: boolean = true,
        considerAsMatchIfKeyIsNotFound: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const conditionBuilder = new ConditionBuilder();
        conditions(conditionBuilder);

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ContentDataRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ContentDataRelevanceModifier, Relewise.Client',
            key: key,
            considerAsMatchIfKeyIsNotFound: considerAsMatchIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: conditionBuilder.build()?.items,
            multiplierSelector: multiplierSelector,
            multiplyWeightBy: 0, // Obsolete, but required property
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductCategoryDataRelevanceModifier(
        key: string,
        conditions: (builder: ConditionBuilder) => void,
        multiplierSelector: DataDoubleSelector | FixedDoubleValueSelector,
        mustMatchAllConditions: boolean = true,
        considerAsMatchIfKeyIsNotFound: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const conditionBuilder = new ConditionBuilder();
        conditions(conditionBuilder);

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductCategoryDataRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductCategoryDataRelevanceModifier, Relewise.Client',
            key: key,
            considerAsMatchIfKeyIsNotFound: considerAsMatchIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: conditionBuilder.build()?.items,
            multiplierSelector: multiplierSelector,
            multiplyWeightBy: 0, // Obsolete, but required property
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addVariantIdRelevanceModifier(
        variantIds: string[],
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: VariantIdRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.VariantIdRelevanceModifier, Relewise.Client',
            variantIds: variantIds,
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductIdRelevanceModifier(
        productIds: string[],
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductIdRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductIdRelevanceModifier, Relewise.Client',
            productIds: productIds,
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductListPriceRelevanceModifier(
        currency: string,
        lowerBound: number | null | undefined,
        upperBound: number | null | undefined,
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductListPriceRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductListPriceRelevanceModifier, Relewise.Client',
            range: { lowerBoundInclusive: lowerBound, upperBoundInclusive: upperBound },
            currency: { value: currency },
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductSalesPriceRelevanceModifier(
        currency: string,
        lowerBound: number | null | undefined,
        upperBound: number | null | undefined,
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductSalesPriceRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductSalesPriceRelevanceModifier, Relewise.Client',
            range: { lowerBoundInclusive: lowerBound, upperBoundInclusive: upperBound },
            currency: { value: currency },
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addVariantListPriceRelevanceModifier(
        currency: string,
        lowerBound: number | null | undefined,
        upperBound: number | null | undefined,
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: VariantListPriceRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.VariantListPriceRelevanceModifier, Relewise.Client',
            range: { lowerBoundInclusive: lowerBound, upperBoundInclusive: upperBound },
            currency: { value: currency },
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addVariantSalesPriceRelevanceModifier(
        currency: string,
        lowerBound: number | null | undefined,
        upperBound: number | null | undefined,
        multiplyWeightBy: number = 1,
        negated: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: VariantSalesPriceRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.VariantSalesPriceRelevanceModifier, Relewise.Client',
            range: { lowerBoundInclusive: lowerBound, upperBoundInclusive: upperBound },
            currency: { value: currency },
            negated: negated,
            multiplyWeightBy: multiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }


    public addVariantSpecificationsInCommonRelevanceModifier(
        specificationKeysAndMultipliers: { key: string, multiplier: number }[],
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: VariantSpecificationsInCommonRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.VariantSpecificationsInCommonRelevanceModifier, Relewise.Client',
            specificationKeysAndMultipliers,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addVariantSpecificationValueRelevanceModifier(
        key: string,
        value: string,
        ifIdenticalMultiplyWeightBy: number = 1,
        ifNotIdenticalMultiplyWeightBy: number = 0,
        ifSpecificationKeyNotFoundApplyNotEqualMultiplier: boolean = false,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: VariantSpecificationValueRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.VariantSpecificationValueRelevanceModifier, Relewise.Client',
            key,
            value,
            ifIdenticalMultiplyWeightBy,
            ifNotIdenticalMultiplyWeightBy,
            ifSpecificationKeyNotFoundApplyNotEqualMultiplier,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductRecentlyPurchasedByUserRelevanceModifier(
        sinceUtc: Date,
        ifNotPreviouslyPurchasedByUserMultiplyWeightBy: number = 1,
        ifPreviouslyPurchasedByUserMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductRecentlyPurchasedByUserRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductRecentlyPurchasedByUserRelevanceModifier, Relewise.Client',
            ifNotPreviouslyPurchasedByUserMultiplyWeightBy,
            ifPreviouslyPurchasedByUserMultiplyWeightBy,
            sinceUtc: sinceUtc.toJSON(),
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductRecentlyPurchasedByCompanyRelevanceModifier(
        sinceMinutesAgo: number,
        companyIds: string[],
        ifPurchasedByCompanyMultiplyWeightBy: number = 1,
        elseIfNotPurchasedByCompanyMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductRecentlyPurchasedByCompanyRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductRecentlyPurchasedByCompanyRelevanceModifier, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            companyIds: companyIds,
            ifPurchasedByCompanyMultiplyWeightBy,
            elseIfNotPurchasedByCompanyMultiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductRecentlyPurchasedByUserCompanyRelevanceModifier(
        sinceMinutesAgo: number,
        ifPurchasedByCompanyMultiplyWeightBy: number = 1,
        elseIfPurchasedByParentCompanyMultiplyWeightBy: number = 1,
        elseIfNotPurchasedByEitherCompanyMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductRecentlyPurchasedByUserCompanyRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductRecentlyPurchasedByUserCompanyRelevanceModifier, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            ifPurchasedByCompanyMultiplyWeightBy,
            elseIfPurchasedByParentCompanyMultiplyWeightBy,
            elseIfNotPurchasedByEitherCompanyMultiplyWeightBy,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductRecentlyViewedByUserRelevanceModifier(
        sinceUtc: Date,
        ifNotPreviouslyViewedByUserMultiplyWeightBy: number = 1,
        ifPreviouslyViewedByUserMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductRecentlyViewedByUserRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductRecentlyViewedByUserRelevanceModifier, Relewise.Client',
            ifNotPreviouslyViewedByUserMultiplyWeightBy,
            ifPreviouslyViewedByUserMultiplyWeightBy,
            sinceUtc: sinceUtc.toJSON(),
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductRecentlyViewedByCompanyRelevanceModifier(
        sinceMinutesAgo: number,
        companyIds: string[],
        ifViewedByCompanyMultiplyWeightBy: number = 1,
        elseIfNotViewedByCompanyMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductRecentlyViewedByCompanyRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductRecentlyViewedByCompanyRelevanceModifier, Relewise.Client',
            companyIds,
            ifViewedByCompanyMultiplyWeightBy,
            elseIfNotViewedByCompanyMultiplyWeightBy,
            sinceMinutesAgo: sinceMinutesAgo,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductRecentlyViewedByUserCompanyRelevanceModifier(
        sinceMinutesAgo: number,
        ifViewedByUserCompanyMultiplyWeightBy: number = 1,
        elseIfViewedByUserParentCompanyMultiplyWeightBy: number = 1,
        elseIfNotViewedByEitherCompanyMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductRecentlyViewedByUserCompanyRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductRecentlyViewedByUserCompanyRelevanceModifier, Relewise.Client',
            ifViewedByUserCompanyMultiplyWeightBy,
            elseIfViewedByUserParentCompanyMultiplyWeightBy,
            elseIfNotViewedByEitherCompanyMultiplyWeightBy,
            sinceMinutesAgo: sinceMinutesAgo,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addProductCategoryRecentlyViewedByUserRelevanceModifier(
        sinceUtc: Date,
        ifNotPreviouslyViewedByUserMultiplyWeightBy: number = 1,
        ifPreviouslyViewedByUserMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ProductCategoryRecentlyViewedByUserRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ProductCategoryRecentlyViewedByUserRelevanceModifier, Relewise.Client',
            ifNotPreviouslyViewedByUserMultiplyWeightBy,
            ifPreviouslyViewedByUserMultiplyWeightBy,
            sinceUtc: sinceUtc.toJSON(),
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addContentRecentlyViewedByUserRelevanceModifier(
        sinceUtc: Date,
        ifNotPreviouslyViewedByUserMultiplyWeightBy: number = 1,
        ifPreviouslyViewedByUserMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ContentRecentlyViewedByUserRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ContentRecentlyViewedByUserRelevanceModifier, Relewise.Client',
            ifNotPreviouslyViewedByUserMultiplyWeightBy,
            ifPreviouslyViewedByUserMultiplyWeightBy,
            sinceUtc: sinceUtc.toJSON(),
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addContentCategoryRecentlyViewedByUserRelevanceModifier(
        sinceUtc: Date,
        ifNotPreviouslyViewedByUserMultiplyWeightBy: number = 1,
        ifPreviouslyViewedByUserMultiplyWeightBy: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: ContentCategoryRecentlyViewedByUserRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.ContentCategoryRecentlyViewedByUserRelevanceModifier, Relewise.Client',
            ifNotPreviouslyViewedByUserMultiplyWeightBy,
            ifPreviouslyViewedByUserMultiplyWeightBy,
            sinceUtc: sinceUtc.toJSON(),
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public addUserFavoriteProductRelevanceModifier(
        sinceMinutesAgo: number,
        ifNotPurchasedBaseWeight: number = 1,
        mostRecentPurchaseWeight: number = 1,
        numberOfPurchasesWeight: number = 1,
        filter?: (builder: FilterBuilder) => void): this {

        const filterBuilder = new FilterBuilder();
        if (filter) {
            filter(filterBuilder);
        }

        const modifier: UserFavoriteProductRelevanceModifier = {
            $type: 'Relewise.Client.Requests.RelevanceModifiers.UserFavoriteProductRelevanceModifier, Relewise.Client',
            ifNotPurchasedBaseWeight,
            mostRecentPurchaseWeight,
            numberOfPurchasesWeight,
            sinceMinutesAgo: sinceMinutesAgo,
            filters: filterBuilder.build(),
        };
        this.modifiers.push(modifier);

        return this;
    }

    public build(): RelevanceModifierCollection | null {

        return this.modifiers.length === 0
            ? null
            : { items: this.modifiers };
    }
}