import { ApplyFilterSettings, FilterScopes } from '../models/data-contracts';

export class FilterScopesBuilder {

    private fillScope: ApplyFilterSettings | undefined = undefined;
    private defaultScope: ApplyFilterSettings | undefined = undefined;

    public fill({ apply }: { apply: boolean; }): this {
        this.fillScope = {
            $type: 'Relewise.Client.Requests.Filters.Settings.ApplyFilterSettings, Relewise.Client',
            apply,
        };

        return this;
    }

    public default({ apply }: { apply: boolean; }): this {
        this.defaultScope = {
            $type: 'Relewise.Client.Requests.Filters.Settings.ApplyFilterSettings, Relewise.Client',
            apply,
        };

        return this;
    }

    public build(): FilterScopes | null {
        return this.fillScope || this.defaultScope
            ? {
                fill: this.fillScope,
                default: this.defaultScope,
            }
            : null;
    }
}