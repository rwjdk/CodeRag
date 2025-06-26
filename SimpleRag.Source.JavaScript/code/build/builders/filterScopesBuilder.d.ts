import { FilterScopes } from '../models/data-contracts';
export declare class FilterScopesBuilder {
    private fillScope;
    private defaultScope;
    fill({ apply }: {
        apply: boolean;
    }): this;
    default({ apply }: {
        apply: boolean;
    }): this;
    build(): FilterScopes | null;
}
