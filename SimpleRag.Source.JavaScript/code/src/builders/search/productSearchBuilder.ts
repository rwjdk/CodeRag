import { ProductSearchRequest, ProductSearchSettings, RecommendationSettings, ResultMustHaveVariantConstraint, RetailMediaQuery, SelectedBrandPropertiesSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings, VariantSearchSettings } from '../../models/data-contracts';
import { PaginationBuilder } from '../paginationBuilder';
import { Settings } from '../settings';
import { FacetBuilder } from './facetBuilder';
import { ProductHighlightingBuilder } from './productHighlightingBuilder';
import { ProductSortingBuilder } from './productSortingBuilder';
import { SearchBuilder } from './searchBuilder';
import { SearchConstraintBuilder } from './searchConstraintBuilder';
import { SearchRequestBuilder } from './searchRequestBuilder';

export class ProductSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder: FacetBuilder = new FacetBuilder();
    private retailMediaQuery: RetailMediaQuery | null = null;
    private paginationBuilder: PaginationBuilder = new PaginationBuilder();
    private sortingBuilder: ProductSortingBuilder = new ProductSortingBuilder();
    private searchConstraintBuilder: SearchConstraintBuilder = new SearchConstraintBuilder();
    private term: string | null | undefined;
    private highlightingBuilder = new ProductHighlightingBuilder();

    private searchSettings: ProductSearchSettings = {
        $type: 'Relewise.Client.Requests.Search.Settings.ProductSearchSettings, Relewise.Client',
        recommendations: {},
    };

    constructor(settings: Settings) {
        super(settings)
    }

    /**
     * Select the properties of the product to be returned, by default only the product id is returned.
     * @param productProperties  
     */
    public setSelectedProductProperties(productProperties: Partial<SelectedProductPropertiesSettings> | null): this {
        this.searchSettings.selectedProductProperties = productProperties as SelectedProductPropertiesSettings | null;

        return this;
    }

    /**
    * Select the properties of the variant to be returned, by default only the variant id is returned.  
    * @param variantProperties  
    */
    public setSelectedVariantProperties(variantProperties: Partial<SelectedVariantPropertiesSettings> | null): this {
        this.searchSettings.selectedVariantProperties = variantProperties as SelectedVariantPropertiesSettings | null;

        return this;
    }

    /**
     * Select the properties of the brand to be returned, by default only the brand id is returned.
     * @param brandProperties  
     */
    public setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings> | null): this {
        this.searchSettings.selectedBrandProperties = brandProperties as SelectedBrandPropertiesSettings | null;

        return this;
    }

    public setVariantSearchSettings(variantSearchSettings: Partial<VariantSearchSettings>): this {
        this.searchSettings.variantSettings = variantSearchSettings as VariantSearchSettings;

        return this;
    }

    public setExplodedVariants(count?: number | null): this {
        this.searchSettings.explodedVariants = count;

        return this;
    }

    public setRecommendationSettings(settings: RecommendationSettings): this {
        this.searchSettings.recommendations = settings;

        return this;
    }

    public setRetailMedia(query: RetailMediaQuery | null): this {
        this.retailMediaQuery = query;

        return this;
    }

    /**
     * Set the term used to filter products by
     */
    public setTerm(term: string | null | undefined): this {

        this.term = term;

        return this;
    }

    public pagination(paginate: (pagination: PaginationBuilder) => void): this {
        paginate(this.paginationBuilder);

        return this;
    }

    public facets(facets: (facets: FacetBuilder) => void): this {
        facets(this.facetBuilder);

        return this;
    }

    public sorting(sorting: (sortingBuilder: ProductSortingBuilder) => void): this {
        sorting(this.sortingBuilder);

        return this;
    }

    public searchConstraints(searchConstraintbuilder: (searchConstraintBuilder: SearchConstraintBuilder) => void): this {
        searchConstraintbuilder(this.searchConstraintBuilder);

        this.searchSettings.resultConstraint = this.searchConstraintBuilder.build();

        return this;
    }

    public highlighting(highlightingBuilder: (highlightingBuilder: ProductHighlightingBuilder) => void): this {
        highlightingBuilder(this.highlightingBuilder);

        this.searchSettings.highlight = this.highlightingBuilder.build();

        return this;
    }

    public build(): ProductSearchRequest {
        const { take, skip } = this.paginationBuilder.build();
        return {
            $type: 'Relewise.Client.Requests.Search.ProductSearchRequest, Relewise.Client',
            ...this.baseBuild(),
            take,
            skip,
            term: this.term,
            facets: this.facetBuilder.build(),
            settings: this.searchSettings,
            sorting: this.sortingBuilder.build(),
            retailMedia: this.retailMediaQuery,
        } as ProductSearchRequest;
    }
}