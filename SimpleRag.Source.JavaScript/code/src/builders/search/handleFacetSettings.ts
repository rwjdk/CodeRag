import { FacetSettings } from '../../models/data-contracts';
import { FacetSettingsBuilder } from './facetSettingsBuilder';

 export function handleFacetSettings(facetSettings?: FacetSettings | ((facetSettingsBuilder: FacetSettingsBuilder) => void)) {
        if (typeof facetSettings === 'function') {
            const builder = new FacetSettingsBuilder();
            facetSettings(builder);
            facetSettings = builder.build();
        }

        return facetSettings;
    }