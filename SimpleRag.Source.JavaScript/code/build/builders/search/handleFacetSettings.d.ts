import { FacetSettings } from '../../models/data-contracts';
import { FacetSettingsBuilder } from './facetSettingsBuilder';
export declare function handleFacetSettings(facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)): FacetSettings | undefined;
