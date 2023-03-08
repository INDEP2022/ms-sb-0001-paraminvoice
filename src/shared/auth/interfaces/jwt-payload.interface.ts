export interface IRealmAccess {
  roles: string[];
}

export interface IRealmManagement {
  roles: string[];
}

export interface IIndepAuth {
  roles: string[];
}

export interface IAccount {
  roles: string[];
}

export interface IResourceAccess {}

export interface IJWTPayload {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: IRealmAccess;
  resource_access: IResourceAccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
