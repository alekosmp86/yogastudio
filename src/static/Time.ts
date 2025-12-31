export const Time = {
  HOURS: Array.from({ length: 16 }, (_, i) => {
    const hour = i + 6; // 06 → 21
    return `${String(hour).padStart(2, "0")}:00`;
  }),
  WEEKDAYS: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
};
