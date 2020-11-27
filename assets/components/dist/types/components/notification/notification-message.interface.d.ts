import { NotificationType } from './notification-type.enum';
export interface NotificationMessage {
    id: number;
    message: string;
    sticky: boolean;
    type: NotificationType;
    timer?: number;
}
