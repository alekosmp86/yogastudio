import { MembershipModule } from "../membership/membership.module";

let bootstrapped = false;

export function bootstrap() {
  if (bootstrapped) return;

  console.log("Bootstrapping modules...");
  bootstrapped = true;

  const modules = [
    MembershipModule,
    // future modules here
  ];

  for (const module of modules) {
    module.init();
  }
}
