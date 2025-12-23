import { User } from "@prisma/client";
import { GoogleUserMapper } from "../GoogleUserMapper";
import { GoogleUserInfo } from "../../_dto/GoogleUserInfo";

export class GoogleUserMapperImpl implements GoogleUserMapper {
  toUser(data: unknown): Omit<User, "id"> {
    const googleUser = data as GoogleUserInfo;
    return {
      phone: null,
      email: googleUser.email,
      name: googleUser.name || "",
      role: "USER",
      approved: false,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
