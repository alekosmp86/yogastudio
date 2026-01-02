import { GymClassBase } from "../classes/GymClassBase";
import { User } from "../users/User";

export type ReservationsPerClass = {
  id: number;
  date: string;
  startTime: string;
  template: GymClassBase;
  reservations: {
    id: number;
    user: Pick<User, "id" | "name" | "email">;
    attended: boolean | null;
  }[];
};
