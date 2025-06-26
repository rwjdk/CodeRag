export interface RelewiseClientOptions {
    serverUrl?: string;
}
export interface RelewiseRequestOptions {
    abortSignal?: AbortSignal;
}
export declare class ProblemDetailsError extends Error {
    private _details?;
    get details(): HttpProblemDetails | undefined | null;
    constructor(message: string, details?: HttpProblemDetails | null);
}
export interface HttpProblemDetails {
    type: string;
    title: string;
    status: number;
    traceId: string;
    detail?: string;
    errors?: Record<string, string>;
}
export declare abstract class RelewiseClient {
    protected readonly datasetId: string;
    protected readonly apiKey: string;
    private readonly _serverUrl;
    private readonly _urlPath;
    private readonly _apiKeyHeader;
    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    get serverUrl(): string;
    protected request<TRequest, TResponse>(name: string, data: TRequest, options?: RelewiseRequestOptions): Promise<TResponse | undefined>;
    private createRequestUrl;
    private handleRequestError;
    private parseJson;
}
