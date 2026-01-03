import { User } from "./User";

export type UserDetail = {
  basicInfo: Pick<User, "id" | "name" | "email" | "phone">;
  activityStats: {
    penalties: number;
    cancelations: number;
  };
  cancelledClasses: {
    id: number;
    title: string;
    date: string;
    startTime: string;
  }[];
};
