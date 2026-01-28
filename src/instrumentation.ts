export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { bootstrapHooks } =
      await import("./[modules]/[core]/bootstrap/core");
    await bootstrapHooks();
  }
}
