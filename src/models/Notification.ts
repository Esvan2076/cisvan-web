// models/Notification.ts
export interface Notification {
    id: number;
    message: string;
    referenceType: "USER" | "CONTENT" | null;
    referenceId: string | null;
    createdAt: string;
}
