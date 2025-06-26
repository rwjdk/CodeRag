import { Settings } from '../../../builders/settings';
import { ContentsViewedAfterViewingMultipleContentsRequest } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';
export declare class ContentsViewedAfterViewingMultipleContentsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingMultipleContentsRequest> {
    private ids;
    constructor(settings: Settings);
    setContentIds(...ids: string[]): this;
    build(): ContentsViewedAfterViewingMultipleContentsRequest;
}
