import { Settings } from '../../../builders/settings';
import { ContentsViewedAfterViewingContentRequest } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';

export class ContentsViewedAfterViewingContentBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingContentRequest> {
    private id: string = '';

    constructor(
        settings: Settings) {
        super(settings);
    }

    setContentId(contentId: string): this {
        this.id = contentId;

        return this;
    }

    public build() {
        const request: ContentsViewedAfterViewingContentRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.ContentsViewedAfterViewingContentRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            contentId: this.id,
        };

        return request;
    }
}
