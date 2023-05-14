import { createEnum } from "../../../dist";

export enum UserType {
  USER= 'USER',
  SUPERUSER = 'SUPERUSER'
}

export default createEnum((UserTypeEnum) => {
  UserTypeEnum.fromJSEnum(UserType);
})
