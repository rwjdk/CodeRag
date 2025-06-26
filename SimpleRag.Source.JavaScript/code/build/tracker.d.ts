import { RelewiseClient, RelewiseClientOptions, RelewiseRequestOptions } from './relewise.client';
import { User, DataValue } from './models/data-contracts';
export declare class Tracker extends RelewiseClient {
    protected readonly datasetId: string;
    protected readonly apiKey: string;
    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    trackOrder({ user, subtotal, orderNumber, lineItems, cartName, trackingNumber, data }: {
        user: User;
        subtotal: {
            currency: string;
            amount: number;
        };
        orderNumber: string;
        /** @deprecated Use orderNumber instead. */
        trackingNumber?: string;
        lineItems: {
            productId: string;
            variantId?: string;
            lineTotal: number;
            quantity: number;
            data?: Record<string, DataValue>;
        }[];
        data?: Record<string, DataValue>;
        cartName?: string;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackCart({ user, subtotal, lineItems, data, cartName }: {
        user?: User;
        subtotal: {
            currency: string;
            amount: number;
        };
        lineItems: {
            productId: string;
            variantId?: string;
            lineTotal: number;
            quantity: number;
            data?: Record<string, DataValue>;
        }[];
        data?: Record<string, DataValue>;
        cartName?: string;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackProductView({ productId, variantId, user }: {
        productId: string;
        variantId?: string;
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackProductCategoryView({ idPath, user }: {
        idPath: string[];
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackContentView({ contentId, user }: {
        contentId: string;
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackContentCategoryView({ idPath, user }: {
        idPath: string[];
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackBrandView({ brandId, user }: {
        brandId: string;
        user: User;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackSearchTerm({ term, language, user }: {
        term: string;
        user: User;
        language: string;
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
    trackUserUpdate({ user, updateKind }: {
        user: User;
        updateKind?: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    }, options?: RelewiseRequestOptions): Promise<void | undefined>;
}
