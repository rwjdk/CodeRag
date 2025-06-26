import { FilterSettings } from '../models/data-contracts';
import { FilterScopesBuilder } from './filterScopesBuilder';

export class FilterSettingsBuilder {
    private scopesBuilder: FilterScopesBuilder = new FilterScopesBuilder();

    public scopes(builder: (builder: FilterScopesBuilder) => void): this {
        builder(this.scopesBuilder);

        return this;
    }

    public build(): FilterSettings | null {
        const scopes = this.scopesBuilder.build();
        return scopes
            ? { scopes: scopes }
            : null;
    }
}