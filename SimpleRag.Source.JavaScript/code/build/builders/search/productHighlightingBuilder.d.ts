import { HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits, HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape, ProductSearchSettingsHighlightSettings } from '../../models/data-contracts';
export declare class ProductHighlightingBuilder {
    private enabledState;
    private highlightable;
    private limit;
    private shape;
    enabled(enabled: boolean): this;
    setHighlightable(highlightable: {
        displayName?: boolean;
        dataKeys?: string[] | null;
    }): this;
    setLimit(limit: HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits): this;
    setShape(shape: HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape): this;
    build(): ProductSearchSettingsHighlightSettings;
}
