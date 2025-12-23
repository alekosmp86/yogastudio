import { MagicLinkServiceImpl } from "./magic-link/(services)/impl/MagicLinkServiceImpl";
import { UserLinkServiceImpl } from "../user-link/_services/impl/UserLinkService";
import { RegistryServiceImpl } from "./register/(services)/impl/RegistryServiceImpl";

export const magicLinkService = new MagicLinkServiceImpl(
  new UserLinkServiceImpl()
);
export const registryService = new RegistryServiceImpl();
