import { CorePreferences } from "@/static/CorePreferences";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function syncPreferences() {
  for (const pref of CorePreferences) {
    await prisma.appPreferences.upsert({
      where: { name: pref.name },
      update: { value: pref.value },
      create: pref,
    });
  }
}

(async () => {
  try {
    await syncPreferences();
    console.log("Preferences synced");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
