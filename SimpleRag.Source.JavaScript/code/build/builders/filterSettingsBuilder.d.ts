import { FilterSettings } from '../models/data-contracts';
import { FilterScopesBuilder } from './filterScopesBuilder';
export declare class FilterSettingsBuilder {
    private scopesBuilder;
    scopes(builder: (builder: FilterScopesBuilder) => void): this;
    build(): FilterSettings | null;
}
