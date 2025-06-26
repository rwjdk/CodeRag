import { ContentSearchSettingsHighlightSettings, HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits, HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape } from '../../models/data-contracts';
export declare class ContentHighlightingBuilder {
    private enabledState;
    private highlightable;
    private limit;
    private shape;
    enabled(enabled: boolean): this;
    setHighlightable(highlightable: {
        displayName?: boolean;
        dataKeys?: string[] | null;
    }): this;
    setLimit(limit: HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits): this;
    setShape(shape: HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape): this;
    build(): ContentSearchSettingsHighlightSettings;
}
