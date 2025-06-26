import { Settings } from '../../../builders/settings';
import { PopularContentsRequest } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';
export declare class PopularContentsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<PopularContentsRequest> {
    private since;
    constructor(settings: Settings);
    sinceMinutesAgo(sinceMinutesAgo: number): this;
    build(): PopularContentsRequest;
}
