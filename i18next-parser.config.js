module.exports = {
  locales: ["en", "es"],
  output: "src/i18n/locales/$LOCALE.json",
  input: ["src/components/**/*.{ts,tsx}"],
  defaultNamespace: "common",
  keySeparator: ".",
};
