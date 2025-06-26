import { HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits, HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape, ProductHighlightProps, ProductSearchSettingsHighlightSettings } from '../../models/data-contracts';

export class ProductHighlightingBuilder {
    private enabledState: boolean = true;
    private highlightable: ProductHighlightProps = {
        $type: 'Relewise.Client.Requests.Shared.Highlighting.ProductHighlightProps, Relewise.Client',
        displayName: false
    }; 
    private limit: HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits = {};
    private shape: HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape = {
    };

    public enabled(enabled: boolean): this {
        this.enabledState = enabled;
        
        return this;
    }

    public setHighlightable(highlightable: { displayName?: boolean, dataKeys?: string[] | null }): this {
        this.highlightable.displayName = highlightable.displayName ?? false;
        this.highlightable.dataKeys = highlightable.dataKeys;

        return this;
    }

    public setLimit(limit: HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits): this {
        this.limit = limit;

        return this;
    }

    public setShape(shape: HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape): this {
        this.shape = shape;

        return this;
    }

    public build(): ProductSearchSettingsHighlightSettings {
        return {
            $type: 'Relewise.Client.Requests.Search.Settings.ProductSearchSettings+HighlightSettings, Relewise.Client',
            enabled: this.enabledState,
            highlightable: this.highlightable,
            limit: this.limit,
            shape: this.shape
        };
    }
}