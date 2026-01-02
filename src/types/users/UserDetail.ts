import { User } from "./User";

export type UserDetail = {
  basicInfo: Pick<User, "id" | "name" | "email" | "phone">;
  activityStats: {
    penalties: number;
    cancelations: number;
  };
  cancelledClasses: {
    title: string;
    date: string;
    startTime: string;
  }[];
};
