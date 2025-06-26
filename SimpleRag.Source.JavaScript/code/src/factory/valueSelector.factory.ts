import { DataDoubleSelector, FixedDoubleValueSelector } from '..';

export class ValueSelectorFactory {
    static dataDoubleSelector(key: string): DataDoubleSelector {
        return {
            $type: 'Relewise.Client.Requests.ValueSelectors.DataDoubleSelector, Relewise.Client',
            key: key,
        };
    }

    static fixedDoubleValueSelector(value: number): FixedDoubleValueSelector {
        return {
            $type: 'Relewise.Client.Requests.ValueSelectors.FixedDoubleValueSelector, Relewise.Client',
            value: value,
        };
    }
}