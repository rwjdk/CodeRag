import { User } from '../models/data-contracts';
export type PartialUser<TKeys extends string> = Omit<User, TKeys>;
export declare class UserFactory {
    static anonymous(user?: PartialUser<'temporaryId' | 'fingerprint' | 'authenticatedId'>): User;
    static byAuthenticatedId(authenticatedId: string, temporaryId?: string, user?: PartialUser<'temporaryId' | 'authenticatedId'>): User;
    static byTemporaryId(temporaryId: string, user?: PartialUser<'temporaryId'>): User;
    static byIdentifier(key: string, value: string, user?: PartialUser<'identifiers'>): User;
    static byIdentifiers(identifiers: Record<string, string>, user?: PartialUser<'identifiers'>): User;
    static byEmail(email: string, user?: PartialUser<'email'>): User;
    static byFingerprint(fingerprint: string, user?: PartialUser<'fingerprint'>): User;
}
