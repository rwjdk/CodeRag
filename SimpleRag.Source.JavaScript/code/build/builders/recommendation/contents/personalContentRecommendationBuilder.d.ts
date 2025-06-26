import { Settings } from '../../../builders/settings';
import { PersonalContentRecommendationRequest } from '../../../models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';
export declare class PersonalContentRecommendationBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<PersonalContentRecommendationRequest> {
    constructor(settings: Settings);
    build(): import("../../../models/data-contracts").ContentRecommendationRequest;
}
