import { User } from '../models/data-contracts';

export type PartialUser<TKeys extends string> = Omit<User, TKeys>;

export class UserFactory {
    static anonymous(user?: PartialUser<'temporaryId'|'fingerprint'|'authenticatedId'>): User {
        return { ...user };
    }
    
    static byAuthenticatedId(authenticatedId: string, temporaryId?: string, user?: PartialUser<'temporaryId'|'authenticatedId'>): User {
        return { authenticatedId, ...(temporaryId && { temporaryId }), ...user };
    }
    
    static byTemporaryId(temporaryId: string, user?: PartialUser<'temporaryId'>): User {
        return { ...user, temporaryId };
    }
    
    static byIdentifier(key: string, value: string, user?: PartialUser<'identifiers'>): User {
        return { ...user, identifiers: { [key]: value } };
    }
    
    static byIdentifiers(identifiers: Record<string, string>, user?: PartialUser<'identifiers'>): User {
        return { identifiers, ...user };
    }
    
    static byEmail(email: string, user?: PartialUser<'email'>): User {
        return { email, ...user };
    }

    static byFingerprint(fingerprint: string, user?: PartialUser<'fingerprint'>): User {
        return { fingerprint, ...user };
    }
}