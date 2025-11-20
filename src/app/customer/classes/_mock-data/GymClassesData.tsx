import { GymClass } from "../../../../types/GymClass";

export const GymClassesData: GymClass[] = [
  {
    id: "1",
    name: "Morning Yoga",
    time: "08:00",
    instructor: "Ariana",
    reserved: 12,
    capacity: 18,
    icon: "sun", // <-- STRING ONLY 🔥
  },
  {
    id: "2",
    name: "Power Yoga",
    time: "12:00",
    instructor: "Jorge",
    reserved: 8,
    capacity: 14,
    icon: "flame", // <-- STRING ONLY 🔥
  },
  {
    id: "3",
    name: "Meditation",
    time: "18:00",
    instructor: "Maya",
    reserved: 15,
    capacity: 20,
    icon: "sparkle", // <-- STRING ONLY 🔥
  },
];
