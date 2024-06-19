export interface OAuthConfigInterface {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly callbackUrl: string;
  readonly redirectUrl: string;
}
