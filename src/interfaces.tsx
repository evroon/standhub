export interface GHNotificationSubject {
    title: string;
    url: string;
}

export interface GHNotificationRepositoryOwner {
    avatar_url: string;
}

export interface GHNotificationRepository {
    name: string;
    owner: GHNotificationRepositoryOwner;
}

export interface GHNotification {
    id: number;
    reason: string;
    subject: GHNotificationSubject;
    repository: GHNotificationRepository;
    last_read_at: string;
}
