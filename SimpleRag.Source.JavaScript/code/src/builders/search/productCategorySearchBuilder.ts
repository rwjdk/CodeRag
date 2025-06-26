import { ProductCategorySearchRequest, ProductCategorySearchSettings, RecommendationSettings, SelectedProductCategoryPropertiesSettings } from '../../models/data-contracts';
import { PaginationBuilder } from '../paginationBuilder';
import { Settings } from '../settings';
import { FacetBuilder } from './facetBuilder';
import { ProductCategorySortingBuilder } from './productCategorySortingBuilder';
import { SearchBuilder } from './searchBuilder';
import { SearchRequestBuilder } from './searchRequestBuilder';

export class ProductCategorySearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder: FacetBuilder = new FacetBuilder();
    private paginationBuilder: PaginationBuilder = new PaginationBuilder();
    private sortingBuilder: ProductCategorySortingBuilder = new ProductCategorySortingBuilder();
    private term: string | null | undefined;

    private searchSettings: ProductCategorySearchSettings = {
        $type: 'Relewise.Client.Requests.Search.Settings.ProductCategorySearchSettings, Relewise.Client',
        recommendations: {},
    };

    constructor(settings: Settings) {
        super(settings)
    }

    /**
     * Select the properties of the product category to be returned, by default only the product category id is returned.
     * @param productCategoryProperties  
     */
    public setSelectedCategoryProperties(productCategoryProperties: Partial<SelectedProductCategoryPropertiesSettings> | null): this {
        this.searchSettings.selectedCategoryProperties = productCategoryProperties as SelectedProductCategoryPropertiesSettings | null;

        return this;
    }

    public setRecommendationSettings(settings: RecommendationSettings): this {
        this.searchSettings.recommendations = settings;

        return this;
    }

    /**
     * Set the term used to filter product categories by
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

    public sorting(sorting: (sortingBuilder: ProductCategorySortingBuilder) => void): this {
        sorting(this.sortingBuilder);

        return this;
    }

    public build(): ProductCategorySearchRequest {
        const { take, skip } = this.paginationBuilder.build();
        return {
            $type: 'Relewise.Client.Requests.Search.ProductCategorySearchRequest, Relewise.Client',
            ...this.baseBuild(),
            take,
            skip,

            term: this.term,

            facets: this.facetBuilder.build(),
            settings: this.searchSettings,
            sorting: this.sortingBuilder.build(),
        };
    }
}