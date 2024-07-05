export interface GoogleOauthUserInterface {
  id: string;
  emails: { value: string }[];
  name: { givenName: string; familyName: string };
}
