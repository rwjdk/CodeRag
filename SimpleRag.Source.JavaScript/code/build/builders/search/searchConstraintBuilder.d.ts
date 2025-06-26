import { ResultMustHaveVariantConstraint } from '../../models/data-contracts';
export declare class SearchConstraintBuilder {
    private resultConstraint;
    setResultMustHaveVariantConstraint(constaint: {
        exceptWhenProductHasNoVariants: boolean;
    }): this;
    build(): ResultMustHaveVariantConstraint | null;
}
