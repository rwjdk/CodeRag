import { Settings } from '../../../builders/settings';
import { ContentsViewedAfterViewingMultipleContentsRequest } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';

export class ContentsViewedAfterViewingMultipleContentsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<ContentsViewedAfterViewingMultipleContentsRequest> {
    private ids: string[] = [];

    constructor(
        settings: Settings) {
        super(settings);
    }

    setContentIds(...ids: string[]): this {
        this.ids = ids;

        return this;
    }

    public build() {
        const request: ContentsViewedAfterViewingMultipleContentsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.ContentsViewedAfterViewingMultipleContentsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            contentIds: this.ids,
        };

        return request;
    }
}
