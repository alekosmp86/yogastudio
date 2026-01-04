export interface ProfileData {
    id: number;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    reservations: {
        total: number;
        cancelled: number;
        upcoming: number;
    };
    penalties: {
        count: number;
    };
}