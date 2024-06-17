export interface JwtConfigInterface {
  readonly jwtSecret: string;
  readonly jwtExpiration: string;
  readonly refreshJwtSecret: string;
  readonly refreshJwtExpiration: string;
}
