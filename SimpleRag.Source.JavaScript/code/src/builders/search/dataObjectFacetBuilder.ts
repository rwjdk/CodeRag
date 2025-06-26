import { DataObjectFacet, DataObjectBooleanValueFacet, DataObjectDoubleRangeFacet, DataObjectDoubleRangesFacet, DataObjectDoubleValueFacet, DataObjectStringValueFacet, FacetSettings } from '../../models/data-contracts';
import { DataObjectFilterConditionBuilder } from '../dataObjectFilterConditionBuilder';
import { FacetSettingsBuilder } from './facetSettingsBuilder';
import { handleFacetSettings } from './handleFacetSettings';


export class DataObjectFacetBuilder {
    private facets: (
        | DataObjectFacet
        | DataObjectDoubleRangeFacet
        | DataObjectDoubleRangesFacet
        | DataObjectStringValueFacet
        | DataObjectBooleanValueFacet
        | DataObjectDoubleValueFacet)[] = [];

    public addDataObjectFacet(
        key: string,
        builder?: (facets: DataObjectFacetBuilder) => void,
        filter?: {
            conditions?: (builder: DataObjectFilterConditionBuilder) => void,
            skip?: number,
            take?: number 
        },
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facetBuilder = new DataObjectFacetBuilder();
        if (builder) {
            builder(facetBuilder);
        }
            
        const conditionsBuilder = new DataObjectFilterConditionBuilder();
        if (filter?.conditions) {
            filter.conditions(conditionsBuilder);
        }

        const facet: DataObjectFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectFacet, Relewise.Client',
            field: 'Data',
            key: key,
            items: facetBuilder.build() ?? [],
            filter: {
                conditions: conditionsBuilder.build() ?? [],
                take: filter?.take,
                skip: filter?.skip,
            },
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addStringFacet(
        key: string,
        selectedValues: string[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: DataObjectStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectStringValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addBooleanFacet(
        key: string,
        selectedValues: boolean[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: DataObjectBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectBooleanValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addNumberFacet(
        key: string,
        selectedValues: number[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: DataObjectDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectDoubleValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addNumberRangeFacet(
        key: string,
        lowerBound?: number | null, 
        upperBound?: number | null,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: DataObjectDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            key: key,
            selected: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            settings: handleFacetSettings(facetSettings)
        };
        this.facets.push(facet);

        return this;
    }

    public addNumberRangesFacet(
        key: string,
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null,
        facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): this {

        const facet: DataObjectDoubleRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectDoubleRangesFacet, Relewise.Client',
            field: 'Data',
            key: key,
            settings: handleFacetSettings(facetSettings),
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
        };
        this.facets.push(facet);

        return this;
    }

    build() {
        return this.facets.length === 0
            ? null
            : this.facets;
    }
}
