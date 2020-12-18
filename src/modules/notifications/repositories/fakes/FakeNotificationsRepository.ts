import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationsDTO";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import Notification from '../../infra/typeorm/schemas/Notification';
import { ObjectID } from 'mongodb';

export default class NotificationsRepository implements INotificationsRepository {

    private notifications: Notification[] = [];

    public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {

        const notification = new Notification();

        Object.assign(notification, { id: new ObjectID(), content, recipient_id });

        this.notifications.push()

        return notification;
    }
}