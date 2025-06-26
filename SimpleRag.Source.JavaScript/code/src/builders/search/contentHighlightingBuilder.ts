import { ContentHighlightProps, ContentSearchSettingsHighlightSettings, HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits, HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape } from '../../models/data-contracts';

export class ContentHighlightingBuilder {
    private enabledState: boolean = true;
    private highlightable: ContentHighlightProps = {
        $type: 'Relewise.Client.Requests.Shared.Highlighting.ContentHighlightProps, Relewise.Client',
        displayName: false
    };
    private limit: HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits = {};
    private shape: HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape = { };

    public enabled(enabled: boolean): this {
        this.enabledState = enabled;

        return this;
    }

    public setHighlightable(highlightable: { displayName?: boolean, dataKeys?: string[] | null }): this {
        this.highlightable.displayName = highlightable.displayName ?? false;
        this.highlightable.dataKeys = highlightable.dataKeys;

        return this;
    }

    public setLimit(limit: HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits): this {
        this.limit = limit;

        return this;
    }

    public setShape(shape: HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape): this {
        this.shape = shape;

        return this;
    }

    public build(): ContentSearchSettingsHighlightSettings {
        return {
            $type: 'Relewise.Client.Requests.Search.Settings.ContentSearchSettings+HighlightSettings, Relewise.Client',
            enabled: this.enabledState,
            highlightable: this.highlightable,
            limit: this.limit,
            shape: this.shape
        };
    }
}