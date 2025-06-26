import { ProductSearchRequest, RecommendationSettings, RetailMediaQuery, SelectedBrandPropertiesSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings, VariantSearchSettings } from '../../models/data-contracts';
import { PaginationBuilder } from '../paginationBuilder';
import { Settings } from '../settings';
import { FacetBuilder } from './facetBuilder';
import { ProductHighlightingBuilder } from './productHighlightingBuilder';
import { ProductSortingBuilder } from './productSortingBuilder';
import { SearchBuilder } from './searchBuilder';
import { SearchConstraintBuilder } from './searchConstraintBuilder';
import { SearchRequestBuilder } from './searchRequestBuilder';
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
