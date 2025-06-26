import { FilterCollection } from '../../models/data-contracts';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';

export type FilterOptions = {
    filterSettings?: (builder: FilterSettingsBuilder) => void
}

export type EntityDataFilterOptions = FilterOptions & {
    objectPath?: string[]
};

export type AllFilters = NonNullable<FilterCollection['items']> extends (infer U)[] ? U : never;