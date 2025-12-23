import { CorePreferences } from "@/static/CorePreferences";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function syncPreferences() {
  const existingPrefs = await prisma.appPreferences.findMany();

  for (const pref of CorePreferences) {
    if(!existingPrefs.find(p => p.name === pref.name)) {
      await prisma.appPreferences.create({ data: {...pref, value: String(pref.value)}});
    }
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
