import { Settings } from '../../../builders/settings';
import { ContentsViewedAfterViewingContentRequest } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';
export declare class ContentsViewedAfterViewingContentBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingContentRequest> {
    private id;
    constructor(settings: Settings);
    setContentId(contentId: string): this;
    build(): ContentsViewedAfterViewingContentRequest;
}
