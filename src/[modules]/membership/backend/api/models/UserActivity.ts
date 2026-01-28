type MembershipPlan = {
  id: number;
  name: string;
  isActive: boolean;
  maxActivities: number;
  durationDays: number;
};

type UserSelectedActivity = {
  id: number;
  templateId: number;
  userMembershipId: number;
};

type ClassTemplate = {
  id: number;
  title: string;
  description: string | null;
};

export type UserActivity = {
  activities: ClassTemplate[];
  userActivities: {
    membershipPlan: MembershipPlan;
    templates: UserSelectedActivity[];
  } & {
    id: number;
    userId: number;
    membershipPlanId: number;
    startDate: string;
    endDate: string;
    status: string;
  } | null;
};
