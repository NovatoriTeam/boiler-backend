import { AuthModel, AuthTypeEnum, UserModel } from 'novatori/validators';

export function serializeOAuthUser(data: {
  firstName: string;
  lastName?: string;
  identifier: string;
  type: AuthTypeEnum;
  metadata: unknown;
}): UserModel {
  const { firstName, lastName, identifier, type, metadata } = data;

  const user = new UserModel();

  user.firstName = firstName;
  user.lastName = lastName;

  const auth = new AuthModel();
  auth.type = type;
  auth.identifier = identifier;
  auth.metadata = metadata;

  user.auths = [auth];

  return user;
}
