import { ProductCategorySearchRequest, RecommendationSettings, SelectedProductCategoryPropertiesSettings } from '../../models/data-contracts';
import { PaginationBuilder } from '../paginationBuilder';
import { Settings } from '../settings';
import { FacetBuilder } from './facetBuilder';
import { ProductCategorySortingBuilder } from './productCategorySortingBuilder';
import { SearchBuilder } from './searchBuilder';
import { SearchRequestBuilder } from './searchRequestBuilder';
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
