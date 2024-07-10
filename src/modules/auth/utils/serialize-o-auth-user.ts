import { AuthModel, AuthTypeEnum, UserModel } from 'novatori/validators';

export function serializeOAuthUser(data: {
  firstName: string;
  lastName?: string;
  email?: string;
  identifier: string;
  accessToken: string;
  type: AuthTypeEnum;
}): UserModel {
  const { firstName, lastName, email, identifier, accessToken, type } = data;

  const user = new UserModel();

  user.firstName = firstName;
  user.lastName = lastName;

  const auth = new AuthModel();
  auth.type = type;
  auth.identifier = identifier;
  auth.metadata = { email, accessToken };

  user.auths = [auth];

  return user;
}
