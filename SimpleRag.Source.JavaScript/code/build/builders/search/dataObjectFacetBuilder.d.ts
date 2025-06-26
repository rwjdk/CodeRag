import { DataObjectFacet, FacetSettings } from '../../models/data-contracts';
import { DataObjectFilterConditionBuilder } from '../dataObjectFilterConditionBuilder';
import { FacetSettingsBuilder } from './facetSettingsBuilder';
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
    build(): (import("../../models/data-contracts").BooleanDataObjectValueFacet | DataObjectFacet | import("../../models/data-contracts").DoubleNullableDataObjectRangeFacet | import("../../models/data-contracts").DoubleNullableDataObjectRangesFacet | import("../../models/data-contracts").StringDataObjectValueFacet | import("../../models/data-contracts").DoubleDataObjectValueFacet)[] | null;
}
