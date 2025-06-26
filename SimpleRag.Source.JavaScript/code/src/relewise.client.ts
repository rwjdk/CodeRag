import { error } from 'console';
import version from './version';

export interface RelewiseClientOptions {
    serverUrl?: string;
}

export interface RelewiseRequestOptions {
    abortSignal?: AbortSignal
}

export class ProblemDetailsError extends Error {
    private _details?: HttpProblemDetails | null;

    public get details(): HttpProblemDetails | undefined | null {
        return this._details;
    }

    constructor(message: string, details?: HttpProblemDetails | null) {
        super(message);
        this._details = details;
    }
}

export interface HttpProblemDetails {
    type: string;
    title: string;
    status: number;
    traceId: string;
    detail?: string;
    errors?: Record<string, string>;
}

export abstract class RelewiseClient {
    private readonly _serverUrl: string = 'https://api.relewise.com';
    private readonly _urlPath: string = 'v1';
    private readonly _apiKeyHeader: string;

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        if (!datasetId) throw new Error('Dataset id cannot be null or empty. Please contact Relewise if you don\'t have an account already or would like a free demo license');
        if (!apiKey) throw new Error('API Key secret cannot be null or empty. Please contact Relewise support if you don\'t know the apiKeySecret for your datasetId.');

        this._apiKeyHeader = `APIKey ${this.apiKey}`;

        if (options?.serverUrl) {
            this._serverUrl = options.serverUrl;
        }
    }

    public get serverUrl(): string {
        return this._serverUrl;
    }

    protected async request<TRequest, TResponse>(name: string, data: TRequest, options?: RelewiseRequestOptions): Promise<TResponse | undefined> {
        const requestUrl = this.createRequestUrl(this._serverUrl, this.datasetId, this._urlPath, name);

        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    Authorization: this._apiKeyHeader,
                    'Content-Type': 'application/json',
                    'X-Relewise-Version': version.tag,
                },
                body: JSON.stringify(data),
                signal: options?.abortSignal,
                cache: 'no-cache',
            });

            if (!response.ok) {
                let responseMessage: HttpProblemDetails | null = null;
    
                try { 
                    responseMessage = await response.json();
                } catch (_) { 
                }
    
                const details = responseMessage?.detail ? `Details: ${responseMessage.detail}\n` : '';
    
                throw new ProblemDetailsError(`Error when calling the Relewise API.\n\nTitle: ${response.statusText}\nStatus: ${response.status}\n${details}\nRead more in the details property if there is error response or look in the network tab.`, responseMessage);
            }

            return await this.parseJson<TResponse>(response);

        } catch (err) {
           this.handleRequestError(err);
        }
    }

    private createRequestUrl(baseUrl: string, ...segments: string[]) {
        const joinedSegments = segments.join('/');
        return baseUrl.endsWith('/')
            ? baseUrl.concat(joinedSegments)
            : baseUrl.concat('/', joinedSegments);
    }

    private handleRequestError(err: unknown): never {
        if (err instanceof ProblemDetailsError) throw err;
        if (err instanceof DOMException) throw err;
        
        console.error("Network error or preflight request failed. Check API Key and Dataset ID.");
        throw new Error("Network error or preflight request failed. Check API Key and Dataset ID.");
    }

    private async parseJson<T>(response: Response): Promise<T | undefined> {
        try {
            return await response.json();
        } catch {
            return undefined;
        }
    }
}