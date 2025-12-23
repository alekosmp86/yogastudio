import { Prisma } from "@prisma/client";

export type ClassInstanceRelations = {
  template?: boolean;
  reservations?: boolean;
  waitingList?: boolean;
};

export type ClassInstanceWithRelations<T extends Prisma.ClassInstanceInclude> =
  Prisma.ClassInstanceGetPayload<{
    include: T;
  }>;
