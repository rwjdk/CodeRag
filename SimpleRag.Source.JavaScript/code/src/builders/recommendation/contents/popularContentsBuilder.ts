import { Settings } from '../../../builders/settings';
import { PopularContentsRequest } from '../../../models/data-contracts';
import { DefaultSinceMinutesAgo } from '../DefaultSinceMinutesAgo';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';

export class PopularContentsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<PopularContentsRequest> {
    private since: number = DefaultSinceMinutesAgo;
    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public build() {
        const request: PopularContentsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PopularContentsRequest, Relewise.Client',
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            sinceMinutesAgo: this.since,
        };

        return request;
    }
}
