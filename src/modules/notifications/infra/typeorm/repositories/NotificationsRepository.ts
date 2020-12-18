import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationsDTO";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import { getMongoRepository, MongoRepository } from "typeorm";
import Notification from '../schemas/Notification';


export default class NotificationsRepository implements INotificationsRepository {
    private notificationRepository: MongoRepository<Notification>;

    constructor() {
        this.notificationRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {

        const notification = this.notificationRepository.create({
            content,
            recipient_id,
        });

        await this.notificationRepository.save(notification);

        return notification;
    }
}