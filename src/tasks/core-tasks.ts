import { CorePreferences } from "@/static/CorePreferences";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function syncPreferences() {
  const existingPrefs = await prisma.appPreferences.findMany();

  for (const pref of CorePreferences) {
    if (!existingPrefs.find((p) => p.name === pref.name)) {
      await prisma.appPreferences.create({
        data: {
          ...pref,
          value: String(pref.value),
          options: pref.options ? JSON.stringify(pref.options) : "",
        },
      });
    }
  }
}

async function addCoreModule() {
  await prisma.modules.upsert({
    where: { name: "org.alekosoft.gymstudio.core" },
    update: {},
    create: {
      name: "org.alekosoft.gymstudio.core",
      description: "Core module",
      isActive: true,
    },
  });
}

(async () => {
  try {
    await addCoreModule();
    await syncPreferences();
    console.log("Preferences synced");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
