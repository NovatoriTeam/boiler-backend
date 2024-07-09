export interface GoogleOauthUserInterface {
  emails: { value: string }[];
  name: { givenName: string; familyName: string };
  id: string;
}
