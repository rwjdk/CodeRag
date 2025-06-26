import { ProductSearchResultConstraint, ResultMustHaveVariantConstraint } from '../../models/data-contracts';

export class SearchConstraintBuilder {
    private resultConstraint: ProductSearchResultConstraint | null = null;

    public setResultMustHaveVariantConstraint(constaint: { exceptWhenProductHasNoVariants: boolean }): this {
        const constraint: ResultMustHaveVariantConstraint = {
            $type: 'Relewise.Client.Requests.Search.Settings.ResultMustHaveVariantConstraint, Relewise.Client',
            ...constaint,
        };

        this.resultConstraint = constraint;
        return this;
    }

    build(): ResultMustHaveVariantConstraint | null {
        // Do to how the data contracts are generated, resultsConstraints on searchSettings expect this specific type
        // Once more types are added it will expect the generic type and this cast should be removed and the generic type should be returned
        return this.resultConstraint as ResultMustHaveVariantConstraint | null;
    }
}
