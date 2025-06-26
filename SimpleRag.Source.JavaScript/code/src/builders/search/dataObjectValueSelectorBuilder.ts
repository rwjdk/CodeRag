import { DataObjectFilter, DataObjectValueSelector } from '../..';
import { DataObjectFilterConditionBuilder } from '../dataObjectFilterConditionBuilder';

export class DataObjectValueSelectorBuilder {
    private key!: string;
    private filter?: DataObjectFilter;
    private childSelector?: DataObjectValueSelector;
    private fallbackSelector?: DataObjectValueSelector;

    public select(key: string, settings?: {
        filter?: {
            conditions?: (builder: DataObjectFilterConditionBuilder) => void,
            skip?: number,
            take?: number 
        } | null, 
        childSelector?: (childSelector: DataObjectValueSelectorBuilder) => void | null,
        fallbackSelector?: (childSelector: DataObjectValueSelectorBuilder) => void | null
    })
    {
        if (!key) 
            throw new Error('DataObjectValueSelector key can\'t be null or empty')

        this.key = key;
        
        if (settings) {
            if (settings.filter) {
                const conditionsBuilder = new DataObjectFilterConditionBuilder();
                if (settings.filter?.conditions) {
                    settings.filter.conditions(conditionsBuilder);
                }
    
                this.filter = {
                    skip: settings.filter.skip,
                    take: settings.filter.take, 
                    conditions: conditionsBuilder.build(),
                }
            }
    
            if (settings.childSelector) {
                const childSelector = new DataObjectValueSelectorBuilder();
                if (settings?.childSelector) {
                    settings?.childSelector(childSelector);
                }
                this.childSelector = childSelector.build();
            }

            if (settings.fallbackSelector) {
                const fallbackSelector = new DataObjectValueSelectorBuilder();
                if (settings?.fallbackSelector) {
                    settings?.fallbackSelector(fallbackSelector);
                }
                this.fallbackSelector = fallbackSelector.build();
            }
        }
    }

    public build(): DataObjectValueSelector {
        if (!this.key) 
            throw new Error('DataObjectValueSelector key can\'t be null or empty - did you forget to use .select(\'key)?\'')
    
        return {
            key: this.key,
            filter: this.filter,
            childSelector: this.childSelector,
            fallbackSelector: this.fallbackSelector,
        }
    }
}